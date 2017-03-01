const ZeroOneProgram = require('./src/zero_one_program');
const ConstraintBuilder = require('./src/constraint_builder');

// Takes a graph (a POJO with properties vertices and edges pointing to arrays)
// Outputs a ZeroOneProgram corresponding to the problem: "Can this graph be 3-colored?"
const threeColor = graph => {
  let program = new ZeroOneProgram();
  let vertex_vars = {'r': {}, 'g': {}, 'b': {}};
  // Make a variable for each vertex-color combination
  Object.keys(vertex_vars).forEach(color => {
    graph.vertices.forEach(vertex => {
      vertex_vars[color][vertex] = program.addVariable();
    });
  });
  // Now start making constraints
  // Each vertex has exactly one color
  graph.vertices.forEach(vertex => {
    let builder = new ConstraintBuilder();
    builder.makeEq();
    builder.setValue(1);
    Object.keys(vertex_vars).forEach(color => {
      builder.addTerm(vertex_vars[color][vertex], 1);
    });
    program.addConstraint(builder.toConstraint());
  });
  // Two adjacent vertices cannot have the same color
  graph.edges.forEach(edge => {
    Object.keys(vertex_vars).forEach(color => {
      let builder = new ConstraintBuilder();
      builder.makeMax();
      builder.setValue(1);
      builder.addTerm(vertex_vars[color][edge[0]], 1);
      builder.addTerm(vertex_vars[color][edge[1]], 1);
      program.addConstraint(builder.toConstraint());
    });
  });

  return program;
};

module.exports = threeColor;
