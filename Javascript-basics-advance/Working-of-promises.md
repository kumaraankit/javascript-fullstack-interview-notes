# How Promises Work Internally in JavaScript — Complete Explanation

Promises are a **core asynchronous abstraction** in JavaScript. Understanding how they work **internally** is crucial for:

* Event loop mastery
* Async debugging
* SDE-2 / Senior frontend & backend interviews

---

## What Is a Promise?

A **Promise** is an object that represents the **eventual completion or failure** of an asynchronous operation.

High-level definition:

> A Promise is a state machine that manages async results and schedules callbacks via the microtask queue.

---

## Promise States (Internal State Machine)

A Promise can be in **only one of three states**:

| State       | Meaning             |
| ----------- | ------------------- |
| `pending`   | Initial state       |
| `fulfilled` | Operation succeeded |
| `rejected`  | Operation failed    |

Once settled (fulfilled/rejected), the state is **immutable**.

---

## Basic Promise Example

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});
```

---

## Promise Constructor Internals

```js
new Promise((resolve, reject) => {
  // executor function
});
```

Internally:

1. A Promise object is created
2. State = `pending`
3. `resolve` and `reject` functions are created
4. Executor function runs **synchronously**

---

## Important Interview Fact 🚨

```js
new Promise(() => {
  console.log('runs immediately');
});
```

> The **executor function executes immediately**, not asynchronously.

---

## How resolve() and reject() Work Internally

```js
resolve(value);
reject(error);
```

Internally:

* Transition state (`pending → fulfilled/rejected`)
* Store the result (`value` or `error`)
* Schedule `.then` / `.catch` callbacks

---

## Where Are Promise Callbacks Stored?

Internally, Promises maintain:

* `[[PromiseState]]`
* `[[PromiseResult]]`
* `[[PromiseFulfillReactions]]`
* `[[PromiseRejectReactions]]`

Callbacks are queued as **microtasks**.

---

## Promise.then() Internals

```js
p.then(onFulfilled, onRejected);
```

What happens:

1. A **new Promise** is returned
2. Callback is registered
3. Callback executes asynchronously (microtask)

---

## Promise Chaining (Critical Concept)

```js
p.then(v => v + 1)
 .then(v => v * 2)
 .then(console.log);
```

Internally:

* Each `.then()` returns a new Promise
* Returned value becomes the next promise’s resolution

---

## Return Rules in then()

| Return Value | Next Promise         |
| ------------ | -------------------- |
| Value        | Fulfilled with value |
| Promise      | Adopts its state     |
| Throw error  | Rejected             |

---

## Promise Resolution Procedure (Interview Gold)

When a Promise resolves with another promise:

```js
resolve(promise);
```

JavaScript:

* Waits for inner promise
* Adopts its final state

This prevents **promise nesting hell**.

---

## Error Handling Internals

```js
p.then(() => {
  throw new Error('fail');
}).catch(err => console.log(err));
```

* Errors automatically reject the next promise
* `.catch()` is just `.then(null, onRejected)`

---

## Promise.finally()

```js
p.finally(() => cleanup());
```

Internally:

* Runs regardless of outcome
* Does NOT receive result
* Does NOT modify value

---

## Microtask Queue (Very Important)

Promise callbacks run in the **microtask queue**.

```js
console.log('start');

Promise.resolve().then(() => console.log('promise'));

setTimeout(() => console.log('timeout'));

console.log('end');
```

Output:

```text
start
end
promise
timeout
```

---

## Why Promises Run Before setTimeout

Event Loop priority:

1. Call Stack
2. Microtask Queue (Promises)
3. Macrotask Queue (setTimeout)

---

## Promise vs Callback Internals

| Feature           | Promise   | Callback |
| ----------------- | --------- | -------- |
| State             | Managed   | Manual   |
| Chaining          | Easy      | Hard     |
| Error propagation | Automatic | Manual   |

---

## Simplified Promise Polyfill (Conceptual)

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];

    const resolve = value => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      this.handlers.forEach(h => h(value));
    };

    executor(resolve);
  }

  then(fn) {
    return new MyPromise(resolve => {
      this.handlers.push(val => resolve(fn(val)));
    });
  }
}
```

---

## Common Interview Pitfalls

❌ Thinking promises execute synchronously
❌ Confusing executor vs then()
❌ Not understanding microtasks

---

## Interview One-Liners (SDE-2)

* "Promise is a state machine"
* "Executor runs synchronously"
* "then callbacks run as microtasks"
* "Each then returns a new promise"

---

## Key Takeaways

* Promises manage async state internally
* Callbacks are queued in microtask queue
* Promise chaining relies on resolution procedure
* Critical for async performance & correctness

---

