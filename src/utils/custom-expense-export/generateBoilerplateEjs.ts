/* This function takes in a list of column headers, and returns an EJS string which contains a structurally-prebuilt file. 
   This is a workflow automation designed to speed up the development of custom files by avoiding writing customer-agnostic code for every new custom export. */

import { toCamelCase } from '../string-utils/toCamelCase';
import { parse } from 'csv-parse';
import fs, { ReadStream } from 'fs';

const parseCsv = (fileName: string): string => {
  const stream: ReadStream = fs.createReadStream(fileName);
  let data = '';

  stream.on('data', (chunk) => {
    data += chunk.toString();
  });
  stream.on('end', () => {
    console.log(data);
  });

  const parsedRows = data.split('\n');

  return `file contents: ${JSON.stringify(parsedRows)}`;
};

export const generateBoilerplateEjs = (fileName: string): string => {
  return parseCsv(fileName);

  /* return `<% rows = expenses.map((expense) => {return \`${columnHeaders
    .map((header) => `const ${toCamelCase(header)} = '';`)
    .join(
      ',',
    )}\`;});%><% rows.unshift(${columnHeaders}) -%><%- rows.join('\\n'); -%>`;*/
};
