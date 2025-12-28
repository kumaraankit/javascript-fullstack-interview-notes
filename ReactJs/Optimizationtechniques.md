# React Performance Optimization Techniques (Complete Guide)

---

## 1️⃣ Prevent Unnecessary Re-renders (MOST IMPORTANT)

### ✅ Use `React.memo`

Prevents re-render if props don’t change.

```jsx
const UserCard = React.memo(({ user }) => {
  return <div>{user.name}</div>;
});
```

🔹 Use when:

* Component is **pure**
* Props are stable

⚠️ Don’t overuse – shallow comparison cost exists.

---

### ✅ Memoize Callbacks (`useCallback`)

Avoid function recreation on every render.

```jsx
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);
```

Used with `React.memo` children.

---

### ✅ Memoize Expensive Computations (`useMemo`)

```jsx
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);
```

Prevents expensive recalculations.

---

## 2️⃣ Optimize State Management

### ❌ Bad

```jsx
const [form, setForm] = useState({ name: '', email: '' });
```

Every change re-renders entire component.

### ✅ Good

Split state

```jsx
const [name, setName] = useState('');
const [email, setEmail] = useState('');
```

---

### ✅ Lift State Only When Needed

Avoid global state if local state is enough.

---

## 3️⃣ Optimize Lists & Rendering

### ✅ Use Stable Keys

```jsx
items.map(item => (
  <Row key={item.id} />
))
```

❌ Never use index as key for dynamic lists.

---

### ✅ List Virtualization (Huge Performance Boost)

Use when rendering large lists.

Libraries:

* `react-window`
* `react-virtualized`

Only visible rows are rendered.

---

## 4️⃣ Optimize Effects (`useEffect`)

### ❌ Missing dependency array

```jsx
useEffect(() => {
  fetchData();
});
```

Runs every render ❌

### ✅ Correct

```jsx
useEffect(() => {
  fetchData();
}, []);
```

---

### ⚠️ Avoid Heavy Logic Inside Effects

Move heavy work outside or debounce it.

---

## 5️⃣ Code Splitting & Lazy Loading

### ✅ `React.lazy` + `Suspense`

```jsx
const Dashboard = React.lazy(() => import('./Dashboard'));
```

Loads code **only when needed**.

---

### ✅ Route-level Code Splitting

```jsx
<Route path="/admin" element={<Admin />} />
```

Each route loads its own bundle.

---

## 6️⃣ Context API Optimization

### ❌ Problem

One context update re-renders all consumers.

### ✅ Solutions

* Split contexts
* Memoize provider value

```jsx
const value = useMemo(() => ({ user }), [user]);
```

---

## 7️⃣ Avoid Anonymous Functions in JSX

❌

```jsx
<button onClick={() => doSomething()} />
```

✅

```jsx
<button onClick={handleClick} />
```

---

## 8️⃣ Debouncing & Throttling

Used for:

* Search
* Scroll
* Resize

```jsx
const debouncedSearch = useCallback(debounce(search, 300), []);
```

---

## 9️⃣ Optimize Images & Assets

* Lazy load images
* Use WebP
* Compress assets

```html
<img loading="lazy" />
```

---

## 🔟 React 18 Performance Features

### ✅ Automatic Batching

Multiple state updates → single render.

### ✅ `useTransition`

```jsx
const [isPending, startTransition] = useTransition();
```

Marks non-urgent updates.

---

### ✅ `useDeferredValue`

Defers heavy updates for smoother UI.

---

## 1️⃣1️⃣ Avoid Overusing Refs

Refs bypass React rendering system → can cause inconsistencies.

---

## 1️⃣2️⃣ Measure Performance (Very Important)

### 🔍 React Profiler

* Identify slow components
* Check render duration

### 🔍 Chrome DevTools

* FPS
* Memory leaks

---

## 🧠 Interview One-Liners (SDE-2)

* “Most React performance issues are caused by unnecessary re-renders.”
* “Memoization is helpful but not free.”
* “Optimize based on profiling, not assumptions.”
* “Code splitting and virtualization give the biggest real-world gains.”

---


