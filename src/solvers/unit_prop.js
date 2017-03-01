const { computeObjective, isSatisfiable } = require('../util');

function isUnitConstraint(constraint, model) {
  let unassignedCount = 0;
  let unassignedVar;
  Object.keys(constraint.variables).forEach(id => {
    if (![true, false].includes(model[id])) {
      unassignedCount += 1;
      unassignedVar = id;
    }
  });
  return unassignedVar === 1 ? unassignedVar : false;
}

// Takes a constraint and a partial
// If there is exactly one unassigned variable
// (and there is exactly one assignment to that variable that satisfies the constraint)
//  Return a POJO setting the unassigned variable to the assignment
// Otherwise return {}
function resolveUnitConstraint(constraint, model) {
  let unassigned = isUnitConstraint(constraint, model);
  if (unassigned) {
    // Is the constraint satisfied if we assign each value to unassigned?
    let resolutions = [true, false].map(v => isSatisfiable(constraint,
                        Object.assign({}, model, {[unassigned]: v})));
    // Ternary XOR! (on the two elements of resolutions)
    if (resolutions[0] ? !resolutions[1] : resolutions[1]) {
      // Tricky...
      return { [unassigned]: resolutions[0] };
    }
  }
  return {};
}

module.exports = resolveUnitConstraint;
