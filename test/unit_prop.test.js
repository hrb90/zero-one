const { isUnitConstraint, resolveUnitConstraint } = require('../src/solvers/unit_prop');

test('returns the unassigned variable from a unit constraint', () => {
  let constraint = { variables: { a: 2, b: -3, c: 1}, type: 'min', value: 0 };
  let model = { b: false, c: true, e: true };

  expect(isUnitConstraint(constraint, model)).toBe('a');
});

test('returns falsy if the constraint is not a unit constraint', () => {
  let constraint = { variables: { a: 2, b: -3, c: 1, d: 2}, type: 'min', value: 0 };
  let model = { b: true, c: false, e: true };

  expect(isUnitConstraint(constraint, model)).toBeFalsy();
});

test('return an assignment if there is exactly one good assignment', () => {
  let constraint = { variables: { a: 1, b: 1, c: 1}, type: 'max', value: 2};
  let model = { b: true, c: true, e: true};

  expect(resolveUnitConstraint(constraint, model)).toEqual({ a: false });
});

test("return {} if it isn't a unit constraint", () => {
  let constraint = { variables: { a: 2, b: -3, c: 1}, type: 'min', value: 0 };
  let model = { b: true, e: true };

  expect(resolveUnitConstraint(constraint, model)).toEqual({});
});

test("return {} if it doesn't matter what the unassigned variable is", () => {
  let constraint = { variables: { a: 2, b: -3, c: 1}, type: 'min', value: 0 };
  let model = { b: false, c: true, e: true };

  expect(resolveUnitConstraint(constraint, model)).toEqual({});
});
