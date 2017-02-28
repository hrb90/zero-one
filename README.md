# ZeroOne

ZeroOne is a fast, powerful and easy-to-use JavaScript library for solving 0-1 integer linear programs.

## OK, what's a 0-1 integer linear programs?

## API

### Program object

A single linear program is represented by a `ZeroOneProgram` instance. After using instance methods to add variables, constraints, and an objective function, you merely have to call `solve()` on the instance, and ZeroOne does the work for you.

### Variables

After you've initialized a `ZeroOneProgram` instance, calling `addVariable()` on it will return a new Variable object:

```javascript
  program = new ZeroOneProgram();
  a = program.addVariable();
  // Variable { id: 'xxcwxdicnpapgvixjsaor' }
```

After you call `solve`, if ZeroOne finds a valid solution to the program, these Variable objects will have `value` properties containing the computed values as booleans (`true` for 1 and `false` for 0):

```javascript
  program.solve();
  a
  // Variable { id: 'xxcwxdicnpapgvixjsaor', value: true }
```

### Constraints

You may add constraints to your program with the `addConstraint` method.

`addConstraint` expects to be passed a specially-shaped JavaScript object containing information about the constraint. For instance, for variables `a, b, c`, the constraint `50a - 15b + 50c <= 95` is represented as the Javascript object

```javascript
{
  variables: { [a.id]: 50, [b.id]: -15, [c.id]: 50 },
  constraint: { type: "max", value: 95 }
}
```

A ConstraintBuilder object provides a friendlier API for constructing constraints:

```javascript
  program = new ZeroOneProgram();
  a = program.addVariable();
  // Variable { id: 'htuwnamvtuawzbiwoyb' }
  b = program.addVariable();
  // Variable { id: 'hlqwjfgfltgtsrlik' }
  c = program.addVariable();
  // Variable { id: 'scpfmzvsvjvzoxctihuxr' }
  builder = new ConstraintBuilder();
  builder.addTerm(a, 50);
  builder.addTerm(b, -15);
  builder.addTerm(c, 50);
  builder.makeMax();
  builder.setValue(95);
  builder.toConstraint();
  /*
  {
    variables:
      {
        htuwnamvtuawzbiwoyb: 50,
        hlqwjfgfltgtsrlik: -15,
        scpfmzvsvjvzoxctihuxr: 50
      },
    constraint:
      {
        type: "max",
        value: 95
      }
  }
  */
```

### Objective

ZeroOne will work just fine without an objective function; `solve()` will simply return a feasible solution if one exists, and `false` otherwise. However, you may set an objective function by passing a constraint object to a program's `setObjective` method; this method will ignore any value in the `constraint` property of the constraint object, and only use the `constraint` key (`max` or `min`) to determine whether to maximize or minimize the objective function, respectively.
