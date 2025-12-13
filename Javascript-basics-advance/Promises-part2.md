# Promise Combinators in JavaScript — all, race, allSettled, any

Promise combinators are **utility methods** that allow you to work with **multiple promises together**.

They are extremely important for:

* Parallel async execution
* Performance optimization
* Clean async flow
* SDE-2 / Senior interviews

---

## Why Do We Need Promise Combinators?

Without combinators:

```js
const a = await taskA();
const b = await taskB();
const c = await taskC();
```

⬆️ Executes sequentially (slow).

With combinators:

```js
const [a, b, c] = await Promise.all([taskA(), taskB(), taskC()]);
```

⬆️ Executes in parallel (fast).

---

## Overview of Promise Combinators

| Method               | Purpose          | Fail Fast | Waits for All |
| -------------------- | ---------------- | --------- | ------------- |
| `Promise.all`        | All must succeed | ✅ Yes     | ❌ No          |
| `Promise.race`       | First settled    | ❌         | ❌             |
| `Promise.allSettled` | All results      | ❌         | ✅ Yes         |
| `Promise.any`        | First success    | ❌         | ❌             |

---

## Promise.all()

### What It Does

`Promise.all()` waits for **all promises to fulfill**.

* Resolves with an array of results
* Rejects immediately if **any promise rejects**

---

### Syntax

```js
Promise.all(iterable)
```

---

### Example

```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(res => console.log(res)); // [1, 2, 3]
```

---

### Rejection Behavior (Fail Fast)

```js
Promise.all([
  Promise.resolve(1),
  Promise.reject('Error'),
  Promise.resolve(3)
])
.catch(err => console.log(err)); // Error
```

---

### Use Cases

* Fetch multiple APIs that are all required
* Parallel DB queries
* Loading critical resources

---

## Promise.race()

### What It Does

`Promise.race()` settles as soon as **the first promise settles** (resolve or reject).

---

### Example

```js
Promise.race([
  new Promise(res => setTimeout(res, 100, 'fast')),
  new Promise(res => setTimeout(res, 500, 'slow'))
]).then(console.log); // fast
```

---

### Rejection Case

```js
Promise.race([
  Promise.reject('fail'),
  Promise.resolve('success')
])
.catch(console.log); // fail
```

---

### Use Cases

* Timeouts
* Load fastest response
* Fallback strategies

---

## Promise.allSettled()

### What It Does

`Promise.allSettled()` waits for **all promises to settle**, regardless of success or failure.

---

### Example

```js
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('err')
]).then(results => console.log(results));
```

Output:

```js
[
  { status: 'fulfilled', value: 1 },
  { status: 'rejected', reason: 'err' }
]
```

---

### Use Cases

* Showing partial results
* Logging failures without stopping execution
* Batch operations

---

## Promise.any()

### What It Does

`Promise.any()` resolves when **any promise fulfills**.

* Ignores rejections
* Rejects only if **all promises reject**

---

### Example

```js
Promise.any([
  Promise.reject('fail1'),
  Promise.resolve('success'),
  Promise.reject('fail2')
]).then(console.log); // success
```

---

### All Rejected Case

```js
Promise.any([
  Promise.reject('a'),
  Promise.reject('b')
]).catch(err => console.log(err));
```

Error type:

```text
AggregateError
```

---

## AggregateError (Interview Detail)

```js
err.errors // array of all rejection reasons
```

---

## Promise.any vs Promise.race

| Feature     | any           | race            |
| ----------- | ------------- | --------------- |
| Resolves on | First success | First settle    |
| Rejects on  | All fail      | First rejection |

---

## Internal Behavior (High-Level)

* All combinators:

  * Iterate promises
  * Attach handlers
  * Track completion
* Results are returned in **input order** (except race)

---

## Common Interview Pitfalls

❌ Expecting Promise.all to return partial results
❌ Confusing race with any
❌ Forgetting AggregateError in Promise.any

---

## Interview One-Liners (SDE-2)

* "Promise.all fails fast"
* "Promise.race settles first"
* "Promise.allSettled never fails"
* "Promise.any resolves on first success"

---

## Key Takeaways

* Use `all` when everything is required
* Use `race` for timeouts
* Use `allSettled` for partial success
* Use `any` for fallback success

---
