# Micro Frontends — Complete Explanation

**Micro Frontends** is an architectural pattern where a frontend application is broken down into **smaller, independent applications** that are developed, deployed, and owned by **separate teams**—similar to **microservices on the backend**.

This topic is increasingly important for **large-scale frontend systems**, **enterprise applications**, and **SDE‑2 / Senior interviews**.

---

## What Is Micro Frontends?

Micro Frontends extend the idea of **microservices** to the frontend world.

> Instead of building one large frontend (monolith), you build multiple **independently deployable frontend apps** that together form a single user experience.

Each micro frontend:

* Owns a specific business domain
* Can be built with its own tech stack
* Is deployed independently

---

## Why Micro Frontends Exist

As frontend applications grow:

* Codebases become hard to maintain
* Teams block each other
* Releases become risky
* Tech upgrades become painful

Micro Frontends solve these problems by enabling **team autonomy and scalability**.

---

## Monolith vs Micro Frontend

### Frontend Monolith

```text
Single App
  ├── UI
  ├── State
  ├── Routing
  └── Build & Deploy
```

### Micro Frontend Architecture

```text
Shell / Container App
  ├── Auth App
  ├── Product App
  ├── Cart App
  └── Profile App
```

---

## Core Principles of Micro Frontends

1. **Independent deployments**
2. **Team ownership by business domain**
3. **Technology agnostic**
4. **Isolated failure**
5. **Decentralized governance**

---

## Common Integration Approaches

---

## 1. Build-Time Integration

Micro frontends are composed during the build step.

### Example

```js
import ProductApp from 'product/App';
```

### Pros

* Simple
* Fast runtime

### Cons

* Tight coupling
* Redeploy required

---

## 2. Run-Time Integration (MOST COMMON)

Apps are loaded **dynamically at runtime**.

### Example

```html
<script src="https://product.app/remoteEntry.js"></script>
```

### Pros

* Independent deployment
* True micro frontend

### Cons

* Runtime complexity

---

## 3. Server-Side Composition

HTML is composed on the server.

### Example

```text
Server → Combines HTML fragments
```

Used in edge rendering & SSR systems.

---

## Popular Micro Frontend Techniques

---

## Module Federation (Webpack)

### What It Is

Allows applications to **share code and load remote modules dynamically**.

### Example

```js
// Host app
remotes: {
  product: 'product@http://localhost:3001/remoteEntry.js'
}
```

### Why Popular

* Native Webpack support
* Runtime integration

---

## Single-SPA

### What It Is

A framework for composing multiple frontend apps.

### Supports

* React
* Angular
* Vue
* Vanilla JS

---

## iframe-Based Approach (Least Preferred)

### Pros

* Strong isolation

### Cons

* Poor UX
* Hard communication
* SEO issues

---

## Routing in Micro Frontends

### Approaches

* Shell-controlled routing
* Route-based app loading

```text
/cart → Cart App
/profile → Profile App
```

---

## State Management Strategies

### Options

* Local state per micro frontend
* Shared global store (limited)
* Event-based communication
* URL-based state

> Avoid tight coupling through shared state.

---

## Communication Between Micro Frontends

### Methods

* Custom events
* Pub/Sub pattern
* Browser APIs
* Shared services

```js
document.dispatchEvent(new CustomEvent('ADD_TO_CART'));
```

---

## Styling & CSS Isolation

### Challenges

* CSS conflicts

### Solutions

* CSS Modules
* Shadow DOM
* BEM naming
* Scoped styles

---

## Deployment Strategy

Each micro frontend:

* Has its own CI/CD pipeline
* Is deployed independently
* Versioned separately

---

## Performance Considerations

### Potential Issues

* Multiple JS bundles
* Increased network requests

### Optimizations

* Shared dependencies
* HTTP/2
* Lazy loading
* Caching

---

## When to Use Micro Frontends

✅ Large teams
✅ Multiple business domains
✅ Independent release cycles

---

## When NOT to Use Micro Frontends

❌ Small apps
❌ Single team
❌ Tight performance budgets

---

## Real-World Use Cases

* E-commerce platforms
* Banking dashboards
* Enterprise SaaS products

---

## Common Interview Pitfalls

❌ Overusing micro frontends
❌ Ignoring performance overhead
❌ Tight coupling via shared state

---

## Interview One-Liners (SDE‑2)

* "Micro Frontends apply microservices principles to UI"
* "Each micro frontend is independently deployable"
* "Module Federation enables runtime composition"
* "Micro Frontends trade simplicity for scalability"

---

## Quick Comparison Table

| Aspect       | Monolith | Micro Frontend  |
| ------------ | -------- | --------------- |
| Deployment   | Single   | Independent     |
| Team Scaling | Hard     | Easy            |
| Complexity   | Low      | High            |
| Performance  | Better   | Slight overhead |

---

## Key Takeaways

* Micro Frontends scale teams, not just code
* They introduce architectural complexity
* Best for large, long‑lived applications

---
