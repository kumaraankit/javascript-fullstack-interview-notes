# JavaScript Currying

Currying is a **functional programming technique** where a function does not take all arguments at once.
Instead, it takes **one argument at a time**, returning a new function until all required arguments are provided.

---

## ✅ **1. What is Currying? (Simple Definition)**

Currying transforms this:

```js
function add(a, b, c) {
  return a + b + c;
}
```

Into this:

```js
add(1)(2)(3); // 6
```

Each call returns a new function waiting for the next argument.

---

## ✅ **2. Basic Example**

```js
function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(sum(1)(2)(3)); // 6
```

---

## ✅ **3. Arrow Function Short Version**

```js
const sum = a => b => c => a + b + c;
console.log(sum(5)(10)(15)); // 30
```

---

## ✅ **4. Why Is Currying Useful?**

### 🔹 Partial Application

You can pre‑fill arguments.

```js
const add10 = sum(10); // returns b => c => 10 + b + c
console.log(add10(2)(3)); // 15
```

### 🔹 Reusability

```js
const multiply = a => b => a * b;
const double = multiply(2);
console.log(double(8)); // 16
```

### 🔹 Cleaner functional pipelines

Perfect for chaining operations.

---

## ✅ **5. Real Interview Example — Logging Factory**

```js
function logger(level) {
  return function (message) {
    console.log(`[${level}] : ${message}`);
  };
}

const info = logger("INFO");
const error = logger("ERROR");

info("Server started");
error("Something failed");
```

**Why it's asked?** Shows understanding of closures + currying.

---

## ✅ **6. Tricky Interview Example — Infinite Currying**

```js
function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  };
}

console.log(add(1)(2)(3)(4)()); // 10
```

**Key idea:** Stop when argument is missing.

---

## ✅ **7. Currying to Create Generic Utility Functions**

### For example: Filtering based on property

```js
const filterBy = key => value => obj => obj[key] === value;

const filterByRole = filterBy("role");
const filterAdmins = filterByRole("admin");

const users = [
  { name: "A", role: "user" },
  { name: "B", role: "admin" }
];

console.log(users.filter(filterAdmins));
// [{ name: "B", role: "admin" }]
```

---

## ✅ **8. Converting a Normal Function → Curried Version**

### Generic curry utility

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...next) => curried(...args, ...next);
    }
  };
}

function sumThree(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sumThree);
console.log(curriedSum(1)(2)(3)); // 6
```

**Key point:** `fn.length` gives number of expected parameters.

---

## ✅ **9. Another Tricky Interview Example — Currying in DOM Handlers**

```js
const handleEvent = element => event => callback => {
  element.addEventListener(event, callback);
};

const onClick = handleEvent(document);
const onButtonClick = onClick("click");
onButtonClick(e => console.log("Button clicked"));
```

Shows ability to build reusable abstractions.

---

## ✅ **10. Common Interview Trick Question**

### ❓ Why does this fail?

```js
function add(a, b) {
  return a + b;
}
add(1)(2); // ❌ TypeError
```

### ✔ Explanation

`add(1)` returns a **number**, not a function.
Currying requires returning **another function**.

---

## ✅ **11. When NOT to Use Currying (Disadvantages)**

* Can reduce readability for developers not familiar with FP
* Harder debugging stack traces
* Too many nested functions become noisy
* Overkill for simple operations

---

## ⭐ Final Interview‑Ready Definition

> Currying transforms a function so it takes arguments one at a time, returning a new function after each argument until all arguments are provided. It relies on closures and is used for reusability, partial application, and functional composition.

---


