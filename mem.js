#! /usr/bin/env node --max-old-space-size=4096
const path = require('path');
const fs = require('fs');
const moduleName = process.argv[2]
const fnName = process.argv[3]
const params = process.argv.slice(4);

if (!moduleName) {
  console.error('File name not provided i.e. run-func ./index.js');
  process.exit();
}

if (!fnName) {
  console.error('Function name not provided i.e. run-func ./index.js default');
  process.exit();
}

const filePath = path.join(process.cwd(), moduleName)
const isLocalFile = path.extname(moduleName) !== ''

try {
  if (!isLocalFile && !fs.existsSync(require.resolve(moduleName))) {
    console.error('Module is not installed:', moduleName);
    process.exit();
  }
} catch(e) {
  console.error('Module is not installed:', moduleName);
  process.exit();
}

if (isES6()) {
  import(isLocalFile ? 'file://' + path.resolve(filePath) : moduleName).then((userModule) => {
    executeInModule(userModule, fnName, params);
  });
} else {
  const userModule = require(isLocalFile ? filePath : moduleName);
  executeInModule(userModule, fnName, params);
}

async function executeInModule(userMod, fnName, fnParams) {
  if (typeof userMod === 'function') {
    console.log(await userMod(...fnParams))
    return
  }

  if (!userMod) {
    throw new Error(`Module ${userMod} does not exists`);
  }
  if (!userMod[fnName]) {
    throw new Error(`Function ${fnName} is not present or exported from module`);
  }
  const result = userMod[fnName](...fnParams);
  if (typeof result === 'object' && result.then) {
    result.then(res => {
      typeof res !== 'undefined' && console.log(res);
    })
  } else if (typeof result !== 'undefined') {
    console.log(result);
  }
}

function isES6() {
  const isLocalFile = path.extname(moduleName) !== ''
  const filePath = isLocalFile ? path.join(process.cwd(), moduleName) : require.resolve(moduleName)
  let isEs6 = path.extname(moduleName) === '.mjs'

  for(var i = 0; i < 10; i ++) {
    const dirsAbove = path.join(...new Array(i).fill('..'))
    const dir = path.join(path.dirname(filePath), dirsAbove)
    const packageJsonPath = path.join(dir, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = fs.readFileSync(packageJsonPath)
      isEs6 = JSON.parse(packageJson).type === 'module'
      break
    }
  }

  return isEs6
}
