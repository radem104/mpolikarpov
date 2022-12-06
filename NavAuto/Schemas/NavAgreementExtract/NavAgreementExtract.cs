using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Web.Common;

namespace Terrasoft.Configuration.NavAgreementExtractService
{

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class NavAgreementExtract : BaseService
    {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public ExtractFile GetAgreementExtractFile(Guid agreementId)
        {
            try
            {
                var agreement = GetAgreementById(agreementId);
                var file = GetFile(agreement);
                return file;
            }
            catch
            {
                throw;
            }
        }
        /// <summary>
        /// Get needed data to agreement extract
        /// </summary>
        /// <param name="agreementId">Current agreement Id</param>
        /// <returns></returns>

        private AgreementExtract GetAgreementById(Guid agreementId)
        {
            var result = new AgreementExtract();
            try
            {
                var esqAgreement = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "NavAgreement");
                esqAgreement.AddAllSchemaColumns();
                var agreement = esqAgreement.GetEntity(UserConnection, agreementId);

                if (agreement != null)
                {
                    var esqAuto = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "NavAuto");
                    esqAuto.AddAllSchemaColumns();
                    var auto = esqAuto.GetEntity(UserConnection, agreement.GetColumnValue("NavAutoId"));


                    var esqContact = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "Contact");
                    esqContact.AddAllSchemaColumns();
                    var contact = esqContact.GetEntity(UserConnection, agreement.GetColumnValue("NavContactId"));


                    var esqBrand = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "NavBrand");
                    esqBrand.AddAllSchemaColumns();
                    var brand = esqBrand.GetEntity(UserConnection, auto.GetColumnValue("NavBrandId"));


                    var esqModel = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "NavModel");
                    esqModel.AddAllSchemaColumns();
                    var model = esqModel.GetEntity(UserConnection, auto.GetColumnValue("NavModelId"));

                    var esqInvoice = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "NavInvoice");
                    esqInvoice.AddAllSchemaColumns();
                    var esqFilter = esqInvoice.CreateFilterWithParameters(FilterComparisonType.Equal, "NavAgreement", agreementId);
                    esqInvoice.Filters.Add(esqFilter);
                    var esqResult = esqInvoice.GetEntityCollection(UserConnection);

                    result = new AgreementExtract
                    {

                        Number = agreement.GetTypedColumnValue<string>("NavName"),
                        Auto = new Auto
                        {
                            Brand = brand.GetTypedColumnValue<string>("Name"),
                            Model = model.GetTypedColumnValue<string>("Name"),
                            Details = auto.GetTypedColumnValue<string>("NavDetails"),
                            VIN = auto.GetTypedColumnValue<string>("NavVin")
                        },
                        Contact = new Contact
                        {
                            FullName = contact.GetTypedColumnValue<string>("Name")
                        },
                        Summa = agreement.GetTypedColumnValue<decimal>("NavSumma"),
                        FactSumma = agreement.GetTypedColumnValue<decimal>("NavFactSumma"),
                        Fact = agreement.GetTypedColumnValue<bool>("NavFact"),
                        Invoices = new List<Invoice>()
                    };
                    foreach (var item in esqResult)
                    {
                        result.Invoices.Add(new Invoice()
                        {
                            Number = item.GetTypedColumnValue<string>("NavName"),
                            Date = item.GetTypedColumnValue<DateTime>("NavDate"),
                            Amount = item.GetTypedColumnValue<decimal>("NavAmount"),
                            Fact = item.GetTypedColumnValue<bool>("NavFact")
                        });
                    }
                }
                return result;
            }
            catch
            {
                throw;
            }
        }
        private ExtractFile GetFile(AgreementExtract agreementExtract)
        {
            try
            {
                var data = JsonConvert.SerializeObject(agreementExtract, Formatting.Indented);
                var bytes = Encoding.UTF8.GetBytes(data);

                var extractFile = new ExtractFile
                {
                    FileName = $"AgreementExtract{DateTime.Now.DayOfWeek}.json",
                    FileContent = bytes
                };

                return extractFile;
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// Model of content in file
        /// </summary>
        public class AgreementExtract
        {
            public string Number { get; set; }
            public Auto Auto { get; set; }
            public Contact Contact { get; set; }
            public decimal Summa { get; set; }
            public decimal FactSumma { get; set; }
            public bool Fact { get; set; }
            public List<Invoice> Invoices { get; set; }
        }

        public class Auto
        {
            public string Brand { get; set; }
            public string Model { get; set; }
            public string Details { get; set; }
            public string VIN { get; set; }
        }

        public class Contact
        {
            public string FullName { get; set; }
        }
        public class Invoice
        {
            public string Number { get; set; }
            public DateTime Date { get; set; }
            public decimal Amount { get; set; }
            public bool Fact { get; set; }
        }
        /// <summary>
        /// Model for download file
        /// </summary>
        public class ExtractFile
        {
            public byte[] FileContent { get; set; }
            public string FileName { get; set; }
            public string ContentType { get; set; }
        }
    }

}