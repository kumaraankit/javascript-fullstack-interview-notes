# Pass-by-Value vs Pass-by-Reference — Complete Explanation (JavaScript)

Understanding **pass-by-value vs pass-by-reference** is critical for JavaScript interviews and real-world debugging. Many bugs related to **unexpected mutations** come from misunderstanding this concept.

This explanation is **SDE-2 interview ready** and suitable for long-term reference.

---

## First, a Very Important Clarification (Interview Gold)

> **JavaScript is NOT pass-by-reference.**
> JavaScript is **pass-by-value**, but for **objects, the value passed is a reference**.

This single sentence can **separate average candidates from strong ones**.

---

## What Does “Pass-by-Value” Mean?

**Pass-by-value** means:

* A **copy of the value** is passed to the function
* Changes inside the function **do not affect** the original variable

---

## Pass-by-Value with Primitives

Primitive types in JavaScript:

* `number`
* `string`
* `boolean`
* `null`
* `undefined`
* `symbol`
* `bigint`

---

### Example (Primitive)

```js
function update(x) {
  x = 20;
}

let a = 10;
update(a);

console.log(a); // 10
```

### Explanation

```text
a → 10
x → 10 (copy)
```

* `x` gets a copy of `a`
* Modifying `x` does not change `a`

---

## What Does “Pass-by-Reference” Mean?

**Pass-by-reference** means:

* The function receives a **direct reference** to the original variable
* Changes inside the function **affect the original**

> JavaScript does **NOT** support true pass-by-reference.

---

## Objects in JavaScript (The Tricky Part)

Objects include:

* Objects `{}`
* Arrays `[]`
* Functions

When passing objects:

* The **reference value** is passed **by value**

---

## Example: Object Mutation

```js
function update(obj) {
  obj.name = 'Ankit';
}

const user = { name: 'Rahul' };
update(user);

console.log(user.name); // 'Ankit'
```

### Why Did It Change?

```text
user → memory address A
obj  → copy of address A
```

Both point to the **same object in memory**.

---

## Reassigning an Object (Important Interview Trap)

```js
function update(obj) {
  obj = { name: 'Ankit' };
}

const user = { name: 'Rahul' };
update(user);

console.log(user.name); // 'Rahul'
```

### Explanation

* `obj` now points to a **new object**
* Original reference remains unchanged

---

## Visual Memory Model

```text
Stack:            Heap:
user ─────────▶ { name: 'Rahul' }
obj  ─────────▶ { name: 'Rahul' }
```

Reassignment breaks the link.

---

## Arrays Example

```js
function addItem(arr) {
  arr.push(4);
}

const nums = [1, 2, 3];
addItem(nums);

console.log(nums); // [1, 2, 3, 4]
```

Same reference behavior as objects.

---

## Summary Table (Very Important)

| Type      | Passed As         | Can Mutate Original? |
| --------- | ----------------- | -------------------- |
| Primitive | Value             | ❌ No                 |
| Object    | Value (reference) | ✅ Yes                |

---

## How to Avoid Unwanted Mutations

---

### 1. Shallow Copy

```js
const copy = { ...obj };
const arrCopy = [...arr];
```

---

### 2. Deep Copy

```js
const deepCopy = structuredClone(obj);
```

---

### 3. Immutable Patterns

```js
function updateUser(user) {
  return { ...user, name: 'Ankit' };
}
```

---

## Real-World Impact

* Redux state mutations
* React props bugs
* Shared config objects
* Unexpected side effects

---

## Common Interview Pitfalls

❌ Saying JS is pass-by-reference
❌ Forgetting primitives are copied
❌ Confusing mutation with reassignment

---

## Interview One-Liners (SDE-2)

* "JavaScript is pass-by-value"
* "Objects pass a reference value"
* "Mutating an object affects all references"
* "Reassigning a parameter does not affect the original"

---

## Quick Comparison with Other Languages

| Language   | Parameter Passing        |
| ---------- | ------------------------ |
| JavaScript | Pass-by-value            |
| Java       | Pass-by-value            |
| C++        | Value / Reference        |
| Python     | Pass-by-object-reference |

---

## Key Takeaways

* JS always passes arguments **by value**
* Objects appear like reference due to shared memory
* Mutation ≠ reassignment
* Understanding this prevents real production bugs

---
