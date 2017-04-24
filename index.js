#! /usr/bin/env node

const params = process.argv.slice(4);
const userModule = require('../../' + process.argv[2]);

userModule[process.argv[3]](...params);

