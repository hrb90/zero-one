const ZeroOneProgram = require('../src/zero_one_program');

test('generates variables', () => {
  let program = new ZeroOneProgram();
  let a = program.addVariable();

  expect(a.id).toBeDefined();
});

test('adds constraints', () => {
  let program = new ZeroOneProgram();
  let a = program.addVariable();
  let b = program.addVariable();
  let constraint = {
    variables: { [a.id]: 5, [b.id]: 3 },
    constraint: { type: "max", value: 6 }
  };
  program.addConstraint(constraint);

  expect(program.constraints).toContain(constraint);
});

test('adds an objective function', () => {
  let program = new ZeroOneProgram();
  let a = program.addVariable();
  let b = program.addVariable();
  let objective = {
    variables: { [a.id]: 5, [b.id]: 3 },
    constraint: { type: "max" }
  };
  program.addObjective(objective);

  expect(program.objective).toBe(objective);
});

test('computes an objective function', () => {
  let program = new ZeroOneProgram();
  let a = program.addVariable();
  let b = program.addVariable();
  let objective = {
    variables: { [a.id]: 5, [b.id]: 3 },
    constraint: { type: "max" }
  };
  program.addObjective(objective);
  let model = { [a.id]: true, [b.id]: false };

  expect(program.computeObjective(model)).toBe(5);
});

test('assigns values to generated variables if solution is feasible', () => {
  let program = new ZeroOneProgram();
  let a = program.addVariable();
  let b = program.addVariable();
  let c = program.addVariable();
  let constraint1 = {
    variables: { [a.id]: 2, [b.id]: 3, [c.id]: 1},
    constraint: { type: "max", value: 3 }
  };
  let constraint2 = {
    variables: { [a.id]: 1, [c.id]: 1},
    constraint: { type: "min", value: 1 }
  };
  let objective = {
    variables: { [a.id]: 2, [b.id]: 7, [c.id]: 1},
    constraint: { type: "max" }
  };
  program.addConstraint(constraint1);
  program.addConstraint(constraint2);
  program.setSolver("backtrack");
  program.solve();

  expect(a.value).toBeTruthy();
  expect(b.value).toBeFalsy();
  expect(c.value).toBeTruthy();
});
