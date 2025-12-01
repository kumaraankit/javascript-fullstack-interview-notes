# Executing Tasks in Batches in Node.js

Batch processing is a common requirement when you need to execute a large number of tasks without overwhelming the event loop, network, or CPU. Instead of running all tasks at once, you split them into **batches** and execute each batch sequentially.

---

## ✅ Why Execute Tasks in Batches?

* Prevents memory overflow
* Avoids exhausting external APIs (rate limits)
* Keeps event loop responsive
* Helps control concurrency

---

## ✅ Batch Execution Function (Generic & Reusable)

```js
async function executeInBatches(tasks, batchSize) {
  let results = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    console.log(`Executing batch: ${i / batchSize + 1}`);

    const batchResults = await Promise.all(batch.map(task => task()));
    results.push(...batchResults);
  }

  return results;
}
```

---

## ✅ Example Usage

```js
function task(time, id) {
  return () => new Promise(resolve =>
    setTimeout(() => resolve(`Task ${id} done`), time)
  );
}

const tasks = [
  task(1000, 1),
  task(500, 2),
  task(1200, 3),
  task(300, 4),
  task(800, 5)
];

executeInBatches(tasks, 2).then(result => console.log(result));
```

### 🔥 Output

```
Executing batch: 1
Executing batch: 2
Executing batch: 3
[ 'Task 1 done', 'Task 2 done', 'Task 3 done', 'Task 4 done', 'Task 5 done' ]
```

---

## 🎯 Advanced Version (With Delay Between Batches)

```js
async function executeInBatchesWithDelay(tasks, batchSize, delay = 0) {
  const results = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);

    const batchResult = await Promise.all(batch.map(fn => fn()));
    results.push(...batchResult);

    if (delay > 0) await new Promise(res => setTimeout(res, delay));
  }

  return results;
}
```

---

## 🚀 When Should You Use Batch Execution?

* **Bulk API calls** (to avoid API throttling)
* **Database writes** in controlled chunks
* **Filesystem operations** on large lists
* **CPU-heavy computation** (to avoid blocking)
* **Message queue processing**

---

## ⚠️ Notes

* Always tune batch size depending on system load
* Prefer `Promise.allSettled()` if you don’t want batch failures to stop execution
* For concurrency control, consider libraries like **p-limit** or **Bottleneck**

---


