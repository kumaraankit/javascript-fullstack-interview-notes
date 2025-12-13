# Monorepo — Complete Explanation (Nx & Turborepo)

A **Monorepo** is a repository strategy where **multiple projects** (apps, services, libraries) are stored and managed inside **a single codebase**. Monorepos are widely used at scale by companies like **Google, Meta, Microsoft, Uber**, and are a **hot topic in SDE‑2 / Senior interviews**.

This document explains:

* What a monorepo is
* Why it exists
* Pros & cons
* Nx vs Turborepo
* When to use which

---

## What Is a Monorepo?

A **monorepo** contains **multiple related projects** in one repository.

```text
repo/
  apps/
    web-app/
    admin-app/
  packages/
    ui-lib/
    utils/
  package.json
```

All projects:

* Share version control
* Can share code
* Are built & tested together (selectively)

---

## Monorepo vs Polyrepo

### Polyrepo (Traditional)

```text
web-repo/
api-repo/
shared-utils-repo/
```

Problems:

* Version mismatches
* Hard dependency management
* Duplicate tooling

### Monorepo

```text
single-repo/
  web
  api
  shared
```

Benefits:

* Unified tooling
* Easier refactors
* Atomic commits

---

## Why Companies Use Monorepos

* Code sharing at scale
* Consistent tooling
* Easier refactoring
* Better developer experience
* Faster CI/CD with caching

---

## Core Monorepo Challenges

❌ Slow builds
❌ Large CI pipelines
❌ Hard dependency graphs
❌ Tooling complexity

> **Nx and Turborepo exist to solve these problems**

---

## Key Concepts in Monorepos

---

## 1. Workspace

A workspace groups multiple projects under one repo.

Examples:

* npm workspaces
* pnpm workspaces
* Yarn workspaces

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

---

## 2. Dependency Graph

Tracks which projects depend on which.

```text
web-app → ui-lib → utils
```

Used to:

* Build only what changed
* Run targeted tests

---

## 3. Task Pipelines

Defines how tasks run across projects.

```text
lint → test → build
```

---

## 4. Caching (MOST IMPORTANT)

If inputs haven’t changed, **reuse previous outputs**.

> This is the key reason monorepos scale.

---

## Nx — Deep Dive

### What Is Nx?

Nx is a **full‑featured monorepo platform** with:

* Advanced dependency graph
* Smart task scheduling
* Code generators
* Built‑in best practices

Originally created by **ex‑Angular team members**.

---

### Nx Features

* Project graph visualization
* Affected commands
* Local & remote caching
* Powerful generators
* Plugin ecosystem (React, NestJS, Node, Next.js)

---

### Nx Example Commands

```bash
nx graph
nx affected:build
nx affected:test
```

Only runs tasks for affected projects.

---

### Nx Strengths

✅ Best for **large, complex monorepos**
✅ Strong architectural boundaries
✅ Excellent for backend + frontend

### Nx Weaknesses

❌ Higher learning curve
❌ Opinionated structure

---

## Turborepo — Deep Dive

### What Is Turborepo?

Turborepo is a **high‑performance build system** for JavaScript/TypeScript monorepos, created by **Vercel**.

It focuses on:

* Speed
* Simplicity
* Incremental builds

---

### Turborepo Features

* Task pipelines
* Smart caching
* Minimal config
* Works great with Next.js

---

### Turborepo Example Config

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

---

### Turborepo Strengths

✅ Very fast
✅ Easy to adopt
✅ Minimal mental overhead

### Turborepo Weaknesses

❌ No deep dependency analysis
❌ Limited generators

---

## Nx vs Turborepo (IMPORTANT)

| Feature          | Nx         | Turborepo         |
| ---------------- | ---------- | ----------------- |
| Learning curve   | Steep      | Easy              |
| Dependency graph | Advanced   | Basic             |
| Generators       | Yes        | No                |
| Backend support  | Excellent  | Limited           |
| Best for         | Large orgs | Fast-moving teams |

---

## Monorepo + CI/CD

### Key Optimizations

* Run only affected tasks
* Use remote cache
* Parallelize pipelines

```text
PR → Detect changes → Run minimal CI
```

---

## Common Monorepo Patterns

* Apps + packages structure
* Shared UI libraries
* Shared backend utilities
* Versioned internal packages

---

## When to Use a Monorepo

✅ Multiple related projects
✅ Shared codebase
✅ Growing teams

---

## When NOT to Use a Monorepo

❌ Single small app
❌ Unrelated projects
❌ No CI/CD discipline

---

## Common Interview Pitfalls

❌ Thinking monorepo = single deploy
❌ Ignoring CI/CD complexity
❌ Overengineering small projects

---

## Interview One‑Liners (SDE‑2)

* "A monorepo stores multiple projects in one repository"
* "Nx focuses on architecture; Turborepo focuses on speed"
* "Caching and dependency graphs make monorepos scalable"
* "Monorepos optimize team collaboration, not just code"

---

## Quick Decision Guide

| Scenario           | Tool      |
| ------------------ | --------- |
| Enterprise app     | Nx        |
| Startup / Next.js  | Turborepo |
| Backend + frontend | Nx        |
| Simple UI apps     | Turborepo |

---

## Key Takeaways

* Monorepos scale teams and codebases
* Tooling is essential (Nx / Turborepo)
* Choose based on complexity, not hype

---
