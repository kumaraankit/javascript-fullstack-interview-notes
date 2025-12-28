# What is State in React and Why It Exists
---

## 1. What is State in React?

**State** is a **built-in data object** in React that stores **mutable data** which directly affects what is rendered on the UI.

In simple terms:

> **State represents data that can change over time and causes the UI to update.**

```jsx
const [count, setCount] = useState(0);
```

---

## 2. Why Do We Need State?

Without state:

* UI would be static
* No interactivity
* No dynamic updates

State enables:

### 1️⃣ Dynamic UI Updates

```jsx
<button onClick={() => setCount(count + 1)}>+</button>
```

### 2️⃣ User Interaction Handling

* Button clicks
* Form inputs
* API responses

### 3️⃣ UI as a Function of Data

React philosophy:

> **UI = f(state)**

---

## 3. State vs Props (Very Common Interview Question)

| Feature    | State               | Props         |
| ---------- | ------------------- | ------------- |
| Mutability | Mutable             | Immutable     |
| Ownership  | Component           | Parent        |
| Purpose    | Internal data       | Configuration |
| Update     | setState / useState | Parent only   |

---

## 4. State is Local and Encapsulated

* State belongs to a specific component
* Other components cannot access it directly

```jsx
function Counter() {
  const [count, setCount] = useState(0);
}
```

To share state:

* Lift state up
* Use Context / Redux

---

## 5. State Updates Trigger Re-render

Whenever state changes:

1. React schedules an update
2. Component re-renders
3. Virtual DOM is re-created
4. Diffing happens
5. Real DOM updates (if needed)

---

## 6. How State Works Internally (useState Deep Dive)

### Step-by-Step Flow

```jsx
setCount(prev => prev + 1);
```

Internally:

1. `setCount` queues an update
2. Update stored in Hook queue
3. React batches updates
4. Fiber marks component as dirty
5. Reconciliation starts
6. Commit phase updates DOM

⚠️ State updates are **asynchronous**

---

## 7. Why State Updates Are Asynchronous

```jsx
setCount(count + 1);
console.log(count); // old value
```

Reasons:

* Performance optimization
* Batching multiple updates
* Avoid unnecessary re-renders

---

## 8. Functional State Updates (Interview Favorite)

```jsx
setCount(prevCount => prevCount + 1);
```

Why use this?

* Prevent stale state
* Required when updates depend on previous value

---

## 9. State in Class Components (Legacy)

```jsx
this.state = { count: 0 };
this.setState({ count: this.state.count + 1 });
```

Differences:

* `setState` merges state
* Hooks replace class state

---

## 10. Multiple State Variables

```jsx
const [name, setName] = useState('Ankit');
const [age, setAge] = useState(25);
```

Best Practice:

* Split unrelated state
* Avoid large state objects

---

## 11. State and Performance

State change = re-render

Optimization:

* Avoid unnecessary state
* Lift state minimally
* Use memoization

```jsx
React.memo(Component);
```

---

## 12. Common State Mistakes

* Mutating state directly

```js
count = count + 1 ❌
```

* Using stale state
* Overusing global state

---

## 13. State vs Variables (Interview Trick)

| Normal Variable | State              |
| --------------- | ------------------ |
| Changes ignored | Triggers re-render |
| Reset on render | Preserved          |
| No UI update    | UI updates         |

---

## 14. Interview One-Liners

**What is state?**

> State is mutable data managed by a component that determines its rendered output.

**Why state is needed?**

> State enables dynamic, interactive, and data-driven UI updates in React.

---

