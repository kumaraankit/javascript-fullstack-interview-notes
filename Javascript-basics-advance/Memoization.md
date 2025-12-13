# Memoization in JavaScript — Complete Explanation

Memoization is a **powerful optimization technique** widely used in JavaScript to improve performance by **caching function results**. It is extremely important for **SDE-2 interviews**, frontend performance, and backend efficiency.

---

## What Is Memoization?

**Memoization** is an optimization technique where:

* The result of a function call is **stored (cached)**
* When the function is called again with the **same inputs**, the cached result is returned
* The function computation is **skipped**

> In short: **trade memory for speed**

---

## Why Do We Need Memoization?

Memoization helps when:

* Functions are **expensive** (heavy computation)
* Same inputs are used repeatedly
* Recursive problems have **overlapping subproblems**

Common use cases:

* Fibonacci / DP problems
* React re-renders
* API response caching
* Parsing / transformations

---

## Simple Example (Without Memoization)

```js
function slowSquare(n) {
  console.log('Computing...');
  return n * n;
}

slowSquare(5); // Computing...
slowSquare(5); // Computing... again
```

The function recalculates every time.

---

## Same Example (With Memoization)

```js
function memoizedSquare() {
  const cache = {};

  return function (n) {
    if (cache[n]) {
      return cache[n];
    }

    console.log('Computing...');
    cache[n] = n * n;
    return cache[n];
  };
}

const square = memoizedSquare();

square(5); // Computing...
square(5); // Returned from cache
```

---

## Key Concept: Closures

Memoization **relies on closures**.

```text
Outer function → cache
Inner function → access cache via lexical scope
```

This is a **very common interview connection**.

---

## Memoization with Recursive Functions (Fibonacci)

### Without Memoization

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

**Time Complexity:** O(2ⁿ)

---

### With Memoization

```js
function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
```

**Time Complexity:** O(n)

---

## Generic Memoize Utility Function

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

---

## Using Memoize Utility

```js
const add = (a, b) => a + b;
const memoizedAdd = memoize(add);

memoizedAdd(2, 3); // computed
memoizedAdd(2, 3); // cached
```

---

## Memoization vs Caching (Important Difference)

| Aspect   | Memoization    | Caching          |
| -------- | -------------- | ---------------- |
| Scope    | Function-level | System-level     |
| Storage  | In-memory      | Redis / DB / CDN |
| Lifetime | Short          | Long             |
| Usage    | Computation    | Data fetching    |

---

## Memoization in React

### useMemo

```js
const expensiveValue = useMemo(() => compute(data), [data]);
```

### useCallback

```js
const handler = useCallback(() => {
  doSomething(id);
}, [id]);
```

> Prevents unnecessary recalculations and re-renders.

---

## When NOT to Use Memoization

❌ Small or cheap functions
❌ Functions with many unique inputs
❌ Memory-constrained environments

Memoization adds **memory overhead**.

---

## Common Pitfalls

❌ Using objects as cache keys incorrectly
❌ Memory leaks due to unbounded cache
❌ Forgetting cache invalidation

---

## Improving Memoization

* Use `Map` instead of plain objects
* Add cache size limits (LRU)
* Clear cache when needed

---

## Interview One-Liners (SDE-2)

* "Memoization caches function results"
* "It trades memory for performance"
* "It relies on closures"
* "Used heavily in DP and React"

---

## Key Takeaways

* Memoization avoids redundant computation
* Ideal for expensive, repeatable functions
* Closure is the backbone of memoization
* Overuse can cause memory issues

---

## Related Topics

* Closures
* Higher-order functions
* Dynamic Programming
* Performance optimization

---
