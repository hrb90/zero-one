const backtrack = require('./backtrack');
const bnb = require('./bnb');

const SOLVERS = {
  backtrack,
  bnb,
  default: backtrack
};

module.exports = SOLVERS;
