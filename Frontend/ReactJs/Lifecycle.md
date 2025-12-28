# React Lifecycle – Class Components and Function Components (Hooks)

## 1. What is React Lifecycle?

The **React lifecycle** describes the **stages a component goes through** from:

```
Creation → Rendering → Updating → Removal
```

Lifecycle answers:

* When is a component created?
* When does it render?
* When does it update?
* When does it unmount?

---

## 2. React Lifecycle Phases (High-Level)

React lifecycle is divided into:

1. **Mounting** – component is created & inserted into DOM
2. **Updating** – props or state change
3. **Unmounting** – component is removed

---

## 3. Lifecycle in Class Components

Class components use **explicit lifecycle methods**.

---

### 3.1 Mounting Phase (Class Components)

Order of execution:

1️⃣ `constructor()`
2️⃣ `static getDerivedStateFromProps()`
3️⃣ `render()`
4️⃣ `componentDidMount()`

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    // API calls, subscriptions
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}
```

---

### 3.2 Updating Phase (Class Components)

Triggered when:

* `setState` is called
* props change

Order:

1️⃣ `static getDerivedStateFromProps()`
2️⃣ `shouldComponentUpdate()`
3️⃣ `render()`
4️⃣ `getSnapshotBeforeUpdate()`
5️⃣ `componentDidUpdate()`

---

### 3.3 Unmounting Phase (Class Components)

Method:

* `componentWillUnmount()`

Used for:

* Cleanup
* Removing listeners
* Cancelling timers

---

## 4. Lifecycle in Function Components (Hooks)

Function components **do not have lifecycle methods**.

Lifecycle is achieved using:

* `useEffect`
* `useLayoutEffect`

---

## 5. Mounting Lifecycle (Function Components)

```jsx
useEffect(() => {
  // runs after component mounts
}, []);
```

Equivalent to:

* `componentDidMount`

---

## 6. Updating Lifecycle (Function Components)

```jsx
useEffect(() => {
  // runs on dependency change
}, [count]);
```

Equivalent to:

* `componentDidUpdate`

---

## 7. Unmounting Lifecycle (Function Components)

```jsx
useEffect(() => {
  return () => {
    // cleanup
  };
}, []);
```

Equivalent to:

* `componentWillUnmount`

---

## 8. useEffect Lifecycle Summary

| useEffect Usage      | Lifecycle Behavior |
| -------------------- | ------------------ |
| `useEffect(fn, [])`  | Mount only         |
| `useEffect(fn, [x])` | Update on x        |
| Cleanup function     | Unmount            |

---

## 9. useLayoutEffect vs useEffect (Lifecycle Timing)

| Feature  | useEffect   | useLayoutEffect |
| -------- | ----------- | --------------- |
| Timing   | After paint | Before paint    |
| Blocking | No          | Yes             |
| Use case | Data fetch  | DOM measurement |

---

## 10. Lifecycle Mapped to Fiber Phases (Advanced)

### Render Phase (Interruptible)

* render()
* Function component execution

### Commit Phase (Non-interruptible)

* componentDidMount
* componentDidUpdate
* useEffect
* useLayoutEffect

---

## 11. Common Lifecycle Mistakes

* API calls in render
* Missing cleanup in effects
* Infinite re-render loops

---

## 12. Interview Mapping Table (Very Important)

| Class Component      | Function Component |
| -------------------- | ------------------ |
| constructor          | function execution |
| componentDidMount    | useEffect([], [])  |
| componentDidUpdate   | useEffect([deps])  |
| componentWillUnmount | cleanup function   |

---

## 13. Interview One-Liners

**Q: How lifecycle works in function components?**

> Function components use hooks like useEffect to simulate lifecycle behavior.

**Q: Which lifecycle runs after DOM paint?**

> useEffect and componentDidMount.

---
