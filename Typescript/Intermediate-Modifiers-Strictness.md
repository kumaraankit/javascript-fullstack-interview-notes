
# TypeScript Intermediate Concepts – Modifiers, Strictness & Functions (Detailed Guide)

This document explains important **TypeScript intermediate concepts** with **WHAT, WHY, HOW, and WHEN**, along with **examples and interview insights**.

---

## 1. What is the `readonly` Modifier?

### WHAT
The `readonly` modifier makes a property **immutable after initialization**.

### WHY
- Prevents accidental mutation
- Improves predictability
- Encourages immutability

### HOW
```ts
interface User {
  readonly id: number;
  name: string;
}

const user: User = { id: 1, name: "Ankit" };
user.name = "Raj";   // ✅ allowed
user.id = 2;         // ❌ Error
```

### WHEN
- IDs
- Configuration objects
- State objects

---

## 2. What is Strict Mode in TypeScript?

### WHAT
Strict mode enables a set of **strict type-checking options**.

### WHY
- Catch bugs early
- Enforce safer code
- Reduce runtime errors

### HOW
Enable in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### KEY OPTIONS
- `strictNullChecks`
- `noImplicitAny`
- `strictFunctionTypes`
- `strictPropertyInitialization`

### WHEN
- Production projects
- Large codebases
- Team environments

---

## 3. Difference Between `unknown` and `never`

### `unknown`

#### WHAT
Represents a value of **unknown type**.

```ts
let value: unknown;
```

#### WHY
- Safer alternative to `any`
- Forces type checking

#### HOW
```ts
if (typeof value === "string") {
  value.toUpperCase();
}
```

---

### `never`

#### WHAT
Represents values that **never occur**.

```ts
function throwError(): never {
  throw new Error("Error");
}
```

#### WHY
- Exhaustive checks
- Catch unhandled cases

#### HOW
```ts
function handle(value: string | number) {
  if (typeof value === "string") return;
  if (typeof value === "number") return;
  const _exhaustive: never = value;
}
```

---

### KEY DIFFERENCE

| unknown | never |
|-------|-------|
| Value exists | Value never exists |
| Needs narrowing | Used for impossible cases |
| Runtime value | No runtime value |

---

## 4. What is Function Overloading in TypeScript?

### WHAT
Allows multiple function signatures with a single implementation.

### WHY
- Strong typing
- Better developer experience
- Clear APIs

### HOW
```ts
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;

function combine(a: any, b: any) {
  return a + b;
}
```

### WHEN
- APIs with multiple input types
- Library design

---

## Interview Tips

- Prefer `readonly` for immutability
- Always enable strict mode
- Use `unknown` instead of `any`
- Use `never` for exhaustive checks
- Function overloading improves API clarity

---

## Conclusion
These concepts strengthen **type safety, maintainability, and correctness** in TypeScript applications and are frequently discussed in **mid to senior-level interviews**.
