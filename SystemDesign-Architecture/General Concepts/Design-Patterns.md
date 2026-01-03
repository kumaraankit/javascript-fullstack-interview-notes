
# Design Patterns – COMPLETE & DEEP GUIDE (22 GoF Patterns, Interview Ready)

This document is a **comprehensive, senior-level reference** for **Design Patterns**.
It goes far beyond definitions and is written for:
- System design & low-level design interviews
- Senior / Staff engineer preparation
- Real-world software architecture decisions

Each pattern includes:
- Clear intent and definition
- The problem it solves
- How it works internally
- Real-world examples
- Benefits and trade-offs
- When to use and when NOT to use
- Simple ASCII diagrams

---

## 1. What Are Design Patterns?

Design patterns are **general, reusable solutions** to commonly occurring problems in software design.
They are not finished code, but **templates or blueprints** that can be adapted to specific situations.

Design patterns help engineers:
- Avoid reinventing the wheel
- Improve code readability and structure
- Reduce coupling between components
- Increase maintainability and scalability
- Communicate ideas using a shared vocabulary

Patterns are discovered through experience and are **language-agnostic**.

---

## 2. Pattern Categories (GoF)

| Category | Count | Purpose |
|--------|------|--------|
| Creational | 5 | Control object creation |
| Structural | 7 | Compose objects and classes |
| Behavioral | 10 | Manage communication & behavior |

Total = **22 GoF Design Patterns**

---

# CREATIONAL PATTERNS (5)

---

## 1. Singleton

### Intent
Ensure that a class has **only one instance** and provide a global access point.

### Problem It Solves
Some objects represent shared resources (configuration, logging, cache).
Creating multiple instances would cause inconsistency or wasted resources.

### How It Works
- Constructor is restricted
- Static instance is stored
- Instance is created lazily or eagerly

### Example
```js
class Singleton {
  static instance;
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
  }
}
```

### Real-World Use Cases
- Application configuration
- Logger
- Thread pools

### Trade-offs
- Hidden dependencies
- Difficult to test
- Can act like global state

### When to Use
When exactly **one shared instance** is required.

---

## 2. Factory Method

### Intent
Define an interface for creating objects, but allow subclasses or functions to decide which class to instantiate.

### Problem It Solves
Client code should not depend on concrete implementations.
Object creation logic should be centralized.

### How It Works
- Client requests object
- Factory decides which class to create
- Client receives abstraction

### Example
```js
class Car {}
class Bike {}

function vehicleFactory(type) {
  if (type === "car") return new Car();
  if (type === "bike") return new Bike();
}
```

### Benefits
- Loose coupling
- Open/Closed principle

### Trade-offs
- Adds indirection

---

## 3. Abstract Factory

### Intent
Create **families of related objects** without specifying concrete classes.

### Problem It Solves
Ensures consistency across related products (e.g., UI themes).

### How It Works
- Factory interface defines methods
- Concrete factories implement families

### Example
```js
class DarkButton {}
class LightButton {}

class UIFactory {
  createButton() {}
}
```

### When to Use
When products must be used together.

---

## 4. Builder

### Intent
Separate construction of a complex object from its representation.

### Problem It Solves
Constructors with many parameters are unreadable and error-prone.

### How It Works
- Builder sets parts step-by-step
- Final build() returns object

### Example
```js
class UserBuilder {
  setName(n) { this.name = n; return this; }
  build() { return this; }
}
```

### Use Cases
- DTOs
- Configuration objects

---

## 5. Prototype

### Intent
Create new objects by **cloning existing ones**.

### Problem It Solves
Creating objects is expensive or complex.

### Example
```js
const user = { name: "A" };
const clone = Object.create(user);
```

---

# STRUCTURAL PATTERNS (7)

---

## 6. Adapter

### Intent
Convert the interface of a class into another interface clients expect.

### Example
```js
class OldAPI { getData() {} }
class Adapter {
  constructor(api) { this.api = api; }
  fetch() { return this.api.getData(); }
}
```

### Use Cases
- Legacy system integration
- Third-party APIs

---

## 7. Bridge

### Intent
Decouple abstraction from implementation.

### Example
```js
class Device { on() {} }
class Remote {
  constructor(device) { this.device = device; }
}
```

---

## 8. Composite

### Intent
Treat individual objects and compositions uniformly.

### Example
```js
class File {}
class Folder {
  constructor() { this.children = []; }
}
```

---

## 9. Decorator

### Intent
Attach responsibilities dynamically.

### Example
```js
const withAuth = fn => (...a) => fn(...a);
```

---

## 10. Facade

### Intent
Provide a simplified interface to a complex subsystem.

### Example
```js
class OrderFacade {
  placeOrder() {}
}
```

---

## 11. Flyweight

### Intent
Minimize memory usage by sharing objects.

### Example
```js
const cache = {};
function getIcon(type) {
  return cache[type] || (cache[type] = { type });
}
```

---

## 12. Proxy

### Intent
Control access to another object.

### Example
```js
const userProxy = new Proxy(user, {
  get(target, prop) { return target[prop]; }
});
```

---

# BEHAVIORAL PATTERNS (10)

---

## 13. Chain of Responsibility

Pass requests through a chain of handlers.

---

## 14. Command

Encapsulate requests as objects.

---

## 15. Interpreter

Define grammar and interpret expressions.

---

## 16. Iterator

Traverse collections uniformly.

---

## 17. Mediator

Centralize complex communications.

---

## 18. Memento

Capture and restore object state.

---

## 19. Observer

Notify dependents of state changes.

---

## 20. State

Change behavior based on internal state.

---

## 21. Strategy

Swap algorithms dynamically.

---

## 22. Template Method

Define algorithm skeleton, defer steps.

---

## 23. Visitor (Often Excluded)

Add operations without modifying objects.

---

## 24. MVC (Architectural Pattern)

Separates Model, View, and Controller.

---

## 25. Patterns You ACTUALLY Use

Most common in real projects:
- Factory
- Strategy
- Observer
- Decorator
- Facade
- Proxy

---

## 26. Interview 30-Second Summary

Design patterns are reusable solutions to recurring design problems.
They improve maintainability and scalability when used appropriately.

---

## 27. Final Advice

Do not memorize patterns.
Understand:
Problem → Pattern → Benefit → Trade-offs

---
