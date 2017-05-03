#! /usr/bin/env node --max-old-space-size=4096

const params = process.argv.slice(4);
const userModule = require('../../' + process.argv[2]);

if (!userModule) {
  throw new Error(`Module ${userModule} does not exists`);
}
if (!userModule[process.argv[3]]) {
  throw new Error(`Function ${process.argv[3]} is not present or exported from module ${userModule}`);
}
userModule[process.argv[3]](...params);

