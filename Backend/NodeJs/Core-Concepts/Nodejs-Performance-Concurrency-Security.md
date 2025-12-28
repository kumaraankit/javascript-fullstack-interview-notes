
# Node.js Performance, Concurrency & Security – Interview Guide (Senior Level)

This document explains **WHEN, HOW, and WHY** for critical **Node.js performance, concurrency, and security topics**, frequently asked in **senior backend / system design interviews**.

---

## 1. How Do You Optimize CPU-Bound Tasks in Node.js?

### Why optimization is needed
Node.js runs JavaScript on a **single thread**. CPU-heavy tasks can block the event loop and degrade performance.

### How to optimize
- Offload CPU work to **Worker Threads**
- Use **Clustering**
- Use **Child Processes**
- Move heavy computation to background services

```js
const { Worker } = require('worker_threads');
new Worker('./heavyTask.js');
```

### When to use
- Image/video processing
- Encryption/compression
- Large data transformations

---

## 2. Explain Clustering in Node.js

### What is clustering?
Clustering allows Node.js to use **multiple CPU cores** by running multiple processes.

### How it works
- Master process forks worker processes
- Load is distributed across workers

```js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  os.cpus().forEach(() => cluster.fork());
}
```

### When to use
- High traffic APIs
- Multi-core servers

---

## 3. Cluster Module vs Worker Threads

| Cluster | Worker Threads |
|------|----------------|
| Multiple processes | Multiple threads |
| Separate memory | Shared memory |
| IPC via messages | SharedArrayBuffer |
| Good for scaling | Good for CPU tasks |

---

## 4. How Do You Share State Between Cluster Processes?

### Why it's hard
Each cluster worker has **its own memory space**.

### How to share
- Redis
- Database
- Message queues
- IPC (limited)

✔ Best practice: **external shared store**

---

## 5. What is the Thread Pool in Node.js?

Node.js uses a **libuv thread pool** for blocking operations.

### Default size
```
4 threads
```

### Configure
```bash
UV_THREADPOOL_SIZE=8 node app.js
```

---

## 6. libuv Thread Pool vs Event Loop

| Event Loop | Thread Pool |
|----------|------------|
| Executes JS | Executes blocking I/O |
| Single-threaded | Multi-threaded |
| Non-blocking | Blocking operations |

---

## 7. What is Zero Downtime Deployment in Node.js?

### Why?
- Prevent service interruption
- Improve availability

### How?
- Blue-Green deployment
- Rolling deployments
- Process managers (PM2)

```bash
pm2 reload app
```

---

## 8. Common Security Risks in Node.js Applications

- SQL Injection
- XSS
- CSRF
- DOS attacks
- Insecure dependencies
- Hardcoded secrets

---

## 9. How to Prevent SQL Injection in Node.js?

### How
- Use parameterized queries
- ORM query builders

```js
db.query('SELECT * FROM users WHERE id = ?', [id]);
```

### Why
- Prevent malicious query manipulation

---

## 10. How to Prevent XSS Attacks?

### How
- Escape user input
- Use CSP headers
- Avoid `dangerouslySetInnerHTML`

```js
res.setHeader('Content-Security-Policy', "default-src 'self'");
```

---

## 11. How to Prevent CSRF?

### How
- CSRF tokens
- SameSite cookies

```js
const csrf = require('csurf');
app.use(csrf());
```

---

## 12. What is Helmet.js?

Helmet sets **secure HTTP headers** automatically.

### Why use it?
- Prevent XSS
- Prevent clickjacking
- Improve security posture

```js
const helmet = require('helmet');
app.use(helmet());
```

---

## 13. Securely Managing Environment Variables

### Best practices
- `.env` files (never commit)
- OS environment variables
- Secrets managers

```js
process.env.DB_PASSWORD;
```

---

## 14. How Do You Handle Secrets in Node.js?

### Best approaches
- AWS Secrets Manager
- Azure Key Vault
- HashiCorp Vault

### Why?
- Rotation
- Audit
- Encryption at rest

---

## 15. Explain Rate Limiting in APIs

### Why?
- Prevent brute force
- Protect backend

### How?
```js
const rateLimit = require('express-rate-limit');
app.use(rateLimit({ windowMs: 60000, max: 100 }));
```

---

## 16. How to Prevent DOS Attacks in Node.js?

### Techniques
- Rate limiting
- Request size limits
- Timeout configuration
- CDN & WAF

---

## Interview-Ready Summary
- CPU-bound work must be offloaded
- Cluster for scale, workers for CPU
- Thread pool handles blocking tasks
- Zero downtime improves reliability
- Security must be layered
- Secrets should never live in code

---

## Conclusion
These practices represent **production-grade Node.js engineering** and are **key differentiators in senior backend interviews**.
