const path = require('path');

function es6Import(file) {
  return import(file);
}

module.exports = es6Import;
