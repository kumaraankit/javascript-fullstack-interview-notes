# Design Patterns – Complete Guide (All 22 Patterns, Interview Ready)

> Note: Some books list **23 patterns** (adding MVC). In interviews, **22 GoF patterns** is widely accepted.

---

## 1. What Are Design Patterns?

Design patterns are **reusable, proven solutions** to common software design problems.

They:

* Improve maintainability
* Reduce coupling
* Improve scalability
* Provide shared vocabulary in teams

---

## 2. Pattern Categories

| Category   | Count | Purpose            |
| ---------- | ----- | ------------------ |
| Creational | 5     | Object creation    |
| Structural | 7     | Object composition |
| Behavioral | 10    | Object interaction |

Total = **22 Patterns**

---

# CREATIONAL PATTERNS (5)

---

## 1. Singleton

**Intent:** Ensure only one instance exists.

**Use cases:** Logger, Config, Cache

```js
class Singleton {
  static instance;
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
  }
}
```

---

## 2. Factory Method

**Intent:** Create objects without exposing creation logic.

```js
class Car { drive() {} }
class Bike { ride() {} }

function vehicleFactory(type) {
  if (type === 'car') return new Car();
  if (type === 'bike') return new Bike();
}
```

---

## 3. Abstract Factory

**Intent:** Create families of related objects.

```js
class DarkButton {}
class LightButton {}

class UIFactory {
  createButton() {}
}
```

---

## 4. Builder

**Intent:** Build complex objects step-by-step.

```js
class UserBuilder {
  setName(n) { this.name = n; return this; }
  build() { return this; }
}
```

---

## 5. Prototype

**Intent:** Clone existing objects.

```js
const user = { name: 'A' };
const clone = Object.create(user);
```

---

# STRUCTURAL PATTERNS (7)

---

## 6. Adapter

**Intent:** Convert one interface into another.

```js
class OldAPI { getData() {} }
class Adapter {
  constructor(api) { this.api = api; }
  fetch() { return this.api.getData(); }
}
```

---

## 7. Bridge

**Intent:** Separate abstraction from implementation.

```js
class Device { on() {} }
class Remote {
  constructor(device) { this.device = device; }
}
```

---

## 8. Composite

**Intent:** Treat individual objects and groups uniformly.

```js
class File {}
class Folder {
  constructor() { this.children = []; }
}
```

---

## 9. Decorator

**Intent:** Add behavior dynamically.

```js
const withAuth = fn => (...a) => fn(...a);
```

---

## 10. Facade

**Intent:** Simplify complex subsystems.

```js
class OrderFacade {
  placeOrder() {}
}
```

---

## 11. Flyweight

**Intent:** Reduce memory usage by sharing objects.

```js
const cache = {};
function getIcon(type) {
  return cache[type] || (cache[type] = { type });
}
```

---

## 12. Proxy

**Intent:** Control access to an object.

```js
const userProxy = new Proxy(user, {
  get(target, prop) { return target[prop]; }
});
```

---

# BEHAVIORAL PATTERNS (10)

---

## 13. Chain of Responsibility

**Intent:** Pass request through handlers.

```js
class Handler {
  setNext(h) { this.next = h; }
}
```

---

## 14. Command

**Intent:** Encapsulate requests.

```js
class Command { execute() {} }
```

---

## 15. Interpreter

**Intent:** Define grammar and interpret sentences.

Use cases: Expression evaluators

---

## 16. Iterator

**Intent:** Traverse collections uniformly.

```js
for (const item of arr) {}
```

---

## 17. Mediator

**Intent:** Centralize communication.

```js
class ChatMediator {}
```

---

## 18. Memento

**Intent:** Capture and restore state.

```js
class EditorMemento {}
```

---

## 19. Observer

**Intent:** Notify dependents on change.

```js
class Subject {
  notify() {}
}
```

---

## 20. State

**Intent:** Change behavior based on state.

```js
class OrderState {}
```

---

## 21. Strategy

**Intent:** Swap algorithms dynamically.

```js
class Strategy {}
```

---

## 22. Template Method

**Intent:** Define algorithm skeleton.

```js
class Game {
  play() { this.start(); this.end(); }
}
```

---

## 23. Visitor (Often Excluded)

**Intent:** Add operations without modifying objects.

```js
class Visitor {}
```

---

## 24. MVC (Architectural – Sometimes Counted)

* Model → Data
* View → UI
* Controller → Logic

---

## 25. Patterns You ACTUALLY Use in Real Projects

Most common in interviews & real code:

* Singleton
* Factory
* Strategy
* Observer
* Decorator
* Facade
* Proxy

---

## 26. Interview-Ready 30s Summary

> “Design patterns are reusable solutions to common design problems. They improve maintainability and scalability but should be applied only when the problem truly requires them.”

---

## 27. Interview Tips (VERY IMPORTANT)

* Don’t memorize definitions
* Explain **problem → pattern → benefit**
* Mention trade-offs
* Avoid over-engineering

---

## 28. Final Summary

* Total classical patterns: **22 (GoF)**
* Some lists include **23 with MVC**
* Depth > memorization
* Real-world usage matters most

