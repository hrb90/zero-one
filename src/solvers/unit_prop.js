const { computeObjective, isSatisfiable } = require('../util');


// Tests whether there is exactly one unassigned variable in constraint
function isUnitConstraint(constraint, model) {
  let unassignedCount = 0;
  let unassignedVarId;
  Object.keys(constraint.variables).forEach(id => {
    if (![true, false].includes(model[id])) {
      unassignedCount += 1;
      unassignedVarId = id;
    }
  });
  return unassignedCount === 1 ? unassignedVarId : false;
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

module.exports = { isUnitConstraint, resolveUnitConstraint };
