const TestInstances = require('./test_instances');
const bnb = require('../src/solvers/bnb');

TestInstances.SMALL_EXACT(bnb);

TestInstances.SMALL_SAT(bnb);
