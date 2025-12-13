# JavaScript Garbage Collection (GC) — How It Works

Garbage Collection is a **core JavaScript runtime concept** and a **frequent SDE-2 interview topic**, especially when discussing **memory leaks, performance, and large-scale applications**.

---

## What Is Garbage Collection?

**Garbage Collection (GC)** is the process by which JavaScript **automatically frees memory** that is no longer needed by the program.

> JavaScript is a *garbage-collected language*, meaning developers **do not manually free memory**.

---

## Why Garbage Collection Is Needed

Without GC:

* Memory usage would grow endlessly
* Applications would slow down
* Browsers / Node.js processes would crash

GC ensures:

* Efficient memory usage
* Application stability
* Developer productivity

---

## Memory Lifecycle in JavaScript

Every value follows this lifecycle:

1. **Allocate memory**
2. **Use memory**
3. **Release memory (GC)**

Example:

```js
let user = { name: 'Ankit' }; // memory allocated
user = null;                 // memory eligible for GC
```

---

## What Memory Does JavaScript Manage?

* Objects
* Arrays
* Functions
* Closures
* DOM references

Primitive values are usually stack-allocated and short-lived.

---

## Core Concept: Reachability

JavaScript uses **reachability**, not reference counting (mostly).

> A value is **reachable** if it can be accessed from the root.

### GC Roots

* Global objects (`window`, `global`)
* Currently executing function stack
* Local variables & parameters

---

## Mark-and-Sweep Algorithm (MOST IMPORTANT)

### How It Works

1. Start from GC roots
2. **Mark** all reachable objects
3. **Sweep** (delete) unmarked objects

```text
Roots → Reachable → Keep
Unreachable → Collect
```

### Example

```js
let user = { name: 'A' };
let admin = user;

user = null; // still reachable via admin
admin = null; // now unreachable → GC
```

---

## Visual Mental Model

```text
Global
  ↓
Object A → Object B

If Global loses reference → A & B collected
```

---

## Reference Counting (Historical)

### How It Works

Counts references to an object.

```js
let a = {};
let b = a; // count = 2
a = null;  // count = 1
b = null;  // count = 0 → GC
```

### Problem: Circular References ❌

```js
function circular() {
  const a = {};
  const b = {};
  a.b = b;
  b.a = a;
}
```

Modern JS engines avoid this issue using mark-and-sweep.

---

## Closures and Garbage Collection

Closures keep references **alive**.

```js
function outer() {
  const largeData = new Array(1e6);

  return function inner() {
    console.log(largeData.length);
  };
}

const fn = outer(); // largeData not collected
```

⚠️ Long-lived closures can cause memory leaks.

---

## Common Causes of Memory Leaks

### 1. Global Variables

```js
leak = 'I am global'; // ❌
```

---

### 2. Forgotten Timers

```js
setInterval(() => {
  console.log('running');
}, 1000);
```

❌ Not cleared → memory retained

---

### 3. Detached DOM Nodes

```js
const el = document.getElementById('box');
el.remove();
// reference still exists → leak
```

---

### 4. Event Listeners Not Removed

```js
element.addEventListener('click', handler);
// handler retains references
```

---

## WeakMap & WeakSet (GC-Friendly)

### Key Feature

Keys are **weakly referenced**.

```js
const wm = new WeakMap();
let obj = {};
wm.set(obj, 'data');
obj = null; // GC collects obj
```

Used for:

* Caching
* Private data storage

---

## Garbage Collection in Browsers vs Node.js

* Browsers & Node.js use **V8 engine**
* V8 uses:

  * Generational GC
  * Incremental GC
  * Concurrent GC

---

## Generational Garbage Collection (V8)

### Concept

Most objects die young.

* **Young Generation** → frequent GC
* **Old Generation** → infrequent GC

Improves performance dramatically.

---

## GC Performance Impact

* GC pauses can block the main thread
* Large heaps = longer pauses
* Excessive allocations hurt performance

---

## Best Practices to Avoid GC Issues

* Avoid unnecessary object creation
* Clear timers & listeners
* Use WeakMap when appropriate
* Avoid long-lived references
* Be careful with closures

---

## Interview One-Liners (SDE-2)

* "JavaScript uses mark-and-sweep based on reachability"
* "Unreachable objects are garbage collected"
* "Closures can accidentally retain memory"
* "WeakMap allows GC-friendly caching"

---

## Key Takeaways

* GC is automatic but not free
* Reachability determines collection
* Mark-and-sweep is the core algorithm
* Memory leaks are still possible

---
