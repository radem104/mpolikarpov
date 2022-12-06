define("NavAgreement870b52f5Section", ["ServiceHelper"], function(ServiceHelper) {
	return {
		entitySchemaName: "NavAgreement",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			  {
                "operation": "insert",
                "parentName": "CombinedModeActionButtonsCardLeftContainer",
                "propertyName": "items",
                "name": "GetAgreementExtractButton",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": {bindTo: "Resources.Strings.AgreementExtractButton"},
                    "click": {bindTo: "onGetAgreementExtractClick"},
                    "style": Terrasoft.controls.ButtonEnums.style.RED,
                    "enabled": true
                }
            }
		]/**SCHEMA_DIFF*/,
		methods: {			
			 onGetAgreementExtractClick: function() {
				let id = this.$ActiveRow;
				let serviceData = {
					agreementId: id
				};
				ServiceHelper.callService("NavAgreementExtract", "GetAgreementExtractFile",
				function(response) {
					let result = response.GetAgreementExtractFileResult;
					if (result) {
						let file = new File([new Uint8Array(result.FileContent)], result.FileName);
						const url = window.URL.createObjectURL(file);
						const a = document.createElement('a');
						a.style.display = "none";
						a.href = url;
						a.download = result.FileName;
						document.body.appendChild(a);
						a.click();
						window.URL.revokeObjectURL(url);
					}
				}, serviceData, this);
			 }
		}
	};
});
