# Authentication Middleware (JWT) – Express.js
---

## 1. What Is Authentication Middleware?

Authentication middleware is a function that:

* Runs **before route handlers**
* Verifies the identity of the requester
* Blocks unauthenticated users
* Attaches authenticated user data to the request

👉 It answers only one question:

> **Who is the user making this request?**

---

## 2. WHY Authentication Is Implemented as Middleware

Without middleware:

* Authentication code repeats in every route
* Controllers become bloated
* Security logic becomes inconsistent

With middleware:

* Authentication is **centralized**
* Business logic stays clean
* Security is enforced **before** any logic executes

> Middleware is the earliest and safest place to enforce authentication.

---

## 3. Authentication Flow (Mental Model)

```
Client → Request → Auth Middleware → Route Handler → Response
```

Step-by-step:

1. Client logs in and receives a JWT
2. Client sends JWT in request headers
3. Middleware extracts the token
4. Middleware verifies the token
5. User data is attached to `req.user`
6. Request is allowed to proceed

If any step fails → request is rejected.

---

## 4. Where JWT Comes From (Industry Standard)

```http
Authorization: Bearer <JWT_TOKEN>
```

Why this format?

* Standardized
* Supported by API gateways
* Easy to parse

---

## 5. Minimal JWT Knowledge (Interview-Relevant Only)

A JWT contains:

* Header (algorithm)
* Payload (user info, expiry)
* Signature (tamper-proof)

JWT verification ensures:

* Token is not modified
* Token is not expired

---

## 6. Authentication Middleware – Correct Implementation

```js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  // Token missing
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedUser = jwt.verify(token, JWT_SECRET);

    // Attach user info to request
    req.user = decodedUser;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authenticate;
```

---

## 7. How to Use Authentication Middleware

```js
const express = require('express');
const authenticate = require('./authenticate');

const app = express();

app.get('/public', (req, res) => {
  res.send('This is a public API');
});

app.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.listen(3000, () => console.log('Server running'));
```

---

## 8. Expected Behavior

| Scenario      | Result           |
| ------------- | ---------------- |
| No token      | 401 Unauthorized |
| Invalid token | 401 Unauthorized |
| Expired token | 401 Unauthorized |
| Valid token   | Request allowed  |

---

## 9. Authentication vs Authorization (VERY IMPORTANT)

| Authentication | Authorization          |
| -------------- | ---------------------- |
| Who are you?   | What can you access?   |
| JWT validation | Role/permission checks |
| Happens first  | Happens after auth     |

Interviewers **always test this distinction**.

---

## 10. Common Interview Mistakes (REAL FAIL POINTS)

### ❌ Not validating Bearer prefix

### ❌ Decoding JWT without verifying signature

### ❌ Storing JWT secret in code

### ❌ Mixing authentication and authorization

---

## 11. Interview-Ready Explanation (Say This)

> "Authentication middleware in Express extracts the JWT from the Authorization header, verifies it using a secret key, and attaches the decoded user information to the request object. If the token is missing or invalid, the request is blocked with HTTP 401 before business logic executes."

---
