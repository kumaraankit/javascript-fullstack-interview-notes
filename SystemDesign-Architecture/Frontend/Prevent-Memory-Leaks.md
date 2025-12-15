# Causes of Memory Leaks in Frontend Applications

This document explains **what memory leaks are, why they happen in frontend (FE) applications, and how to prevent them**, with a strong **JavaScript + Browser internals** focus. It is written for **interview preparation (3–7+ years experience)**.

---

## 1. What Is a Memory Leak?

A **memory leak** happens when:

* Memory is allocated
* But **never released**
* Even though it is no longer needed

In frontend apps, this usually means:

* JavaScript objects are still referenced
* Browser cannot garbage-collect them

---

## 2. Why Memory Leaks Are Dangerous

* Slower page performance over time
* Increased memory usage
* UI lag / freezes
* Browser tab crashes

Single Page Applications (SPAs) are **most vulnerable** because the page stays alive for a long time.

---

## 3. How Garbage Collection Works (Quick Recap)

JavaScript uses **Garbage Collection (GC)**.

Rule:

> If an object is **reachable**, it will not be garbage collected.

Common GC strategy:

* Mark-and-Sweep

Memory leaks happen when objects are **accidentally kept reachable**.

---

## 4. Common Causes of Memory Leaks in Frontend

---

## 4.1 Unremoved Event Listeners (Most Common)

### Problem

Event listeners keep references to DOM nodes.

```js
function addListener() {
  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
    console.log('clicked');
  });
}
```

If the element is removed but listener is not, memory leaks.

### Solution

```js
const handler = () => console.log('clicked');
btn.addEventListener('click', handler);
btn.removeEventListener('click', handler);
```

---

## 4.2 Global Variables

### Problem

Variables attached to `window` never get cleaned up.

```js
window.cache = [];
```

### Solution

* Avoid globals
* Use local scope or modules

---

## 4.3 Detached DOM Elements

### Problem

DOM nodes removed from document but still referenced.

```js
let div = document.createElement('div');
document.body.appendChild(div);
document.body.removeChild(div);
// div is still referenced
```

### Solution

```js
div = null;
```

---

## 4.4 Closures Holding Large Objects

### Problem

Closures can keep references alive.

```js
function heavy() {
  const largeData = new Array(1000000).fill('*');
  return function () {
    console.log(largeData.length);
  };
}
```

### Solution

* Avoid capturing unnecessary variables
* Explicitly null references

---

## 4.5 setInterval / setTimeout Not Cleared

### Problem

Timers keep running even after component is destroyed.

```js
setInterval(() => {
  console.log('running');
}, 1000);
```

### Solution

```js
const id = setInterval(() => {}, 1000);
clearInterval(id);
```

---

## 4.6 Observers Not Disconnected

Includes:

* IntersectionObserver
* MutationObserver
* ResizeObserver

### Problem

```js
const observer = new IntersectionObserver(() => {});
observer.observe(element);
```

### Solution

```js
observer.disconnect();
```

---

## 4.7 Large In-Memory Caches

### Problem

Unbounded caches grow indefinitely.

```js
const cache = {};
cache[key] = data;
```

### Solution

* Use size limits
* Implement LRU cache

---

## 4.8 Framework-Specific Leaks (React / Angular / Vue)

### Examples

* React: missing cleanup in `useEffect`
* Angular: not unsubscribing from Observables

```js
useEffect(() => {
  const id = setInterval(() => {}, 1000);
  return () => clearInterval(id);
}, []);
```

---

## 4.9 DOM References Stored in JS Objects

### Problem

```js
const store = {
  element: document.getElementById('box')
};
```

If DOM node is removed, reference still exists.

### Solution

* Avoid storing DOM references globally

---

## 4.10 Console Logs (Yes, Really)

### Problem

DevTools keep references for inspection.

```js
console.log(largeObject);
```

### Solution

* Remove logs in production

---

## 5. How to Detect Memory Leaks

Tools:

* Chrome DevTools → Memory tab
* Heap Snapshots
* Allocation Timeline

Steps:

1. Take snapshot
2. Perform actions
3. Take another snapshot
4. Compare retained objects

---

## 6. How to Prevent Memory Leaks (Checklist)

* Remove event listeners
* Clear timers
* Disconnect observers
* Avoid globals
* Clean up framework hooks
* Limit caches

---

## 7. Interview-Ready Explanation (Short)

> “Frontend memory leaks usually occur due to unremoved event listeners, global references, closures holding data, detached DOM nodes, or uncleared timers. Since JS garbage collection relies on reachability, any accidental reference prevents cleanup.”

---

---

## 8. Summary

* Memory leaks happen due to retained references
* Browser cannot GC reachable objects
* Cleanup is developer’s responsibility
* Detection + discipline prevents leaks

---

