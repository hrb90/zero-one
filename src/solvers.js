const backtrack = require('./backtrack');
const bnb = require('./bnb');

const SOLVERS = {
  backtrack,
  bnb,
  default: bnb
};

module.exports = SOLVERS;
