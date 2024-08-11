import fs, { ReadStream } from 'fs';

export const parseCsv = async (fileName: string): Promise<string[]> => {
    const stream: ReadStream = fs.createReadStream(fileName);
    const data = await getFileContents(stream);
  
    const parsedRows = data.split('\r\n');
  
    return parsedRows;
  };
  
  export const getFileContents = async (stream: ReadStream): Promise<string> => {
    let contents = '';
    for await (const chunk of stream) {
      contents += chunk;
    }
    return contents;
  };