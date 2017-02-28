const computeObjective = (variables, model) => {
  let total = 0;
  Object.keys(variables).forEach(key => {
    if (model[key]) {
      total += variables[key];
    }
  });
  return total;
};

module.exports = computeObjective;
