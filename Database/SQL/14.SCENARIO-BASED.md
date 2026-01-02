
# SQL Advanced Problems & Database Design – Interview Guide

This document covers **common SQL interview problems** and **database design concepts** with clear explanations and examples.

---

## 1. Delete Duplicate Rows
Duplicate rows are removed while keeping one unique record.

### Using CTE (Recommended)
```sql
WITH cte AS (
  SELECT *,
         ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) AS rn
  FROM users
)
DELETE FROM cte WHERE rn > 1;
```

✔ Keeps one row per email  
✔ Safe and interview-preferred

---

## 2. Find Missing IDs in a Sequence
Used when IDs are expected to be sequential.

### Using LEFT JOIN
```sql
SELECT t1.id + 1 AS missing_id
FROM table1 t1
LEFT JOIN table1 t2 ON t1.id + 1 = t2.id
WHERE t2.id IS NULL;
```

✔ Finds gaps in sequences

---

## 3. Pagination Using SQL
Used to fetch data in pages.

### OFFSET / LIMIT (MySQL, PostgreSQL)
```sql
SELECT *
FROM employees
ORDER BY id
LIMIT 10 OFFSET 20;
```

### Keyset Pagination (Better for large data)
```sql
SELECT *
FROM employees
WHERE id > 20
ORDER BY id
LIMIT 10;
```

✔ Keyset pagination is faster and scalable

---

## 4. Soft Delete vs Hard Delete

### Soft Delete
- Marks records as deleted
- Data remains in table

```sql
ALTER TABLE users ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;
```

### Hard Delete
- Permanently removes records

```sql
DELETE FROM users WHERE id = 10;
```

### Comparison

| Soft Delete | Hard Delete |
|------------|-------------|
| Recoverable | Permanent |
| Audit friendly | Not recoverable |
| More storage | Less storage |

---

## 5. Design User & Order Schema
### User Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Order Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  total_amount DECIMAL(10,2),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. Design Payment System Schema
```sql
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  amount DECIMAL(10,2),
  payment_method VARCHAR(50),
  payment_status VARCHAR(20),
  transaction_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

✔ Supports retries  
✔ Tracks payment lifecycle

---

## 7. Store Hierarchical Data in SQL

### Adjacency List (Most Common)
```sql
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  manager_id INT REFERENCES employees(id)
);
```

### Recursive Query
```sql
WITH RECURSIVE emp_tree AS (
  SELECT id, name, manager_id
  FROM employees
  WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id
  FROM employees e
  JOIN emp_tree t ON e.manager_id = t.id
)
SELECT * FROM emp_tree;
```

---

## Interview-Ready Summary
- CTEs help remove duplicates safely
- Pagination must scale with data size
- Soft delete preferred for audit systems
- Proper schema design improves performance
- Hierarchical data handled using recursive queries

---

## Conclusion
These SQL patterns and schema designs are **frequently tested in senior backend interviews** and are essential for building scalable, real-world systems.
