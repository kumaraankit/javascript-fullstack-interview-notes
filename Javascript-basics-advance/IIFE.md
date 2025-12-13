# IIFE (Immediately Invoked Function Expression) — Complete Explanation

An **IIFE (Immediately Invoked Function Expression)** is a JavaScript function that is **defined and executed immediately** after it is created.

IIFEs are a **classic but extremely important concept**, especially for understanding:

* Scope
* Closures
* Avoiding global pollution
* Legacy JavaScript patterns

This is a **frequently asked interview topic**.

---

## What Is an IIFE?

An **IIFE** is a function expression that runs **as soon as it is defined**.

```js
(function () {
  console.log('IIFE executed');
})();
```

> The function is created and invoked **in one go**.

---

## Why IIFE Exists

Before ES6 modules, JavaScript had:

* No block scope (`var` only)
* No native modules

IIFE was used to:

* Create a **private scope**
* Avoid polluting the global namespace
* Encapsulate logic

---

## Basic IIFE Syntax

### Standard IIFE

```js
(function () {
  // code here
})();
```

### Arrow Function IIFE

```js
(() => {
  console.log('Arrow IIFE');
})();
```

---

## Why Parentheses Are Required

This will ❌ NOT work:

```js
function test() {}(); // SyntaxError
```

Because:

* `function test(){}` is a **function declaration**
* Declarations cannot be invoked immediately

Parentheses convert it into a **function expression**:

```js
(function test() {})(); // ✅
```

---

## IIFE with Parameters

```js
(function (name) {
  console.log(`Hello, ${name}`);
})('Ankit');
```

---

## IIFE with Return Value

```js
const result = (function () {
  return 10 * 2;
})();

console.log(result); // 20
```

---

## IIFE and Scope Isolation

```js
(function () {
  var secret = 'hidden';
})();

console.log(secret); // ❌ ReferenceError
```

The variable is **not leaked to global scope**.

---

## IIFE vs Block Scope (`let` / `const`)

### Old Way (Pre-ES6)

```js
(function () {
  var count = 0;
})();
```

### Modern Way

```js
{
  let count = 0;
}
```

> IIFEs were a workaround before block scoping existed.

---

## IIFE and Closures

IIFEs often create **closures**.

```js
const counter = (function () {
  let count = 0;
  return function () {
    return ++count;
  };
})();

counter(); // 1
counter(); // 2
```

The inner function remembers `count`.

---

## Common IIFE Patterns

---

### Module Pattern

```js
const module = (function () {
  let privateVar = 10;

  function get() {
    return privateVar;
  }

  return { get };
})();

module.get(); // 10
```

Used heavily before ES modules.

---

### IIFE with Global Object

```js
(function (global) {
  global.appName = 'MyApp';
})(window);
```

Avoids hard-coding globals.

---

## IIFE in Loops (Classic Interview Question)

### Problem with `var`

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3 3 3
```

### Solution Using IIFE

```js
for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(() => console.log(i), 100);
  })(i);
}
// Output: 0 1 2
```

---

## IIFE vs Normal Function Call

| Feature         | IIFE      | Normal Function |
| --------------- | --------- | --------------- |
| Execution       | Immediate | When called     |
| Scope isolation | Yes       | No              |
| Reusability     | No        | Yes             |

---

## When to Use IIFE Today

✅ Legacy codebases
✅ One-time initialization logic
✅ Library internal setup

Not commonly needed when:

* Using ES modules
* Using `let` / `const`

---

## Common Interview Pitfalls

❌ Forgetting parentheses
❌ Confusing IIFE with function declaration
❌ Overusing IIFE in modern code

---

## Interview One-Liners (SDE-2)

* "An IIFE executes immediately after creation"
* "It creates a private scope"
* "Used to avoid global pollution"
* "Mostly replaced by ES modules and block scope"

---

## Key Takeaways

* IIFE = function expression + immediate execution
* Solves scope and global pollution issues
* Important for understanding closures and legacy JS
* Still appears in interviews

---

