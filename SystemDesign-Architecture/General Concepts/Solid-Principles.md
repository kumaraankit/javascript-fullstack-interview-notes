# SOLID Principles – Complete Explanation

## 1. What Are SOLID Principles?

**SOLID** is an acronym representing **five design principles** that help developers write:

* Maintainable code
* Scalable systems
* Testable and readable software

They are heavily discussed in **backend, frontend, and system design interviews**.

SOLID stands for:

* **S** – Single Responsibility Principle
* **O** – Open/Closed Principle
* **L** – Liskov Substitution Principle
* **I** – Interface Segregation Principle
* **D** – Dependency Inversion Principle

---

## 2. S – Single Responsibility Principle (SRP)

### Definition

> A class should have **only one reason to change**.

### Problem (Violation)

```js
class UserService {
  createUser(user) { /* logic */ }
  saveToDB(user) { /* db logic */ }
  sendEmail(user) { /* email logic */ }
}
```

Problems:

* Multiple responsibilities
* Hard to test
* High coupling

### Solution

```js
class UserService {
  createUser(user) { /* logic */ }
}

class UserRepository {
  save(user) { /* db logic */ }
}

class EmailService {
  send(user) { /* email logic */ }
}
```

### Interview Tip

SRP improves **readability, testing, and separation of concerns**.

---

## 3. O – Open/Closed Principle (OCP)

### Definition

> Software entities should be **open for extension but closed for modification**.

### Problem (Violation)

```js
function calculateDiscount(type) {
  if (type === 'regular') return 10;
  if (type === 'premium') return 20;
}
```

Adding a new type requires modifying existing code.

### Solution

```js
class Discount {
  getDiscount() {}
}

class RegularDiscount extends Discount {
  getDiscount() { return 10; }
}

class PremiumDiscount extends Discount {
  getDiscount() { return 20; }
}
```

### Interview Tip

OCP is achieved using **polymorphism and abstractions**.

---

## 4. L – Liskov Substitution Principle (LSP)

### Definition

> Subtypes must be substitutable for their base types without breaking behavior.

### Problem (Violation)

```js
class Bird {
  fly() {}
}

class Penguin extends Bird {
  fly() { throw new Error('Cannot fly'); }
}
```

Penguin breaks expectations.

### Solution

```js
class Bird {}
class FlyingBird extends Bird { fly() {} }
class Penguin extends Bird {}
```

### Interview Tip

If replacing a parent with a child breaks code → **LSP violation**.

---

## 5. I – Interface Segregation Principle (ISP)

### Definition

> Clients should not be forced to depend on interfaces they do not use.

### Problem (Violation)

```ts
interface Worker {
  work();
  eat();
}

class Robot implements Worker {
  work() {}
  eat() { throw new Error(); }
}
```

### Solution

```ts
interface Workable { work(); }
interface Eatable { eat(); }

class Robot implements Workable { work() {} }
class Human implements Workable, Eatable {}
```

### Interview Tip

ISP avoids **fat interfaces**.

---

## 6. D – Dependency Inversion Principle (DIP)

### Definition

> High-level modules should not depend on low-level modules. Both should depend on abstractions.

### Problem (Violation)

```js
class MySQLDatabase {
  connect() {}
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase();
  }
}
```

### Solution

```js
class Database {
  connect() {}
}

class MySQLDatabase extends Database {}

class UserService {
  constructor(db) {
    this.db = db;
  }
}
```

### Interview Tip

DIP enables **dependency injection** and easier testing.

---

## 7. SOLID in Frontend (React / JS)

* SRP → One component = one responsibility
* OCP → Extend behavior via props
* LSP → Component substitution without breaking UI
* ISP → Smaller hooks & interfaces
* DIP → Depend on abstractions (services)

---

## 8. Why SOLID Matters in Real Projects

* Easier refactoring
* Fewer bugs
* Better testability
* Clean architecture

Used heavily in:

* Backend systems
* Microservices
* Large frontend apps

---

## 9. Interview-Ready Summary (30 Seconds)

> “SOLID principles are design guidelines that improve maintainability and scalability. They focus on single responsibility, extensibility, correct inheritance, small interfaces, and dependency inversion. Together, they help reduce coupling and improve testability.”

---
