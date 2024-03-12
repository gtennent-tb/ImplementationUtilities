/* This function takes in a list of column headers, and returns an EJS string which contains a structurally-prebuilt file. 
   This is a workflow automation designed to speed up the development of custom files by avoiding writing customer-agnostic code for every new custom export. */
import { toCamelCase } from '../string-utils/toCamelCase.js';
import fs, { ReadStream } from 'fs';

const parseCsv = async (fileName: string): Promise<string[]> => {
  const stream: ReadStream = fs.createReadStream(fileName);
  const data = await getFileContents(stream);

  const parsedRows = data.split('\r\n');

  return parsedRows;
};

const getFileContents = async (stream: ReadStream): Promise<string> => {
  let contents = '';
  for await (const chunk of stream) {
    contents += chunk;
  }
  return contents;
};

export const generateBoilerplateEjs = async (
  fileName: string,
): Promise<string> => {
  const data = await parseCsv(fileName);
  const headers = data[0].split(',');

  let declarations: string[] = [];
  let references: string[] = [];
  let titles: string[] = [];

  headers.forEach((header) => {
    const variableName = toCamelCase(header).replace(/\./g, ''); 

    if (variableName.length > 0) {
      declarations.push(`const ${variableName} = ''; `); //const ..... = ....;
      references.push(`\${${variableName}}`); //`${...}`
      titles.push(header);
    }
  });

  /* This is going to be arcane. The purpose is to cleverly generate code which 
     is a valid templateSource for a request to api/expense-exporter
     Fundamentally we are using dependency injection where what we are 
     injecting is basically the spec for any particular custom file*/
  return (
    `<% rows = expenses.map((expense) => {${declarations.join(
      ' ',
    )} return \`${references.join(',')}\`;});%>` +
    `<% rows.unshift([${titles.map(title => `'${title}'`)}].join(',')) -%>` +
    `<%- rows.join('\\\\n'); -%>`
  );
};
