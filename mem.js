#! /usr/bin/env node --max-old-space-size=4096
const path = require('path');
const params = process.argv.slice(4);

if (!process.argv[2]) {
  console.error('File name not provided i.e. run-func ./index.js');
  process.exit();
}

if (!process.argv[3]) {
  console.error('Function name not provided i.e. run-func ./index.js default');
  process.exit();
}

const userModule = require(path.join(process.cwd(), process.argv[2]));

if (!userModule) {
  throw new Error(`Module ${userModule} does not exists`);
}
if (!userModule[process.argv[3]]) {
  throw new Error(`Function ${process.argv[3]} is not present or exported from module ${userModule}`);
}
userModule[process.argv[3]](...params);
