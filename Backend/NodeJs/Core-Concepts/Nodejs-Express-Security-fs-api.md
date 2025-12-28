
# Node.js & Express Security, FS, Middleware & API Design – Interview Guide

This guide explains **WHY, HOW, and WHEN** for important **Node.js, Express, security, filesystem, and API design concepts**, commonly asked in **senior backend interviews**.

---

## 1. What is bcrypt / argon2? How to Use Them for Password Hashing?

### Why
Passwords must **never** be stored in plain text. Hashing protects user credentials even if DB is compromised.

### bcrypt
- Adaptive hashing
- Built-in salt
- Slower = more secure against brute force

```js
const bcrypt = require('bcrypt');

const hash = await bcrypt.hash(password, 10);
const isMatch = await bcrypt.compare(password, hash);
```

### argon2 (more modern)
- Memory-hard
- Resistant to GPU attacks

```js
const argon2 = require('argon2');
const hash = await argon2.hash(password);
```

### When to use
- bcrypt → widely supported
- argon2 → high-security systems

---

## 2. JWT – Signing, Verifying & Securing Tokens

### Why JWT?
- Stateless authentication
- Scales well across services

### Sign
```js
jwt.sign({ userId }, secret, { expiresIn: '1h' });
```

### Verify
```js
jwt.verify(token, secret);
```

### Secure JWTs by
- Short expiry
- HTTPS only
- HttpOnly cookies
- Rotate secrets

---

## 3. Symmetric vs Asymmetric Encryption

| Symmetric | Asymmetric |
|---------|-----------|
| One key | Public + private key |
| Faster | Slower |
| AES | RSA |

JWT signing commonly uses asymmetric encryption (RS256).

---

## 4. fs.readFile vs fs.createReadStream

| fs.readFile | fs.createReadStream |
|------------|--------------------|
| Loads entire file | Reads in chunks |
| Memory heavy | Memory efficient |
| Small files | Large files |

---

## 5. Watching File Changes in Node.js

```js
fs.watch('file.txt', () => console.log('Changed'));
```

Used for:
- Hot reload
- Config updates

---

## 6. Sync vs Async FS Methods

| Sync | Async |
|----|------|
| Blocks event loop | Non-blocking |
| Simple scripts | Production apps |

---

## 7. Handling Very Large Files Efficiently

- Use streams
- Pipe data
- Avoid buffering entire file

```js
fs.createReadStream(file).pipe(res);
```

---

## 8. Getting OS-Level Info in Node.js

```js
const os = require('os');
os.cpus();
os.totalmem();
```

Used for:
- Monitoring
- Scaling decisions

---

## 9. How Middleware Works in Express.js

Middleware executes **before route handler** in order.

```js
app.use((req, res, next) => {
  console.log(req.url);
  next();
});
```

---

## 10. Types of Middleware

### Application-level
```js
app.use(middleware);
```

### Router-level
```js
router.use(middleware);
```

### Error-handling
```js
app.use((err, req, res, next) => {});
```

---

## 11. Handling Async Errors in Express.js

```js
const asyncHandler = fn =>
  (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
```

---

## 12. Request Validation in Express.js

```js
const { body } = require('express-validator');
body('email').isEmail();
```

Prevents:
- Invalid input
- Security vulnerabilities

---

## 13. Securing Express.js APIs

- Helmet
- Rate limiting
- Input validation
- Auth middleware
- CORS control

---

## 14. Route Params vs Query Params

| Route Params | Query Params |
|------------|--------------|
| /users/:id | ?page=1 |
| Required | Optional |

---

## 15. Pagination in APIs

```js
GET /users?page=1&limit=10
```

Use DB `LIMIT` + `OFFSET`.

---

## 16. File Uploads in Express.js

```js
const multer = require('multer');
app.post('/upload', upload.single('file'));
```

---

## 17. Serving Static Files Efficiently

```js
app.use(express.static('public'));
```

Use CDN in production.

---

## 18. API Versioning

### Why
- Backward compatibility

### How
- URL versioning
```js
/api/v1/users
```

- Header versioning

---

## Interview-Ready Summary
- Hash passwords, never encrypt them
- JWT must be short-lived & secured
- Streams are critical for large files
- Middleware order matters
- Validation & security are non-negotiable
- API versioning avoids breaking clients

---

## Conclusion
These topics represent **real-world Node.js & Express engineering practices** and are essential for **senior backend interviews**.
