
# SQL Quick Reference

## 1. Difference between `IN` and `EXISTS`

### `IN`
- Checks if a value matches **any value in a list or subquery**.
- Returns all rows that match the values returned by the subquery.
- Subquery is executed **once**.

**Example:**
```sql
-- Fetch employees whose department_id is 1 or 2 using IN
SELECT * 
FROM employees 
WHERE department_id IN (1, 2);

-- Using subquery
SELECT * 
FROM employees 
WHERE department_id IN (
    SELECT department_id 
    FROM departments 
    WHERE location_id = 100
);
```

### `EXISTS`
- Checks if a **subquery returns any row**.
- Returns TRUE if subquery returns **at least one row**.
- Subquery may be **correlated** (executed for each row in outer query).

**Example:**
```sql
-- Fetch employees whose department exists in departments table
SELECT * 
FROM employees e
WHERE EXISTS (
    SELECT 1 
    FROM departments d 
    WHERE d.department_id = e.department_id
);
```

**Key Differences:**
| Feature        | IN                          | EXISTS                          |
|----------------|----------------------------|--------------------------------|
| Checks         | Value in a list             | Existence of row               |
| Performance    | Better for **small lists**  | Better for **correlated subqueries** |
| NULL Handling  | May behave unexpectedly if subquery returns NULL | Ignores NULLs                  |

---

## 2. Difference between `= NULL` and `IS NULL`

- `= NULL` → **Incorrect**. Comparing any value with NULL using `=` always returns FALSE.  
- `IS NULL` → Correct way to check for NULL values.

**Example:**
```sql
-- Wrong
SELECT * 
FROM employees 
WHERE manager_id = NULL;  -- returns 0 rows

-- Correct
SELECT * 
FROM employees 
WHERE manager_id IS NULL;  -- returns rows with no manager
```

---

## 3. When to avoid `LIKE '%value%'`

- Using `LIKE '%value%'` **prevents index usage** → full table scan happens.  
- Use only when necessary for substring search.  
- Alternatives:
  - Full-text search (e.g., `MATCH...AGAINST` in MySQL)
  - Avoid leading `%` (`LIKE 'value%'` can use index)

**Example:**
```sql
-- Avoid
SELECT * 
FROM employees 
WHERE first_name LIKE '%ohn%';

-- Better (prefix search)
SELECT * 
FROM employees 
WHERE first_name LIKE 'Joh%';
```

**Note:** Leading `%` makes the query slow on large datasets.

---

## 4. Fetch employees where department is 1 or 2

**Using `IN`:**
```sql
SELECT * 
FROM employees 
WHERE department_id IN (1, 2);
```

**Using `OR`:**
```sql
SELECT * 
FROM employees 
WHERE department_id = 1 OR department_id = 2;
```

**Note:** `IN` is preferred for readability and easier extension to more values.
