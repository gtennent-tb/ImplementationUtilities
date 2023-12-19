/* This function takes in a list of column headers, and returns an EJS string which contains a structurally-prebuilt file. 
   This is a workflow automation designed to speed up the development of custom files by avoiding writing customer-agnostic code for every new custom export. */

import { toCamelCase } from "../StringUtils/toCamelCase";

const generateBoilerplateEjs = (columnHeaders: string[]) => {
  return `<% rows = expenses.map((expense) => {return \`${columnHeaders
    .map((header) => `const ${toCamelCase(header)} = '';`)
    .join(
      ","
    )}\`;});%><% rows.unshift(${columnHeaders}) -%><%- rows.join('\\n'); -%>`;
};
