const TestInstances = require('./test_instances');
const backtrack = require('../src/solvers/backtrack');

TestInstances.SMALL_EXACT(backtrack);
TestInstances.THREE_COLOR_K4(backtrack);
TestInstances.SMALL_OPT(backtrack);
