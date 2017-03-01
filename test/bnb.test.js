const TestInstances = require('./test_instances');
const bnb = require('../src/solvers/bnb');

TestInstances.SMALL_EXACT(bnb);
TestInstances.THREE_COLOR_K4(bnb);
TestInstances.SMALL_OPT(bnb);
TestInstances.THREE_COLOR_PETERSEN(bnb);
