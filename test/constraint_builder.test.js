const ConstraintBuilder = require('../src/constraint_builder');

test('adds a term', () => {
  let builder = new ConstraintBuilder();
  builder.addTerm({id: 'a'}, 50);

  expect(builder.toConstraint().variables.a).toBe(50);
});

test('overwrites a term', () => {
  let builder = new ConstraintBuilder();
  builder.addTerm({id: 'a'}, "a million");
  builder.addTerm({id: 'a'}, 200);

  expect(builder.toConstraint().variables.a).toBe(200);
});

test('sets the type', () => {
  let builder = new ConstraintBuilder();
  builder.setType("max");

  expect(builder.toConstraint().constraint.type).toBe("max");
});

test('sets the value', () => {
  let builder = new ConstraintBuilder();
  builder.setValue(10);

  expect(builder.toConstraint().constraint.value).toBe(10);
});

test('builds a constraint', () => {
  let builder = new ConstraintBuilder();
  builder.addTerm({id: 'a'}, 3);
  builder.addTerm({id: 'b'}, -4);
  builder.addTerm({id: 'c'}, 5);
  builder.makeMax();
  builder.setValue(3);

  let constraint = builder.toConstraint();

  expect(constraint).toEqual({
    variables: { a: 3, b: -4, c: 5 },
    constraint: { type: "max", value: 3 }
  });
});
