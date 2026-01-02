
# SQL Advanced Concepts – Interview Guide

This document covers **advanced and frequently missed SQL interview topics** including stored procedures, views, triggers, UNION, pagination, locking, concurrency, and index-related concepts.  
Ideal for **senior backend / full‑stack interviews**.

---

## 1. Stored Procedures
A **stored procedure** is a precompiled set of SQL statements stored in the database.

### Benefits
- Improved performance (precompiled)
- Reusable business logic
- Reduced network calls
- Better security (controlled access)

```sql
CREATE PROCEDURE get_employees()
BEGIN
  SELECT * FROM employees;
END;
```

### When to use
- Repeated complex logic
- Heavy data processing
- Transactional workflows

---

## 2. Views
A **view** is a virtual table based on a SQL query.

```sql
CREATE VIEW active_employees AS
SELECT * FROM employees WHERE status = 'ACTIVE';
```

### Pros
- Simplifies complex queries
- Improves readability
- Security (column-level access)

### Cons
- No data stored (unless materialized)
- Performance depends on underlying query

---

## 3. Materialized Views
A **materialized view** stores query results physically.

✔ Faster reads  
❌ Needs refresh  

```sql
CREATE MATERIALIZED VIEW dept_stats AS
SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id;
```

---

## 4. Triggers
A **trigger** automatically executes on INSERT/UPDATE/DELETE.

```sql
CREATE TRIGGER log_update
AFTER UPDATE ON employees
FOR EACH ROW
INSERT INTO audit_log VALUES (OLD.id, NOW());
```

### When to avoid
- Hidden logic
- Hard to debug
- Performance impact

---

## 5. UNION vs UNION ALL

| Feature | UNION | UNION ALL |
|------|-------|-----------|
| Removes duplicates | Yes | No |
| Performance | Slower | Faster |
| Sorting | Required | Not required |

```sql
SELECT name FROM emp1
UNION ALL
SELECT name FROM emp2;
```

---

## 6. Pagination in SQL

### OFFSET Pagination (Slower)
```sql
SELECT * FROM employees ORDER BY id LIMIT 10 OFFSET 1000;
```

❌ Scans skipped rows

### Keyset Pagination (Recommended)
```sql
SELECT * FROM employees
WHERE id > 1000
ORDER BY id
LIMIT 10;
```

✔ Scales better

---

## 7. Locking in SQL
Locks control concurrent access.

### Types
- Row-level lock
- Table-level lock

```sql
SELECT * FROM employees WHERE id = 1 FOR UPDATE;
```

---

## 8. Concurrency Control
Concurrency ensures multiple transactions work safely.

### Techniques
- Locking
- MVCC (PostgreSQL)
- Isolation levels

### Optimistic vs Pessimistic Locking

| Optimistic | Pessimistic |
|----------|-------------|
| No lock upfront | Locks early |
| Version check | Blocking |
| High concurrency | Safer |

---

## 9. Constraints vs Indexes

| Constraint | Index |
|---------|-------|
| Enforces rules | Improves performance |
| Logical | Physical |
| PK/FK/UNIQUE | B‑Tree / Hash |

✔ PRIMARY KEY creates index  
❌ FOREIGN KEY does NOT auto-create index

---

## 10. Index & Query Optimization

### Why index may not be used
- Function on column
- LIKE '%value%'
- Data type mismatch
- Low selectivity

### Covering Index
Index contains all required columns → no table lookup.

---

## 11. SELECT FOR UPDATE
Used to lock rows for update inside transactions.

```sql
BEGIN;
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;
UPDATE accounts SET balance = balance - 100;
COMMIT;
```

---

## 12. Deadlocks & Prevention
Deadlock occurs when transactions wait on each other.

### Prevention
- Consistent lock order
- Short transactions
- Proper indexes
- Retry logic

---

## Interview‑Ready Summary
- Stored procedures encapsulate logic
- Views simplify queries
- UNION ALL preferred for performance
- Keyset pagination scales
- Locks ensure consistency
- Constraints ≠ indexes
- SELECT FOR UPDATE controls concurrency

---

## Conclusion
These topics complete your **senior‑level SQL interview preparation** and are frequently used in **real‑world backend systems**.
