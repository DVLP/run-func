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

const isEs6 = path.extname(process.argv[2]) === '.mjs';
if (isEs6) {
  import('file://' + path.resolve(path.join(process.cwd(), process.argv[2]))).then((userModule) => {
    executeInModule(userModule, process.argv[3], params);
  });
} else {
  const userModule = require(path.join(process.cwd(), process.argv[2]));
  executeInModule(userModule, process.argv[3], params);
}

function executeInModule(userMod, fnName, fnParams) {
  if (!userMod) {
    throw new Error(`Module ${userMod} does not exists`);
  }
  if (!userMod[fnName]) {
    throw new Error(`Function ${fnName} is not present or exported from module ${userMod}`);
  }
  userMod[fnName](...fnParams);
}
