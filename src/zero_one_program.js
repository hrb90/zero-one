const { computeObjective, ZeroOneError } = require('./util');
const SOLVERS = require('./solvers.js');

function makeVariable(id) {
  return { id: id || Math.random().toString(36).replace(/[^a-z]+/g, '') };
}

class ZeroOneProgram {
  constructor(vars = {}, constraints = [], model = {}, objective=null, solver="default") {
    this.vars = vars;
    this.constraints = constraints;
    this.model = model;
    this.objective = objective;
    this.setSolver(solver);
  }

  // Add a constraint
  // The expected shape of a constraint is as follows:
  // {
  //   variables: { [a.id]: 50, [b.id]: -15, [c.id]: 50 },
  //   constraint: { type: "max", value: 95 }
  // }
  addConstraint(constraint) {
    this.constraints.push(constraint);
  }

  // Add an objective
  // An objective is just like a constraint, except that objective.constraint.value will be ignored
  addObjective(objective) {
    this.objective = objective;
  }

  // Add a new variable to this.vars and return it
  addVariable(id) {
    if (this.vars[id]) {
      throw new ZeroOneError('a variable with that ID already exists!');
    } else {
      let newVar = makeVariable(id);
      Object.assign(this.vars, {[newVar.id]: newVar});
      return newVar;
    }
  }

  computeObjective(model) {
    return computeObjective(this.objective.variables, model);
  }

  // set the solver!
  setSolver(name) {
    this.solver = SOLVERS[name];
  }

  solve() {
    let vars = Object.keys(this.vars).map(id => this.vars[id]);
    let solution = this.solver(vars, this.constraints, this.objective, this.model);
    if (solution) {
      vars.forEach(function(v) { v.value = solution[v.id]; });
    }
    if (solution && this.objective) {
      // Return the extreme value of the objective function
      return this.computeObjective(solution);
    } else {
      return solution;
    }
  }
}


module.exports = ZeroOneProgram;
