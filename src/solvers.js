const backtrack = require('./solvers/backtrack');
const bnb = require('./solvers/bnb');

const SOLVERS = {
  backtrack,
  bnb,
  default: bnb
};

module.exports = SOLVERS;
