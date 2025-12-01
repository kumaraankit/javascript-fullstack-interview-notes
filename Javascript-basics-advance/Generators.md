# Generators in JavaScript — Interview‑Ready Notes

## ❓ What Are Generators?

Generators are **special functions** in JavaScript that can be **paused and resumed**. They allow you to control execution flow manually.

They are defined using `function*` and use the `yield` keyword to pause execution.

**Interview Definition:**

> A generator is a function that can pause its execution with `yield` and resume later, returning an iterator.

---

## 🔥 Basic Example

```js
function* demo() {
  console.log("Start");
  yield 1;

  console.log("Middle");
  yield 2;

  console.log("End");
  return 3;
}

const gen = demo();

console.log(gen.next()); // Start → { value: 1, done: false }
console.log(gen.next()); // Middle → { value: 2, done: false }
console.log(gen.next()); // End → { value: 3, done: true }
```

---

## ⚙️ How Generators Work Internally

### 1. Calling a generator does NOT execute it immediately

```js
const gen = demo(); // no logs printed yet
```

### 2. Execution happens only when calling `next()`

Each `next()` resumes execution until the next `yield`.

### 3. `yield` produces values and pauses execution

The generator freezes its state.

### 4. When the generator returns, `done: true` marks completion.

---

## 🎯 Why Are Generators Useful?

### ✔ Build custom iterators

```js
const obj = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};

for (let x of obj) console.log(x);
```

### ✔ Implement asynchronous flow (before async/await)

Generators can be combined with Promises.

### ✔ State machines

Pause and resume logic → perfect for controlled workflows.

### ✔ Infinite sequences

```js
function* infiniteCounter() {
  let i = 0;
  while (true) yield i++;
}
```

---

## 🔥 Tricky Example (Common Interview One)

```js
function* gen() {
  const x = yield 10;
  console.log("Received:", x);
  yield x * 2;
}

const g = gen();
console.log(g.next());      // { value: 10, done: false }
console.log(g.next(5));     // Received: 5 → { value: 10, done: false }
```

**Trick:**
The value passed to `next(value)` becomes the result of the previous `yield`.

---

## 🧠 Interview Summary Answer

> Generators are functions that can pause execution using `yield` and resume later with `next()`.
> They return an iterator, maintain internal state, and are useful for creating custom iterators, infinite sequences, or writing async code flows. The value passed into `next()` becomes the result of the last `yield`.

---
