
# How to Implement Rate Limiting in Node.js

This document provides a **deep, practical, interview-ready explanation** of how to implement
**rate limiting in Node.js backends**.  
It is suitable for **backend interviews, Node.js production systems, and long-term reference**.

---

## 1. What Is Rate Limiting?

Rate limiting is a technique used to **control how many requests a client can make**
to an API within a given time window.

It protects backend systems from:
- Abuse and brute-force attacks
- Accidental traffic spikes
- Resource exhaustion
- Unfair usage by noisy clients

📌 Interview definition:
> “Rate limiting restricts request frequency to protect system stability and ensure fair usage.”

---

## 2. Why Rate Limiting Is Critical in Node.js

Node.js is:
- Single-threaded
- Event-loop driven
- Highly concurrent

Uncontrolled traffic can:
- Block the event loop
- Exhaust memory and DB connections
- Cause cascading failures

Rate limiting acts as a **first line of defense**.

---

## 3. Where Rate Limiting Is Applied

Rate limiting can be applied at different layers:

1. API Gateway (preferred)
2. Reverse proxy (Nginx)
3. Application layer (Express/Fastify)
4. Specific endpoints (login, OTP, search)

📌 Interview line:
> “Rate limiting should be enforced as close to the edge as possible.”

---

## 4. Common Rate Limiting Algorithms

### 4.1 Fixed Window

**How it works**
- Allows N requests per fixed time window
- Resets counter at window boundary

**Pros**
- Simple

**Cons**
- Burst traffic at window edges

---

### 4.2 Sliding Window

**How it works**
- Tracks requests over a rolling window

**Pros**
- More accurate
- Smoother limiting

**Cons**
- More complex

---

### 4.3 Token Bucket (MOST COMMON)

**How it works**
- Tokens added at fixed rate
- Each request consumes a token
- Bucket size limits burst

**Pros**
- Allows bursts
- Smooth traffic shaping

**Cons**
- Slightly complex

📌 Interview line:
> “Token bucket is the most practical rate limiting algorithm.”

---

### 4.4 Leaky Bucket

**How it works**
- Requests processed at fixed rate
- Excess requests dropped

**Pros**
- Smooth output

**Cons**
- No bursts allowed

---

## 5. Identifying Clients

Rate limiting is applied per:
- IP address
- User ID
- API key
- Combination of above

📌 Interview line:
> “Authentication-aware rate limiting is more reliable than IP-only limits.”

---

## 6. Implementing Rate Limiting in Express (Basic)

### In-Memory Rate Limiting (NOT for production)

```js
const rateLimit = {};

function limiter(req, res, next) {
  const ip = req.ip;
  rateLimit[ip] = (rateLimit[ip] || 0) + 1;

  if (rateLimit[ip] > 100) {
    return res.status(429).json({ message: "Too many requests" });
  }

  next();
}
```

⚠️ Limitations:
- Resets on restart
- Not cluster-safe

---

## 7. Production-Ready Rate Limiting with Redis

### Why Redis?
- Shared state across instances
- Fast in-memory operations
- Atomic increments

📌 Interview line:
> “Redis is essential for distributed rate limiting.”

---

### Express + Redis Example

```js
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");

const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
```

---

## 8. Rate Limiting with Token Bucket (Conceptual)

```txt
Bucket Capacity: 10
Refill Rate: 1 token/sec

Request arrives:
- Token available → allow
- No token → reject (429)
```

This allows short bursts while maintaining limits.

---

## 9. HTTP Status Codes & Headers

### Status Code
- `429 Too Many Requests`

### Important Headers
- `Retry-After`
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`

📌 Interview line:
> “Rate limit responses should guide clients on retry behavior.”

---

## 10. Endpoint-Specific Rate Limiting

Critical endpoints need stricter limits:
- Login
- OTP
- Password reset

Example:
```js
app.post("/login", strictLimiter, loginHandler);
```

---

## 11. Rate Limiting vs Throttling

| Rate Limiting | Throttling |
|--------------|-----------|
| Rejects requests | Delays requests |
| Protects backend | Smooths traffic |
| Common for APIs | Common for queues |

---

## 12. Handling Bursts & Fair Usage

Strategies:
- Separate limits for authenticated users
- Higher limits for premium users
- Different limits per endpoint

📌 Interview line:
> “Not all traffic should be treated equally.”

---

## 13. Rate Limiting in Microservices

Best practices:
- Centralized at API Gateway
- Consistent limits across services
- Avoid per-service duplication

---

## 14. Monitoring & Alerts

Monitor:
- 429 response rate
- Top blocked IPs/users
- Redis latency

Alert on:
- Sudden spikes
- Legit user blocking

---

## 15. Common Pitfalls (INTERVIEW GOLD)

❌ In-memory limits in distributed systems  
❌ Same limit for all endpoints  
❌ No monitoring  
❌ Blind retries from clients  

---

## 16. Real-World Rate Limiting Checklist

Before production:
- Algorithm chosen (token bucket)
- Redis configured
- Limits defined per endpoint
- Headers included
- Monitoring enabled

---

## 17. Interview-Ready 30-Second Summary

> “I implement rate limiting in Node.js to protect APIs from abuse and traffic spikes. In production, I use Redis-backed rate limiting with token bucket or sliding window algorithms, return proper 429 responses with retry headers, apply stricter limits on sensitive endpoints, and monitor usage to ensure fairness and stability.”

---

## Final Thought

Rate limiting is not about blocking users —  
it is about **protecting the system so it stays available for everyone**.
