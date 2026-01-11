
# What Is Indexing and When Should You Use It? (Practical & Interview-Ready Guide)

This document provides a **deep, practical explanation of database indexing** — not just theory.
It is written for **backend interviews, real-world production systems, and long-term reference**.

---

## 1. What Is Indexing?

### Simple Definition (Interview-Ready)
Indexing is a database technique that **improves query performance** by allowing the database
to **locate rows quickly without scanning the entire table**.

An index works similarly to an **index in a book**:
- Without an index → scan every page
- With an index → jump directly to the page

📌 Interview line:
> “An index reduces query time by avoiding full table scans.”

---

## 2. How Indexing Works Internally (IMPORTANT)

Most databases implement indexes using **B-Tree or B+Tree data structures**.

### Without Index
```
Table Scan:
Row 1 → Row 2 → Row 3 → Row N
```
Time complexity: **O(N)**

### With Index
```
Index Lookup:
Root → Branch → Leaf → Row Pointer
```
Time complexity: **O(log N)**

This makes indexes extremely effective on large tables.

---

## 3. Types of Indexes (YOU MUST KNOW)

### 3.1 Primary Index
- Automatically created on primary key
- Ensures uniqueness
- Fast lookups

```sql
PRIMARY KEY (id)
```

---

### 3.2 Secondary (Non-Clustered) Index
- Created on non-primary columns
- Used for filtering and searching

```sql
CREATE INDEX idx_users_email ON users(email);
```

---

### 3.3 Composite Index
- Index on multiple columns
- Order of columns matters

```sql
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
```

📌 Interview line:
> “Composite index works best when query matches the left-most prefix.”

---

### 3.4 Unique Index
- Prevents duplicate values

```sql
CREATE UNIQUE INDEX idx_unique_email ON users(email);
```

---

### 3.5 Full-Text Index
- Used for text searching
- Not suitable for exact matches

```sql
FULLTEXT (description)
```

---

## 4. When Should You Use Indexing? (MOST IMPORTANT)

### Use Indexes When:
✅ Column is frequently used in `WHERE` clause  
✅ Column is used in `JOIN` conditions  
✅ Column is used in `ORDER BY`  
✅ Column is used in `GROUP BY`  
✅ Table is large  
✅ Read operations are frequent  

📌 Interview line:
> “Indexing is most effective for read-heavy workloads.”

---

## 5. When You Should NOT Use Indexing

### Avoid Indexing When:
❌ Table is very small  
❌ Column has low cardinality (few unique values)  
❌ Table has heavy write operations  
❌ Column is rarely queried  

Examples of low-cardinality columns:
- `is_active` (true/false)
- `gender`
- `status` with few values

📌 Interview line:
> “Indexes on low-cardinality columns provide little benefit.”

---

## 6. Indexing Trade-offs (INTERVIEW GOLD)

### Advantages
- Faster SELECT queries
- Better JOIN performance
- Improved sorting & grouping

### Disadvantages
- Slower INSERT, UPDATE, DELETE
- Additional storage usage
- Index maintenance overhead

📌 Interview line:
> “Indexes optimize reads at the cost of writes.”

---

## 7. Indexing and Query Patterns (VERY PRACTICAL)

### Bad Query (Index Not Used)
```sql
SELECT * FROM users WHERE LOWER(email) = 'test@example.com';
```

### Why?
- Function prevents index usage

### Optimized Query
```sql
SELECT * FROM users WHERE email = 'test@example.com';
```

📌 Interview line:
> “Avoid functions on indexed columns.”

---

## 8. Indexing and LIKE Queries

### Bad ❌
```sql
WHERE name LIKE '%john%';
```

### Good ✅
```sql
WHERE name LIKE 'john%';
```

Leading wildcards disable index usage.

---

## 9. Composite Index – Leftmost Prefix Rule

Given index:
```sql
(user_id, created_at)
```

### Index Works For:
```sql
WHERE user_id = 5;
WHERE user_id = 5 AND created_at > '2024-01-01';
```

### Index Does NOT Work For:
```sql
WHERE created_at > '2024-01-01';
```

📌 Interview line:
> “Composite indexes follow the leftmost prefix rule.”

---

## 10. Indexing and JOIN Performance

Indexes on join columns drastically improve performance.

```sql
SELECT *
FROM orders o
JOIN users u ON o.user_id = u.id;
```

Best practice:
- Index `orders.user_id`
- Index `users.id`

---

## 11. How to Verify Index Usage

### Use EXPLAIN / EXPLAIN ANALYZE
```sql
EXPLAIN SELECT * FROM users WHERE email = 'a@b.com';
```

Look for:
- `Index Scan`
- Avoid `Seq Scan` / `Table Scan`

📌 Interview line:
> “Always verify index usage using EXPLAIN.”

---

## 12. Indexing in ORMs (REAL-WORLD)

ORMs may:
- Hide SQL complexity
- Create inefficient queries

Best practice:
- Explicitly define indexes in migrations
- Do not rely on defaults

📌 Interview line:
> “ORM convenience should not replace database understanding.”

---

## 13. Over-Indexing (COMMON MISTAKE)

Too many indexes:
- Slow down writes
- Increase storage
- Complicate query planner

Rule of thumb:
> “Index what you query, not everything.”

---

## 14. Index Maintenance & Monitoring

Regularly:
- Review unused indexes
- Remove redundant indexes
- Monitor query performance

Indexing is **not a one-time task**.

---

## 15. Real-World Indexing Checklist

Before adding an index:
- Query is slow
- Table is large
- Column is frequently filtered
- Index benefit verified with EXPLAIN

---

## 16. Interview-Ready 30-Second Summary

> “Indexing improves database performance by allowing faster lookups instead of full table scans. I use indexes on frequently queried columns, joins, and sorting operations, while avoiding over-indexing and low-cardinality columns. I always verify index usage with EXPLAIN and consider the read–write trade-offs.”

---

## Final Thought

Indexes are **one of the most powerful performance tools** in backend systems.
Used correctly, they dramatically improve performance.
Used blindly, they create hidden problems.
