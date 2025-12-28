
# SQL Aggregation & GROUP BY Reference

## 1. Difference between `WHERE` and `HAVING`

| Feature        | WHERE                           | HAVING                              |
|----------------|---------------------------------|------------------------------------|
| Purpose        | Filters **rows before aggregation** | Filters **groups after aggregation** |
| Usage          | Used with individual rows       | Used with aggregate functions       |
| Aggregate Func | Cannot use aggregate functions  | Can use aggregate functions         |

**Example:**
```sql
-- Filter rows with salary > 5000 before aggregation
SELECT department_id, AVG(salary)
FROM employees
WHERE salary > 5000
GROUP BY department_id;

-- Filter groups where average salary > 6000
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 6000;
```

---

## 2. Why GROUP BY is needed
- **GROUP BY** is used to **group rows** that have the same values in specified columns.
- Enables **aggregate functions** like `COUNT`, `SUM`, `AVG`, `MAX`, `MIN` to be applied per group.

---

## 3. Can we select column not in GROUP BY?
- In standard SQL: **No**, unless used inside an aggregate function.
- MySQL allows it with `ONLY_FULL_GROUP_BY` disabled, but it is not recommended.

**Example:**
```sql
-- Correct
SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id;

-- Wrong (cannot select name without aggregation)
SELECT department_id, name, AVG(salary)
FROM employees
GROUP BY department_id;
```

---

## 4. Find average salary of employees
```sql
SELECT AVG(salary) AS average_salary
FROM employees;
```

---

## 5. Find department-wise average salary
```sql
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id;
```

---

## 6. Find departments having more than 5 employees
```sql
SELECT department_id, COUNT(employee_id) AS emp_count
FROM employees
GROUP BY department_id
HAVING COUNT(employee_id) > 5;
```

---

## 7. Find max salary per department
```sql
SELECT department_id, MAX(salary) AS max_salary
FROM employees
GROUP BY department_id;
```

---

## 8. Find total salary paid per department
```sql
SELECT department_id, SUM(salary) AS total_salary
FROM employees
GROUP BY department_id;
```

---

**Notes for Interview:**
- **WHERE** filters **rows** before aggregation.
- **HAVING** filters **aggregated results**.
- Always **GROUP BY columns that are selected without aggregation**.
- Aggregate functions: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.
- Use `HAVING` to filter groups, e.g., departments with more than X employees.
