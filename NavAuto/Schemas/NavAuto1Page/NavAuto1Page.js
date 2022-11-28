define("NavAuto1Page", ["BusinessRuleModule"], function(BusinessRuleModule) {
	return {
		entitySchemaName: "NavAuto",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "NavAutoFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "NavAuto"
				}
			}
		}/**SCHEMA_DETAILS*/,
		rules: {
			"NavKm": {
				"BindParametrVisibleAutoKmByUsed": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.VISIBLE,
					"conditions": [
						{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "NavUsed"
							},
							
							"comparisonType": Terrasoft.ComparisonType.EQUAL,
							
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						},
					]
				}
			},
			"NavOwnersCount": {
				"BindParametrVisibleAutoOwnersCountByUsed": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.VISIBLE,
					"conditions": [
						{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "NavUsed"
							},
							
							"comparisonType": Terrasoft.ComparisonType.EQUAL,
							
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						},
					]
				}
			},
			"NavInAccident": {
				"BindParametrVisibleAutoInAccidentByUsed": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.VISIBLE,
					"conditions": [
						{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "NavUsed"
							},
							
							"comparisonType": Terrasoft.ComparisonType.EQUAL,
							
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						},
					]
				}
			},
		},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "NavName51aadcb5-4554-4c1a-8025-34fe3f9cce65",
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
				"name": "NavBrand410c0792-c296-436c-b937-c13349507cf1",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavBrand"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NavModel6b5ca999-e596-4061-963d-da977d3a948f",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavModel"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NavVechcleNumbera271155b-5a3d-4ae6-94c2-e786e8210625",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavVechcleNumber"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NavAmount8dae6133-11b9-41e6-b5d5-5a1d4e7e1b3b",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavAmount"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NavVind01730c5-1d37-4a0f-82c0-c9be7b16ad88",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavVin"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NavInAccident66874689-9065-4132-9b35-351a17698431",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavInAccident"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "NavDetails142c4baf-3954-4a3b-a8dd-1019d3c2834c",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 7,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavDetails"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "NavKmbc89e082-a567-43bc-a34c-bd944025a167",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 9,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavKm"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "NavUsed074e68c0-0107-4a30-bffb-9abafd8b7ff2",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 8,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavUsed"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "NavOwnersCount3cbda764-bcab-4765-853c-11239f827e58",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 10,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavOwnersCount"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
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
					"order": 1
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
