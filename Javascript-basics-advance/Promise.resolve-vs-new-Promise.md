# Promise.resolve vs new Promise — Complete Explanation

Understanding the difference between `Promise.resolve()` and `new Promise()` is **very important for async design, performance, and interviews (SDE-2 level)**.

---

## Quick Interview Answer

> `Promise.resolve()` is used to **wrap or normalize a value/promise**, while `new Promise()` is used to **create a promise with custom async logic**.

---

## Promise.resolve()

### What It Does

`Promise.resolve(value)` returns a promise that:

* Is **already fulfilled** with `value`, OR
* **Adopts the state** of the passed promise

---

### Syntax

```js
Promise.resolve(value);
```

---

### Example: Resolving a Value

```js
Promise.resolve(42).then(console.log); // 42
```

Equivalent to:

```js
new Promise(resolve => resolve(42));
```

---

### Example: Resolving a Promise

```js
const p = Promise.resolve(Promise.resolve('data'));
p.then(console.log); // data
```

> Promise resolution is **flattened** (no nested promises).

---

### Example: Normalizing Sync & Async Code

```js
function maybeAsync(val) {
  return Promise.resolve(val);
}
```

Useful when function may return value or promise.

---

## new Promise()

### What It Does

`new Promise()`:

* Creates a promise in `pending` state
* Executes the **executor function immediately**
* Gives manual control over `resolve` / `reject`

---

### Syntax

```js
new Promise((resolve, reject) => {
  // async logic
});
```

---

### Example: Async Operation

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});
```

---

### Executor Runs Synchronously (Interview Trap)

```js
new Promise(() => {
  console.log('runs immediately');
});
```

---

## Side-by-Side Comparison

| Feature        | Promise.resolve     | new Promise        |
| -------------- | ------------------- | ------------------ |
| Purpose        | Wrap value/promise  | Create async logic |
| State          | Immediately settled | Starts pending     |
| Executor       | ❌ No                | ✅ Yes              |
| Error handling | Automatic           | Manual             |
| Performance    | Faster              | Slower             |

---

## Error Handling Differences

### Promise.resolve

```js
Promise.resolve(thenable)
```

* Automatically catches errors
* Follows promise resolution procedure

---

### new Promise

```js
new Promise((resolve, reject) => {
  throw new Error('fail');
});
```

* Exception → rejection

---

## When to Use Promise.resolve()

✅ Normalize return values
✅ Convert sync → async API
✅ Return resolved promise quickly
✅ Avoid unnecessary promise creation

---

## When to Use new Promise()

✅ Wrap callback-based APIs
✅ Implement delays, retries
✅ Create custom async control flow

---

## Anti-Pattern 🚨

```js
return new Promise(resolve => resolve(value));
```

❌ Replace with:

```js
return Promise.resolve(value);
```

---

## Performance Consideration

* `Promise.resolve()` avoids executor overhead
* Preferred in hot paths

---

## Internal Behavior (Simplified)

```js
Promise.resolve(x)
```

Internally:

* If x is a promise → return it
* If x is thenable → assimilate it
* Else → fulfill immediately

---

## Interview One-Liners (SDE-2)

* "Promise.resolve normalizes values"
* "new Promise creates async workflow"
* "Executor runs synchronously"
* "Avoid unnecessary new Promise"

---

## Key Takeaways

* Prefer `Promise.resolve()` for wrapping values
* Use `new Promise()` for real async logic
* Misuse leads to performance & readability issues

---
