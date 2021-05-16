#! /usr/bin/env node --max-old-space-size=4096
const path = require('path');

;(async function main() {

const params = process.argv.slice(4);

const fileName = process.argv[2]
if (!fileName) {
  console.error('File name not provided i.e. run-func ./index.js');
  process.exit();
}

const functionName = process.argv[3]
if (!functionName) {
  console.error('Function name not provided i.e. run-func ./index.js default');
  process.exit();
}

const userModule = require(path.join(process.cwd(), fileName));

if (!userModule) {
  throw new Error(`Module ${userModule} does not exists`);
}
const fun = userModule[functionName]
if (!fun) {
  throw new Error(`Function ${functionName} is not present or exported from module ${userModule}`);
}

await fun(...params)

})().catch(e => { throw e; });
