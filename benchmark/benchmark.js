var { Suite } = require('benchmark');
var dimacs = require('../examples/dimacs_cnf');
var { aim50 } = require('../examples/sat_examples');
var threeColor = require('../examples/three_color');
var _ = require('lodash');

var solverSuite = new Suite();
const wheel = n => ({
  vertices: _.range(n).concat('hub'),
  edges: _.range(n).map(x => [ x, (x + 1) % n ])
        .concat(_.range(n).map(x => [x, 'hub']))
});
var program = threeColor(wheel(11));
solverSuite.add('test bnb solver', () => { program.solve(); })
  .add('test new bnb solver', () => { program.setSolver('new-bnb'); program.solve(); })
  .on('cycle', e => console.log(String(e.target)))
  .run();
