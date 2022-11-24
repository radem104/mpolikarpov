define("NavAgreement2Page", ["BusinessRuleModule", "ServiceHelper"], function(BusinessRuleModule, ServiceHelper) {
	return {
		entitySchemaName: "NavAgreement",
		attributes: {
			/*"IsModelItemsEnabled": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": true,
				"dependencies": [{
					"columns": ["NavDate", "NavSumma"],
					"methodName": "setCardLockoutStatus"
				}]
			}*/
			"SetNewNavName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"dependencies": [{
					"columns": ["NavName"],
					"methodName": "deleteSymbolsInNavName"
				}]
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "NavAgreementFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "NavAgreement"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"NavAgreementCreditTab": {
				"cbe64473-85d9-45f4-808b-5fd3ad93b357": {
					"uId": "cbe64473-85d9-45f4-808b-5fd3ad93b357",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavAuto"
							}
						},
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavContact"
							}
						}
					]
				}
			},
			"NavInitialFee": {
				"87a5c7f8-52ab-4eb6-8d38-34b04f372536": {
					"uId": "87a5c7f8-52ab-4eb6-8d38-34b04f372536",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavCredit"
							}
						}
					]
				}
			},
			"NavFullCreditAmount": {
				"bc8f8231-fa4e-4bce-8d55-72b5d6a0466d": {
					"uId": "bc8f8231-fa4e-4bce-8d55-72b5d6a0466d",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavCredit"
							}
						}
					]
				}
			},
			"NavCreditPeriod": {
				"5a2baf76-f1a4-4935-b1e8-ebd10af16d96": {
					"uId": "5a2baf76-f1a4-4935-b1e8-ebd10af16d96",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavCredit"
							}
						}
					]
				}
			},
			"NavCreditAmount": {
				"30ffbb28-39c8-4853-8e9d-f43450f558ad": {
					"uId": "30ffbb28-39c8-4853-8e9d-f43450f558ad",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavCredit"
							}
						}
					]
				}
			},
			"NavDate": {
				"9d46b9e0-56c0-48eb-8c3f-14f079a1a728": {
					"uId": "9d46b9e0-56c0-48eb-8c3f-14f079a1a728",
					"enabled": false,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "IsModelItemsEnabled"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				},
				"d8d3e21b-98c0-496b-9cce-4db698b1da40": {
					"uId": "d8d3e21b-98c0-496b-9cce-4db698b1da40",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavAuto"
							}
						},
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavContact"
							}
						}
					]
				}
			},
			"NavSumma": {
				"f91d17b8-bd9a-4b73-ae89-aee48bcf0800": {
					"uId": "f91d17b8-bd9a-4b73-ae89-aee48bcf0800",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavAuto"
							}
						},
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavContact"
							}
						}
					]
				}
			},
			"NavCredit": {
				"f2fbb9bb-b75e-49c9-96a6-9dabb2da0771": {
					"uId": "f2fbb9bb-b75e-49c9-96a6-9dabb2da0771",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavAuto"
							}
						},
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavContact"
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {			
			deleteSymbolsInNavName: async function() {
				debugger;
				let name = this.$NavName;
				if (name && /\D/g.test(name)) {
					this.$NavName = await name.replace(/[^-\d]/g, "");
				} 
			}
			/*setCardLockoutStatus: function() {
				this.set("IsModelItemsEnabled", false);
				
			},
			onEntityInitialized: function() {
                this.callParent(arguments);
                this.setCardLockoutStatus();
            }*/
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "NavName0513ab46-1468-423c-911d-60cbc683226d",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavAutob33a819b-458d-48db-95f8-539d2d17dd23",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavAuto"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NavContact219b2914-3a67-4242-b006-3a2391ad4314",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavContact"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NavDatef8481820-4760-4ab5-85ff-57a3bfd475b7",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavDate",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NavSummafc5a550e-f7a8-4416-ba0e-d394a8e015bf",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavSumma",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NavFact6ffb909b-41aa-4501-bbe6-6aeb48e973dc",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavFact",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NavCredit13cf425b-742c-437c-a020-444a7a3d8f8f",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavCredit",
					"enabled": false,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "NavAgreementCreditTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NavAgreementCreditTabTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavAgreementCreditTabGroupd88d51ab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NavAgreementCreditTabGroupd88d51abGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "NavAgreementCreditTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavAgreementCreditTabGridLayoutd36cec9f",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "NavAgreementCreditTabGroupd88d51ab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavPaymentPlanDateca37b5ae-a81c-498e-a607-b31fae5ba392",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "NavAgreementCreditTabGridLayoutd36cec9f"
					},
					"bindTo": "NavPaymentPlanDate",
					"enabled": false
				},
				"parentName": "NavAgreementCreditTabGridLayoutd36cec9f",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavFactSumma6829c791-521c-4cd0-95b6-4612e6a0ac9a",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "NavAgreementCreditTabGridLayoutd36cec9f"
					},
					"bindTo": "NavFactSumma",
					"enabled": false
				},
				"parentName": "NavAgreementCreditTabGridLayoutd36cec9f",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NavInitialFee2b712632-7f97-46e8-a03b-fb91c9faddd0",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "NavAgreementCreditTabGridLayoutd36cec9f"
					},
					"bindTo": "NavInitialFee"
				},
				"parentName": "NavAgreementCreditTabGridLayoutd36cec9f",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NavFullCreditAmount5c006e86-c823-4634-b998-23ad3c8776cb",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "NavAgreementCreditTabGridLayoutd36cec9f"
					},
					"bindTo": "NavFullCreditAmount"
				},
				"parentName": "NavAgreementCreditTabGridLayoutd36cec9f",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NavCreditPeriod764ca0e1-0732-4dc1-adfb-3cc53a5ab84f",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "NavAgreementCreditTabGridLayoutd36cec9f"
					},
					"bindTo": "NavCreditPeriod"
				},
				"parentName": "NavAgreementCreditTabGridLayoutd36cec9f",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NavCreditAmount454341f3-a6c0-47b2-b7cb-3e80826032fe",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "NavAgreementCreditTabGridLayoutd36cec9f"
					},
					"bindTo": "NavCreditAmount"
				},
				"parentName": "NavAgreementCreditTabGridLayoutd36cec9f",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "NavNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
