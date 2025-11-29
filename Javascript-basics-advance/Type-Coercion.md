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

