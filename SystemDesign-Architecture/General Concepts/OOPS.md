# OOPS Concepts in JavaScript (Node.js) – SDE‑2 Level Explanation

Object-Oriented Programming (OOP) is a design paradigm that structures code around **objects** and **interactions between them**. JavaScript is prototype‑based but fully supports OOP using classes (ES6) and prototypes.

This document explains all major OOP concepts with **Node.js examples**, interview‑ready explanations, and clean code snippets.

---

# 1. Encapsulation

Encapsulation means **bundling data and behavior** into a single unit and **restricting direct access** to internal details.

### ✔ Interview Explanation (SDE‑2)

Encapsulation protects the integrity of an object by exposing only what is necessary. It prevents accidental mutation and enforces cleaner APIs.

### ✔ Example

```js
class User {
  #password; // private field

  constructor(name, password) {
    this.name = name;
    this.#password = password;
  }

  checkPassword(input) {
    return this.#password === input;
  }
}

const u = new User("Ankit", "secret123");
console.log(u.checkPassword("secret123")); // true
console.log(u.password); // undefined (protected)
```

---

# 2. Abstraction

Abstraction hides unnecessary details while exposing essential features.

### ✔ Interview Explanation

It simplifies usage by providing a high‑level interface and hiding complex internal logic.

### ✔ Example

```js
class Payment {
  makePayment(amount) {
    this.#connect();
    console.log(`Payment successful: ₹${amount}`);
  }

  #connect() {   // private complex logic
    console.log("Connecting to payment gateway...");
  }
}

new Payment().makePayment(500);
```

The user interacts only with `makePayment()`, not the internal gateway logic.

---

# 3. Inheritance

Inheritance allows one class to **extend another**, promoting reuse and better structure.

### ✔ Interview Explanation

It helps avoid code duplication and creates hierarchical relationships.

### ✔ Example

```js
class User {
  constructor(name) {
    this.name = name;
  }

  login() {
    console.log(`${this.name} logged in`);
  }
}

class Admin extends User {
  deleteUser(user) {
    console.log(`Admin removed ${user.name}`);
  }
}

const admin = new Admin("SuperAdmin");
admin.login();
admin.deleteUser({ name: "Ankit" });
```

---

# 4. Polymorphism

Polymorphism allows **same method name but different implementations**, depending on context.

### ✔ Interview Explanation

It enables flexibility—objects decide how to behave to the same action.

### ✔ Example – Method Overriding

```js
class Logger {
  log(msg) {
    console.log(`LOG: ${msg}`);
  }
}

class JSONLogger extends Logger {
  log(msg) {
    console.log(JSON.stringify({ message: msg }));
  }
}

new Logger().log("Hello");
new JSONLogger().log("Hello");
```

Same method, different behavior.

---

# 5. Composition (Real‑World OOP)

Often more scalable than inheritance.

### ✔ Interview Explanation

"Favor composition over inheritance"—classes use other objects to gain functionality instead of extending a parent class.

### ✔ Example

```js
class Database {
  connect() { console.log("DB connected"); }
}

class UserService {
  constructor(db) {
    this.db = db;
  }

  register() {
    this.db.connect();
    console.log("User registered");
  }
}

const userService = new UserService(new Database());
userService.register();
```

Composition provides more modular, maintainable architecture.

---

# 6. Prototype-Based OOP (JS Core)

JavaScript does not have classical inheritance under the hood—it's **prototype‑based**.

### ✔ Example

```js
const animal = {
  speak() {
    console.log("Animal speaks");
  }
};

const dog = Object.create(animal);
dog.speak(); // inherited via prototype
```

---

# 7. Mixins – Multiple Inheritance Workaround

JS does not support multiple inheritance, but mixins provide an alternative.

```js
const canWalk = {
  walk() { console.log("Walking..."); }
};

const canEat = {
  eat() { console.log("Eating..."); }
};

class Person {}
Object.assign(Person.prototype, canWalk, canEat);

new Person().eat();
```

---

# Interview‑Ready Summary (Use in SDE‑2 Answers)

* **Encapsulation:** Hide internal data (private fields, getters/setters).
* **Abstraction:** Expose essential features only (clean API, hide complexity).
* **Inheritance:** Reuse and extend functionality (class vs prototype).
* **Polymorphism:** Same interface, different behavior.
* **Composition:** More scalable alternative to deep inheritance chains.
* **Prototypes:** Core of JS OOP model.
* **Mixins:** Way to achieve multiple behaviors.

---

If you want, I can also create:

* `JavaScript-OOP-Interview-Questions.md`
* `OOP-vs-FP-in-JS.md`
* `Class-vs-Prototype-Deep-Dive.md`

---

# Advanced OOPS Interview Questions (SDE-2 Level) — With Answers

## 1. **Explain Composition vs Inheritance with real production use-cases. Why is composition preferred?**

**Answer:**

* **Inheritance** creates a parent-child relationship but leads to tight coupling and deep hierarchies.
* **Composition** allows objects to gain behavior by combining smaller, reusable components.

**Why composition is preferred:**

* Avoids the *fragile base class problem*.
* More flexible—behavior can be swapped at runtime.
* Easier to test and maintain.

**Example (Payment System):**

```js
class Logger { log(msg){ console.log(msg); } }
class Encryptor { encrypt(d){ return `##${d}`; } }

class Payment {
  constructor(logger, encryptor){
    this.logger = logger;
    this.encryptor = encryptor;
  }
  process(amount){
    this.logger.log("Processing");
    console.log(this.encryptor.encrypt(amount));
  }
}
```

---

## 2. **How does JavaScript implement polymorphism without classical method overloading?**

**Answer:**

* JavaScript uses **runtime polymorphism** via **method overriding**, not compile‑time overloading.
* Functions accept any number of arguments; behavior is determined at runtime.

**Example:**

```js
class Animal { speak(){ console.log("sound"); } }
class Dog extends Animal { speak(){ console.log("bark"); } }
```

---

## 3. **What problems arise from deep inheritance hierarchies? How to refactor them?**

**Problems:**

* Hard to track flow and debug.
* Small changes in base classes break children.
* Poor extensibility; violates SRP.

**Refactor:**

* Flatten hierarchy.
* Move to **composition + interfaces**.
* Use patterns like **Strategy** or **Decorator**.

---

## 4. **How do private fields (#) work? How is this different from TypeScript private?**

**Answer:**

* JS private fields (`#value`) are **truly private**—enforced at runtime.
* TypeScript `private` is only **compile-time**; code still accessible in JS output.

```js
class A {
  #x = 10;
  getX(){ return this.#x; }
}
```

---

## 5. **Design a scalable class structure for a Payment Processing system.**

**Answer:**
Use **Strategy pattern** + **Abstraction**.

```js
class PaymentStrategy { pay(){} }
class UPI extends PaymentStrategy { pay(){ console.log("UPI pay"); } }
class Card extends PaymentStrategy { pay(){ console.log("Card pay"); } }

class PaymentProcessor {
  constructor(strategy){ this.strategy = strategy; }
  execute(){ this.strategy.pay(); }
}
```

---

## 6. **What design patterns complement OOP and how?**

**Answer:**

* **Factory:** Object creation logic abstraction.
* **Singleton:** One shared instance (caching, DB clients).
* **Strategy:** Swap behaviors dynamically.
* **Observer:** Event-driven architecture.
* **Decorator:** Add extra behavior without modifying original object.

---

## 7. **How does the Prototype Chain resolve properties?**

**Answer:**
When accessing `obj.property`:

1. JS checks the object.
2. If missing → goes to its prototype.
3. Continues up chain: `obj → obj.__proto__ → ... → Object.prototype → null`.

```js
const base = { a: 1 };
const child = Object.create(base);
console.log(child.a); // 1
```

---

## 8. **Method overriding vs shadowing?**

**Answer:**

* **Overriding:** Child class redefines parent method (prototype-level).
* **Shadowing:** Instance property hides prototype property.

```js
class A { say(){ console.log("A"); } }
class B extends A { say(){ console.log("B"); } } // overriding

const obj = new B();
obj.say = () => console.log("Shadow"); // shadowing
```

---

## 9. **Explain SOLID Principles in JS OOP.**

**Answer:**

* **S – SRP:** One responsibility per class.
* **O – OCP:** Closed for modification, open for extension.
* **L – LSP:** Subclasses must behave like parent.
* **I – ISP:** Don’t force interfaces not needed.
* **D – DIP:** Depend on abstractions, not concrete classes.

---

## 10. **Design a plugin system using OOP.**

**Answer:**
Use **composition + strategy pattern**.

```js
class PluginManager {
  constructor(){ this.plugins = []; }
  use(plugin){ this.plugins.push(plugin); }
  execute(ctx){ this.plugins.forEach(p => p.run(ctx)); }
}
```

This allows scalable plugin addition without modifying core logic.
