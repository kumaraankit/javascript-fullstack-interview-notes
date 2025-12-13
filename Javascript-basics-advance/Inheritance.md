# Class Inheritance in JavaScript — Complete Explanation

Class inheritance in JavaScript allows one class (**child / subclass**) to **reuse and extend** the behavior of another class (**parent / superclass**).

⚠️ **Interview truth:** JavaScript inheritance is **prototype-based**, even when using `class` syntax.

This is a **core SDE-2 interview topic**.

---

## What Is Class Inheritance?

**Inheritance** enables:

* Code reuse
* Hierarchical relationships (IS-A)
* Method overriding

Example:

```text
Employee IS-A Person
```

---

## Basic Inheritance Syntax (`extends`)

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi, I am ${this.name}`;
  }
}

class Employee extends Person {
  constructor(name, role) {
    super(name);
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}

const e = new Employee('Ankit', 'SDE-2');
```

---

## What `extends` Does Internally (Interview Gold)

`extends`:

* Sets **Employee.prototype** to inherit from **Person.prototype**
* Sets **Employee.**proto**** to **Person**

```text
Employee.prototype → Person.prototype → Object.prototype
```

---

## The `super` Keyword

### What Is `super`?

`super` refers to the **parent class**.

Used for:

1. Calling parent constructor
2. Calling parent methods

---

### super() in Constructor (Mandatory Rule)

```js
class Employee extends Person {
  constructor(name) {
    super(name); // must be called first
    this.id = 101;
  }
}
```

❌ This causes error:

```js
this.id = 101; // before super()
```

---

### super.method()

```js
sayHi() {
  return super.sayHi() + ' (Employee)';
}
```

---

## Method Overriding

Child class can override parent methods.

```js
class Employee extends Person {
  sayHi() {
    return `Employee ${this.name}`;
  }
}
```

> Parent method is hidden, not removed.

---

## Polymorphism (Interview Concept)

```js
const users = [
  new Person('A'),
  new Employee('B', 'Dev')
];

users.forEach(u => console.log(u.sayHi()));
```

Same method call, different behavior.

---

## Static Method Inheritance

```js
class Person {
  static species() {
    return 'Human';
  }
}

class Employee extends Person {}

Employee.species(); // Human
```

Static methods are inherited.

---

## Private Fields and Inheritance

```js
class Person {
  #ssn;

  constructor(ssn) {
    this.#ssn = ssn;
  }
}
```

❌ Not accessible in child class.

Private fields are **NOT inherited**.

---

## instanceof with Inheritance

```js
e instanceof Employee; // true
e instanceof Person;  // true
```

Checks prototype chain.

---

## Multiple Inheritance?

❌ JavaScript does NOT support multiple inheritance.

Alternative patterns:

* Composition
* Mixins

---

## Inheritance vs Composition (Interview Favorite)

### Inheritance

```js
class Dog extends Animal {}
```

### Composition

```js
function walkable(state) {
  return { walk: () => console.log(state.name + ' walks') };
}
```

> Prefer composition over inheritance.

---

## Class Inheritance vs ES5 Prototype Inheritance

```js
// ES5
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {};

function Employee(name) {
  Person.call(this, name);
}

Employee.prototype = Object.create(Person.prototype);
```

Classes simplify this logic.

---

## Common Interview Pitfalls

❌ Forgetting super()
❌ Confusing static vs instance methods
❌ Assuming private fields are inherited

---

## Interview One-Liners (SDE-2)

* "Class inheritance uses prototype chain"
* "extends sets prototype linkage"
* "super() must be called before this"
* "JS does not support multiple inheritance"

---

## Key Takeaways

* `extends` creates prototype inheritance
* `super` connects child to parent
* Method overriding enables polymorphism
* Composition is often better than inheritance

---
