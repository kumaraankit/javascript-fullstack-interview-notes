
# SQL CTE (Common Table Expressions) – Interview Guide

This document explains **CTEs**, how they differ from subqueries, recursive CTE use cases, and common interview problems with examples.

---

## 1. What is a CTE?
A **CTE (Common Table Expression)** is a temporary named result set defined using the `WITH` clause.  
It exists only for the duration of the query and improves **readability and maintainability**.

### Syntax
```sql
WITH cte_name AS (
  SELECT ...
)
SELECT * FROM cte_name;
```

✔ Makes complex queries easier to understand  
✔ Can be referenced multiple times in the same query

---

## 2. CTE vs Subquery

### Subquery
- Nested inside another query
- Harder to read for complex logic
- Cannot be reused easily

```sql
SELECT *
FROM employees
WHERE salary > (
  SELECT AVG(salary) FROM employees
);
```

---

### CTE
- Defined at the top using `WITH`
- Improves readability
- Can be reused multiple times

```sql
WITH avg_salary AS (
  SELECT AVG(salary) AS avg_sal FROM employees
)
SELECT *
FROM employees
WHERE salary > (SELECT avg_sal FROM avg_salary);
```

---

### Comparison Table

| Feature | CTE | Subquery |
|------|-----|----------|
| Readability | High | Low |
| Reusability | Yes | No |
| Debugging | Easier | Harder |
| Performance | Similar (optimizer dependent) | Similar |

---

## 3. Recursive CTE
A **recursive CTE** references itself and is commonly used for **hierarchical or tree-structured data**.

### Syntax
```sql
WITH RECURSIVE cte_name AS (
  -- Anchor query
  SELECT ...

  UNION ALL

  -- Recursive query
  SELECT ...
  FROM cte_name
)
SELECT * FROM cte_name;
```

---

## 4. Recursive CTE Use Cases
- Employee–manager hierarchies
- Organization charts
- Category/sub-category trees
- Graph traversal (limited depth)
- Bill of materials (BOM)

---

## 5. Second Highest Salary Using CTE
```sql
WITH salary_rank AS (
  SELECT salary,
         DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT salary
FROM salary_rank
WHERE rnk = 2;
```

✔ Handles duplicate salaries  
✔ Interview-preferred solution

---

## 6. Department-wise Salary Statistics Using CTE
```sql
WITH dept_salary_stats AS (
  SELECT department_id,
         COUNT(*) AS emp_count,
         MIN(salary) AS min_salary,
         MAX(salary) AS max_salary,
         AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department_id
)
SELECT *
FROM dept_salary_stats;
```

---

## Interview-Ready Summary
- CTE improves query readability and structure
- CTE and subquery performance is similar
- Recursive CTE is used for hierarchical data
- CTEs are commonly used with window functions

---

## Conclusion
CTEs are powerful SQL tools for writing **clean, readable, and maintainable queries**, especially in complex analytical and hierarchical scenarios.
