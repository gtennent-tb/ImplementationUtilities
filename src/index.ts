#!/usr/bin/env npx ts-node --esm

import { argv } from 'node:process';
import { aliases } from './aliases.js';
import { cardFeed } from './mdb-templates/cardFeed.js';
import { sso } from './mdb-templates/sso.js';
import { cf } from './mdb-templates/cf.js';
import { ec } from './mdb-templates/ec.js';
import { department } from './mdb-templates/department.js';

import { generateBoilerplateEjs } from './utils/custom-expense-export/generateBoilerplateEjs.js';
import { hash } from './utils/hash/hash.js';

const usage = `
-------------------------------------------------------------------------------------
-----------------------RAPID IMPLEMENTATION and FEED FRAMEWORK-----------------------
-------------------------------------------------------------------------------------
riff feed
    Get a blank template for a card feed
riff cf
    Get a blank template for a custom field option import
riff department
    Get a blank template for a department import
riff ec
    Get a blank template for a card feed  
riff sso
    Get a blank template for an sso setup (Azure)
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

  if (alias) {
    const functionName = alias.function;

    switch (scriptName) {
      case 'feed':
        return cardFeed();
      case 'sso':
        return sso();
      case 'cf':
        return cf();
      case 'ec':
        return ec();
      case 'department':
        return department();
      case 'hash':
        if (!arg1) return 'no password provided';
        return hash(arg1);
      case 'ejs':
        if (!arg1) return 'no filename provided';
        return generateBoilerplateEjs(arg1);
      default:
        return `No script available with name ${scriptName}. Type 'riff' to see usage options`;
    }
  }

  return `No script available with name ${scriptName}. Type 'riff' to see usage options`;
};

console.log(await parseArgs(inputArgs));
