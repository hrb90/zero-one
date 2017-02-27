
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
  constructor(vars = {}, constraints = []) {
    this.vars = vars;
    this.constraints = constraints;
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
    this.vars[newVar.id] = newVar;
    return newVar;
  }

  // Checks that there aren't too many variables set to true or false for the constraint to ever be satisfied.
  isSatisfiable(constraint) {
    let totalTrue = constraint.variables.reduce((accum, currVar) => {
      return accum + (currVar.value === true ? 1 : 0);
    }, 0);
    let totalFalse = constraint.variables.reduce((accum, currVar) => {
      return accum + (currVar.value === false ? 1 : 0);
    }, 0);
    return (totalTrue <= constraint.total) &&
      (totalFalse <= constraint.variables.length - constraint.total);
  }

  solve() {
    // Return false if there's a bad constraint
    if (!this.testAllConstraints()) {
      return false;
    }
    // Find an unassigned variable
    let varArray = Object.keys(this.vars).map(id => this.vars[id]);
    let unassigned = varArray.find(v => (![true, false].includes(v.value)));
    let subProgram;
    if (unassigned) {
      // Test if assigning it to true gives a satisfiable program
      unassigned.setValue(true);
      subProgram = new ZeroOneProgram(Object.assign({}, this.vars), this.constraints.slice(0));
      if (subProgram.solve()) {
        return true;
      }
      // Test if assigning it to false gives a satisfiable program
      unassigned.setValue(false);
      subProgram = new ZeroOneProgram(Object.assign({}, this.vars), this.constraints.slice(0));
      if (subProgram.solve()) {
        return true;
      }
    } else {
      console.log(varArray.map(v => `${v.id}: ${v.value}`));
      return this.testAllConstraints();
    }
  }

  testAllConstraints() {
    let satisfiable = true;
    this.constraints.forEach(constraint => {
      satisfiable = satisfiable && this.isSatisfiable(constraint);
    });
    return satisfiable;
  }
}

module.exports = ZeroOneProgram;
