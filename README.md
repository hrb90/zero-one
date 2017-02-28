# ZeroOne

ZeroOne is a fast, powerful and easy-to-use JavaScript library for solving 0-1 integer linear programs.

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

The ConstraintBuilder class provides a friendlier API for constructing constraints:

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

### Solvers

You may select your choice of algorithm to solve your 0-1 ILP using the `setSolver` instance method. Currently two algorithms are supported: `backtrack`, a brute-force backtracking algorithm, and `bnb` (alias `default`), a branch-and-bound algorithm.

## Cool, but what's a 0-1 integer linear program?

A 0-1 integer linear program is just an integer linear program where the variables are restricted to binary values, [what's the problem][history]?

### Cute. What's an integer linear program?

A [linear program][lpwiki] is a problem where we seek to maximize or minimize what's called an "objective function", which is a linear combination of some variables, subject to some constraints on those variables, which are expressed as linear inequalities (or exact equalities). An integer linear program is exactly the same, except with the additional requirement that the variables must take integer values. A 0-1 integer linear program restricts the values of the variables to just 0 and 1.

Equivalently, we can throw away the objective function and simply ask if there is a "feasible" solution, i.e., an assignment of values to the variables so that all our constraints are satisfied.

#### Can I see a concrete example?

Sure! Here's a small 0-1 ILP from our test file:

```
Maximize:
2a + 2b - 5c + 3d + e - f + 5g + h + i

Subject to:
2a + 2b - 3c <= 2
2d + 2e - 3f <= 2
2g + 2h - 3i <= 2
a + b + d + e + g + h <= 2
```

Since all variables must be either `0` or `1`, the constraint `2a + 2b - 3c <= 2` specifies that either `a` or `b` can be 1, but both cannot be unless `c` is also `1`. The next two constraints are similar. The final constraint specifies that at most two of `a, b, d, e, g, h` can be `1`.

Some inspection should convince you that the maximum value of the objective function is `9`, which is achieved when `d = g = i = 1` and all other variables are `0`.

### What is this good for?

Lots of things!

One extremely straightforward example comes from the classic computer game [Minesweeper][minesweeper]. A revealed square gives you information about how many of its neighbors contain mines. By creating one variable to stand for each neighboring tile, and saying that a variable's value is 1 if its corresponding tile contains a mine and 0 otherwise, we can express this as an equation. The collection of all such equations in a partially revealed Minesweeper board is a 0-1 ILP. In fact, ZeroOne powers a lightweight, "smart" Minesweeper variant, [Minsweeper][minsweeper].

0-1 integer linear programming is an [NP-complete problem][npcomplete], which means that instances of many other type of problems can be encoded as 0-1 ILPs. Indeed, several of our [tests][test/test_instances.js] are such encoded problems.

[history]: http://james-iry.blogspot.com/2009/05/brief-incomplete-and-mostly-wrong.html
[lpwiki]: https://en.wikipedia.org/wiki/Linear_programming
[npcomplete]: https://en.wikipedia.org/wiki/NP-completeness
[minesweeper]: https://en.wikipedia.org/wiki/Minesweeper_(video_game)
[minsweeper]: thishasntbeenbuiltyet
