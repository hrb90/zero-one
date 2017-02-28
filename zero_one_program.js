// Checks that there aren't too many variables set to true or false for the constraint to ever be satisfied.
function isSatisfiable(constraint, model) {
  totals = [true, false].map( value => {
    return constraint.variables.reduce((accum, currVar) => {
      return accum + (model[currVar.id] === value ? 1 : 0);
    }, 0);
  });
  return (totals[0] <= constraint.total) &&
    (totals[1] <= constraint.variables.length - constraint.total);
}

function backtrack(vars, constraints, model) {
  //Return false if there's a bad constraint
  if (constraints.some(c => (isSatisfiable(c, model) === false))) {
    return false;
  }
  let unassigned = vars.find(v => (![true, false].includes(model[v.id])));
  if (unassigned) {
    let trueModel = Object.assign({}, model, { [unassigned.id]: true });
    let falseModel = Object.assign({}, model, { [unassigned.id]: false});
    return backtrack(vars, constraints, trueModel) || backtrack(vars, constraints, falseModel);
  } else {
    // everything is assigned and all our constraints are satisfiable!
    return model;
  }
}

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
  constructor(vars = [], constraints = [], model = {}) {
    this.vars = vars;
    this.constraints = constraints;
    this.model = model;
  }

  // Add a constraint that the variables in varArray must sum to total
  addConstraint(varArray, total) {
    this.constraints.push({
      total,
      variables: varArray
    });
  }

  // Add a new variable to this.vars and return it
  addVariable() {
    let newVar = new Variable();
    this.vars.push(newVar);
    return newVar;
  }

  solve() {
    let solution = backtrack(this.vars, this.constraints, this.model);
    if (solution) {
      this.vars.forEach(v => v.setValue(solution[v.id]));
    } else {
      return false;
    }
  }
}


module.exports = ZeroOneProgram;
