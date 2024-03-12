/* This function returns a json template for a new corporate card feed record. */

export const ec = () => {
  return `  {
    "type": "data-load.import-expense-categories",
    "data": {
      "organizationId": "",
      "disableExistingCategories": false,
      "allowDuplicateExternalIds": false,
      "disableForOtherPolicies": false,
      "expenseCategories": [
        { title: "Category1", externalAccountId: "Optional Account Code", expensePolicyIds: ["Id to enable category policy"] },
        { title: "Updating Existing Category", "id", "EXISTING_CATEGORY_ID" }
      ]
    }
  }`;
};