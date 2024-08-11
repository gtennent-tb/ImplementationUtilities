/* This function takes in a list of column headers, and returns an EJS string which contains a structurally-prebuilt file. 
   This is a workflow automation designed to speed up the development of custom files by avoiding writing customer-agnostic code for every new custom export.
   If you use the --dev flag, it will write just the logic code to a local file */
import { parseCsv } from '../fileHelpers.js';
import { toCamelCase } from '../string-utils/toCamelCase.js';
import path from 'path';
import fs from 'fs';
import { customFileCodeFilename } from '../../configurations.js';
import { exec } from 'child_process';
import prettier from 'prettier';

export const generateBoilerplateEjs = async (
  fileName,
  mode,
) => {
  const data = await parseCsv(fileName);
  const headers = data[0].split(',');

  let declarations = [];
  let references = [];
  let titles = [];

  headers.forEach((header) => {
    const variableName = toCamelCase(header).replace(/\./g, '');

    if (variableName.length > 0) {
      declarations.push(`const ${variableName} = ''; `); //const ..... = ....;
      references.push(`\${${variableName}}`); //`${...}`
      titles.push(header);
    }
  });

  /* 
  This is going to be arcane. The purpose is to cleverly generate code which 
  is a valid templateSource for a request to api/expense-exporter
  Fundamentally we are using dependency injection where what we are 
  injecting is basically the spec for any particular custom file*/
  let code = `rows = expenses.map((expense) => {${declarations.join(
    ' ',
  )} return \`${references.join(',')}\`;});`;  
  /*try{
    code = prettier.format(code, {parser: 'babel'});
  }catch(err){
    console.error('could not format code with prettier-- check for special characters or whitespace in input file');
    process.exit(1);
  }
*/
  if (mode == '--dev') {
    const filePath = path.join(process.cwd(), customFileCodeFilename);
    fs.writeFile(filePath, code, (err) => {
      if (err) {
        console.error('error writing to file:', err);
        process.exit(1);
      }
      console.log('wrote to file');
      exec(`code ${filePath}`, (err) => {
        if (err) {
          console.error('error opening code file', err);
          process.exit(1);
        }
        console.log('file opened in vscode');
      });
    });
  } else {
    const logicChunk = `<% ${code}%>`;
    const headerChunk = `<% rows.unshift([${titles.map(
      (title) => `'${title}'`,
    )}].join(',')) -%>`;

    const finalChunk = logicChunk + headerChunk + `<%- rows.join('\\\\n'); -%>`;

    return `{
        "orgId":"",
        "templateSource":"${finalChunk}",
        "templateType":"ejs",
        "useLineItems":true,
        "useAllocations":false
    }
      `;
  }
};
