# Understanding Promises in JavaScript

Promises are one of the core features of modern JavaScript used to handle **asynchronous operations**. They represent a value that may be available now, later, or never.

---

## ✅ What is a Promise?

A **Promise** is an object that represents the eventual completion or failure of an asynchronous task.

It has **three states**:

### 1. **Pending**

The initial state; the operation is still in progress.

### 2. **Fulfilled** (Resolved)

The operation completed successfully.

### 3. **Rejected**

The operation failed.

A promise can move:

* `pending → fulfilled`
* `pending → rejected`

But **never backward**.

---

## ✅ Promise States Diagram

```
            ┌─────────────┐
            │   Pending   │
            └──────┬──────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
  ┌──────────────┐     ┌─────────────┐
  │   Fulfilled  │     │   Rejected  │
  └──────────────┘     └─────────────┘
```

---

## ✅ Creating a Promise

```js
const promise = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) resolve("Task completed successfully");
    else reject("Something went wrong");
  }, 1000);
});
```

---

## ✅ Consuming a Promise

```js
promise
  .then(result => {
    console.log("Resolved:", result);
  })
  .catch(error => {
    console.log("Rejected:", error);
  })
  .finally(() => {
    console.log("Promise completed");
  });
```

---

## 🎯 Example: Fetching User Data (Simulated)

```js
function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = false;

      if (!error) resolve({ id: 1, name: "Ankit" });
      else reject("Failed to fetch user");
    }, 1500);
  });
}

getUser()
  .then(user => console.log(user))
  .catch(err => console.log(err));
```

---

## 🔥 Chaining Promises (Important for Interviews)

```js
function step1() {
  return Promise.resolve("Step 1 done");
}

function step2() {
  return Promise.resolve("Step 2 done");
}

step1()
  .then(res => {
    console.log(res);
    return step2();
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

---

## ⚡ Promise.all / allSettled / race / any

### **Promise.all()**

Runs tasks in parallel → rejects if **any** promise fails.

```js
Promise.all([p1, p2, p3])
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

### **Promise.allSettled()**

Waits for all → never rejects.

```js
Promise.allSettled([p1, p2, p3]).then(console.log);
```

### **Promise.race()**

Returns result of the **first settled promise**.

### **Promise.any()**

Resolves on **first fulfilled** promise.

---

## 🧠 Tricky Interview Example

### What is the output?

```js
console.log("Start");

const p = Promise.resolve("Resolved");

p.then(res => console.log(res));

console.log("End");
```

### Output:

```
Start
End
Resolved
```

### Why?

Because `.then()` callbacks go into the **microtask queue**, executed **after** current synchronous code.

---

## 🏁 Summary

* Promises manage async operations cleanly.
* They have **three states**: pending → fulfilled/rejected.
* `.then`, `.catch`, `.finally` manage flow.
* Microtasks make promise callbacks run after synchronous code.
* Promise utilities (`all`, `race`, etc.) help with concurrency.

---

