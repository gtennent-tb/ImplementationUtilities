#!/usr/bin/env npx ts-node --esm

import { argv } from 'node:process';
import { cardFeed } from './mdb-templates/cardFeed.js';
import { generateBoilerplateEjs } from './utils/custom-expense-export/generateBoilerplateEjs.js';

export interface Alias {
  name: string;
  function: string;
}

export const aliases: Alias[] = [
  { name: 'feed', function: 'cardFeed' },
  { name: 'ejs', function: 'generateBoilerplateEjs' },
];


const usage = 
`
-------------------------------------------------------------------------------------
-----------------------RAPID IMPLEMENTATION and FEED FRAMEWORK-----------------------
-------------------------------------------------------------------------------------
riff feed
    Get a blank template for a card feed
riff ejs [fileName]
    Generates starter EJS based on a specially-coded csv file. Must have file locally for now. (//todo spec in confluence/) (NYI)`; 
    //todo turn this info text into code and make it programmatic

console.clear();
const inputArgs = argv;

const parseArgs = async (args): Promise<string> => {
  if (!args[2]) return usage; //first 2 args are just location data, //todo clean up

  const scriptName = args[2];
  const arg1 = args[3];

  const alias = aliases.find((alias) => alias.name === scriptName);

  if(alias){
    const functionName = alias.function;

    switch(functionName){
      case 'cardFeed':
        return cardFeed();
      case 'generateBoilerplateEjs':
        if(!arg1) return 'no filename provided';
        return generateBoilerplateEjs(arg1);
      default:
        return `No script available with name ${scriptName}. Type 'riff' to see usage options`;
    }
  }

  return `No script available with name ${scriptName}. Type 'riff' to see usage options`;
};

console.log(await parseArgs(inputArgs));