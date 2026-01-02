
# SQL & RDBMS Fundamentals – Interview Guide

This document covers **core SQL and RDBMS concepts** that are frequently asked in **backend, full-stack, and database interviews**.

---

## 1. What is SQL?
**SQL (Structured Query Language)** is a standard language used to **create, read, update, and delete data** in relational databases.

SQL is used for:
- Querying data (SELECT)
- Inserting data (INSERT)
- Updating data (UPDATE)
- Deleting data (DELETE)
- Managing schema (CREATE, ALTER, DROP)

---

## 2. What is RDBMS?
**RDBMS (Relational Database Management System)** is software that stores data in **tables with predefined relationships**.

Examples:
- MySQL
- PostgreSQL
- SQL Server
- Oracle

✔ Enforces data integrity  
✔ Uses tables, rows, and columns  

---

## 3. Difference Between SQL and NoSQL

| Feature | SQL (RDBMS) | NoSQL |
|------|-------------|-------|
| Data model | Tables (rows & columns) | Document, Key-Value, Graph |
| Schema | Fixed schema | Flexible / Schema-less |
| Transactions | Strong ACID support | Limited / eventual consistency |
| Scaling | Vertical | Horizontal |
| Use cases | Banking, ERP, CRM | Big data, real-time apps |

---

## 4. What is a Table, Row, and Column?
- **Table:** Collection of related data (e.g., employees)
- **Row:** Single record in a table
- **Column:** Attribute of the data (e.g., name, salary)

---

## 5. What is a Primary Key?
A **primary key** uniquely identifies each row in a table.

### Characteristics
- Must be **unique**
- Cannot be **NULL**
- Only one primary key per table

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(100)
);
```

---

## 6. Can a Table Have Multiple Primary Keys?
❌ No.  
A table can have **only one primary key**, but it can be a **composite primary key** (multiple columns).

```sql
PRIMARY KEY (order_id, product_id)
```

---

## 7. Difference Between PRIMARY KEY and UNIQUE

| Feature | PRIMARY KEY | UNIQUE |
|------|------------|--------|
| NULL allowed | No | Yes (DB dependent) |
| Count per table | One | Multiple |
| Index | Implicit | Implicit |

---

## 8. Can a Primary Key Be NULL?
❌ No.  
Primary keys **must always have a value** to uniquely identify rows.

---

## 9. What is a Foreign Key?
A **foreign key** is a column that references the **primary key of another table**.

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 10. Why Are Foreign Keys Important?
Foreign keys:
- Maintain data consistency
- Prevent orphan records
- Enforce relationships between tables

✔ Ensures valid references  
✔ Improves data reliability  

---

## 11. What is Referential Integrity?
**Referential integrity** ensures that:
- A foreign key value always refers to a valid primary key
- Or is NULL (if allowed)

### Example
You cannot insert an order for a non-existing user.

---

## Interview-Ready Summary
- SQL is used to manage relational data
- RDBMS stores data in structured tables
- Primary keys uniquely identify rows
- Foreign keys maintain relationships
- Referential integrity ensures data correctness

---

## Conclusion
Understanding SQL and RDBMS fundamentals is essential for designing **reliable, consistent, and scalable database systems**, and these concepts are foundational for all backend interviews.
