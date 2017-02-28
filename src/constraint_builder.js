class ConstraintBuilder {
  constructor(variables, type, value) {
    this.variables = variables || {};
    this.type = type;
    this.value = value;
  }

  addTerm(variable, coef) {
    this.variables = Object.assign(this.variables, {[variable.id]: coef});
  }

  getCurrentValue() {
    return this.value;
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
    this.type = type;
  }

  setValue(value) {
    this.value = value;
  }

  toConstraint() {
    return { variables: this.variables, type: this.type, value: this.value };
  }
}

module.exports = ConstraintBuilder;
