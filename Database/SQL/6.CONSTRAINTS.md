
# SQL Constraints – Interview Guide

This document explains **SQL constraints**, their types, usage, and common interview-related behaviors with examples.

---

## 1. What are SQL Constraints?
SQL constraints are **rules applied to table columns** to enforce **data integrity, accuracy, and consistency** in a database.

They restrict the type of data that can be inserted, updated, or deleted.

---

## 2. Types of SQL Constraints
Commonly used SQL constraints include:
- NOT NULL
- UNIQUE
- CHECK
- DEFAULT
- PRIMARY KEY
- FOREIGN KEY

---

## 3. NOT NULL Constraint
The **NOT NULL** constraint ensures that a column cannot have NULL values.

### Example
```sql
CREATE TABLE employees (
  id INT,
  name VARCHAR(50) NOT NULL
);
```

✔ Prevents missing or undefined values  
✔ Commonly used for mandatory fields

---

## 4. UNIQUE Constraint
The **UNIQUE** constraint ensures that all values in a column are unique.

### Example
```sql
CREATE TABLE users (
  email VARCHAR(100) UNIQUE
);
```

✔ Prevents duplicate values  
✔ Allows NULL values (database-dependent)

---

## 5. CHECK Constraint
The **CHECK** constraint enforces a condition on column values.

### Example
```sql
CREATE TABLE employees (
  age INT CHECK (age >= 18)
);
```

✔ Ensures valid business rules  
✔ Evaluated during INSERT and UPDATE

---

## 6. DEFAULT Constraint
The **DEFAULT** constraint assigns a default value when no value is provided.

### Example
```sql
CREATE TABLE orders (
  status VARCHAR(20) DEFAULT 'PENDING'
);
```

✔ Avoids NULL values  
✔ Simplifies insert operations

---

## 7. FOREIGN KEY Constraint
The **FOREIGN KEY** constraint enforces a relationship between two tables.

### Example
```sql
CREATE TABLE orders (
  order_id INT,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

✔ Maintains referential integrity  
✔ Prevents invalid references

---

## 8. ON DELETE CASCADE
**ON DELETE CASCADE** automatically deletes child records when a parent record is deleted.

### Example
```sql
FOREIGN KEY (customer_id)
REFERENCES customers(id)
ON DELETE CASCADE
```

✔ Keeps data consistent  
❗ Use carefully to avoid accidental data loss

---

## 9. ON DELETE SET NULL
**ON DELETE SET NULL** sets the foreign key value to NULL when the parent record is deleted.

### Example
```sql
FOREIGN KEY (manager_id)
REFERENCES employees(id)
ON DELETE SET NULL
```

✔ Preserves child records  
✔ Requires foreign key column to allow NULL

---

## Comparison: CASCADE vs SET NULL

| Action | Behavior |
|------|---------|
| ON DELETE CASCADE | Deletes child records |
| ON DELETE SET NULL | Sets foreign key to NULL |

---

## Interview-Ready Summary
- Constraints enforce **data integrity**
- NOT NULL ensures mandatory values
- UNIQUE prevents duplicates
- CHECK enforces business rules
- DEFAULT provides fallback values
- FOREIGN KEY maintains relationships
- CASCADE deletes dependent data
- SET NULL removes reference only

---

## Conclusion
SQL constraints are essential for maintaining **reliable and consistent data**. Choosing the correct constraint ensures strong database design and avoids data anomalies.
