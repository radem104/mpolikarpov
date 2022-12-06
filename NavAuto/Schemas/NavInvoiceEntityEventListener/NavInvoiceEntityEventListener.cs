using System;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Terrasoft.Configuration
{

    [EntityEventListener(SchemaName = "NavInvoice")]
    public class NavInvoiceEntityEventListener : BaseEntityEventListener
    {
        private const int manualTypeCode = 1; //Code of manual invoice type
        public override void OnSaving(object sender, EntityBeforeEventArgs e)
        {
            base.OnSaving(sender, e);
            var invoice = (Entity)sender;
            var userConnection = invoice.UserConnection;
            if (CheckExistInvoiceInDate(invoice))
            {
                var invoiceType = invoice.GetColumnValue("NavInvoiceTypeId");

                if (invoiceType == null)
                {
                    var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, "NavInvoiceType");
                    var invTypeId = esq.AddColumn("Id");
                    var code = esq.AddColumn("NavCode");
                    var esqFilter = esq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavCode", manualTypeCode);
                    esq.Filters.Add(esqFilter);
                    var invTypes = esq.GetEntityCollection(userConnection);

                    if (invTypes.Count != 0)
                    {
                        invoice.SetColumnValue("NavInvoiceTypeId", invTypes[0].GetColumnValue(invTypeId.Name));
                    }

                }

                AddInvoiceSum(invoice);
            }
            else
            {
                var message = LocalizableStringHelper.GetValue(userConnection, "NavInvoiceEntityEventListener", "InvoiceLimitMessage");
                throw new Exception(message);
            }
        }

        public override void OnDeleting(object sender, EntityBeforeEventArgs e)
        {
            base.OnDeleting(sender, e);
            var invoice = (Entity)sender;

            DeleteInvoiceSum(invoice);
        }

        /// <summary>
        /// Augment invoice in agreement if invoice fact is true
        /// </summary>
        /// <param name="invoice"></param>

        private void AddInvoiceSum(Entity invoice)
        {
            var userConnection = invoice.UserConnection;
            var agreementId = invoice.GetColumnValue("NavAgreementId");

            var invFact = invoice.GetColumnValue("NavFact") != null && Convert.ToBoolean(invoice.GetColumnValue("NavFact"));

            if (invFact && agreementId != null)
            {
                var esqAgreement = new EntitySchemaQuery(userConnection.EntitySchemaManager, "NavAgreement");
                esqAgreement.AddAllSchemaColumns();
                var agreement = esqAgreement.GetEntity(userConnection, agreementId);

                var agrFactSum = agreement.GetColumnValue("NavFactSumma") != null ? Convert.ToDecimal(agreement.GetColumnValue("NavFactSumma")) : 0;
                var invAmount = invoice.GetColumnValue("NavAmount") != null ? Convert.ToDecimal(invoice.GetColumnValue("NavAmount")) : 0;

                if (invAmount != 0)
                {
                    var totalAmount = agrFactSum + invAmount;

                    var agrSum = agreement.GetColumnValue("NavSumma") != null ? Convert.ToDecimal(agreement.GetColumnValue("NavSumma")) : 0;
                    if (totalAmount <= agrSum)
                    {
                        agreement.SetColumnValue("NavFactSumma", totalAmount);
                        invoice.SetColumnValue("NavDate", DateTime.Now);

                        if (totalAmount == agrSum)
                        {
                            agreement.SetColumnValue("NavFact", true);
                        }
                        agreement.Save();
                    }
                    else
                    {
                        var message = LocalizableStringHelper.GetValue(userConnection, "NavInvoiceEntityEventListener", "TotalGraterMessage");
                        throw new Exception(message);
                    }
                }
            }
        }
        /// <summary>
        /// Subtract invoice sum from agreement if invoice deleted
        /// </summary>
        /// <param name="invoice"></param>
        private void DeleteInvoiceSum(Entity invoice)
        {
            var userConnection = invoice.UserConnection;
            var agreementId = invoice.GetColumnValue("NavAgreementId");

            if (agreementId != null)
            {
                var esqAgreement = new EntitySchemaQuery(userConnection.EntitySchemaManager, "NavAgreement");
                esqAgreement.AddAllSchemaColumns();
                var agreement = esqAgreement.GetEntity(userConnection, agreementId);

                var agrFactSum = agreement.GetColumnValue("NavFactSumma") != null ? Convert.ToDecimal(agreement.GetColumnValue("NavFactSumma")) : 0;
                var invAmount = invoice.GetColumnValue("NavAmount") != null ? Convert.ToDecimal(invoice.GetColumnValue("NavAmount")) : 0;

                if (invAmount != 0)
                {
                    agrFactSum -= invAmount;
                    agreement.SetColumnValue("NavFactSumma", agrFactSum);

                    var agrFact = agreement.GetColumnValue("NavFact") != null && Convert.ToBoolean(agreement.GetColumnValue("NavFact"));
                    if (agrFact)
                    {
                        agreement.SetColumnValue("NavFact", false);
                    }
                    agreement.Save();
                }
            }
        }
        /// <summary>
        /// Validate 1 in voice per day
        /// </summary>
        /// <param name="invoice"></param>
        /// <returns></returns>
        private bool CheckExistInvoiceInDate(Entity invoice)
        {
            var userConnection = invoice.UserConnection;
            var esqInv = new EntitySchemaQuery(userConnection.EntitySchemaManager, "NavInvoice");

            esqInv.AddColumn("NavDate");
            esqInv.AddColumn("NavAgreement");

            var esqFilterByDate = esqInv.CreateFilterWithParameters(FilterComparisonType.Equal, "NavDate", invoice.GetColumnValue("NavDate"));
            var esqFilterByAgreement = esqInv.CreateFilterWithParameters(FilterComparisonType.Equal, "NavAgreement", invoice.GetColumnValue("NavAgreementId"));
            var esqFilterByCurrentId = esqInv.CreateFilterWithParameters(FilterComparisonType.NotEqual, "Id", invoice.GetColumnValue("Id"));

            esqInv.Filters.Add(esqFilterByDate);
            esqInv.Filters.Add(esqFilterByAgreement);
            esqInv.Filters.Add(esqFilterByCurrentId);

            var invoices = esqInv.GetEntityCollection(userConnection);
            if (invoices.Count == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}