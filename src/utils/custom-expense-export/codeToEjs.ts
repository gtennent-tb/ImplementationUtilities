import { execSync } from 'child_process';
import fs, { ReadStream } from 'fs';
import { customFileCodeFilename } from '../../configurations.js';
import { getFileContents } from '../fileHelpers.js';


export const codeToEjs = async () => {
  const targetFileName = customFileCodeFilename;
  const targetStream: ReadStream = fs.createReadStream(targetFileName);
  const code = await getFileContents(targetStream);
  const collapsedCode = code.replace(/\n/g, '').replace(/  /g, ' ').replace(/  /g, ' ').replace(/  /g, ' ').replace(/  /g, ' ').replace(/  /g, ' ');
  const output = `<%${collapsedCode}%>`////<% rows.unshift([headers].join(',')) -%><%- rows.join('\\\\n'); -%>`;
  const shellOutput = Buffer.from(output).toString('base64');
  execSync(`echo '${shellOutput}' | base64 --decode | pbcopy`);
  console.log('Re-wrapped and EJS-ified local code.\nCopied to clipboard!');
  return output;
};
