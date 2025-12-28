# React Fiber Architecture – How React Works Internally
---

## 1. What is React Fiber?

**React Fiber** is React’s **reconciliation engine** (internal architecture) introduced in **React 16**.

In simple terms:

> **Fiber is the algorithm that React uses to decide what to render, when to render, and how to render efficiently.**

It replaces the old **Stack Reconciler**.

---

## 2. Why React Fiber Was Introduced

### Problems with Old Stack Reconciler

Before Fiber:

* Rendering was **synchronous**
* Large updates blocked the main thread
* UI became unresponsive
* No way to pause or prioritize work

---

### Fiber Solves These Problems

Fiber enables:

1. **Incremental rendering** (split work into chunks)
2. **Pausing and resuming work**
3. **Prioritization of updates**
4. **Better user experience**
5. **Concurrent features**

---

## 3. What is a Fiber Node?

A **Fiber** is a **JavaScript object** that represents:

* A component
* A DOM element
* Or a unit of work

Each Fiber node stores:

* Component type
* Props
* State
* Hooks
* Effects
* Links to parent, child, sibling

```txt
Fiber Tree ≈ Linked List structure
```

---

## 4. Fiber Tree Structure

Each Fiber node has pointers:

* `child` → first child
* `sibling` → next sibling
* `return` → parent

This structure allows React to:

* Traverse efficiently
* Pause and resume rendering

---

## 5. Render Phase vs Commit Phase (Very Important)

React Fiber divides work into **two phases**.

---

### 1️⃣ Render Phase (Reconciliation Phase)

What happens:

* Component functions are executed
* New Fiber tree is built
* Virtual DOM is created
* Changes are calculated

Characteristics:

* Can be paused
* Can be interrupted
* Can be restarted
* No DOM mutations

---

### 2️⃣ Commit Phase

What happens:

* Changes applied to real DOM
* Effects are executed
* Layout & paint occur

Characteristics:

* **Synchronous**
* **Cannot be interrupted**
* Must finish once started

---

## 6. Units of Work (Core Fiber Concept)

Fiber breaks rendering into **small units of work**.

Each unit:

* Processes one Fiber node
* Can yield control back to browser

This prevents:

* Long blocking tasks
* UI freezing

---

## 7. Scheduling and Priority Levels

Not all updates are equal.

Fiber assigns priorities:

* User input (high priority)
* Animations
* Data fetching
* Background updates

Higher priority work can **interrupt lower priority work**.

---

## 8. Concurrent Rendering (React 18)

With Fiber, React supports:

* Rendering in background
* Interruptible rendering
* Smooth UI updates

Examples:

* `startTransition`
* `useDeferredValue`

---

## 9. Fiber and Hooks

Hooks are stored on the Fiber node.

For each component Fiber:

* Hook state linked as a list
* Order of hooks matters

This is why:

> Hooks must be called in the same order

---

## 10. Fiber and Effects

During render phase:

* Effects are collected

During commit phase:

* `useEffect` runs after paint
* `useLayoutEffect` runs before paint

---

## 11. Fiber vs Virtual DOM

| Fiber               | Virtual DOM         |
| ------------------- | ------------------- |
| Architecture        | Data representation |
| Controls scheduling | Controls UI diff    |
| Enables concurrency | Represents UI state |

Fiber works **under** the Virtual DOM.

---

## 12. Performance Benefits of Fiber

Fiber enables:

* Time slicing
* Batching updates
* Smooth animations
* Better perceived performance

---

## 13. Interview One-Liners (Very Important)

**What is React Fiber?**

> React Fiber is the reconciliation engine that enables incremental rendering, prioritization, and concurrency in React.

**Why Fiber was introduced?**

> To overcome limitations of synchronous rendering and improve responsiveness.

**Render vs Commit phase?**

> Render is interruptible and calculates changes, commit applies them synchronously.

---


