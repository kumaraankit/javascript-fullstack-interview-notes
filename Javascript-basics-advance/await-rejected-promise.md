# What Happens When You `await` a Rejected Promise?

Understanding what happens when `await` encounters a **rejected promise** is critical for:

* Correct async error handling
* Debugging production issues
* SDE-2 / Senior interviews

---

## Quick Answer (Interview One-Liner)

> When `await` is used on a rejected promise, it **throws the rejection reason as an exception**.

---

## Basic Example

```js
async function test() {
  await Promise.reject('Error occurred');
}

test();
```

Result:

```text
UnhandledPromiseRejection
```

Why?

* Rejection is thrown
* No error handling exists

---

## How `await` Works Internally

```js
const result = await promise;
```

Internally (simplified):

```js
promise.then(
  value => continueExecution(value),
  error => throw error
);
```

---

## Await on Fulfilled vs Rejected Promise

| Promise State | await Behavior         |
| ------------- | ---------------------- |
| Fulfilled     | Returns resolved value |
| Rejected      | Throws error           |

---

## Proper Error Handling with try/catch

```js
async function test() {
  try {
    const data = await Promise.reject('DB failed');
  } catch (err) {
    console.log(err); // DB failed
  }
}
```

This is equivalent to `.catch()`.

---

## Multiple Awaits — What Happens?

```js
async function test() {
  const a = await Promise.resolve(1);
  const b = await Promise.reject('fail');
  const c = await Promise.resolve(3);
}
```

Execution:

* `a` resolves
* `b` throws
* `c` is **never executed**

---

## Handling Multiple Await Failures

### Option 1: try/catch per await

```js
try {
  await task1();
} catch {}

try {
  await task2();
} catch {}
```

---

### Option 2: Promise.allSettled

```js
const results = await Promise.allSettled([
  task1(), task2(), task3()
]);
```

---

## Await with Promise.all

```js
await Promise.all([
  Promise.resolve(1),
  Promise.reject('fail')
]);
```

* Promise.all rejects
* await throws immediately

---

## Unhandled Rejection Scenario

```js
async function test() {
  await Promise.reject('oops');
}
```

If not caught:

* Browser: Console error
* Node.js: `unhandledRejection` event

---

## Handling at Call Site

```js
test().catch(err => console.log(err));
```

Important for top-level async calls.

---

## Top-Level await (ES2022)

```js
await Promise.reject('fail');
```

* Throws error
* Module execution stops

---

## Await vs then/catch (Mental Model)

```js
await promise;
```

Equivalent to:

```js
promise.then(
  value => value,
  err => { throw err; }
);
```

---

## Common Interview Pitfalls

❌ Forgetting try/catch around await
❌ Assuming execution continues after rejection
❌ Ignoring unhandled rejections

---

## Interview One-Liners (SDE-2)

* "await throws on rejected promise"
* "try/catch is mandatory for error handling"
* "execution stops at rejection"
* "unhandled rejections crash Node.js"

---

## Key Takeaways

* `await` converts rejection into a thrown error
* Use try/catch for control
* Unhandled rejections are dangerous
* Promise combinators help manage failures

---
