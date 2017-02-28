const SMALL_EXACT = solver => test('solves a small exact decision problem', () => {
  /*
  a + b = 1
  a + c + d = 2
  b + d = 1
  */
  let vars = [ { id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' } ];
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

const SMALL_SAT = solver => test('correctly finds no solution to a small SAT instance', () => {
  // Tries to find a 3-coloring of the complete graph on 4 vertices.
  // The first letter of the variable name represents the vertex, and the second represents the color.

  let vars = [{ id: 'ar' }, { id: 'ag' }, { id: 'ab' },
              { id: 'br' }, { id: 'bg' }, { id: 'bb' },
              { id: 'cr' }, { id: 'cg' }, { id: 'cb' },
              { id: 'dr' }, { id: 'dg' }, { id: 'db' }];

  let constraints = [
    { variables: { ar: 1, ag: 1, ab: 1 }, constraint: { type: 'min', value: 1 } },
    { variables: { br: 1, bg: 1, bb: 1 }, constraint: { type: 'min', value: 1 } },
    { variables: { cr: 1, cg: 1, cb: 1 }, constraint: { type: 'min', value: 1 } },
    { variables: { dr: 1, dg: 1, db: 1 }, constraint: { type: 'min', value: 1 } },
    { variables: { ar: 1, br: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { ar: 1, cr: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { ar: 1, dr: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { br: 1, cr: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { br: 1, dr: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { cr: 1, dr: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { ag: 1, bg: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { ag: 1, cg: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { ag: 1, dg: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { bg: 1, cg: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { bg: 1, dg: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { cg: 1, dg: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { ab: 1, bb: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { ab: 1, cb: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { ab: 1, db: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { bb: 1, cb: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { bb: 1, db: 1 }, constraint: { type: 'max', value: 1 } },
    { variables: { cb: 1, db: 1 }, constraint: { type: 'max', value: 1 } }
  ];

  let solution = solver(vars, constraints, null, {});

  expect(solution).toBeFalsy();
});

const SMALL_OPT = solver => test('solves a small optimization problem', () => {

});

module.exports = {
  SMALL_EXACT,
  SMALL_SAT
};
