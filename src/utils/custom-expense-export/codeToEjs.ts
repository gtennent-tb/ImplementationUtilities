import fs, { ReadStream } from 'fs';
import { customFileCodeFilename } from '../../configurations.js';
import { getFileContents } from '../fileHelpers.js';

export const codeToEjs = async () => {
  const targetFileName = customFileCodeFilename;
  const targetStream: ReadStream = fs.createReadStream(targetFileName);
  const data = await getFileContents(targetStream);
  return `<%${data.replaceAll('\n', '').replaceAll('  ', ' ')}%>"`;
};
