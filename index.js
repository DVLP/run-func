#! /usr/bin/env node
const path = require('path');
const fs = require('fs');
const params = process.argv.slice(4);

if (!process.argv[2]) {
  console.error('File name not provided i.e. run-func ./index.js');
  process.exit();
}

if (!process.argv[3]) {
  console.error('Function name not provided i.e. run-func ./index.js default');
  process.exit();
}

let isEs6 = path.extname(process.argv[2]) === '.mjs';
const filePath = path.join(process.cwd(), process.argv[2])
const packageJsonPath = path.join(path.dirname(filePath), 'package.json')

if (fs.existsSync(packageJsonPath)) {
  const packageJson = fs.readFileSync(packageJsonPath)
  isEs6 = JSON.parse(packageJson).type === 'module'
}

if (isEs6) {
  import('file://' + path.resolve(filePath)).then((userModule) => {
    executeInModule(userModule, process.argv[3], params);
  });
} else {
  const userModule = require(filePath);
  executeInModule(userModule, process.argv[3], params);
}


function executeInModule(userMod, fnName, fnParams) {
  if (!userMod) {
    throw new Error(`Module ${userMod} does not exists`);
  }
  if (!userMod[fnName]) {
    throw new Error(`Function ${fnName} is not present or exported from module`);
  }
  userMod[fnName](...fnParams);
}
