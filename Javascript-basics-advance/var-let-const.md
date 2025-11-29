# var, let, and const — Interview-ready guide

This note explains the differences between `var`, `let` and `const` in JavaScript with clear examples and expected outputs. It covers scope, hoisting, reassignment/redeclaration rules, the Temporal Dead Zone (TDZ), common patterns and tricky interview questions.

## Quick summary

- `var`: Function-scoped (or global if declared at top level). Variables declared with `var` are hoisted and initialized with `undefined`. Allows redeclaration and reassignment.
- `let`: Block-scoped. Hoisted but not initialized (accessing before declaration throws ReferenceError — TDZ). Allows reassignment but not redeclaration in the same scope.
- `const`: Block-scoped. Similar hoisting/TDZ behavior to `let`. Must be initialized at declaration. Cannot be reassigned, but if the value is an object/array, the contents can be mutated.

## Contract (what to expect in examples)

- Inputs: small JS snippets
- Outputs: the printed console output or runtime error
- Error modes shown: ReferenceError (TDZ), TypeError (reassignment of const), different scoping results

## Scope

Example 1 — function vs block scope

Code:

```js
function varTest() {
  if (true) {
    var x = 1;
  }
  console.log(x); // x is accessible (function-scoped)
}

function letTest() {
  if (true) {
    let y = 2;
  }
  console.log(y); // y is NOT accessible (block-scoped)
}

varTest();
try { letTest(); } catch (e) { console.log(e.toString()); }
```

Expected output:

```
1
ReferenceError: y is not defined
```

Explanation: `var` ignores block boundaries (except functions) while `let` is limited to the block where it was declared.

## Hoisting and the Temporal Dead Zone (TDZ)

Example 2 — hoisting differences

Code:

```js
console.log(a); // undefined (hoisted and initialized)
var a = 10;

try {
  console.log(b); // ReferenceError (in TDZ)
} catch(e) { console.log(e.toString()); }
let b = 20;

try {
  console.log(c); // ReferenceError (in TDZ)
} catch(e) { console.log(e.toString()); }
const c = 30;
```

Expected output:

```
undefined
ReferenceError: Cannot access 'b' before initialization
ReferenceError: Cannot access 'c' before initialization
```

Explanation: `var` is hoisted and initialized to `undefined`. `let`/`const` are hoisted but not initialized — accessing them before declaration is a ReferenceError (TDZ).

## Redeclaration and reassignment rules

- `var`: can redeclare and reassign.
- `let`: cannot redeclare in same scope, but can reassign.
- `const`: cannot redeclare nor reassign (must be initialized at declaration).

Example 3 — redeclare/reassign

Code:

```js
var v = 1;
var v = 2; // allowed
console.log('v =', v);

let l = 1;
// let l = 2; // SyntaxError: Identifier 'l' has already been declared (uncommenting causes parse error)
l = 3; // allowed
console.log('l =', l);

const k = 1;
// k = 2; // TypeError at runtime if attempted
console.log('k =', k);
```

Expected output:

```
v = 2
l = 3
k = 1
```

Note: redeclaring a `let` or `const` in the same scope is a SyntaxError during parsing, so running that exact script would fail to parse — the example shows safe operations only.

## const and object mutation

`const` prevents reassignment of the binding, but not mutation of the value when it is an object or array.

Example 4 — const object mutation

Code:

```js
const obj = { a: 1 };
obj.a = 2; // allowed (mutation)
obj.b = 3; // allowed
console.log(obj);

try {
  obj = { a: 10 }; // TypeError: Assignment to constant variable.
} catch(e) { console.log(e.toString()); }
```

Expected output:

```
{ a: 2, b: 3 }
TypeError: Assignment to constant variable.
```

Explanation: `obj` is a constant binding to the object. You cannot reassign `obj` to a new object, but you can mutate the existing object's properties.

## Common real-world example: loops + closures (classic interview)

Example 5 — `var` in loops with async callbacks

Code:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log('var loop i =', i);
  }, 10);
}

for (let j = 0; j < 3; j++) {
  setTimeout(function() {
    console.log('let loop j =', j);
  }, 10);
}
```

Expected output (order interleaved depending on scheduler, but values shown):

```
var loop i = 3
var loop i = 3
var loop i = 3
let loop j = 0
let loop j = 1
let loop j = 2
```

Explanation: `var i` is function-scoped — the same `i` is shared, and by the time callbacks run loop finished with `i === 3`. `let j` creates a fresh binding per iteration, so callbacks print the expected iteration values.

Variations: With `var` you can fix it by capturing the value in an IIFE or using `let`.

## Edge cases and notes

- Top-level `var` in modules behaves differently when using ES modules vs scripts (modules are their own scope). For interview purposes, emphasize function vs block scope.
- `typeof` a `let`/`const` before declaration still throws a ReferenceError like direct access (unlike `var` where typeof returns 'undefined').

Example 6 — typeof with var/let

Code:

```js
console.log(typeof undeclaredVar); // 'undefined'
// typeof aLet; // ReferenceError if aLet declared later with let (uncomment to see the error)
let aLet = 1;
```

Expected output:

```
undefined
```

## Tricky interview questions (with answers and short explanations)

1) What will this print?

```js
console.log(x);
var x = 5;
```
Answer: prints `undefined`.
Why: `var` is hoisted and initialized with `undefined` before execution.

2) What will this print?

```js
console.log(y);
let y = 5;
```
Answer: throws ReferenceError: Cannot access 'y' before initialization.
Why: `let` is hoisted but uninitialized (TDZ).

3) Can you redeclare a `var` and a `let` in the same scope?
Answer: `var` can be redeclared; `let` cannot (SyntaxError).

4) What does `const` prevent exactly? Can a `const` array be mutated?
Answer: `const` prevents reassignment of the binding; it does not make the value immutable. A `const` array/object can have its contents mutated (push/pop, property updates).

5) Given a `for` loop with `var` and `setTimeout`, why do callbacks print the same final value? How to fix it without `let`?
Answer: `var` is function-scoped so callbacks close over the same binding. Fix by using an IIFE to capture the current value:

```js
for (var i=0;i<3;i++){
  (function(i){
    setTimeout(function(){ console.log(i); },10);
  })(i);
}
```

6) Is `let` hoisted?
Answer: Yes, `let` is hoisted but not initialized — accessing it before declaration throws ReferenceError (TDZ).

7) Does `const` create a read-only object?
Answer: No. `const` only makes the binding read-only. Use Object.freeze to make an object shallowly immutable.

8) Will this code run? If yes, what prints?

```js
if (true) {
  let a = 1;
  var b = 2;
}
console.log(typeof a);
console.log(typeof b);
```
Answer:
```
ReferenceError for typeof a if accessed directly (or when uncommented), but `typeof a` inside try would throw.
// Actually calling typeof a when a is in TDZ will throw ReferenceError. Accessing typeof on truly undeclared identifier returns 'undefined'.

But for this snippet:
console.log(typeof a); // ReferenceError because a is in TDZ only while in the block; after block it is not declared at all in the outer scope so typeof a returns 'undefined' in non-TDZ situations. However many engines will still throw if in the scope of TDZ. To be safe: do not rely on typeof for let/const before declaration.

console.log(typeof b); // 'number'
```
Short answer: `b` is accessible and typeof b returns 'number'; `a` is block-scoped and not accessible outside the block.

9) What happens if you declare the same name with `var` and `let` in the same scope?
Answer: SyntaxError: Identifier has already been declared (mixing declarations in the same scope is not allowed).

10) Can you declare a `const` without initializer and later assign to it?
Answer: No — `const` must be initialized at the time of declaration; otherwise it's a SyntaxError.

11) Consider `for (const x of [1,2,3]) { console.log(x); }` — is this allowed?
Answer: Yes. Each iteration `x` is a new binding and `const` is initialized from the iterated value. You cannot reassign `x` inside the body.

12) Why does `typeof` sometimes mask TDZ? Example: `typeof a` vs `a` before declaration.
Answer: Historically `typeof undeclaredIdentifier` returns 'undefined' and does not throw. But with `let`/`const` in TDZ, `typeof` will throw ReferenceError in modern engines when the identifier is in TDZ. So don't rely on typeof to safely probe `let`/`const` before declaration.

13) Why would someone use `var` today?
Answer: Mostly for historical/legacy code. In modern JS, prefer `let` and `const` for predictable scoping. `const` as default, `let` for reassignable variables.

## Short cheat-sheet

- Use `const` by default.
- Use `let` when you need to reassign.
- Avoid `var` in modern code unless maintaining legacy code.
- Remember TDZ: accessing `let`/`const` before declaration throws.
- `const` prevents reassignment but not mutation of objects.

## Quick practice problems (small exercises to discuss in interviews)

1. Fix the `var` closure problem without using `let` (use IIFE or function to capture value).
2. Explain why `const obj = {}` followed by `obj = {}` fails but `obj.prop = 1` works.
3. Predict outputs for mixed declarations in nested blocks.

---


