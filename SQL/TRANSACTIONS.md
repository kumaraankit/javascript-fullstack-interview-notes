
# SQL Transactions – Interview Guide

This document explains **database transactions**, ACID properties, auto-commit behavior, rollback, and DDL rollback behavior with clear interview-focused explanations.

---

## 1. What is a Transaction?
A **transaction** is a sequence of one or more SQL operations executed as a **single logical unit of work**.

A transaction ensures that either:
- **All operations succeed**, or
- **None of them are applied**

### Example
```sql
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;
```

---

## 2. ACID Properties
ACID ensures reliable transaction processing.

### Atomicity
- Transaction is **all or nothing**
- If one step fails, entire transaction is rolled back

```sql
ROLLBACK;
```

---

### Consistency
- Database moves from one **valid state to another**
- Constraints, triggers, and rules are enforced

Example: balance cannot be negative

---

### Isolation
- Concurrent transactions do not interfere
- Intermediate states are hidden from other transactions

Isolation levels:
- Read Uncommitted
- Read Committed
- Repeatable Read
- Serializable

---

### Durability
- Once committed, data **persists even after crash**
- Changes are written to disk / logs

```sql
COMMIT;
```

---

## 3. What is Auto-Commit?
**Auto-commit** mode commits every SQL statement automatically.

- Default behavior in many databases
- No need to call COMMIT explicitly

```sql
SET AUTOCOMMIT = 1;
```

❗ Risky for multi-step operations

---

## 4. What is Rollback?
**ROLLBACK** undoes all changes made in the current transaction before commit.

```sql
BEGIN;
UPDATE employees SET salary = salary + 5000;
ROLLBACK;
```

✔ Restores previous state  
✔ Used on errors or failed validations

---

## 5. Can DDL Be Rolled Back?
It depends on the database.

### Most Databases (MySQL, SQL Server)
❌ DDL statements are **auto-committed**
❌ Cannot be rolled back

```sql
CREATE TABLE test (id INT);
-- Cannot rollback
```

---

### Some Databases (PostgreSQL)
✅ DDL **can be rolled back** inside a transaction

```sql
BEGIN;
CREATE TABLE demo (id INT);
ROLLBACK;
```

---

## Interview-Ready Summary
- Transaction = logical unit of work
- ACID ensures reliability
- Auto-commit commits each statement
- Rollback undoes uncommitted changes
- DDL rollback depends on DB engine

---

## Conclusion
Understanding transactions and ACID properties is critical for building **reliable, consistent, and fault-tolerant database systems**.
