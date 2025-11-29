# JavaScript Event Loop

The **Event Loop** is the heart of JavaScript’s concurrency model.
JavaScript is **single-threaded**, so it uses the Event Loop to manage asynchronous operations without blocking execution.

The Event Loop decides **what to execute next** by coordinating:

* Call Stack
* Microtask Queue
* Callback (Task) Queue
* Node.js Event Loop Phases

---

## 1. How It Works (High-Level)

1. JavaScript executes code line-by-line in the **Call Stack**.
2. When async operations (setTimeout, promises, I/O) occur:

   * They are handled by Web APIs or Node APIs.
3. Their callbacks are moved into the appropriate **queue**.
4. The Event Loop picks tasks from queues only when the **call stack is empty**.

---

## 2. Microtasks vs Macrotasks

### **Microtask Queue** (High Priority)

Contains:

* Promises (`.then`, `.catch`)
* `process.nextTick` (Node.js, even higher priority)

### **Macrotask Queue** (Callback Queue)

Contains:

* `setTimeout`
* `setInterval`
* I/O callbacks
* `setImmediate` (Node.js)

**Order of execution:**

```
1. process.nextTick() (Node-only)
2. Microtasks (Promises)
3. Macrotasks (Timers, I/O, etc.)
```

---

## 3. Node.js Event Loop Phases

Node.js divides tasks into specific phases:

1. **Timers Phase** – runs callbacks from `setTimeout` and `setInterval`.
2. **I/O Callbacks Phase** – executes completed I/O callbacks.
3. **Idle/Prepare Phase** – internal use.
4. **Poll Phase** – retrieves new I/O events, executes I/O callbacks.
5. **Check Phase** – executes `setImmediate` callbacks.
6. **Close Callbacks Phase** – executes close events like `socket.on('close')`.

**Microtasks run after every phase** before moving to the next one.

---

## 4. Example to Understand Execution Order

```js
console.log("A");

setTimeout(() => console.log("Timeout"), 0);

setImmediate(() => console.log("Immediate"));

Promise.resolve().then(() => console.log("Promise"));

process.nextTick(() => console.log("nextTick"));

console.log("B");
```

### **Execution Order:**

```
A
B
nextTick       (highest priority)
Promise        (microtask)
Timers/Check → depends on thread
Timeout or Immediate
```

---

## 5. Why Order Differs Between Timeout vs Immediate?

* If script finishes first: `setImmediate` may run first.
* If timer expires earlier: `setTimeout` may run first.

Their order is **not guaranteed** unless inside the poll phase.

---

## 6. Call Stack, Microtasks, and Macrotasks

### **Call Stack**

The Call Stack is where JavaScript executes functions *one at a time*.
It follows **LIFO (Last In, First Out)**.

```js
function a() { b(); }
function b() { console.log("Hi"); }
a();
```

Execution order in stack:

```
1. a()
2. b()
3. console.log()
```

When the stack is empty, the Event Loop picks the next task.

---

### **Microtasks** (High Priority)

Microtasks are small, fast jobs that must execute **before** moving to the next Event Loop phase.

Microtasks include:

* Promises (`.then`, `.catch`)
* `queueMicrotask()`
* `process.nextTick()` (Node.js, even higher priority)

**Key rule:** After each macrotask or phase, all microtasks are executed.

```js
console.log("start");
Promise.resolve().then(() => console.log("microtask"));
console.log("end");
```

**Output:**

```
start
end
microtask
```

---

### **Macrotasks**

Macrotasks (a.k.a. Tasks) include slower or larger async operations:

* `setTimeout`
* `setInterval`
* `setImmediate`
* I/O callbacks

Macrotasks are executed **one per loop iteration**, and microtasks run after each one.

```js
setTimeout(() => console.log("macrotask"), 0);
Promise.resolve().then(() => console.log("microtask"));
```

**Output:**

```
microtask
macrotask
```

---

## Final Takeaway

# JavaScript Event Loop Visual Diagram

Below is a **visual ASCII diagram** representing how the Event Loop works, including:

* Call Stack
* Web/Node APIs
* Microtask Queue
* Macrotask Queue
* Event Loop decision flow

---

## Event Loop Visual Diagram

```
               ┌───────────────────────────────┐
               │          Call Stack           │
               │  (Executes one frame at a     │
               │           time)               │
               └───────────────┬──────────────┘
                               │
                               ▼
                  (Synchronous code runs)
                               │
               ┌───────────────┴──────────────┐
               │        JavaScript APIs        │
               │   (Web APIs / Node APIs)      │
               │ setTimeout, I/O, fetch, etc.  │
               └───────────────┬──────────────┘
                               │
     ┌─────────────────────────┼──────────────────────────┐
     │                         │                          │
     ▼                         ▼                          ▼
┌──────────────┐     ┌────────────────┐        ┌────────────────────┐
│ Microtask    │     │ Macrotask      │        │   setImmediate     │
│ Queue        │     │ Queue          │        │ (Node.js Check)    │
│ (High prio)  │     │ (Callback Q)   │        │ Queue              │
│ Promises     │     │ setTimeout     │        └────────────────────┘
│ nextTick(*)  │     │ setInterval    │
└──────────────┘     └────────────────┘
     ▲                         ▲
     │                         │
     └───────────┬─────────────┘
                 │
                 ▼
        ┌──────────────────────┐
        │      Event Loop      │
        │  (Picks next task)   │
        └──────────────────────┘
                 │
     ┌───────────┴──────────────────────────────┐
     │  1. If Call Stack is empty:               │
     │       - Run all microtasks first          │
     │       - Then run one macrotask            │
     │  2. Repeat forever                        │
     └───────────────────────────────────────────┘
```

---

## Simplified Flow

```
1. Execute sync code (Call Stack)
2. Move async callbacks to queues
3. Event Loop checks Call Stack → if empty:
      a. Run all Microtasks (Promises, nextTick)
      b. Run one Macrotask (setTimeout, I/O)
4. Repeat
```

---

## Tip for Interviews

> **Microtasks always run before macrotasks**, and `process.nextTick()` runs before all microtasks.

This diagram helps you visualize why certain logs appear first even when timers are set to `0ms`.

