
# SQL Indexes – Interview Guide

This document explains **SQL indexes**, how they work, performance benefits, trade-offs, and common interview questions with examples.

---

## 1. What is an Index?
An **index** is a database structure that improves the **speed of data retrieval** operations on a table at the cost of additional storage and slower write operations.

Think of an index like a **book index** that helps you quickly locate information without scanning every page.

---

## 2. How Does an Index Improve Performance?
Without an index, the database performs a **full table scan**, checking every row.

With an index:
- Data is stored in a **sorted structure**
- Database can quickly locate rows
- Fewer disk I/O operations

### Example
```sql
SELECT * FROM employees WHERE email = 'abc@company.com';
```
If `email` is indexed, the database directly finds the row instead of scanning the entire table.

---

## 3. Trade-offs of Indexing
While indexes improve read performance, they come with costs:

### Advantages
- Faster SELECT queries
- Efficient filtering, sorting, and joins

### Disadvantages
- Slower INSERT, UPDATE, DELETE operations
- Additional storage usage
- Index maintenance overhead

❗ Over-indexing can hurt overall performance.

---

## 4. Clustered vs Non-Clustered Index

### Clustered Index
- Physically orders table data
- Only **one clustered index** per table
- Usually created on **primary key**

```sql
CREATE CLUSTERED INDEX idx_emp_id ON employees(id);
```

### Non-Clustered Index
- Separate structure pointing to table rows
- Multiple non-clustered indexes allowed

```sql
CREATE NONCLUSTERED INDEX idx_emp_email ON employees(email);
```

### Comparison

| Feature | Clustered | Non-Clustered |
|------|-----------|---------------|
| Data order | Physical | Logical |
| Count per table | One | Many |
| Storage | Same as table | Separate |
| Speed | Faster for range queries | Faster for lookups |

---

## 5. Composite Index
A **composite index** is an index on **multiple columns**.

```sql
CREATE INDEX idx_name_dept ON employees(name, department_id);
```

✔ Improves queries filtering by both columns  
✔ Column order matters

---

## 6. Why Index on Foreign Keys?
Foreign keys are often used in **JOINs**.

Indexing them:
- Improves join performance
- Speeds up DELETE and UPDATE on parent tables
- Avoids table scans on child tables

```sql
CREATE INDEX idx_order_customer ON orders(customer_id);
```

---

## 7. Why Index Is Not Used with LIKE '%value%'?
Indexes work efficiently when searching from the **beginning of a value**.

```sql
SELECT * FROM users WHERE name LIKE '%ankit';
```

❌ Leading wildcard prevents index usage  
❌ Database must scan all rows

### Index can be used here:
```sql
SELECT * FROM users WHERE name LIKE 'ankit%';
```

---

## 8. Explain B-Tree Index
A **B-Tree index** is the most commonly used index type.

### Characteristics
- Balanced tree structure
- Logarithmic search time (O(log n))
- Efficient for equality and range queries

### Structure
- Root node
- Intermediate nodes
- Leaf nodes containing row pointers

### Why B-Tree?
- Keeps data sorted
- Minimizes disk reads
- Supports fast search, insert, and delete

---

## Interview-Ready Summary
- Index improves read performance by reducing scans
- Trade-off exists between reads and writes
- Clustered index defines physical order
- Non-clustered index stores pointers
- Composite index supports multi-column queries
- Foreign key indexes improve joins
- LIKE '%value%' disables index usage
- B-Tree indexes are balanced and efficient

---

## Conclusion
Indexes are critical for performance tuning, but must be used wisely. Understanding index types, usage patterns, and trade-offs is essential for designing scalable databases.
