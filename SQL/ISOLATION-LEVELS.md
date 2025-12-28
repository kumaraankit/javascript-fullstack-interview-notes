
# SQL Isolation Levels – Interview Guide

This document explains **transaction isolation levels**, common read anomalies, and PostgreSQL defaults with clear interview-focused explanations and examples.

---

## 1. What are Isolation Levels?
**Isolation levels** define how and when changes made by one transaction become visible to other concurrent transactions.

They balance:
- **Data consistency**
- **Concurrency**
- **Performance**

Defined by the SQL standard.

---

## 2. READ UNCOMMITTED
Lowest isolation level.

### Behavior
- Transactions can read **uncommitted data**
- Allows **dirty reads**

### Example
Transaction A updates a row but does not commit.  
Transaction B can read this uncommitted value.

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
```

❗ Rarely used in production  
❗ Not supported by PostgreSQL (treated as READ COMMITTED)

---

## 3. READ COMMITTED
Most commonly used isolation level.

### Behavior
- Can only read **committed data**
- Prevents dirty reads
- Allows **non-repeatable reads** and **phantom reads**

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

✔ Safer than READ UNCOMMITTED  
✔ Good balance between consistency and performance

---

## 4. REPEATABLE READ
Ensures stable reads within a transaction.

### Behavior
- Same row read multiple times returns same data
- Prevents **dirty reads** and **non-repeatable reads**
- Phantom reads may still occur (DB-dependent)

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

✔ Suitable for financial calculations

---

## 5. SERIALIZABLE
Highest isolation level.

### Behavior
- Transactions behave as if executed **one after another**
- Prevents **dirty reads, non-repeatable reads, and phantom reads**
- Lowest concurrency, highest consistency

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

❗ Can cause blocking and performance impact

---

## 6. Dirty Read
Occurs when a transaction reads data that has not yet been committed.

### Example
- Transaction A updates salary
- Transaction B reads updated salary
- Transaction A rolls back

Result: Transaction B read invalid data

---

## 7. Non-Repeatable Read
Occurs when a row read twice gives different values.

### Example
- Transaction A reads salary
- Transaction B updates salary and commits
- Transaction A reads salary again → different value

---

## 8. Phantom Read
Occurs when new rows appear in repeated reads.

### Example
- Transaction A queries employees in dept 10
- Transaction B inserts a new employee in dept 10
- Transaction A repeats query → extra row appears

---

## 9. Isolation Level vs Read Anomalies

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|---------------|-----------|--------------------|--------------|
| READ UNCOMMITTED | Yes | Yes | Yes |
| READ COMMITTED | No | Yes | Yes |
| REPEATABLE READ | No | No | Yes* |
| SERIALIZABLE | No | No | No |

*Phantom behavior depends on database engine

---

## 10. PostgreSQL Default Isolation Level
PostgreSQL uses:

> **READ COMMITTED** (default)

### PostgreSQL Notes
- READ UNCOMMITTED behaves same as READ COMMITTED
- REPEATABLE READ uses snapshot isolation
- SERIALIZABLE uses predicate locking

---

## Interview-Ready Summary
- Isolation levels control transaction visibility
- READ COMMITTED is most widely used
- SERIALIZABLE offers strongest consistency
- PostgreSQL default isolation level is READ COMMITTED

---

## Conclusion
Understanding isolation levels and read anomalies is critical for designing **concurrent, consistent, and high-performance database systems**.
