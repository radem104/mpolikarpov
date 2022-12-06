using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Terrasoft.Configuration
{

    [EntityEventListener(SchemaName = "NavAgreement")]
    public class NavAgreementEntityEventListener : BaseEntityEventListener
    {
        /// <summary>
        /// Set to contact first agreement date
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public override void OnSaved(object sender, EntityAfterEventArgs e)
        {
            base.OnSaved(sender, e);
            var agreement = (Entity)sender;
            var userConnection = agreement.UserConnection;

            var contactId = agreement.GetColumnValue("NavContactId");
            if (contactId != null)
            {
                var esq = new EntitySchemaQuery(agreement.UserConnection.EntitySchemaManager, "NavAgreement");
                esq.AddColumn("Id");
                var esqFilter = esq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavContact", contactId);
                esq.Filters.Add(esqFilter);
                var esqResult = esq.GetEntityCollection(agreement.UserConnection);
                if (esqResult.Count == 1)
                {
                    var esqContact = new EntitySchemaQuery(userConnection.EntitySchemaManager, "Contact");

                    esqContact.AddAllSchemaColumns();

                    var contact = esqContact.GetEntity(userConnection, contactId);
                    var agreementDate = agreement.GetColumnValue("NavDate");
                    if (contact.GetColumnValue("NavDate") == null)
                    {
                        contact.SetColumnValue("NavDate", agreementDate);
                        contact.Save();
                    }
                }
            }
        }
    }
}
