using System;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Terrasoft.Configuration
{

    [EntityEventListener(SchemaName = "NavInvoice")]
    public class NavInvoiceEntityEventListener : BaseEntityEventListener
    {
        private const int manualTypeCode = 1; //тип счета "Вручную
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
                    var invTypes = esq.GetEntityCollection(userConnection);
                    foreach (var invType in invTypes)
                    {
                        if ((invType.GetColumnValue(code.Name) != null ? Convert.ToInt32(invType.GetColumnValue(code.Name)) : 0) == manualTypeCode)
                        {
                            invoice.SetColumnValue("NavInvoiceTypeId", invType.GetColumnValue(invTypeId.Name));
                        }
                    }
                }

                AddInvoiceSum(invoice);
            }
            else
            {
                throw new Exception("Ошибка. Можно завести только один счёт по договору за одну и ту же дату");
            }
        }

      /*  public override void OnUpdating(object sender, EntityBeforeEventArgs e)
        {
            base.OnSaving(sender, e);
            var invoice = (Entity)sender;

            AddInvoiceSum(invoice);
        }*/
        public override void OnDeleting(object sender, EntityBeforeEventArgs e)
        {
            base.OnDeleting(sender, e);
            var invoice = (Entity)sender;

            DeleteInvoiceSum(invoice);
        }



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
                        throw new Exception("Сумма счетов превышает сумму в договоре");
                    }
                }
            }
        }
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