# Question

**How would you implement deep cloning of an object?**

---

# Deep Cloning in JavaScript – Explanation

Deep cloning refers to creating a new object that recursively copies all nested objects, ensuring that no reference is shared between the original and the cloned object.

JavaScript does **not** have a built‑in deep clone function, but you can implement it using various approaches.

---

## 1. Deep Clone Using `structuredClone()` (Modern & Best Option)

```js
const original = {
  a: 1,
  b: { c: 2 },
};

const clone = structuredClone(original);

clone.b.c = 100;

console.log(original.b.c); // 2 (not affected)
```

### Pros

* Handles complex types: Dates, Maps, Sets, circular references
* Fast, built-in

### Cons

* Not supported in very old browsers

---

## 2. Deep Clone Using `JSON.parse(JSON.stringify())`

```js
const original = {
  name: "Ankit",
  details: { age: 26 },
};

const clone = JSON.parse(JSON.stringify(original));

clone.details.age = 30;

console.log(original.details.age); // 26
```

### Pros

* Easy one‑line solution

### Cons

❌ Cannot clone:

* Functions
* `undefined`
* Dates
* Maps, Sets
* Circular references (throws error)

---

## 3. Custom Recursive Deep Clone Function (Interview Favourite)

```js
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  const cloned = {};
  for (const key in obj) {
    cloned[key] = deepClone(obj[key]);
  }
  return cloned;
}

const original = {
  a: 10,
  b: { x: 20, y: { z: 30 } },
};

const clone = deepClone(original);
clone.b.y.z = 100;

console.log(original.b.y.z); // 30
```

### Pros

* Works for nested objects and arrays
* Great for interview demonstration

### Cons

* Does not support Maps, Sets, Dates, circular references unless manually handled

---

## 4. Deep Clone Using Lodash

```js
const _ = require('lodash');

const clone = _.cloneDeep(original);
```

### Pros

* Industry-standard solution
* Handles most complex structures

### Cons

* Requires dependency

---

# Summary Table

| Method                         | Pros                               | Cons                                      |
| ------------------------------ | ---------------------------------- | ----------------------------------------- |
| `structuredClone()`            | Fast, built-in, handles many types | Not compatible with very old browsers     |
| `JSON.parse(JSON.stringify())` | Simple, easy                       | Breaks on dates, functions, circular refs |
| Custom recursive clone         | Great for interviews               | Needs manual handling for advanced types  |
| Lodash `cloneDeep`             | Reliable, handles everything       | External dependency                       |

---
