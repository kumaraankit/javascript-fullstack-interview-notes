# Request Timer Middleware in Express.js

## 🎯 Problem Statement

Build an Express middleware that measures how long each HTTP request takes and logs:

* HTTP method
* Request URL
* Time taken (in milliseconds)

The middleware should work globally for all routes.

---

## 🧠 WHY This Middleware Exists

In real backend systems, we must understand:

* Which APIs are slow
* How long requests take end-to-end
* Whether latency comes from business logic, DB, or external services

Most monitoring/APM tools internally rely on the **same idea**: capturing start time and measuring when the response finishes.

---

## 🧩 HOW Express Request Lifecycle Helps Us

1. Request enters Express
2. Middleware executes **before** route handler
3. Route handler processes logic
4. Response is sent
5. Response lifecycle emits a `finish` event

👉 Accurate timing is only possible **after step 4**, not before.

---

## ✅ Correct Implementation

```js
function requestTimer(req, res, next) {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });

  next();
}

module.exports = requestTimer;
```

---

## 🔌 How to Use This Middleware

```js
const express = require('express');
const requestTimer = require('./requestTimer');

const app = express();

// Apply globally
app.use(requestTimer);

app.get('/users', (req, res) => {
  setTimeout(() => {
    res.json({ users: [] });
  }, 200);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 🧪 Sample Output

```
GET /users - 203ms
```

---

## ❌ Common Mistakes (Interview Traps)

### ❌ Logging before `next()`

```js
console.log(Date.now() - startTime);
next();
```

🚫 This logs only middleware execution time, not full request duration.

---

### ❌ Overriding `res.send()`

Overriding response methods is risky and unnecessary.

✅ `res.on('finish')` is safe and production-grade.

---

## 🧠 Why `res.on('finish')` Works

* Fired when response is fully sent
* Works with sync and async routes
* Used internally by logging libraries like `morgan`

---

## 🗣️ Interview-Ready Explanation

> "I capture the start time when the request enters Express, then listen to the response `finish` event to calculate total processing time after the response is sent. This ensures accurate end-to-end latency measurement without blocking the request lifecycle."

---
