/* This function returns a json template for a new corporate card feed record. */

export const cf = () => {
  return `  {
    "type": "data-load.import-custom-field-options",
    "data": {
      "organizationId": "",
      "customFieldId": "",
      "options": [
        { name: "An Option to Create" },
        { name: "Disabling an Option", "status", "deleted" }
      ]
    }
  }`;
};