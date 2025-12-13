# Higher-Order Functions (HOFs) — Complete Explanation

**Higher-Order Functions** are a core concept in JavaScript and functional programming. They are heavily used in **real-world code**, **frontend frameworks**, **Node.js**, and are a **must-know topic for SDE-2 interviews**.

---

## What Is a Higher-Order Function?

A **Higher-Order Function (HOF)** is a function that does **at least one** of the following:

1. **Takes another function as an argument**, or
2. **Returns a function as a result**

> In simple words: **functions that operate on other functions**.

---

## Why Higher-Order Functions Exist

Higher-order functions enable:

* Code reuse
* Abstraction
* Cleaner & declarative code
* Functional programming patterns

They help avoid:

* Repetitive logic
* Deep loops
* Imperative code

---

## Functions as First-Class Citizens

JavaScript supports higher-order functions because **functions are first-class citizens**.

This means functions can be:

* Assigned to variables
* Passed as arguments
* Returned from other functions

```js
const greet = () => 'Hello';

function run(fn) {
  return fn();
}

run(greet); // "Hello"
```

---

## Basic Example of a Higher-Order Function

```js
function higherOrder(fn) {
  console.log('Before execution');
  fn();
  console.log('After execution');
}

function sayHi() {
  console.log('Hi');
}

higherOrder(sayHi);
```

Here:

* `higherOrder` → Higher-order function
* `sayHi` → Callback function

---

## Callback Functions

A **callback** is a function passed into another function to be executed later.

```js
setTimeout(() => {
  console.log('Executed later');
}, 1000);
```

Callbacks are the **most common use case** of higher-order functions.

---

## Common Built-in Higher-Order Functions

JavaScript arrays provide many HOFs.

---

## `map()`

Transforms each element and returns a new array.

```js
const nums = [1, 2, 3];
const squares = nums.map(n => n * n);
```

---

## `filter()`

Filters elements based on a condition.

```js
const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0);
```

---

## `reduce()`

Reduces an array to a single value.

```js
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, n) => acc + n, 0);
```

---

## `forEach()`

Executes a function for each element.

```js
nums.forEach(n => console.log(n));
```

---

## Custom Higher-Order Function Example

```js
function withLogging(fn) {
  return function (...args) {
    console.log('Arguments:', args);
    return fn(...args);
  };
}

function add(a, b) {
  return a + b;
}

const loggedAdd = withLogging(add);
loggedAdd(2, 3); // logs args + result
```

---

## Higher-Order Functions Returning Functions

```js
function multiplier(factor) {
  return function (num) {
    return num * factor;
  };
}

const double = multiplier(2);
double(5); // 10
```

This works because of **lexical scope & closures**.

---

## HOFs and Closures (IMPORTANT)

Higher-order functions often create **closures**.

```js
function once(fn) {
  let executed = false;

  return function (...args) {
    if (!executed) {
      executed = true;
      return fn(...args);
    }
  };
}
```

The inner function remembers `executed` due to closures.

---

## Real-World Use Cases

* Event handling
* Middleware (Express, NestJS)
* React hooks & components
* Logging & analytics
* Authorization & validation

---

## HOFs in Backend (Node.js Example)

```js
function authMiddleware(role) {
  return function (req, res, next) {
    if (req.user.role === role) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
}
```

Very common interview example.

---

## Benefits of Higher-Order Functions

✅ Cleaner code
✅ Better abstraction
✅ Reusable logic
✅ Easier testing

---

## Drawbacks

❌ Harder debugging
❌ Performance overhead (minor)
❌ Can be confusing initially

---

## Common Interview Pitfalls

❌ Confusing callbacks with HOFs
❌ Forgetting that returning a function also qualifies
❌ Not connecting HOFs with closures

---

## Interview One-Liners (SDE-2)

* "A higher-order function takes or returns another function"
* "Array methods like map and reduce are HOFs"
* "Closures are commonly created by HOFs"
* "Middleware is a real-world HOF pattern"

---

## Comparison: HOF vs Normal Function

| Feature          | Normal Function | Higher-Order Function |
| ---------------- | --------------- | --------------------- |
| Takes function   | ❌               | ✅                     |
| Returns function | ❌               | ✅                     |
| Abstraction      | Low             | High                  |

---

## Key Takeaways

* Higher-order functions are foundational in JavaScript
* They enable functional programming
* Used heavily in frontend & backend frameworks
* Essential for interviews and real-world code

---
