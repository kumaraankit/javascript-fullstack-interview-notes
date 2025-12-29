
# TypeScript Intermediate Concepts – Interview Guide (Detailed)

This document covers **intermediate TypeScript concepts** that are commonly asked in **mid to senior-level interviews**.
Each topic includes **WHAT, WHY, HOW, and WHEN**, along with **practical examples**.

---

## 1. What are Generics in TypeScript?

### WHAT
Generics allow you to write **reusable, type-safe code** by using type parameters instead of fixed types.

### WHY
- Avoid code duplication
- Preserve type information
- Improve type safety

### HOW
```ts
function identity<T>(value: T): T {
  return value;
}

identity<number>(10);
identity<string>("hello");
```

### WHEN
- Utility functions
- Data structures
- Reusable components (React, libraries)

---

## 2. What is Union Type and Intersection Type?

### Union Type (`|`)
Allows a variable to be **one of multiple types**.

```ts
type ID = string | number;
let userId: ID = 1;
```

### Intersection Type (`&`)
Combines multiple types into one.

```ts
type Admin = { admin: true };
type User = { name: string };

type AdminUser = Admin & User;
```

### WHEN
- Union → flexible inputs
- Intersection → combining capabilities

---

## 3. What is Type Narrowing and How Does It Work?

### WHAT
Type narrowing reduces a **broad type** to a **specific type** within a block.

### HOW
Using:
- `typeof`
- `instanceof`
- `in` operator
- User-defined type guards

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    value.toUpperCase();
  }
}
```

### WHY
- Safe property access
- Avoid runtime errors

---

## 4. What is `keyof` Operator?

### WHAT
`keyof` produces a union of all keys of a type.

```ts
type User = { id: number; name: string };
type UserKeys = keyof User; // "id" | "name"
```

### WHY
- Type-safe property access
- Generic constraints

### WHEN
- Utility functions
- Framework code

---

## 5. What is `typeof` Operator in TypeScript?

### WHAT
Used to extract the type of a variable or object.

```ts
const user = { id: 1, name: "Ankit" };
type UserType = typeof user;
```

### WHY
- Avoid duplication
- Sync runtime values with types

---

## 6. What are Utility Types?

Utility types transform existing types.

---

### Partial<T>
Makes all properties optional.

```ts
type User = { id: number; name: string };
type PartialUser = Partial<User>;
```

---

### Pick<T, K>
Selects specific properties.

```ts
type UserPreview = Pick<User, "id" | "name">;
```

---

### Omit<T, K>
Removes specific properties.

```ts
type UserWithoutId = Omit<User, "id">;
```

---

### Required<T>
Makes all properties required.

```ts
type CompleteUser = Required<PartialUser>;
```

---

## Interview Tips

- Use generics to avoid `any`
- Prefer unions for flexible APIs
- Use intersections carefully
- Utility types are heavily used in real projects

---

## Conclusion
These concepts represent the **core of TypeScript’s power**.
Mastering them allows you to write **clean, reusable, and type-safe applications**.
