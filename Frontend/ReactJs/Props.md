# What are Props in React and Why They Exist

## 1. What are Props?

**Props (short for Properties)** are **read-only inputs** passed from a **parent component to a child component** in React.

They allow components to be **dynamic, reusable, and configurable**.

```jsx
function Greeting(props) {
  return <h1>Hello {props.name}</h1>;
}

<Greeting name="Ankit" />
```

---

## 2. Why Do We Need Props?

Without props, components would be:

* Static
* Hard-coded
* Not reusable

Props solve this by allowing:

### 1️⃣ Component Reusability

```jsx
<Button label="Save" />
<Button label="Delete" />
```

### 2️⃣ Data Flow Between Components

Props enable **parent → child communication**.

### 3️⃣ Separation of Concerns

* Parent manages data
* Child focuses on UI rendering

---

## 3. Props Follow One-Way Data Flow (Very Important)

React enforces **unidirectional data flow**:

```
Parent → Child
```

Why?

* Predictable state changes
* Easier debugging
* Better performance

Children **cannot modify props directly**.

---

## 4. Props are Immutable (Interview Favorite)

Props are **read-only**.

❌ Wrong:

```jsx
props.name = "Rahul";
```

✅ Correct:

* Parent updates state
* New props are passed down

Why immutability?

* Prevents side effects
* Enables efficient re-rendering

---

## 5. Props vs State (Very Common Question)

| Feature    | Props         | State               |
| ---------- | ------------- | ------------------- |
| Mutability | Immutable     | Mutable             |
| Ownership  | Parent        | Component itself    |
| Purpose    | Configuration | Dynamic data        |
| Update     | Parent only   | setState / useState |

---

## 6. How Props Work Internally

When a component is rendered:

```jsx
<User name="Ankit" />
```

Internally compiles to:

```js
React.createElement(User, { name: 'Ankit' })
```

React stores props on the **Fiber node** and compares them during reconciliation.

If props change:

* Component re-renders
* Virtual DOM diffing happens

---

## 7. Props Destructuring (Best Practice)

Instead of:

```jsx
function User(props) {
  return <p>{props.name}</p>;
}
```

Use:

```jsx
function User({ name }) {
  return <p>{name}</p>;
}
```

Benefits:

* Cleaner code
* Better readability

---

## 8. Passing Functions as Props

Props can include **functions**.

```jsx
function Parent() {
  const handleClick = () => console.log('Clicked');
  return <Child onClick={handleClick} />;
}
```

Used for:

* Event handling
* Child → Parent communication

---

## 9. Children Prop

React automatically provides `props.children`.

```jsx
<Card>
  <h1>Title</h1>
</Card>
```

```jsx
function Card({ children }) {
  return <div>{children}</div>;
}
```

Used for:

* Layout components
* Wrapper components

---

## 10. Default Props

### Functional Components

```jsx
function Button({ type = 'primary' }) {
  return <button>{type}</button>;
}
```

---

## 11. Props and Performance

Changing props triggers a **re-render**.

Optimization techniques:

* `React.memo`
* `useCallback`
* `useMemo`

```jsx
export default React.memo(Component);
```

---

## 12. Props Validation (Type Safety)

### With PropTypes

```js
User.propTypes = {
  name: PropTypes.string.isRequired
};
```

### With TypeScript (Preferred)

```ts
type Props = { name: string };
```

---

## 13. Common Mistakes with Props

* Mutating props
* Over-passing props (prop drilling)
* Passing unstable functions

Solution:

* Lift state wisely
* Use Context when needed

---

## 14. Interview One-Liners

**What are props?**

> Props are immutable inputs passed from parent to child components to configure and reuse components.

**Why props are immutable?**

> Immutability ensures predictable UI updates and efficient reconciliation.

---

---

