#!/usr/bin/env npx ts-node --esm

import { argv } from 'node:process';
import { cardFeed } from './mdb-templates/cardFeed.js';

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
riff ejs
    Generates starter EJS for given column headers (NYI)`; //todo turn this info text into code and make it programmatic

console.clear();
const inputArgs = argv;

const parseArgs = (args): string => {
  if (!args[2]) return usage; //first 2 args are just location data

  const scriptName = args[2];

  const alias = aliases.find((alias) => alias.name === scriptName);

  if(alias){
    const functionName = alias.function;

    switch(functionName){
      case 'cardFeed':
        return cardFeed();
      default:
        return `No script available with name ${scriptName}. Type 'riff' to see usage options`;
    }
  }

  return `No script available with name ${scriptName}. Type 'riff' to see usage options`;
};

console.log(parseArgs(inputArgs));