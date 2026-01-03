
# TypeScript Advanced Concepts – Template Literals, Compiler & Async Typing (Deep Dive)

This document covers **advanced TypeScript concepts** that are frequently asked in **senior frontend/backend interviews** and widely used in **large-scale production codebases**.
Each topic is explained with **WHAT, WHY, HOW, and WHEN**, plus **practical examples and best practices**.

---

## 1. What Are Template Literal Types?

### WHAT
Template Literal Types allow you to create **string literal types using template string syntax**, similar to JavaScript template literals but at the **type level**.

### WHY
- Model dynamic string patterns
- Enforce strict string formats
- Improve type safety for keys, events, and APIs

### HOW
```ts
type HttpMethod = "GET" | "POST";
type Endpoint = `/api/${string}`;

type ApiRoute = `${HttpMethod} ${Endpoint}`;
```

### WHEN
- API route definitions
- Event names
- CSS class names
- Redux action types

---

## 2. How Does TypeScript Work at Compile Time?

### WHAT
TypeScript performs **static type checking at compile time** and then **erases all types** before emitting JavaScript.

### WHY
- Catch errors early
- Zero runtime cost
- Full compatibility with JavaScript

### HOW (Compilation Flow)
1. Parse TS code
2. Type-check AST
3. Emit JavaScript
4. Remove all type annotations

```ts
let count: number = 5;
```
⬇️ Compiles to:
```js
let count = 5;
```

### WHEN
- Always (TypeScript has no runtime types)

---

## 3. How to Create Custom Utility Types?

### WHAT
Custom utility types are **reusable type helpers** built using:
- Generics
- Conditional types
- Mapped types
- `infer`

### WHY
- Avoid duplication
- Express complex constraints
- Improve maintainability

### HOW
```ts
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

```ts
type NonNullableProperty<T, K extends keyof T> = {
  [P in K]: NonNullable<T[P]>;
};
```

### WHEN
- Library design
- Shared domain models
- Framework-level typing

---

## 4. What Are Discriminated Unions?

### WHAT
Discriminated unions are union types that share a **common literal property** (discriminator).

### WHY
- Safe pattern matching
- Exhaustive checks
- Cleaner conditional logic

### HOW
```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    default:
      const _exhaustive: never = shape;
  }
}
```

### WHEN
- State machines
- Reducers
- API responses

---

## 5. How Do You Type Complex Async and Promise-Based Functions?

### WHAT
Typing async functions ensures **correct return types and error handling**.

### WHY
- Prevent mismatched promise types
- Improve API correctness
- Better IDE support

### HOW

#### Async Function
```ts
async function fetchUser(): Promise<User> {
  return await apiCall();
}
```

#### Promise Utility
```ts
type AsyncReturn<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : never;
```

#### Promise.all
```ts
const result = await Promise.all([
  fetchUser(),
  fetchOrders(),
]); // inferred tuple
```

### WHEN
- API layers
- Service layers
- Async workflows

---

## Interview Tips

- Template literal types are string constraints, not runtime strings
- TypeScript types disappear at runtime
- Custom utility types signal senior-level skill
- Discriminated unions are preferred over if-else chains
- Always type async functions explicitly

---

## Conclusion
These advanced concepts represent the **deep power of TypeScript’s type system**.
Mastering them allows you to write **robust, expressive, and highly maintainable applications**, and clearly signals **senior TypeScript expertise** in interviews.
