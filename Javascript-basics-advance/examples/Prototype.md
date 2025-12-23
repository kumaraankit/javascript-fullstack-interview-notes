# JavaScript Prototypes
---

## 1) Basic Prototype Chain

### Question

```js
const user = { name: "Ankit" };

console.log(user.__proto__ === Object.prototype);
console.log(Object.getPrototypeOf(user) === Object.prototype);
console.log(Object.prototype.__proto__);
```

### Result

```
true
true
null
```

### Explanation

* Object literals inherit from `Object.prototype`.
* `Object.getPrototypeOf(obj)` is the standard way to read an object’s prototype.
* The prototype chain **always ends at `null`**.

**Chain:**

```
user → Object.prototype → null
```

---

## 2) Property Lookup: `in` vs `hasOwnProperty`

### Question

```js
console.log("toString" in user);
console.log(user.hasOwnProperty("toString"));
```

### Result

```
true
false
```

### Explanation

* `in` checks the object **and its prototype chain**.
* `hasOwnProperty` checks **only the object itself**.
* `toString` exists on `Object.prototype`, not on `user`.

**Rule to remember:**

* Use `hasOwnProperty` to distinguish **own** vs **inherited** properties.

---

## 3) Enumeration with `for...in`

### Question

```js
for (let key in user) {
  console.log(key);
}
```

### Result

```
name
```

### Explanation

* `for...in` iterates over **enumerable** properties.
* It includes inherited properties **only if** they are enumerable.
* Properties on `Object.prototype` (e.g., `toString`) are **non-enumerable**, so they are skipped.

---

## 4) Enumeration & Introspection — Comparison Table

| Method                            | Own Props | Prototype Props | Enumerable Only |
| --------------------------------- | --------- | --------------- | --------------- |
| `for...in`                        | ✅         | ✅               | ✅               |
| `Object.keys(obj)`                | ✅         | ❌               | ✅               |
| `Object.getOwnPropertyNames(obj)` | ✅         | ❌               | ❌               |

### Example

```js
Object.keys(user); // ["name"]
```

---

## 5) Key Interview Takeaways

* Every object has a prototype.
* Prototype lookup walks **up the chain**.
* The chain **terminates at `null`**.
* Prefer `Object.getPrototypeOf` over `__proto__`.
* Use `hasOwnProperty` to detect own properties.
* Enumeration respects **enumerability**.

---

## 6) Common Interview Traps

* Thinking `Object.prototype.__proto__` is an object → ❌ (it’s `null`).
* Assuming `for...in` lists all inherited props → ❌ (only enumerable ones).
* Confusing `in` with `hasOwnProperty` → ❌ (scope differs).

---
