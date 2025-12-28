
# Node.js Advanced Runtime, Async & Performance – Interview Guide

This document provides **deep explanations with WHY and HOW**, covering **advanced Node.js runtime, async patterns, memory, and performance topics** frequently asked in **senior backend interviews**.

---

## 1. What Are Child Processes in Node.js? When Would You Use Them?

Node.js provides **child processes** to run external commands or CPU-intensive tasks **outside the main event loop**.

### Why?
- Node.js is single-threaded
- CPU-heavy tasks block the event loop
- Child processes run in separate OS processes

### Example
```js
const { spawn } = require('child_process');
spawn('ls', ['-lh']);
```

### Use cases
- Image/video processing
- Running shell commands
- CPU-intensive calculations

---

## 2. Difference Between `spawn`, `exec`, and `fork`

| Method | Use Case | Output Handling | IPC |
|-----|--------|---------------|----|
| spawn | Long-running processes | Streamed | ❌ |
| exec | Short commands | Buffered | ❌ |
| fork | Node.js scripts | Streamed | ✅ |

```js
fork('worker.js');
```

---

## 3. How Does the Node.js REPL Work?

REPL = **Read–Eval–Print–Loop**

### How it works
- Reads user input
- Evaluates JS code
- Prints result
- Loops

Used for debugging and testing snippets.

---

## 4. Role of libuv in Node.js

**libuv** is a C library that handles:
- Event loop
- Async I/O
- Thread pool
- Timers

### Why libuv?
- Abstracts OS-level async APIs
- Enables cross-platform async behavior

---

## 5. Callbacks vs Promises vs Async/Await

| Feature | Callbacks | Promises | Async/Await |
|------|----------|---------|-------------|
| Readability | Poor | Better | Best |
| Error handling | Nested | `.catch()` | try/catch |
| Debugging | Hard | Medium | Easy |

---

## 6. How Do You Handle Errors in Async/Await?

```js
try {
  const data = await fetchData();
} catch (err) {
  console.error(err);
}
```

### Why?
- Prevents unhandled promise rejections
- Cleaner control flow

---

## 7. What Are Unhandled Promise Rejections?

A promise rejection without `.catch()` or try/catch.

### Handling Globally
```js
process.on('unhandledRejection', err => {
  console.error(err);
});
```

---

## 8. Promise.all vs Promise.allSettled

| Promise.all | Promise.allSettled |
|-----------|------------------|
| Fails fast | Waits for all |
| Rejects on first error | Returns all results |

---

## 9. Parallel vs Sequential vs Race Promises

### Sequential
```js
await task1();
await task2();
```

### Parallel
```js
await Promise.all([task1(), task2()]);
```

### Race
```js
await Promise.race([task1(), timeout()]);
```

---

## 10. How to Avoid Callback Hell?

- Use promises
- Use async/await
- Modularize code

---

## 11. Async Iteration (`for await...of`)

```js
for await (const chunk of stream) {
  console.log(chunk);
}
```

Used for:
- Streams
- Async generators

---

## 12. How Does Garbage Collection Work in Node.js?

Node.js uses **V8 garbage collector**:
- Mark-and-sweep
- Generational GC
- Incremental GC

### Why?
- Automatic memory management
- Prevent memory leaks

---

## 13. What Are Memory Leaks? How to Detect & Prevent?

### Causes
- Global variables
- Event listeners not removed
- Closures holding references

### Detection Tools
- Chrome DevTools
- `--inspect`
- Heap snapshots

---

## 14. Debugging Performance Issues in Node.js

- Check event loop blocking
- Monitor memory usage
- Profile CPU

---

## 15. Explain the `--inspect` Flag

```bash
node --inspect app.js
```

Allows debugging via Chrome DevTools.

---

## 16. How Do You Profile a Node.js Application?

### Tools
- Chrome DevTools
- `clinic.js`
- `node --prof`

### Why profiling?
- Find bottlenecks
- Optimize CPU & memory

---

## Interview-Ready Summary
- Child processes handle CPU-heavy work
- libuv powers async behavior
- Async/await simplifies error handling
- Promises control concurrency
- Memory leaks must be actively monitored
- Profiling is essential in production

---

## Conclusion
These concepts demonstrate **deep Node.js runtime understanding** and are **commonly used to differentiate senior engineers** in backend interviews.
