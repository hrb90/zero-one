const TestInstances = require('./test_instances');
const backtrack = require('../src/backtrack');

TestInstances.SMALL_EXACT(backtrack);
TestInstances.SMALL_SAT(backtrack);
