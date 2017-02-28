function computeObjective(variables, model) {
  let total = 0;
  Object.keys(variables).forEach(key => {
    if (model[key]) {
      total += variables[key];
    }
  });
  return total;
}

// Very simple, bounds-based checker.
function isSatisfiable(constraint, model) {
  let coefs = constraint.variables;
  let currentTotal = 0;
  let positiveUnassigned = 0;
  let negativeUnassigned = 0;
  Object.keys(coefs).forEach(id => {
    switch(model[id]) {
      case true:
        currentTotal += coefs[id];
        break;
      case false:
        break;
      default:
        if (coefs[id] < 0) {
          negativeUnassigned += coefs[id];
        } else {
          positiveUnassigned += coefs[id];
        }
        break;
    }
  });
  let value = constraint.constraint.value;
  switch(constraint.constraint.type) {
    case "eq":
      return (currentTotal + negativeUnassigned <= value) &&
        (currentTotal + positiveUnassigned >= value);
    case "max":
      return (currentTotal + negativeUnassigned <= value);
    case "min":
      return (currentTotal + positiveUnassigned >= value);
  }
}

module.exports = { computeObjective, isSatisfiable };
