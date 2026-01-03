
# TypeScript Advanced Concepts – Conditional, Mapped & Structural Typing (Deep Dive)

This document covers **advanced TypeScript concepts** commonly asked in **senior-level interviews** and used heavily in **real-world frameworks and libraries**.
Each topic is explained with **WHAT, WHY, HOW, WHEN**, along with **examples and best practices**.

---

## 1. What Are Conditional Types?

### WHAT
Conditional types allow types to be determined **based on a condition**, similar to ternary expressions.

```ts
T extends U ? X : Y
```

### WHY
- Build reusable, flexible utility types
- Express complex type logic
- Power many built-in utility types

### HOW
```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

### WHEN
- Creating generic libraries
- Advanced type transformations
- Framework-level typing

---

## 2. What Are Mapped Types?

### WHAT
Mapped types transform existing types by **mapping over their keys**.

### WHY
- Avoid duplication
- Generate variations of types
- Keep types consistent

### HOW
```ts
type ReadonlyType<T> = {
  readonly [K in keyof T]: T[K];
};
```

### BUILT-IN EXAMPLES
- `Partial<T>`
- `Readonly<T>`
- `Pick<T, K>`
- `Record<K, T>`

### WHEN
- State management
- API response shaping
- Library design

---

## 3. Explain `infer` Keyword with Example

### WHAT
`infer` allows TypeScript to **infer a type variable inside a conditional type**.

### WHY
- Extract inner types
- Enable advanced type inference

### HOW
```ts
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

type Result = ReturnTypeOf<() => number>; // number
```

### WHEN
- Utility types
- Async typing
- Framework internals

---

## 4. How Does TypeScript Handle Structural Typing?

### WHAT
TypeScript uses **structural typing**, meaning compatibility is based on **shape**, not name.

### WHY
- Flexibility
- JavaScript compatibility
- Easier integration

### HOW
```ts
interface User {
  name: string;
}

const person = { name: "Ankit", age: 30 };

let user: User = person; // valid
```

### WHEN
- Data modeling
- API responses
- Integration with JS libraries

---

## 5. What Is Declaration Merging?

### WHAT
Declaration merging allows **multiple declarations with the same name** to be merged.

### WHY
- Extend existing types
- Augment third-party libraries

### HOW
```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = { name: "Ankit", age: 30 };
```

### COMMON USE CASES
- Module augmentation
- Global type extensions

### WHEN
- Extending libraries
- Enhancing global types

---

## Interview Tips

- Conditional types power advanced utilities
- Mapped types avoid duplication
- `infer` enables deep type extraction
- Structural typing is shape-based
- Declaration merging is powerful but should be used carefully

---

## Conclusion
These advanced TypeScript features enable **expressive, type-safe, and scalable codebases**.
Mastering them is a strong signal of **senior TypeScript proficiency**.
