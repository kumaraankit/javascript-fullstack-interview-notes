
# Backend SQL & Database Handling in Node.js – Interview Guide

This document explains how **transactions, ORMs, connection pooling, deadlocks, and SQL injection** are handled in a Node.js backend. It is written for **senior backend / full-stack interviews**.

---

## 1. How Transactions Are Handled in a Node.js Backend
In Node.js, transactions are managed at the **database layer**, not by Node.js itself.  
Node.js coordinates transaction boundaries using database drivers or ORMs.

### Example (Using Raw SQL)
```js
await client.query('BEGIN');
await client.query('UPDATE accounts SET balance = balance - 500 WHERE id = 1');
await client.query('UPDATE accounts SET balance = balance + 500 WHERE id = 2');
await client.query('COMMIT');
```

### Using ORM (Example: Sequelize)
```js
const transaction = await sequelize.transaction();
try {
  await User.update({ balance: 500 }, { transaction });
  await transaction.commit();
} catch (err) {
  await transaction.rollback();
}
```

✔ Ensures atomicity  
✔ Rollback on failure  

---

## 2. How ORMs Generate SQL
ORMs (Object Relational Mappers) translate **object-based code** into SQL queries.

### Example
```js
User.findAll({ where: { status: 'ACTIVE' } });
```

Generated SQL:
```sql
SELECT * FROM users WHERE status = 'ACTIVE';
```

### How it works
- Maps tables to models
- Maps columns to object properties
- Builds SQL using query builders
- Executes SQL via database drivers

✔ Faster development  
✔ Database abstraction  

---

## 3. When to Write Raw SQL Instead of ORM
Use **raw SQL** when:
- Query is very complex (analytics, reporting)
- Performance is critical
- You need database-specific features
- ORM-generated queries are inefficient

### Example
```js
sequelize.query(
  'SELECT department_id, AVG(salary) FROM employees GROUP BY department_id'
);
```

✔ Better performance  
✔ Full control over execution plan  

---

## 4. How Connection Pooling Works
A **connection pool** maintains a set of open database connections that can be reused.

### Why pooling is needed
- Creating DB connections is expensive
- Reusing connections improves performance
- Controls max concurrent DB connections

### Flow
1. Request arrives
2. Pool provides an available connection
3. Query executes
4. Connection returned to pool

### Example (pg library)
```js
const pool = new Pool({ max: 10 });
const result = await pool.query('SELECT * FROM users');
```

✔ Improves scalability  
✔ Prevents connection exhaustion  

---

## 5. How to Avoid Deadlocks
Deadlocks occur when two transactions wait on each other’s locks.

### Causes
- Inconsistent lock ordering
- Long-running transactions
- Updating rows in different orders

### Prevention Techniques
- Always access tables in the same order
- Keep transactions short
- Use proper indexes
- Retry failed transactions

✔ Common interview topic  

---

## 6. How SQL Injection Happens
SQL injection occurs when untrusted input is concatenated into SQL queries.

### Vulnerable Code
```js
const query = "SELECT * FROM users WHERE email = '" + email + "'";
```

Input:
```sql
' OR '1'='1
```

❌ Exposes entire table  

---

## 7. How to Prevent SQL Injection
### Use Parameterized Queries
```js
const query = 'SELECT * FROM users WHERE email = $1';
await client.query(query, [email]);
```

### Additional Protections
- ORM query binding
- Input validation
- Least privilege DB users
- Avoid dynamic SQL

✔ One of the most critical security practices  

---

## Interview-Ready Summary
- Node.js manages transactions via DB drivers/ORMs
- ORMs translate objects into SQL
- Raw SQL is used for performance-critical queries
- Connection pooling improves scalability
- Deadlocks are avoided with ordering and short transactions
- SQL injection is prevented with parameterized queries

---

## Conclusion
Understanding database handling in Node.js is critical for building **secure, scalable, and reliable backend systems**. These concepts are frequently tested in senior backend interviews.
