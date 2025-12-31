# Rate Limiting Middleware (In-Memory) – Express.js

## 🎯 Problem Statement

Build an **in-memory rate limiting middleware** in Express.js that:

* Limits number of requests per client (IP-based)
* Works within a fixed time window (e.g., 100 requests per 1 minute)
* Returns **HTTP 429 (Too Many Requests)** when limit is exceeded

This middleware should be applied globally or per route.

---

## 🧠 WHY Rate Limiting Is Critical (Interview Perspective)

Rate limiting protects backend systems from:

* Abuse (bots, brute-force attacks)
* Accidental overload
* Denial-of-Service (DoS) scenarios

In interviews, this tests:

* Your understanding of **stateful middleware**
* Time-window logic
* Trade-offs between **in-memory vs distributed systems**

---

## 🧩 Core Design (Mental Model)

For every request:

1. Identify the client (usually IP address)
2. Track request count + timestamp
3. Check if request is within allowed limit
4. Either allow (`next()`) or block (`429`)

---

## 📦 Data Structure (In-Memory Store)

```js
{
  "127.0.0.1": {
    count: 5,
    startTime: 1690000000000
  }
}
```

Why this works:

* Fast lookup (O(1))
* Simple to reset after window expires

---

## ⚙️ Configuration Parameters

```js
const WINDOW_SIZE_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;
```

These should ideally be configurable (env-based).

---

## ✅ Correct Implementation

```js
function rateLimiter(req, res, next) {
  const ip = req.ip;
  const currentTime = Date.now();

  if (!rateLimiter.store) {
    rateLimiter.store = {};
  }

  const store = rateLimiter.store;

  if (!store[ip]) {
    store[ip] = { count: 1, startTime: currentTime };
    return next();
  }

  const elapsedTime = currentTime - store[ip].startTime;

  if (elapsedTime > WINDOW_SIZE_MS) {
    store[ip] = { count: 1, startTime: currentTime };
    return next();
  }

  store[ip].count += 1;

  if (store[ip].count > MAX_REQUESTS) {
    return res.status(429).json({
      message: 'Too many requests. Please try again later.'
    });
  }

  next();
}

module.exports = rateLimiter;
```

---

## 🔌 How to Use in Express

```js
const express = require('express');
const rateLimiter = require('./rateLimiter');

const app = express();

app.use(rateLimiter);

app.get('/api', (req, res) => {
  res.json({ success: true });
});

app.listen(3000);
```

---

## 🧪 Behavior Example

* First 100 requests → ✅ Allowed
* 101st request (within 1 minute) → ❌ 429
* After 1 minute → counter resets

---

## ❌ Common Mistakes (Interview Traps)

### ❌ Not resetting window

Leads to permanent blocking.

### ❌ Using global counter

Blocks all users instead of per-client.

### ❌ Forgetting HTTP 429

Interviewers expect correct status code.

---

## ⚠️ Limitations of In-Memory Rate Limiting

* ❌ Not suitable for multi-instance deployments
* ❌ Resets on server restart
* ❌ Memory grows with traffic

---

## 🚀 Production-Grade Alternatives

| Approach     | Why                         |
| ------------ | --------------------------- |
| Redis        | Shared state across servers |
| Token Bucket | Smoother traffic handling   |
| API Gateway  | Centralized protection      |

---

## 🗣️ Interview-Ready Explanation

> "I implemented an IP-based in-memory rate limiting middleware using a fixed time window. Each request updates a counter stored in memory, and when the count exceeds the allowed limit within the window, the middleware responds with HTTP 429. This approach is simple and fast but not suitable for distributed systems, where Redis or an API gateway would be preferred."

