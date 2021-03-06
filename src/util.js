class ZeroOneError extends Error { }

function computeObjective(variables, model) {
  let total = 0;
  Object.keys(variables).forEach(key => {
    if (model[key]) {
      total += variables[key];
    }
  });
  return total;
}

// Given a constraint and a partial solution, returns the lowest and highest possible value of the constraint.
function computeBounds_old(constraint, model) {
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
  return [currentTotal + negativeUnassigned, currentTotal + positiveUnassigned];
}

// Given a constraint and a partial solution, returns the lowest and highest possible value of the constraint.
function computeBounds(constraint, model) {
  let coefs = constraint.variables;
  let currentTotal = 0;
  let positiveUnassigned = 0;
  let negativeUnassigned = 0;
  let ids = Object.keys(coefs);
  let id, value, coef;
  for (var i = 0; i < ids.length; i++) {
    id = ids[i];
    value = model[id];
    coef = coefs[id];
    if (value === true) {
      currentTotal += coef;
    } else if (value !== false) {
      if (coef < 0) {
        negativeUnassigned += coef;
      } else {
        positiveUnassigned += coef;
      }
    }
  }
  return [currentTotal + negativeUnassigned, currentTotal + positiveUnassigned];
}

// Very simple, bounds-based checker.
function isSatisfiable(constraint, model) {
  let bounds = computeBounds(constraint, model);
  let value = constraint.value;
  switch(constraint.type) {
    case "eq":
      return (bounds[0] <= value) &&
        (bounds[1] >= value);
    case "max":
      return (bounds[0] <= value);
    case "min":
      return (bounds[1] >= value);
  }
}

module.exports = { ZeroOneError, computeObjective, isSatisfiable, computeBounds };
