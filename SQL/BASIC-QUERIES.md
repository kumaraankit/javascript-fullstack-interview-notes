
# SQL SELECT Queries – Interview Practice

This document covers **basic and commonly asked SQL SELECT queries** using an `employees` table. These queries are frequently asked in **SQL fundamentals and backend interviews**.

---

## Assumed Table Structure
```sql
employees (
  id INT,
  name VARCHAR(100),
  salary DECIMAL(10,2),
  department_id INT,
  joining_date DATE
);
```

---

## 1. Fetch All Employees
```sql
SELECT *
FROM employees;
```

---

## 2. Fetch Only Name and Salary
```sql
SELECT name, salary
FROM employees;
```

---

## 3. Fetch Employees with Salary > 50000
```sql
SELECT *
FROM employees
WHERE salary > 50000;
```

---

## 4. Fetch Employees with Salary Between 40000 and 80000
```sql
SELECT *
FROM employees
WHERE salary BETWEEN 40000 AND 80000;
```

---

## 5. Fetch Employees Whose Name Starts with 'A'
```sql
SELECT *
FROM employees
WHERE name LIKE 'A%';
```

---

## 6. Fetch Employees Sorted by Salary (Descending)
```sql
SELECT *
FROM employees
ORDER BY salary DESC;
```

---

## 7. Fetch Top 5 Highest Paid Employees
### MySQL / PostgreSQL
```sql
SELECT *
FROM employees
ORDER BY salary DESC
LIMIT 5;
```

### SQL Server
```sql
SELECT TOP 5 *
FROM employees
ORDER BY salary DESC;
```

---

## 8. Fetch Distinct Department IDs
```sql
SELECT DISTINCT department_id
FROM employees;
```

---

## 9. Fetch Employees Joined After 2023-01-01
```sql
SELECT *
FROM employees
WHERE joining_date > '2023-01-01';
```

---

## 10. Fetch Employees Whose Name Contains 'an'
```sql
SELECT *
FROM employees
WHERE name LIKE '%an%';
```

---

## Interview Tips
- Always use `WHERE` before `ORDER BY`
- Prefer specific columns instead of `SELECT *` in production
- Use indexes on frequently filtered columns (salary, department_id, joining_date)
- Avoid leading wildcards (`%value`) for better index usage

---

## Conclusion
These queries form the **foundation of SQL interviews** and are essential for building and querying relational databases efficiently.
