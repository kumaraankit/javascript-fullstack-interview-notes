# What Are Web APIs? — Complete Explanation

**Web APIs** are **browser-provided interfaces** that allow JavaScript to interact with the browser environment beyond the core language capabilities.

They are a **foundational concept** for understanding:

* Asynchronous JavaScript
* Browser behavior
* Event loop & concurrency

This is a **frequent SDE-2 interview topic**.

---

## Quick Interview Definition

> Web APIs are browser-provided features that allow JavaScript to perform tasks like DOM manipulation, timers, network requests, storage, and multimedia handling.

---

## Why Do We Need Web APIs?

JavaScript itself:

* Is **single-threaded**
* Has **no built-in access** to browser features

Web APIs enable:

* Timers (`setTimeout`)
* HTTP requests (`fetch`)
* DOM manipulation
* Event handling
* Storage access

---

## JavaScript vs Web APIs (Important)

| JavaScript            | Web APIs                 |
| --------------------- | ------------------------ |
| Language              | Browser features         |
| Defined by ECMAScript | Defined by Web standards |
| No DOM                | DOM access               |
| No timers             | Timers available         |

> Web APIs are **not part of JavaScript**.

---

## Common Web APIs

### DOM API

```js
document.querySelector('div');
```

Used to manipulate HTML & CSS.

---

### Timer APIs

```js
setTimeout(() => console.log('Hi'), 1000);
setInterval(() => console.log('Tick'), 1000);
```

---

### Fetch API

```js
fetch('/api/data')
  .then(res => res.json())
  .then(console.log);
```

---

### Storage APIs

```js
localStorage.setItem('key', 'value');
sessionStorage.getItem('key');
```

---

### Console API

```js
console.log('Debug');
```

---

### Geolocation API

```js
navigator.geolocation.getCurrentPosition(pos => {
  console.log(pos.coords.latitude);
});
```

---

### Web Workers API

```js
const worker = new Worker('worker.js');
```

Runs JS in background threads.

---

## Where Do Web APIs Run?

* Web APIs run **outside the JavaScript engine**
* Managed by the **browser environment**

```text
JS Engine (Call Stack)
      ↓
Web APIs (Browser)
      ↓
Task / Microtask Queue
```

---

## Web APIs and the Event Loop

Example:

```js
setTimeout(() => console.log('timeout'), 0);
```

Flow:

1. JS calls `setTimeout`
2. Browser handles timer (Web API)
3. Callback queued
4. Event loop pushes it to stack

---

## Web APIs vs Node.js APIs

| Browser Web APIs    | Node.js APIs             |
| ------------------- | ------------------------ |
| DOM, fetch, alert   | fs, http, crypto         |
| Provided by browser | Provided by Node runtime |

Node.js does NOT have browser Web APIs.

---

## Synchronous vs Asynchronous Web APIs

### Async Web APIs

* `setTimeout`
* `fetch`
* DOM events

### Sync Web APIs

* `alert()` (blocks execution)

---

## Common Interview Pitfalls

❌ Thinking Web APIs are part of JS
❌ Confusing Web APIs with Node APIs
❌ Not understanding async flow

---

## Interview One-Liners (SDE-2)

* "Web APIs are browser-provided"
* "They enable async behavior"
* "JS engine delegates work to Web APIs"
* "Event loop coordinates execution"

---

## Key Takeaways

* Web APIs extend JavaScript capabilities
* Provided by browser environment
* Essential for async and UI work
* Core to event loop understanding

---
