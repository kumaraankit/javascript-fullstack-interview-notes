
# Node.js & Express – Core Concepts and Real‑World Patterns (Interview Guide)

This guide provides **detailed explanations with examples, including how and why**, for frequently asked **Node.js, Express.js, and backend architecture interview questions**.

---

## 1. What is the Event Loop in Node.js?

The **event loop** is the mechanism that allows Node.js to perform **non-blocking, asynchronous operations** on a **single-threaded** runtime.

### Why it exists
- JavaScript runs on a single thread
- Blocking I/O would freeze the application
- Event loop offloads async tasks to background threads and processes callbacks later

### Phases of the Event Loop (simplified)
1. Timers (`setTimeout`)
2. I/O callbacks
3. Poll (waiting for I/O)
4. Check (`setImmediate`)
5. Close callbacks

### Example
```js
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('End');
```

**Output**
```
Start
End
Promise
Timeout
```

---

## 2. What Are Streams in Node.js and When Should We Use Them?

**Streams** handle **large data** in chunks instead of loading everything into memory.

### Why streams?
- Memory efficient
- Faster for large files
- Ideal for real-time data

### Types of Streams
- Readable
- Writable
- Duplex
- Transform

### Example: Reading a File
```js
const fs = require('fs');

const stream = fs.createReadStream('large.txt');
stream.on('data', chunk => {
  console.log(chunk.toString());
});
```

### When to use
- File uploads/downloads
- Video/audio streaming
- Processing large datasets

---

## 3. Synchronous vs Asynchronous Code in Node.js

### Synchronous
Blocks execution.

```js
const data = fs.readFileSync('file.txt');
console.log(data);
```

❌ Blocks event loop

---

### Asynchronous
Non-blocking.

```js
fs.readFile('file.txt', (err, data) => {
  console.log(data);
});
```

✔ Scalable  
✔ Preferred in Node.js

---

## 4. How Promises and async/await Work in Node.js

### Promises
Represent future completion.

```js
fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

### async/await
Syntactic sugar over promises.

```js
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

✔ Cleaner  
✔ Easier error handling  

---

## 5. Connecting MongoDB Using Mongoose

### Why Mongoose?
- Schema enforcement
- Validation
- Middleware & hooks

### Example
```js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected'))
  .catch(err => console.error(err));
```

---

## 6. Environment Variables in Node.js

Environment variables store **configuration and secrets**.

### Why?
- Security
- Environment-specific configs
- Avoid hardcoding secrets

### Using dotenv
```js
require('dotenv').config();
console.log(process.env.PORT);
```

---

## 7. User Authentication in Express.js

### Flow
1. User logs in
2. Server validates credentials
3. JWT issued
4. JWT verified on protected routes

### Example
```js
const jwt = require('jsonwebtoken');

const token = jwt.sign({ userId }, process.env.JWT_SECRET);
```

### Middleware
```js
function auth(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, secret);
  next();
}
```

---

## 8. What is CQRS and How to Handle It in Express?

**CQRS (Command Query Responsibility Segregation)** separates:
- Write operations (commands)
- Read operations (queries)

### Why CQRS?
- Scalability
- Clear separation of concerns

### Express Example
```text
POST /orders   → Command
GET /orders    → Query
```

---

## 9. Structuring a Scalable Node.js Project

### Recommended Structure
```text
src/
 ├── controllers/
 ├── routes/
 ├── services/
 ├── models/
 ├── middlewares/
 ├── config/
 └── app.js
```

### Why?
- Maintainability
- Testability
- Clear separation of concerns

---

## 10. Handling File Upload in Node.js

### Using Multer
```js
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('Uploaded');
});
```

### Why Multer?
- Handles multipart/form-data
- Supports size limits
- Disk & memory storage

---

## Interview‑Ready Summary
- Event loop enables non-blocking I/O
- Streams improve memory efficiency
- Async code is critical for scalability
- async/await simplifies promises
- Environment variables secure configs
- JWT-based auth is industry standard
- CQRS improves scalability
- Proper project structure avoids tech debt

---

## Conclusion
Mastering these Node.js and Express.js concepts is essential for building **scalable, secure, and high-performance backend systems**, and they are **frequently tested in senior backend interviews**.
