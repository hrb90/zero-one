const { computeObjective } = require('./util');
const SOLVERS = require('./solvers.js');

class Variable {
  constructor() {
    this.id = this.getSlug();
  }

  getSlug() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '');
  }

  setValue(value) {
    this.value = value;
  }
}

class ZeroOneProgram {
  constructor(vars = [], constraints = [], model = {}, objective=null, solver="default") {
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

  addObjective(objective) {
    this.objective = objective;
  }

  // Add a new variable to this.vars and return it
  addVariable() {
    let newVar = new Variable();
    this.vars.push(newVar);
    return newVar;
  }

  computeObjective(model) {
    return computeObjective(this.objective.variables, model);
  }

  setSolver(name) {
    this.solver = SOLVERS[name];
  }

  solve() {
    let solution = this.solver(this.vars, this.constraints, this.objective, this.model);
    if (solution) {
      this.vars.forEach(v => v.setValue(solution[v.id]));
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
