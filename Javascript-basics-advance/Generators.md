# Generators in JavaScript

Generators are a special type of function in JavaScript that allow you to **pause and resume execution**. They are extremely useful when you want to produce values **on demand**, handle **large or infinite sequences**, or manage **complex control flows** in a clean way.

---

## Why Generators Exist

Normally, functions in JavaScript:

* Run **from start to end**
* Return **only once**

Generators solve problems like:

* Iterating over large data sets efficiently
* Lazy evaluation (compute only when needed)
* Creating custom iterators
* Writing asynchronous-looking code (before `async/await`)

---

## Generator Function Syntax

A generator function is declared using `function*` and uses the `yield` keyword.

```js
function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
```

Calling a generator function **does not execute it immediately**.

```js
const gen = myGenerator();
```

It returns a **generator object** (an iterator).

---

## How `yield` Works

* `yield` **pauses** the function
* Sends a value back to the caller
* Execution resumes from the same point on the next call

```js
function* generatorExample() {
  console.log('Start');
  yield 1;
  console.log('Middle');
  yield 2;
  console.log('End');
}

const gen = generatorExample();

console.log(gen.next()); // Start → { value: 1, done: false }
console.log(gen.next()); // Middle → { value: 2, done: false }
console.log(gen.next()); // End → { value: undefined, done: true }
```

---

## The `next()` Method

Each call to `.next()` returns an object:

```js
{
  value: any,
  done: boolean
}
```

Example:

```js
function* gen() {
  yield 'A';
  yield 'B';
}

const g = gen();

g.next(); // { value: 'A', done: false }
g.next(); // { value: 'B', done: false }
g.next(); // { value: undefined, done: true }
```

---

## Passing Values Into Generators

You can send values **into** a generator using `next(value)`.

```js
function* calculator() {
  const a = yield 'Enter A';
  const b = yield 'Enter B';
  return a + b;
}

const calc = calculator();

console.log(calc.next());      // { value: 'Enter A', done: false }
console.log(calc.next(10));    // { value: 'Enter B', done: false }
console.log(calc.next(20));    // { value: 30, done: true }
```

---

## Generators Are Iterators

Generators automatically implement the **iterator protocol**, so they work with `for...of`.

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

for (const num of numbers()) {
  console.log(num);
}
```

---

## Infinite Generators (Lazy Evaluation)

Generators can produce infinite sequences safely.

```js
function* infiniteCounter() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const counter = infiniteCounter();

console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
```

---

## `yield*` (Delegating to Another Generator)

You can delegate iteration to another generator using `yield*`.

```js
function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield* gen1();
  yield 3;
}

for (const value of gen2()) {
  console.log(value);
}
// 1, 2, 3
```

---

## Generators vs Normal Functions

| Feature   | Normal Function | Generator Function |
| --------- | --------------- | ------------------ |
| Execution | Runs fully      | Pausable           |
| Return    | Once            | Multiple yields    |
| State     | Not preserved   | Preserved          |
| Iterable  | ❌               | ✅                  |

---

## Generators vs Async/Await

| Generators         | Async/Await                |
| ------------------ | -------------------------- |
| Manual control     | Automatic promise handling |
| Uses `yield`       | Uses `await`               |
| Can pause anywhere | Pauses on promises         |
| Lower-level        | Higher-level abstraction   |

---

## Real-World Use Cases

* Custom iterators
* Streaming large data
* Pagination logic
* State machines
* Implementing cooperative multitasking
* Complex workflows

---

## Interview One-Liner (SDE-2 Level)

> A generator is a special function that can pause execution using `yield`, maintain its internal state, and resume later, making it ideal for lazy evaluation and custom iteration.

---

## Key Takeaways

* Generators use `function*` and `yield`
* Execution can be paused and resumed
* They return iterator objects
* Useful for lazy, memory-efficient data processing

---
