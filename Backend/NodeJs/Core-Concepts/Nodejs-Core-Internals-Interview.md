
# Node.js Core Internals & Advanced Concepts – Interview Guide

This document provides **deep, interview-ready explanations with how and why** for **Node.js core internals**, commonly asked in **senior backend / platform interviews**.

---

## 1. Difference Between `export default` and Named Export

### Named Export
```js
export const add = (a, b) => a + b;
```

Import:
```js
import { add } from './math.js';
```

### Default Export
```js
export default function add(a, b) {
  return a + b;
}
```

Import:
```js
import add from './math.js';
```

### Key Differences
| Aspect | Named Export | Default Export |
|---|---|---|
| Multiple exports | Yes | No |
| Import name flexibility | No | Yes |
| Tree-shaking | Better | Slightly worse |

---

## 2. What is Node.js? How Is It Different from Traditional Server-Side Tech?

Node.js is a **JavaScript runtime** built on **Chrome V8**, designed for **non-blocking, event-driven servers**.

### Traditional (Java, PHP)
- Thread-per-request
- Blocking I/O
- Higher memory usage

### Node.js
- Single-threaded
- Event-driven
- Non-blocking I/O
- High concurrency with low resource usage

---

## 3. Node.js Architecture

```
Client
  ↓
Event Loop (JS Thread)
  ↓
Libuv Thread Pool (I/O)
  ↓
OS / Network / File System
```

### Key Components
- V8 Engine
- Event Loop
- Libuv
- Thread Pool
- C++ Bindings

---

## 4. What is the V8 Engine?

V8 is Google’s **high-performance JavaScript engine** written in C++.

### How it works
- Parses JS
- Compiles to machine code (JIT)
- Optimizes frequently executed code

Node.js uses V8 to execute JavaScript outside the browser.

---

## 5. `process.nextTick()` vs `setImmediate()` vs `setTimeout()`

| API | Execution Timing |
|---|---|
| process.nextTick | Before event loop continues |
| setImmediate | After poll phase |
| setTimeout | After timer expires |

```js
process.nextTick(() => console.log('nextTick'));
setImmediate(() => console.log('immediate'));
setTimeout(() => console.log('timeout'), 0);
```

---

## 6. What is the Event Loop? Phases Explained

### Event Loop Phases
1. Timers
2. I/O callbacks
3. Idle, prepare
4. Poll
5. Check (`setImmediate`)
6. Close callbacks

Microtasks (`Promise`, `nextTick`) run **between phases**.

---

## 7. How Does Asynchronous I/O Work in Node.js?

- I/O tasks delegated to OS or libuv thread pool
- JS thread remains free
- Callback queued after completion

This enables high concurrency.

---

## 8. Blocking vs Non-Blocking Code

### Blocking
```js
fs.readFileSync('file.txt');
```

### Non-Blocking
```js
fs.readFile('file.txt', callback);
```

Blocking halts event loop; non-blocking does not.

---

## 9. Single-Threaded Nature & Concurrency

Node.js runs JS on one thread but handles concurrency via:
- Event loop
- Async callbacks
- Worker threads (optional)

---

## 10. How Do Buffers Work in Node.js?

Buffers handle **binary data** outside the V8 heap.

Used for:
- Files
- Streams
- Network packets

```js
const buf = Buffer.from('hello');
```

---

## 11. `Buffer.alloc()` vs `Buffer.from()`

| Method | Usage |
|---|---|
| Buffer.alloc | Allocate empty buffer |
| Buffer.from | Create buffer from data |

```js
Buffer.alloc(10);
Buffer.from('text');
```

---

## 12. How Does `require()` Work Internally?

Steps:
1. Resolve module path
2. Load file
3. Wrap in function
4. Execute
5. Cache result

Module is cached in `require.cache`.

---

## 13. CommonJS vs ES Modules

| CommonJS | ES Modules |
|---|---|
| require | import |
| module.exports | export |
| Synchronous | Asynchronous |
| Default in Node | Modern standard |

---

## 14. Handling Large Files Without Blocking Event Loop

Use **streams** instead of reading entire file.

```js
fs.createReadStream('large.mp4').pipe(res);
```

---

## 15. What Are Streams in Node.js?

Streams process data **chunk by chunk**.

### Types
- Readable
- Writable
- Duplex
- Transform

---

## 16. How Do You Handle Backpressure in Streams?

Backpressure occurs when:
- Consumer is slower than producer

Handled by:
- `stream.pause()`
- `stream.resume()`
- Built-in pipe mechanism

---

## 17. Internal Working of `pipe()` in Streams

`pipe()`:
- Reads chunks
- Writes to destination
- Applies backpressure automatically
- Pauses source when destination is full

```js
readStream.pipe(writeStream);
```

---

## Interview-Ready Summary
- Node.js is event-driven and non-blocking
- V8 executes JS efficiently
- Event loop manages async tasks
- Streams & buffers handle large data efficiently
- Understanding internals differentiates senior candidates

---

## Conclusion
These concepts are **frequently asked in senior Node.js interviews** and demonstrate **deep backend and runtime knowledge**, not just framework usage.
