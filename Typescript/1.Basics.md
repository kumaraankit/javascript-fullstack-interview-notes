
# TypeScript Basics – Interview Guide (Detailed Explanations)

This document covers **fundamental TypeScript interview questions** with **clear explanations, examples, and WHY they matter**.  
Ideal for **junior to mid-level interviews** and strong foundation building.

---

## 1. What is TypeScript and why is it used?

### What
TypeScript is a **superset of JavaScript** that adds **static typing** and modern language features.

### Why
- Catch errors at compile time
- Better IDE support (autocomplete, refactoring)
- Improved maintainability for large codebases
- Easier collaboration in teams

### How
TypeScript code is **compiled to JavaScript** using the TypeScript compiler (`tsc`).

```ts
let count: number = 10;
```

---

## 2. Difference between TypeScript and JavaScript

| Feature | JavaScript | TypeScript |
|------|-----------|-----------|
| Typing | Dynamic | Static |
| Error detection | Runtime | Compile-time |
| Tooling | Limited | Excellent |
| Scalability | Harder | Easier |

---

## 3. What are basic data types in TypeScript?

### Common Types
- `number`
- `string`
- `boolean`
- `array`
- `tuple`
- `enum`
- `any`
- `unknown`
- `void`
- `null` / `undefined`

```ts
let age: number = 25;
let name: string = "Ankit";
let isActive: boolean = true;
```

---

## 4. What is type inference?

### What
TypeScript **automatically infers the type** based on assigned value.

```ts
let score = 90; // inferred as number
```

### Why
- Less boilerplate
- Cleaner code
- Maintains type safety

---

## 5. Difference between `any` and `unknown`

### any
- Disables type checking
- Unsafe

```ts
let data: any = 5;
data.toUpperCase(); // No error
```

### unknown
- Type-safe alternative
- Requires type checking

```ts
let data: unknown = "hello";
if (typeof data === "string") {
  data.toUpperCase();
}
```

### Best Practice
👉 Prefer `unknown` over `any`.

---

## 6. What are interfaces in TypeScript?

### What
Interfaces define the **shape of an object**.

```ts
interface User {
  id: number;
  name: string;
}
```

### Why
- Enforces structure
- Improves readability
- Supports implementation contracts

---

## 7. Difference between `interface` and `type`

| Feature | interface | type |
|------|-----------|------|
| Extension | extends | & |
| Declaration merging | Yes | No |
| Unions | No | Yes |

```ts
type ID = string | number;
```

---

## 8. What is enum in TypeScript?

### What
Enums define a **set of named constants**.

```ts
enum Role {
  Admin,
  User,
  Guest
}
```

### Why
- Readable code
- Prevent magic values

---

## 9. What is tuple?

### What
Tuple allows a **fixed-length array with fixed types**.

```ts
let user: [number, string] = [1, "Ankit"];
```

### Why
- Strong typing for structured data

---

## 10. What are optional properties and parameters?

### Optional Properties
```ts
interface User {
  id: number;
  email?: string;
}
```

### Optional Parameters
```ts
function greet(name?: string) {
  console.log(name);
}
```

### Why
- Flexible APIs
- Better backward compatibility

---

## Interview Tips

- Avoid `any`
- Prefer interfaces for object shapes
- Use type inference wisely
- Understand compile-time vs runtime

---

## Conclusion
These concepts form the **foundation of TypeScript**.  
Mastering them helps you write **safer, cleaner, and scalable JavaScript applications**.
