
# SQL Subqueries – Interview Guide

This document covers **SQL subqueries**, their types, performance considerations, and common interview questions with clear explanations and examples.

---

## 1. What is a Subquery?
A **subquery** is a SQL query nested inside another query.  
It is used to return intermediate results that the outer query depends on.

Subqueries can be used in:
- SELECT
- FROM
- WHERE
- HAVING

### Example
```sql
SELECT *
FROM employees
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
);
```

The inner query executes first and passes its result to the outer query.

---

## 2. Correlated vs Non-Correlated Subqueries

### Non-Correlated Subquery
- Executes **once**
- Independent of the outer query
- Generally faster

```sql
SELECT *
FROM employees
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
);
```

✔ Inner query runs once  
✔ Result reused for all rows

---

### Correlated Subquery
- Executes **once per row**
- Depends on the outer query
- Usually slower

```sql
SELECT *
FROM employees e
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
  WHERE department_id = e.department_id
);
```

❗ Inner query runs for each row of the outer query

---

### Comparison Table

| Type | Execution | Performance |
|----|----|----|
| Non-Correlated | Once | Faster |
| Correlated | Per Row | Slower |

---

## 3. When Are Subqueries Slower?
Subqueries can be slower when:
- They are **correlated**
- Executed for **large datasets**
- Proper indexes are missing
- Used instead of joins where joins are more efficient

### Slower Example
```sql
SELECT *
FROM employees e
WHERE EXISTS (
  SELECT 1
  FROM departments d
  WHERE d.id = e.department_id
);
```

### Faster Alternative (JOIN)
```sql
SELECT e.*
FROM employees e
JOIN departments d ON e.department_id = d.id;
```

---

## 4. Employees Earning More Than Average Salary
```sql
SELECT *
FROM employees
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
);
```

✔ Common interview question  
✔ Non-correlated subquery

---

## 5. Find the Second Highest Salary

### Method 1: Using Subquery
```sql
SELECT MAX(salary)
FROM employees
WHERE salary < (
  SELECT MAX(salary)
  FROM employees
);
```

### Method 2: Using DISTINCT
```sql
SELECT MAX(salary)
FROM (
  SELECT DISTINCT salary
  FROM employees
  ORDER BY salary DESC
  LIMIT 2
) temp;
```

---

## 6. Employees in the Same Department as Rahul
```sql
SELECT *
FROM employees
WHERE department_id = (
  SELECT department_id
  FROM employees
  WHERE name = 'Rahul'
);
```

✔ Assumes Rahul exists once  
✔ Frequently asked HR-style SQL question

---

## 7. Departments Where Average Salary > 60000

### Using Subquery
```sql
SELECT *
FROM departments
WHERE id IN (
  SELECT department_id
  FROM employees
  GROUP BY department_id
  HAVING AVG(salary) > 60000
);
```

### Using JOIN (Preferred)
```sql
SELECT d.*
FROM departments d
JOIN employees e ON d.id = e.department_id
GROUP BY d.id
HAVING AVG(e.salary) > 60000;
```

---

## Interview-Ready Summary
- **Subquery:** A query inside another query used to fetch intermediate results.
- **Non-correlated subquery:** Executes once and is independent.
- **Correlated subquery:** Executes once per row and depends on outer query.
- **Performance:** Correlated subqueries are slower; joins are preferred for large datasets.

---

## Final Notes
- Use subqueries for **simple filtering and aggregation**
- Prefer **JOINs or window functions** for large datasets
- Always consider **indexes and execution plans**

---

## Conclusion
Subqueries are powerful SQL tools. Understanding when to use **subqueries vs joins** is critical for writing optimized and interview-ready SQL queries.
