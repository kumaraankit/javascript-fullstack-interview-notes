# What Happens Internally When `setCount` (or any state setter) is Called in a Functional Component

---

## 1. Calling the State Setter

```jsx
setCount(count + 1);
```

What this **does NOT** do:

* ❌ It does not immediately change `count`
* ❌ It does not re-render instantly

What it **actually does**:

* ✅ Requests React to update state
* ✅ Schedules a re-render

The current render still sees the **old value** of `count`.

---

## 2. React Creates an Update Object

Internally, React creates an **update object**:

```text
Update {
  action: newState | updaterFunction,
  priority: updatePriority
}
```

This update is:

* Stored in a **queue** attached to the hook
* NOT applied immediately

---

## 3. Update Is Added to the Hook’s Queue

Each `useState` hook has its own **update queue**.

```text
Fiber Node
  └── Hook (useState)
        └── Update Queue
              ├── update1
              ├── update2
```

Multiple updates can be queued before a render occurs.

---

## 4. React Schedules a Re-render

React then:

* Marks the component as **dirty**
* Schedules it for re-render

### Automatic Batching (React 18+)

```jsx
setCount(1);
setCount(2);
setCount(3);
```

✅ Only **one re-render** happens

Why?

* React **batches updates** within the same event loop

---

## 5. Component Function Re-executes

On re-render, React **calls the component function again**:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
}
```

Important points:

* The function runs **top to bottom again**
* Hooks are re-evaluated
* React reads the **latest state** from internal storage

---

## 6. Hooks Are Stored Using Call Order (Critical 🔥)

Internally, hooks are stored like a linked list:

```text
Fiber
 ├── Hook #1 (useState)
 ├── Hook #2 (useEffect)
 ├── Hook #3 (useRef)
```

React matches hooks by **call order**, not variable name.

### Why hooks cannot be conditional

```jsx
if (condition) {
  useState(); // ❌ breaks hook order
}
```

Because React would lose track of which hook is which.

---

## 7. New Virtual DOM Is Created

After state is updated:

* React creates a **new Virtual DOM tree**
* Compares it with the previous tree (**reconciliation**)

Only changed nodes are marked.

---

## 8. Commit Phase – Real DOM Update

In the commit phase:

* React updates **only affected DOM nodes**
* Browser repaint occurs

✅ UI updates with the new state

---

## 9. Why State Updates Are Asynchronous

```jsx
setCount(count + 1);
console.log(count); // old value
```

Because:

* Updates are queued
* Re-render hasn’t happened yet

### Correct Pattern

```jsx
setCount(prev => prev + 1);
```

---

## 10. Functional Updates (Very Important)

### ❌ Buggy Code

```jsx
setCount(count + 1);
setCount(count + 1);
```

Result: `+1`

### ✅ Correct Code

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Result: `+2`

Why?

* React processes updates **sequentially from the queue**

---

## 11. Complete Internal Flow (Interview Gold)

```text
setCount called
   ↓
Update object created
   ↓
Update queued in hook
   ↓
React schedules render
   ↓
Component function re-runs
   ↓
Hooks read updated state
   ↓
Virtual DOM diff
   ↓
DOM updates
```

---

## 12. Interview One‑Liner (Memorize This)

> **Calling a state setter in a functional component queues a state update, schedules a re-render, re-executes the component function, reconciles the virtual DOM, and commits minimal updates to the real DOM.**

---
