/* This function returns a json template for a new corporate card feed record. */

export const department = () => {
  return `   {
    "type": "data-load.import-departments",
    "data": {
      "organizationId": "6052663c272bbfbaa2de94c1",
      "fileFormat": "csv",
      "delimiter": ",",
      "fileContent": "Department Name,External ID,Custom Field 1,Custom Field 2\nXXX,123,xaz,xcz\n,456,fff,hhh\nZZZ,999,hhh,lkl"
    }
  }`;
};