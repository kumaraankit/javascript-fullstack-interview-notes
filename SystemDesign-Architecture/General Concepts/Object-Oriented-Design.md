# Object-Oriented Design (OOD) – Complete Explanation

---

## 1. What Is Object-Oriented Design?

**Object-Oriented Design (OOD)** is a way of designing software by modeling it as a collection of **objects** that:

* Represent real-world entities
* Contain **state (data)** and **behavior (methods)**
* Interact with each other

### Definition

> OOD is the process of planning a system of interacting objects to solve a software problem.

---

## 2. Why Object-Oriented Design Matters

OOD helps in building systems that are:

* Maintainable
* Scalable
* Reusable
* Testable

Without proper OOD:

* Code becomes tightly coupled
* Changes cause ripple effects
* Systems become hard to extend

---

## 3. Core Concepts of OOD (Four Pillars)

---

## 3.1 Encapsulation

### What It Means

Bundling **data and methods together** and restricting direct access to internal details.

### Example

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

### Benefits

* Protects internal state
* Reduces unintended side effects

---

## 3.2 Abstraction

### What It Means

Exposing **only what is necessary** and hiding implementation details.

### Example

```js
class PaymentService {
  pay(amount) {}
}

class CardPayment extends PaymentService {
  pay(amount) {
    console.log('Paid via card');
  }
}
```

### Benefits

* Simplifies usage
* Enables flexibility

---

## 3.3 Inheritance

### What It Means

Creating new classes based on existing ones to reuse behavior.

### Example

```js
class Vehicle {
  move() {}
}

class Car extends Vehicle {
  move() {
    console.log('Car moving');
  }
}
```

### Caution

Inheritance can create tight coupling if misused.

---

## 3.4 Polymorphism

### What It Means

Different objects respond differently to the same method call.

### Example

```js
function start(vehicle) {
  vehicle.move();
}

start(new Car());
```

---

## 4. Object-Oriented Design vs OOP

| OOP                     | OOD                         |
| ----------------------- | --------------------------- |
| Programming paradigm    | Design approach             |
| Focus on implementation | Focus on structure          |
| Uses classes & objects  | Uses models & relationships |

---

## 5. Key OOD Principles

OOD is guided by:

* **SOLID principles**
* **DRY**
* **KISS**
* **YAGNI**

Good OOD balances all of these.

---

## 6. OOD in Backend Systems

### Example: User Management

```js
class User {
  constructor(id, email) {
    this.id = id;
    this.email = email;
  }
}

class UserRepository {
  save(user) {}
}

class UserService {
  constructor(repo) {
    this.repo = repo;
  }
}
```

Clear separation of concerns.

---

## 7. OOD in Frontend Applications

### React Perspective

* Components = Objects
* Props = Inputs
* Methods = Behavior

### Example

```jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

---

## 8. Common OOD Mistakes

❌ God objects (doing too much)
❌ Overuse of inheritance
❌ Premature abstractions
❌ Tight coupling

---

## 9. OOD vs Functional Design

| OOD                      | Functional         |
| ------------------------ | ------------------ |
| State + behavior         | Pure functions     |
| Easier modeling          | Easier testing     |
| Good for complex domains | Good for data flow |

Most modern systems combine both.

---

## 10. Interview-Ready Explanation (30 Seconds)

> “Object-Oriented Design is about modeling software as interacting objects that encapsulate state and behavior. It focuses on maintainability, scalability, and extensibility, guided by principles like SOLID, DRY, and KISS.”

---

---

## 11. Summary

* OOD is about **design before coding**
* Uses objects to model real-world problems
* Strong OOD leads to scalable systems
* Balance principles pragmatically

---

