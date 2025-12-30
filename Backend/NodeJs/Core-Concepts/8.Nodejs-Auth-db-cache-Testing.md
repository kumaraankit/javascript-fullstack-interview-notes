
# Node.js Authentication, Databases, Caching & Testing – Interview Guide

This guide explains **WHY, WHEN, and HOW** for key **backend concepts in Node.js**, commonly asked in **senior backend / full-stack interviews**.

---

## AUTHENTICATION & AUTHORIZATION

## 1. Difference Between Authentication and Authorization

| Authentication | Authorization |
|---------------|--------------|
| Who you are | What you can access |
| Login process | Permission check |
| Happens first | Happens after authentication |

**Why:** Separates identity verification from access control.

---

## 2. JWT-Based Authentication

### Why JWT?
- Stateless
- Scales well
- Suitable for microservices

### How
```js
const token = jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
jwt.verify(token, SECRET);
```

### When
- REST APIs
- Mobile apps
- Distributed systems

---

## 3. OAuth2 in Node.js

### Why
- Delegated access (Google, GitHub login)
- Avoids password sharing

### How
- Authorization Code Flow
- Use Passport.js strategies

### When
- Social login
- Third-party integrations

---

## 4. Session-Based Authentication

### How
- Session stored on server
- Session ID stored in cookie

### Secure Storage
- Redis / DB
- HttpOnly & Secure cookies

### When
- Traditional web apps
- Server-rendered apps

---

## 5. Role-Based Access Control (RBAC)

### How
```js
if (user.role !== 'admin') throw Error('Forbidden');
```

### When
- Clear role hierarchy (Admin/User)

---

## 6. Attribute-Based Access Control (ABAC)

### How
- Access based on attributes (user, resource, context)

### When
- Complex enterprise rules
- Fine-grained permissions

---

## DATABASES

## 7. Connecting Node.js to Databases

### PostgreSQL / MySQL
```js
const pool = new Pool();
```

### MongoDB
```js
mongoose.connect(MONGO_URI);
```

---

## 8. ORM vs Raw Queries

| ORM | Raw Queries |
|----|------------|
| Faster development | Better performance |
| Abstraction | Full control |
| Less SQL | Complex SQL possible |

**When:**  
- ORM → CRUD-heavy apps  
- Raw SQL → performance-critical paths  

---

## 9. Connection Pooling

### Why
- Reuse DB connections
- Improve performance

### How
```js
new Pool({ max: 10 });
```

---

## 10. Handling Database Transactions

```js
BEGIN;
COMMIT;
ROLLBACK;
```

### Why
- Data consistency
- Atomic operations

---

## 11. Preventing N+1 Query Problems

### How
- Use JOINs
- Batch queries
- Eager loading

---

## 12. Database Migrations

### Tools
- Sequelize migrations
- Knex
- TypeORM

### Why
- Versioned schema changes
- Team collaboration

---

## CACHING

## 13. Redis Caching

### How
```js
redis.set(key, value);
redis.get(key);
```

### When
- Frequently read data
- Reduce DB load

---

## 14. In-Memory vs Distributed Cache

| In-Memory | Distributed |
|---------|-------------|
| Fast | Scalable |
| Not shared | Shared across instances |
| Process-bound | Redis/Memcached |

---

## TESTING

## 15. Types of Testing

| Type | Scope |
|----|------|
| Unit | Single function |
| Integration | Multiple modules |
| E2E | Full system |

---

## 16. Mocking Dependencies

### How
```js
jest.mock('./service');
```

### Why
- Isolate logic
- Faster tests

---

## 17. Jest / Mocha / Chai

- Jest → All-in-one
- Mocha → Test runner
- Chai → Assertions

---

## 18. Testing Async Code

```js
await expect(fn()).resolves.toBe(true);
```

---

## 19. API Testing in Node.js

### Why
- Validate contracts
- Prevent regressions

---

## 20. Supertest for API Testing

```js
request(app)
  .get('/users')
  .expect(200);
```

---

## Interview-Ready Summary
- Auth & authz are separate concerns
- JWT & OAuth scale differently
- Pooling & caching boost performance
- Testing ensures reliability
- Redis reduces DB load significantly

---

## Conclusion
These topics represent **real-world backend engineering practices** and are core expectations in **senior Node.js interviews**.
