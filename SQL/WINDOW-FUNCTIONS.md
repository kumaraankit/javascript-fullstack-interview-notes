
# SQL Window Functions – Interview Guide

This document explains **window functions**, how they differ from GROUP BY, and common interview problems with clear examples.

---

## 1. What are Window Functions?
**Window functions** perform calculations across a set of rows related to the current row, **without collapsing rows**.

They use the `OVER()` clause.

### Syntax
```sql
function_name(...) OVER (
  PARTITION BY column
  ORDER BY column
)
```

✔ Rows remain intact  
✔ Enables advanced analytics

---

## 2. GROUP BY vs Window Functions

### GROUP BY
- Aggregates rows
- Reduces number of rows

```sql
SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id;
```

---

### Window Functions
- Does not reduce rows
- Adds calculated values per row

```sql
SELECT name, department_id,
       AVG(salary) OVER (PARTITION BY department_id) AS avg_salary
FROM employees;
```

---

### Comparison

| Feature | GROUP BY | Window Function |
|------|---------|----------------|
| Rows returned | Reduced | Same as input |
| Per-row calculation | No | Yes |
| Analytics | Limited | Advanced |

---

## 3. What is PARTITION BY?
`PARTITION BY` divides rows into **logical groups (windows)** for calculation.

Each partition is processed independently.

```sql
AVG(salary) OVER (PARTITION BY department_id)
```

---

## 4. Rank Employees by Salary Within Department
```sql
SELECT name, department_id, salary,
       RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank_in_dept
FROM employees;
```

---

## 5. Top 2 Salaries per Department
```sql
SELECT *
FROM (
  SELECT name, department_id, salary,
         DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
  FROM employees
) t
WHERE rnk <= 2;
```

---

## 6. Running Total of Salaries
```sql
SELECT name, salary,
       SUM(salary) OVER (ORDER BY name) AS running_total
FROM employees;
```

✔ Common in financial reports  
✔ Preserves all rows

---

## 7. Salary Difference from Department Average
```sql
SELECT name, department_id, salary,
       salary - AVG(salary) OVER (PARTITION BY department_id) AS diff_from_avg
FROM employees;
```

---

## Interview-Ready Summary
- Window functions calculate values across related rows
- GROUP BY collapses rows; window functions do not
- PARTITION BY defines logical windows
- Useful for ranking, running totals, comparisons

---

## Conclusion
Window functions are essential for **advanced SQL analytics**, offering flexibility and performance advantages over traditional aggregation.
