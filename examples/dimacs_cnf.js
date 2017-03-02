const ZeroOneProgram = require('../src/zero_one_program');
const ConstraintBuilder = require('../src/constraint_builder');

// Takes a SAT instance in DIMACS CNF form
// Outputs a ZeroOneProgram corresponding to that instance

const dimacs = input => {
  let program = new ZeroOneProgram();
  let vars = {};
  let dimacsConstraints = input.split("\n").filter(line => !["c", "p"].includes(line[0]));
  dimacsConstraints.forEach(constraint => {
    let terms = constraint.split(" ");
    terms = terms.slice(0, terms.length - 1);
    let builderValue = 1;
    let builder = new ConstraintBuilder();
    builder.makeMin();
    terms.forEach(term => {
      if (term[0] === "-") {
        let id = term.slice(1);
        let v = vars[id] || program.addVariable(id);
        vars[id] = v;
        builder.addTerm(v, -1);
        builderValue -= 1;
      } else {
        let v = vars[term] || program.addVariable(term);
        vars[term] = v;
        builder.addTerm(v, 1);
      }
    });
    builder.setValue(builderValue);
    program.addConstraint(builder.toConstraint());
  });

  return program;
};

module.exports = dimacs;
