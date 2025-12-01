# Closures & Memory Leaks

## 🔥 What Are Closures?

A **closure** is formed when a function remembers and accesses variables from its **outer lexical scope**, even after the outer function has finished executing.

**In one line (interview answer):**

> A closure = function + its lexical environment.

---

## ✅ Basic Closure Example

```js
function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const fn = outer();
fn(); // 1
fn(); // 2
```

**Why?** `inner()` still has access to `count` due to closure.

---

# 🚨 How Closures Cause Memory Leaks

Closures keep references to **entire outer scopes**, not just the variables they use. If the closure stays in memory longer than needed, its whole scope stays too.

---

## ❗ 1. Heavy Data Captured in Closure

```js
function createClosure() {
  const bigArray = new Array(1_000_000).fill("*");

  return function fn() {
    console.log("Hello");
  };
}

const f = createClosure();
// bigArray is never garbage collected
```

**Interview Point:** Even though `fn` doesn't use `bigArray`, the entire scope stays alive.

---

## ❗ 2. Event Listeners + Closures = Memory Leak

```js
function register() {
  const data = new Array(500000).fill("x");

  function handler() {
    console.log("clicked");
  }

  document.body.addEventListener("click", handler);
}
```

If `handler` is never removed, `data` stays in memory.

**Fix:**

```js
body.removeEventListener("click", handler);
```

---

## ❗ 3. setInterval() + Closure

```js
function start() {
  const heavy = { arr: new Array(1000000) };

  setInterval(() => {
    console.log("running...");
  }, 1000);
}

start();
```

**Why leak?** Interval callback keeps `heavy` in memory forever.

**Fix:** Clear the interval.

---

## ❗ 4. Closure Assigned to Global Variable

```js
let globalRef;

function outer() {
  const temp = new Array(300000);

  function inner() {}
  globalRef = inner; // temp is kept alive
}

outer();
```

**Interview Explanation:** Assigning closures globally holds the entire lexical scope in memory.

---

# ✅ Preventing Memory Leaks (How to Answer In Interview)

### ✔ Avoid capturing unnecessary variables

```js
function factory() {
  let small = 10;
  let large = new Array(1000000).fill(0);

  return function () {
    return small; // avoid capturing `large` unnecessarily
  };
}
```

### ✔ Remove event listeners

```js
element.removeEventListener("click", handler);
```

### ✔ Clear long-running timers

```js
clearInterval(id);
```

### ✔ Use WeakMap for optional references

---

# ⭐ Final Interview-Ready Summary

> **Closures allow a function to remember its lexical scope even after the outer function has returned.
> But if a closure unintentionally retains large or unused variables, they stay in memory and prevent garbage collection, causing memory leaks.
> Common sources: event listeners, intervals, global references, and capturing heavy variables.
> Fix by removing listeners, clearing timers, using weak references, and avoiding unnecessary variable capture.**

---

