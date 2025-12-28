
# Database Migrations & Performance in NestJS with TypeORM

This document explains **WHAT, WHY, HOW, and WHEN** for **database migrations, schema evolution, and performance optimization** in **NestJS applications using TypeORM**.  
It is designed for **senior backend engineers and interview preparation**.

---

## 1. What Are Database Migrations and Why Are They Important?

### WHAT
Database migrations are **version-controlled scripts** that describe **incremental changes** to the database schema.

### WHY
- Keep schema in sync across environments
- Enable team collaboration
- Support rollback on failures
- Track schema history

### WHEN
- Any production-grade application
- Multiple developers or environments

---

## 2. Generating and Running Migrations in TypeORM

### HOW to Generate
```bash
typeorm migration:generate src/migrations/AddUserTable
```

### HOW to Run
```bash
typeorm migration:run
```

### HOW to Revert
```bash
typeorm migration:revert
```

### WHY
- Automated and repeatable schema changes
- Safer than manual SQL

---

## 3. Managing Migrations Across Multiple Environments

### STRATEGY
- Same migration files for all environments
- Different DB credentials via env variables
- Never modify executed migrations

### BEST PRACTICES
- Use CI/CD to apply migrations
- Run migrations before app startup
- Maintain separate databases per environment

---

## 4. Handling Schema Changes Without Downtime

### WHY
Downtime impacts business and user trust.

### TECHNIQUES
- Backward-compatible changes
- Add columns before using them
- Avoid destructive changes
- Use feature flags

### EXAMPLE
1. Add nullable column
2. Deploy code using column
3. Make column non-nullable later

---

## 5. Designing Indexes for Performance in SQL Databases

### WHAT is an Index?
A data structure that improves query speed.

### HOW to Design Indexes
- Index frequently filtered columns
- Use composite indexes carefully
- Avoid over-indexing

```sql
CREATE INDEX idx_user_email ON users(email);
```

### WHEN
- Read-heavy workloads
- Large tables

---

## 6. Connection Pooling in NestJS with TypeORM

### WHAT
Connection pooling reuses DB connections instead of opening new ones.

### HOW
```ts
TypeOrmModule.forRoot({
  extra: {
    max: 10,
  },
});
```

### WHY
- Reduces latency
- Prevents DB exhaustion

### WHEN
- High concurrency applications

---

## 7. Preventing N+1 Query Problems

### WHAT
N+1 occurs when one query triggers many additional queries.

### BAD EXAMPLE
- 1 query for users
- N queries for user relations

### SOLUTIONS
- JOINs
- Eager loading
- QueryBuilder
- Batch loading

```ts
createQueryBuilder('user')
  .leftJoinAndSelect('user.profile', 'profile');
```

### WHY
- Prevents performance degradation

---

## Interview-Ready Summary

- Migrations ensure schema consistency
- TypeORM provides CLI-based migrations
- Zero-downtime requires backward compatibility
- Indexes improve read performance
- Pooling boosts throughput
- N+1 queries kill performance if ignored

---

## Conclusion
Mastering migrations and database performance is critical for building **reliable, scalable NestJS applications** and is **frequently evaluated in senior backend interviews**.
