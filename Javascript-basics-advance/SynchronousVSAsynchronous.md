# Synchronous vs Asynchronous Code in JavaScript

Understanding **synchronous vs asynchronous code** is *fundamental* for backend, frontend, and Node.js interviews—especially at **SDE-2 level**.

---

## What is Synchronous Code?

**Synchronous (blocking) code** executes **line by line**. Each operation must finish **before** the next one starts.

### Key Characteristics

* Blocking execution
* One task at a time
* Simple to reason about
* Can slow down the entire program

### Example: Synchronous Code

```js
function syncTask() {
  console.log('Task 1');
  console.log('Task 2');
  console.log('Task 3');
}

syncTask();
```

**Output:**

```
Task 1
Task 2
Task 3
```

---

## Problem with Synchronous Code

If a task takes time (e.g., file read, DB call), everything **waits**.

```js
function blockingTask() {
  const start = Date.now();
  while (Date.now() - start < 3000) {}
}

console.log('Start');
blockingTask();
console.log('End');
```

**Output (after 3 seconds):**

```
Start
End
```

❌ Blocks the event loop
❌ Poor performance

---

## What is Asynchronous Code?

**Asynchronous (non-blocking) code** allows long-running tasks to execute **in the background**, while the program continues.

### Key Characteristics

* Non-blocking
* Efficient resource usage
* Better scalability
* Requires async flow control

### Example: Asynchronous Code

```js
console.log('Start');

setTimeout(() => {
  console.log('Async Task');
}, 2000);

console.log('End');
```

**Output:**

```
Start
End
Async Task
```

---

## Core Difference (At a Glance)

| Aspect      | Synchronous | Asynchronous    |
| ----------- | ----------- | --------------- |
| Execution   | Blocking    | Non-blocking    |
| Flow        | Sequential  | Concurrent-like |
| Performance | Slower      | Faster          |
| Scalability | Poor        | Excellent       |
| Use cases   | CPU-bound   | I/O-bound       |

---

## Why Asynchronous Code is Critical in Node.js

Node.js runs on a **single-threaded event loop**.

* Blocking code stops everything
* Async code keeps server responsive

Examples of async operations:

* Database queries
* API calls
* File system access
* Network requests

---

## How JavaScript Handles Async Code (Internals)

1. Call Stack executes synchronous code
2. Async operations go to Web APIs / libuv
3. Callbacks go to task queues
4. Event Loop pushes tasks back to call stack

---

## How Can You Handle Async Flow?

JavaScript provides **multiple ways** to manage asynchronous flow.

---

## 1. Callbacks (Oldest Way)

### Example

```js
function fetchData(callback) {
  setTimeout(() => {
    callback(null, 'Data received');
  }, 1000);
}

fetchData((err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

### Problems

* Callback hell
* Hard to read & debug

---

## 2. Promises

Promises represent a value that will be available **later**.

### Example

```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data received'), 1000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Benefits

* Better readability
* Chainable

---

## 3. Async / Await (Most Preferred)

`async/await` is syntactic sugar over promises.

### Example

```js
async function fetchData() {
  return 'Data received';
}

async function main() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

main();
```

### Benefits

* Looks synchronous
* Easy error handling
* Best for real-world apps

---

## 4. Promise.all / Promise.race / Promise.any

### Parallel Execution

```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

Promise.all([p1, p2]).then(console.log);
```

### Differences

| Method             | Behavior             |
| ------------------ | -------------------- |
| Promise.all        | Fails fast           |
| Promise.allSettled | Returns all results  |
| Promise.race       | First settled wins   |
| Promise.any        | First fulfilled wins |

---

## 5. Generators (Advanced)

Generators can pause execution using `yield`.

```js
function* task() {
  yield 'Step 1';
  yield 'Step 2';
}
```

Used internally before `async/await`.

---

## Real-World Example (Node.js API)

```js
app.get('/users', async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});
```

Non-blocking request handling = high scalability.

---

## Common Interview Traps

❌ Using sync I/O in Node.js server
❌ Forgetting error handling in async code
❌ Misunderstanding promise execution order

---

## Interview One-Liners (SDE-2)

* **Synchronous code blocks execution; async code does not.**
* **Node.js scales because of non-blocking I/O.**
* **Async/await simplifies promise-based flow control.**

---

## Key Takeaways

* Synchronous = blocking
* Asynchronous = non-blocking
* Promises & async/await are industry standard
* Proper async flow is critical for scalable systems

---


