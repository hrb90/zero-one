class ConstraintBuilder {
  constructor(variables, constraint) {
    this.variables = variables || {};
    this.constraint = constraint || { type: null, value: null };
  }

  addTerm(variable, coef) {
    this.variables = Object.assign(this.variables, {[variable.id]: coef});
  }

  computeObjective(model) {

  }

  getCurrentValue() {
    if (this.constraint) {
      let keys = Object.keys(this.constraint);
      return (keys.length > 0 ? this.constraint[keys[0]] : null);
    } else {
      return null;
    }
  }

  makeEq() {
    this.setType("eq");
  }

  makeMax() {
    this.setType("max");
  }

  makeMin() {
    this.setType("min");
  }

  setType(type) {
    this.constraint.type = type;
  }

  setValue(value) {
    this.constraint.value = value;
  }

  toConstraint() {
    return { variables: this.variables, constraint: this.constraint };
  }
}

module.exports = ConstraintBuilder;
