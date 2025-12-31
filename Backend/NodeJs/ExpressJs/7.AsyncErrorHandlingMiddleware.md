# Async Error Handling Middleware – Express.js
---

## 1. What Is Error Handling Middleware?

Error handling middleware is a **special Express middleware** that:

* Catches errors thrown in routes or middleware
* Centralizes error responses
* Prevents server crashes

It has a **special function signature**:

```js
(err, req, res, next)
```

> The presence of `err` tells Express this middleware handles errors.

---

## 2. WHY Async Error Handling Is a Big Deal

### The Core Problem

Express **does not automatically catch errors thrown inside async functions**.

This leads to:

* Unhandled promise rejections
* Server crashes
* Inconsistent error responses

👉 Many candidates know error middleware exists, but **don’t know why async errors break Express**.

---

## 3. Sync vs Async Error Handling (CRITICAL CONCEPT)

### ✅ Synchronous Error (Works Automatically)

```js
app.get('/sync', (req, res) => {
  throw new Error('Sync error');
});
```

Express catches this automatically.

---

### ❌ Asynchronous Error (NOT Caught)

```js
app.get('/async', async (req, res) => {
  throw new Error('Async error');
});
```

❌ This **will crash or bypass error middleware**.

---

## 4. WHY Express Fails with Async Errors (Interview Gold)

Express was designed **before async/await existed**.

It expects errors to be:

* Thrown synchronously, or
* Passed explicitly using `next(err)`

Async errors return **rejected promises**, which Express doesn’t handle by default.

---

## 5. Correct Pattern: `try / catch + next(err)`

### Manual Async Error Handling

```js
app.get('/async', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
```

✅ Express now forwards the error to error middleware.

---

## 6. Problem: This Becomes Boilerplate

Every async route needs `try/catch`.

👉 Interviewers expect you to **optimize this pattern**.

---

## 7. Solution 1: Async Wrapper Utility (BEST PRACTICE)

### Step 1: Create Async Wrapper

```js
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
```

---

### Step 2: Use It in Routes

```js
const asyncHandler = require('./asyncHandler');

app.get(
  '/users',
  asyncHandler(async (req, res) => {
    const users = await getUsers();
    res.json(users);
  })
);
```

✅ No try/catch
✅ Clean routes

---

## 8. Solution 2: Global Promise Patch (⚠️ Not Recommended)

Some patch `express-async-errors`.

Why interviewers prefer async wrapper:

* Explicit
* No magic
* Easy to reason about

---

## 9. Global Error Handling Middleware

### Must Be Registered LAST

```js
function errorHandler(err, req, res, next) {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
}

app.use(errorHandler);
```

---

## 10. Error Flow (Mental Model)

```
Async Route → Error Thrown → next(err) → Error Middleware → Response
```

No route handler runs after an error.

---

## 11. HTTP Status Codes (Interview Expectation)

| Scenario              | Status |
| --------------------- | ------ |
| Validation error      | 400    |
| Authentication failed | 401    |
| Authorization failed  | 403    |
| Resource not found    | 404    |
| Server error          | 500    |

---

## 12. Common Interview Mistakes (REAL FAIL POINTS)

### ❌ Forgetting `next(err)`

### ❌ Error middleware not last

### ❌ Sending stack traces in production

### ❌ try/catch everywhere without abstraction

---

## 13. Interview-Ready Explanation (Say This)

> "Express does not catch errors thrown inside async functions because they result in rejected promises. To handle this correctly, I wrap async route handlers using a utility that catches rejections and forwards them to a centralized error handling middleware using `next(err)`."

