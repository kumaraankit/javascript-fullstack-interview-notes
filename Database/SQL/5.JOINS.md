
# SQL JOINs Reference

## 1. What is a JOIN?

- A **JOIN** is used to combine rows from two or more tables based on a related column between them.
- Helps to **fetch data from multiple tables** in a single query.

**Example Tables:**

**employees**
| employee_id | name    | department_id |
|-------------|---------|---------------|
| 1           | Alice   | 1             |
| 2           | Bob     | 2             |
| 3           | Charlie | NULL          |

**departments**
| department_id | department_name |
|---------------|----------------|
| 1             | HR             |
| 2             | Engineering    |
| 3             | Sales          |

---

## 2. Types of JOINs

### 2.1 INNER JOIN
- Returns **only matching rows** from both tables.
- Rows without matches are **excluded**.

**Syntax:**
```sql
SELECT columns
FROM table1
INNER JOIN table2
ON table1.column = table2.column;
```

**Example:**
```sql
-- Fetch employee name and department name
SELECT e.name AS employee_name, d.department_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.department_id;
```

**Result:**
| employee_name | department_name |
|---------------|----------------|
| Alice         | HR             |
| Bob           | Engineering    |

### 2.2 LEFT JOIN (or LEFT OUTER JOIN)
- Returns **all rows from the left table**, and matching rows from the right table.
- If no match in the right table, **NULL** is shown.

**Example:**
```sql
-- Fetch employees even if they don’t belong to any department
SELECT e.name AS employee_name, d.department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id;
```

**Result:**
| employee_name | department_name |
|---------------|----------------|
| Alice         | HR             |
| Bob           | Engineering    |
| Charlie       | NULL           |

### 2.3 RIGHT JOIN (or RIGHT OUTER JOIN)
- Returns **all rows from the right table**, and matching rows from the left table.
- If no match in the left table, **NULL** is shown.

**Example:**
```sql
-- Fetch departments with no employees
SELECT d.department_name, e.name AS employee_name
FROM departments d
RIGHT JOIN employees e
ON e.department_id = d.department_id;
```

### 2.4 FULL OUTER JOIN
- Returns **all rows from both tables**, with NULLs for non-matching rows.
- MySQL does not support `FULL OUTER JOIN` directly; use `UNION` of `LEFT JOIN` and `RIGHT JOIN`.

### 2.5 CROSS JOIN
- Returns **Cartesian product** of two tables (all possible combinations).
- **No ON condition** needed.
- Use carefully, can produce huge results.

**Example:**
```sql
SELECT e.name, d.department_name
FROM employees e
CROSS JOIN departments d;
```

## 3. What happens if JOIN condition is missing?
- If you forget the `ON` condition (except for `CROSS JOIN`), it produces a **Cartesian product**.
- Example: `INNER JOIN` without `ON` behaves like `CROSS JOIN`.

## 4. Fetch employee name and department name
```sql
SELECT e.name AS employee_name, d.department_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.department_id;
```

## 5. Fetch employees even if they don’t belong to any department
```sql
SELECT e.name AS employee_name, d.department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id;
```

## 6. Fetch departments with no employees
```sql
SELECT d.department_name
FROM departments d
LEFT JOIN employees e
ON d.department_id = e.department_id
WHERE e.employee_id IS NULL;
```

## 7. Fetch employees working in Engineering
```sql
SELECT e.name AS employee_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.department_id
WHERE d.department_name = 'Engineering';
```

## 8. Count employees per department
```sql
SELECT d.department_name, COUNT(e.employee_id) AS employee_count
FROM departments d
LEFT JOIN employees e
ON d.department_id = e.department_id
GROUP BY d.department_name;
```

**Result:**
| department_name | employee_count |
|-----------------|----------------|
| HR              | 1              |
| Engineering     | 1              |
| Sales           | 0              |

**Notes:**
- Use **INNER JOIN** when you need only matching records.
- Use **LEFT JOIN** to include records even if no match exists.
- Avoid missing JOIN conditions to prevent unwanted Cartesian products.
- `CROSS JOIN` is rarely used, only when combinations are needed.
