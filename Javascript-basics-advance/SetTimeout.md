# setTimeout in JavaScript

This document provides a comprehensive, interview-ready explanation of `setTimeout` for both frontend and backend (Node.js) contexts.

---

## 1. What is `setTimeout`?

`setTimeout` is a **Web API / Node.js API** that schedules a function to run **once after a specified delay** (in milliseconds).

* It is **asynchronous** and **non-blocking**.

### Syntax

```js
setTimeout(callback, delay, ...args);
```

### Example

```js
setTimeout(() => {
  console.log("Hello after 2 seconds");
}, 2000);
```

---

## 2. How `setTimeout` Works

❗ **`setTimeout` does NOT guarantee exact timing**

### Execution Flow

1. JS runs synchronous code (Call Stack)
2. `setTimeout` registers callback with **Timer API**
3. After delay expires → callback moves to **Task Queue**
4. Callback executes **only when Call Stack is empty**

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");
```

**Output:**

```
Start
End
Timeout
```

---

## 3. Canceling `setTimeout`

```js
const id = setTimeout(() => {
  console.log("Won't run");
}, 3000);

clearTimeout(id);
```

---

## 4. Passing Arguments

```js
setTimeout((name) => {
  console.log(`Hello ${name}`);
}, 1000, "Ankit");
```

---

## 5. `setTimeout` in Node.js (Backend)

### Use Cases

* Retry logic
* Delayed jobs
* Rate limiting
* Circuit breakers
* Graceful shutdowns

### Example: Retry API Call

```js
function retry(fn, retries) {
  if (retries === 0) return;

  setTimeout(() => {
    fn().catch(() => retry(fn, retries - 1));
  }, 1000);
}
```

---

## 6. `setTimeout` vs `setInterval`

| Feature       | setTimeout | setInterval |
| ------------- | ---------- | ----------- |
| Runs          | Once       | Repeatedly  |
| Drift control | ✅ Better   | ❌ Poor      |
| Preferred     | ✅ Yes      | ❌ Avoid     |

### Recommended Polling Pattern

```js
function poll() {
  setTimeout(() => {
    console.log("polling...");
    poll();
  }, 1000);
}
```

✅ Prevents overlapping executions

---

## 7. `setTimeout` with async/await

```js
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

await delay(1000);
console.log("Waited 1 second");
```

---

## 8. Common Interview Questions

* **Is `setTimeout` part of JavaScript?** ❌ No, provided by browser / Node.js APIs
* **Does `setTimeout(fn, 0)` run immediately?** ❌ No, runs after current call stack is empty
* **Can `setTimeout` be inaccurate?** ✅ Yes, due to call stack or CPU blocking
* **Is `setTimeout` a microtask?** ❌ No, it’s a **macrotask**

---

## 9. Summary

> `setTimeout` schedules a callback to execute **after a minimum delay**, but actual execution depends on the **event loop and call stack availability**.

---
