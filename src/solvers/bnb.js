const { isSatisfiable, computeObjective, computeBounds } = require('../util');

// If there's no assignment of variables that will lead to an objective function
// bigger or smaller than our current best bound, we can prune this branch
function canPrune(objective, model, lowerBound, upperBound) {
  let bounds = computeBounds(objective, model);
  return ((objective.type === "min" && bounds[0] >= upperBound) ||
      (objective.type === "max" && bounds[1] <= lowerBound));
}

function computeNewBounds(objective, model, lowerBound, upperBound) {
  if (objective.type === "min") {
    return { lowerBound,
      upperBound: Math.min(computeObjective(objective.variables, model), upperBound)};
  } else if (objective.type === "max") {
    return { upperBound,
      lowerBound: Math.max(computeObjective(objective.variables, model), lowerBound)};
  } else {
    return { lowerBound, upperBound };
  }
}

function bnb(vars, constraints, objective, model, lowerBound = -Infinity, upperBound = Infinity) {
  if (constraints.some(c => !isSatisfiable(c, model))) {
    return false;
  }

  if (objective && canPrune(objective, model, lowerBound, upperBound)) {
    return false;
  }

  let unassigned = vars.find(v => (![true, false].includes(model[v.id])));
  if (unassigned) {
    // Search for a solution setting our unassigned variable to true
    let trueModel = Object.assign({}, model, { [unassigned.id]: true });
    let trueSolution = bnb(vars, constraints, objective, trueModel, lowerBound, upperBound);
    if (trueSolution) {
      if (!objective) {
        // we can go ahead and return since we have a feasible solution
        return trueSolution;
      } else {
        // update the bounds...
        lowerBound = trueSolution.lowerBound;
        upperBound = trueSolution.upperBound;
      }
    }
    // Now search for a solution setting our unassigned variable to false
    let falseModel = Object.assign({}, model, { [unassigned.id]: false });
    let falseSolution = bnb(vars, constraints, objective, falseModel, lowerBound, upperBound);
    return falseSolution ? falseSolution : trueSolution;
  } else {
    let newBounds = objective ? computeNewBounds(objective, model, lowerBound, upperBound) : {};
    return Object.assign({}, model, newBounds);
  }
}

module.exports = bnb;
