# Difference Between `==` and `===` in JavaScript

A clean, deep, interview-ready explanation with tricky examples.

---

## **1. `==` (Loose Equality)**

Performs **type coercion** before comparison.

### Example

```js
5 == "5"; // true  → string converted to number
```

### How it works

JavaScript attempts to convert both values into a **common type**, then compares.

### Tricky Cases

```js
0 == false;      // true → both become 0
"" == false;     // true → both become 0
null == undefined; // true → special rule
```

### When to use

Rarely. Only when intentional coercion is desired.

---

## **2. `===` (Strict Equality)**

Compares **without type coercion**.

### Example

```js
5 === "5"; // false  → different types
```

### When to use

**Always** unless you have a very specific need for coercion.

---

## **3. Tricky Comparison Table**

```js
0 == "0";      // true
0 === "0";     // false

null == undefined;  // true
null === undefined; // false

[] == "";      // true
[] === "";     // false

[] == 0;        // true
"" == 0;       // true

[1] == 1;       // true → [1].toString() → "1"
[1] === 1;      // false
```

---

## **4. Deep Dive: Why These Happen?**

### **Case: `[] == 0` is true**

Steps:

1. `[]` converted to primitive → `""`
2. `""` converted to number → `0`
3. `0 == 0` → **true**

### **Case: `null == undefined` is true**

JavaScript has a **special rule**:

```
null loosely equals undefined and nothing else.
```

### **Case: `[1] == 1`**

1. `[1].toString()` → `"1"`
2. `"1"` → number `1`
3. `1 == 1` → **true**

---

## **5. Best Practice (Interview-Ready Statement)**

> Always use `===`.
> Use `==` *only* when you intentionally leverage coercion and understand the exact conversion rules.

---

If you want, I can also add:

* Coercion conversion flow diagram
* More tricky comparisons (NaN cases, objects, symbols)
* Interview questions with answers

---

# 🔥 Additional Tricky Examples, `NaN` Behavior & `Object.is()` vs `===`

Deep, interview-heavy concepts added below.

## **6. NaN Comparison Rules**

### ❗ `NaN` is the only value in JS that is **not equal to itself**.

```js
NaN === NaN; // false
NaN == NaN;  // false
```

### How to correctly check for `NaN`

```js
Number.isNaN(NaN); // true
Number.isNaN(10);  // false
```

### WHY?

`NaN` represents an **invalid number** — mathematically, it's not equal to anything.

---

## **7. `Object.is()` vs `===`**

### `Object.is()` is like `===` with two important differences:

### 📌 Difference 1: NaN Check

```js
Object.is(NaN, NaN); // true
NaN === NaN;         // false
```

### 📌 Difference 2: Handling -0 and +0

```js
Object.is(-0, +0); // false
-0 === +0;        // true
```

### Use Cases

* When exact semantics needed (`NaN`, `-0` detection)
* React state comparison internally uses `Object.is()`

---

## **8. More Advanced Tricky `==` vs `===` Examples**

### **Case A: Boolean coercion weirdness**

```js
true == 1;  // true
true == 2;  // false
false == 0; // true
```

**Why?** Booleans → Number (`true→1`, `false→0`).

---

### **Case B: Empty structures**

```js
[] == ![]; // true
```

### Explanation

1. `![]` → `false`
2. `[] == false`
3. `[]` → "" → 0
4. `false` → 0
   → `0 == 0` ✔ true

---

### **Case C: Arrays magically becoming strings**

```js
[1,2] == "1,2"; // true
[1,2].toString(); // "1,2"
```

Array → string during coercion.

---

### **Case D: Comparison with null or undefined**

```js
null == undefined; // true
null == 0;         // false
undefined == 0;    // false
```

`null` and `undefined` are **loosely equal only to each other**.

---

### **Case E: Object vs Primitive**

```js
({}) == "[object Object]"; // true
```

📌 Because `{}` → toString() → `"[object Object]"`

---

## **9. The MOST Confusing Interview Example**

```js
[] == 0;        // true
[] == "";      // true
0 == "";       // true
// But…
[] === 0;       // false
0 === "";      // false
```

This shows why coercion is dangerous.

---

## **10. Bonus: Strict comparison of objects**

```js
{} === {}; // false
[] === []; // false
```

Objects are compared by **reference**, not value.

But…

```js
const a = {};
const b = a;
a === b; // true
```

---

## **11. Summary Table (Added for Quick Revision)**

| Comparison    | Allows Type Coercion? | Special Behavior                      |
| ------------- | --------------------- | ------------------------------------- |
| `==`          | Yes                   | `null == undefined`, arrays → strings |
| `===`         | No                    | Normal strict comparison              |
| `Object.is()` | No                    | Distinguishes `NaN` and `+0`/`-0`     |

---


