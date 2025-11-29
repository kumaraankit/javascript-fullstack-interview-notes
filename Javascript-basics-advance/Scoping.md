# JavaScript Scoping Explained

Scoping defines **where a variable is accessible** in your program. It controls the *lifetime* and *visibility* of variables during execution.

JavaScript has three main scopes:

* **Global Scope**
* **Function Scope**
* **Block Scope**

Understanding scoping is essential to avoid bugs, accidental overrides, and unexpected behavior caused by variable leaks.

---

## 1. Global Scope

Variables declared outside any function or block are globally scoped.

```js
var x = 10;

function print() {
  console.log(x); // 10 (accessible)
}

print();
console.log(x); // 10 (still accessible)
```

**Key point:** Global variables live for the entire lifetime of your program.

---

## 2. Function Scope

Only `var`, function parameters, and function declarations are scoped to a function.

```js
function test() {
  var a = 5;
  console.log(a); // 5
}

console.log(a); // ❌ ReferenceError (a is not global)
```

**Why?** Variables inside a function cannot be accessed outside it.

---

## 3. Block Scope (`let` and `const`)

`let` and `const` introduce a stricter scope limited to `{ }`.

```js
{
  let x = 20;
  const y = 30;
  console.log(x, y); // 20 30
}

console.log(x); // ❌ ReferenceError
console.log(y); // ❌ ReferenceError
```

`var` does **not** follow block scope:

```js
{
  var z = 40;
}
console.log(z); // 40 (var leaks out of block)
```

---

## 4. Lexical (Static) Scope

JavaScript uses **lexical scoping**, meaning a variable’s scope is determined by **where it is written in the code**, not where it is executed.

```js
function outer() {
  let a = 10;

  function inner() {
    console.log(a); // 10 → inner reads from outer lexical scope
  }

  inner();
}

outer();
```

Even if `inner()` runs elsewhere, it still remembers the scope it was defined in.

---

## 5. Scope Chain

When accessing a variable, JavaScript searches *upward* through parent scopes until it finds a match.

```js
let p = 1;

function A() {
  let q = 2;

  function B() {
    let r = 3;
    console.log(p, q, r); // 1 2 3
  }

  B();
}

A();
```

The lookup order is:
**Local → Parent → Global**.

---

## 6. Shadowing

A variable in an inner scope can **shadow** a variable from an outer scope.

```js
let x = 100;

function demo() {
  let x = 50; // shadows outer x
  console.log(x); // 50
}

demo();
console.log(x); // 100
```

The inner `x` hides the outer one within that scope.

---

## Final Takeaway

Scoping determines **what data is accessible where**.
Mastering global, function, block, and lexical scope helps you:

* avoid accidental variable leaks
* write cleaner, predictable code
* understand closures and advanced JavaScript behavior
