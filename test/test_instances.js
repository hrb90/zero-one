const SMALL_EXACT = solver => test('solves a small exact decision problem', () => {
  // Make variables
  let vars = [ { id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' } ];
  // Make constraints
  let constraints = [
    { variables: { a: 1, b: 1 }, constraint: { type: 'eq', value: 1 } },
    { variables: { a: 1, c: 1, d: 1 }, constraint: { type: 'eq', value: 2 } },
    { variables: { b: 1, d: 1 }, constraint: { type: 'eq', value: 1 } }
  ];

  let solution = solver(vars, constraints, null, {});
  expect(solution.a).toBeTruthy();
  expect(solution.b).toBeFalsy();
  expect(solution.c).toBeFalsy();
  expect(solution.d).toBeTruthy();
});

module.exports = { SMALL_EXACT };
