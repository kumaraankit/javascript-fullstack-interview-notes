
# Databases – SQL & NoSQL, ACID, CAP, ORMs, and Caching (Complete Practical Guide)

This document provides a **deep, practical, and interview-ready explanation** of core **database concepts**
that backend engineers are expected to understand.
It is suitable for **backend interviews, system design rounds, and long-term reference**.

---

## 1. Role of Databases in Backend Systems

Databases are responsible for:
- Persisting application data
- Ensuring data consistency and integrity
- Supporting concurrent access
- Scaling with application growth

📌 Interview line:
> “Databases are the backbone of backend systems.”

---

## 2. SQL Databases (Relational Databases)

### What Are SQL Databases?
SQL databases store data in **structured tables** with predefined schemas
and relationships enforced using constraints.

Examples:
- MySQL
- PostgreSQL
- Oracle
- SQL Server

### Key Characteristics
- Fixed schema
- ACID transactions
- Strong consistency
- SQL query language

### When to Use SQL
- Complex relationships
- Transactions (banking, payments)
- Data integrity is critical

📌 Interview line:
> “SQL databases are ideal for transactional systems.”

---

## 3. NoSQL Databases

### What Are NoSQL Databases?
NoSQL databases are designed for **scalability, flexibility, and high throughput**
and do not rely on fixed schemas.

Types of NoSQL:
- Key-Value (Redis)
- Document (MongoDB)
- Column-family (Cassandra)
- Graph (Neo4j)

### Key Characteristics
- Flexible schema
- Horizontal scalability
- Eventual consistency (often)

### When to Use NoSQL
- Large-scale systems
- High write throughput
- Flexible or evolving schemas

📌 Interview line:
> “NoSQL trades consistency for scalability and flexibility.”

---

## 4. SQL vs NoSQL (INTERVIEW GOLD)

| Aspect | SQL | NoSQL |
|------|-----|-------|
| Schema | Fixed | Flexible |
| Scaling | Vertical | Horizontal |
| Transactions | Strong | Limited / Eventual |
| Consistency | Strong | Eventual |
| Use Case | Financial systems | Big data, analytics |

---

## 5. ACID Properties (VERY IMPORTANT)

ACID ensures **reliable transactions** in databases.

### 5.1 Atomicity
- Transaction is all-or-nothing

### 5.2 Consistency
- Data moves from one valid state to another

### 5.3 Isolation
- Concurrent transactions do not interfere

### 5.4 Durability
- Once committed, data persists even after crash

📌 Interview line:
> “ACID guarantees correctness of transactions.”

---

## 6. CAP Theorem (DISTRIBUTED SYSTEMS CORE)

CAP states that a distributed system can guarantee **only two of three**:

- Consistency
- Availability
- Partition Tolerance

### Practical Implications
- CP systems: Strong consistency, possible downtime
- AP systems: Always available, eventual consistency

📌 Interview line:
> “In distributed systems, partition tolerance is non-negotiable.”

---

## 7. ACID vs CAP (IMPORTANT DIFFERENCE)

- ACID applies to **single database transactions**
- CAP applies to **distributed systems**

Understanding both is critical.

---

## 8. ORMs (Object Relational Mappers)

### What Is an ORM?
ORMs map database tables to application objects,
allowing developers to interact with the database using code instead of SQL.

Examples:
- Sequelize
- TypeORM
- Prisma
- Hibernate

### Advantages
- Faster development
- Database abstraction
- Safer queries

### Disadvantages
- Performance overhead
- Hidden complexity
- Risk of inefficient queries

📌 Interview line:
> “ORMs increase productivity but require understanding of SQL underneath.”

---

## 9. ORM Performance Considerations

Common problems:
- N+1 queries
- Over-fetching data
- Unoptimized joins

Best practice:
- Profile generated queries
- Use raw SQL when needed

---

## 10. Caching in Database Systems

### What Is Caching?
Caching stores frequently accessed data in **fast storage**
to reduce database load and improve performance.

### Where Caching Is Used
- Application layer (Redis)
- Database query cache
- CDN

📌 Interview line:
> “Caching reduces database load dramatically.”

---

## 11. Cache Strategies

### Cache-Aside (Most Common)
- App controls cache
- Cache miss → DB fetch → cache store

### Write-Through / Write-Behind
- Cache updated on writes

Each strategy has trade-offs.

---

## 12. Cache Invalidation (HARDEST PART)

Strategies:
- TTL-based expiration
- Event-driven invalidation
- Manual eviction

📌 Interview line:
> “Incorrect cache invalidation causes stale data bugs.”

---

## 13. Databases + Caching Together

Typical flow:
```
API → Cache → Database
```

Benefits:
- Faster responses
- Better scalability
- Reduced DB load

---

## 14. Choosing the Right Database Strategy

Factors:
- Data consistency requirements
- Read vs write ratio
- Scale requirements
- Team expertise

📌 Interview line:
> “Technology choice should follow requirements, not trends.”

---

## 15. Common Mistakes (INTERVIEW GOLD)

❌ Using NoSQL for transactional systems  
❌ Ignoring indexes  
❌ Overusing ORMs blindly  
❌ Caching without invalidation  
❌ Assuming one DB fits all use cases  

---

## 16. Real-World Database Design Checklist

Before production:
- DB type chosen correctly
- Indexes designed
- Transactions reviewed
- Caching strategy defined
- Monitoring enabled

---

## 17. Interview-Ready 30-Second Summary

> “I choose between SQL and NoSQL based on consistency and scalability needs. I understand ACID for transactions and CAP for distributed systems, use ORMs carefully while monitoring query performance, and apply caching to reduce database load and improve response times.”

---

## Final Thought

Strong backend engineers understand **data deeply**.
Databases are not just storage — they define system reliability and scalability.
