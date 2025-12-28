
# Express.js – Interview Guide with Examples

This document provides **detailed explanations with examples** for commonly asked **Express.js interview questions**, suitable for **Node.js backend and full-stack interviews**.

---

## 1. What is Express.js and Why Is It Commonly Used with Node.js?

**Express.js** is a lightweight, fast, and unopinionated **web framework for Node.js** used to build APIs and web applications.

### Why Express.js?
- Simplifies HTTP server creation
- Minimal boilerplate over Node.js
- Strong routing & middleware support
- Large ecosystem and community
- Ideal for REST APIs and microservices

### Example (Basic Server)
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.listen(3000);
```

---

## 2. What Are Middlewares in Express.js?

A **middleware** is a function that has access to:
- `req` (request)
- `res` (response)
- `next()` (to pass control)

Middlewares execute **before the final route handler**.

### Types of Middleware
- Application-level
- Router-level
- Built-in
- Error-handling
- Third-party

### Example
```js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```

---

## 3. How Do You Handle Routing in Express.js?

Routing defines how an application responds to HTTP requests.

### Basic Routing
```js
app.get('/users', (req, res) => {
  res.send('Users list');
});
```

### Using Router
```js
const router = express.Router();

router.get('/profile', (req, res) => {
  res.send('User Profile');
});

app.use('/user', router);
```

✔ Improves modularity  
✔ Scales well for large apps  

---

## 4. Difference Between `req.params`, `req.query`, and `req.body`

| Property | Used For | Example |
|--------|----------|--------|
| req.params | URL parameters | `/users/:id` |
| req.query | Query string | `?page=1` |
| req.body | Request payload | POST/PUT data |

### Examples
```js
// /users/10?page=2
req.params.id;   // 10
req.query.page; // 2
```

```js
app.post('/users', (req, res) => {
  console.log(req.body); // JSON payload
});
```

---

## 5. How Do You Send a JSON Response from an Express Route?

Use `res.json()` or `res.send()`.

```js
app.get('/api/user', (req, res) => {
  res.json({
    id: 1,
    name: 'Ankit'
  });
});
```

✔ Automatically sets `Content-Type: application/json`

---

## 6. How Do You Handle Errors in Express.js?

### Using Error-Handling Middleware
Error middleware has **4 parameters**.

```js
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  });
});
```

### Throwing an Error
```js
app.get('/error', (req, res) => {
  throw new Error('Something went wrong');
});
```

### Handling Async Errors
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

---

## Interview-Ready Summary
- Express is a minimal Node.js framework
- Middleware controls request flow
- Routers organize endpoints
- req.params / query / body serve different purposes
- JSON responses are simple with `res.json`
- Centralized error handling is best practice

---

## Conclusion
Express.js is the backbone of most Node.js APIs. Understanding **middleware flow, routing, request handling, and error management** is essential for **backend and full-stack interviews**.
