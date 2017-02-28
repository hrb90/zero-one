const { isSatisfiable, computeObjective } = require('./util');

function backtrack(vars, constraints, objective, model) {
  // Return false if there's an unsatisfiable constraint
  if (constraints.some(c => !isSatisfiable(c, model))) {
    return false;
  }
  let unassigned = vars.find(v => (![true, false].includes(model[v.id])));
  if (unassigned) {
    let trueModel = Object.assign({}, model, { [unassigned.id]: true });
    let falseModel = Object.assign({}, model, { [unassigned.id]: false});
    let trueSolution = backtrack(vars, constraints, objective, trueModel);
    let falseSolution = backtrack(vars, constraints, objective, falseModel);
    if (!trueSolution) {
      return falseSolution;
    } else if (!falseSolution) {
      return trueSolution;
    } else {
      if (objective) {
        let trueObjective = computeObjective(objective.variables, trueSolution);
        let falseObjective = computeObjective(objective.variables, falseSolution);
        if ((objective.constraint.type === "max" && trueObjective > falseObjective) ||
        (objective.constraint.type === "min" && trueObjective < falseObjective)) {
          return trueSolution;
        } else {
          return falseSolution;
        }
      } else {
        return trueSolution;
      }
    }
  } else {
    // everything is assigned and all our constraints are satisfiable!
    return model;
  }
}

module.exports = backtrack;
