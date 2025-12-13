# Constructor Functions in JavaScript — Complete Explanation

Constructor functions are a **core JavaScript concept** used to create multiple similar objects using a shared blueprint. They are fundamental to understanding:

* Object creation
* `new` keyword
* Prototypes
* Classes (ES6)

This topic is **very important for SDE-2 interviews**.

---

## What Is a Constructor Function?

A **constructor function** is a **regular JavaScript function** that is used with the `new` keyword to:

* Create new objects
* Initialize object properties
* Set up prototype-based inheritance

---

## Basic Example

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p1 = new Person('Ankit', 28);
const p2 = new Person('Rahul', 30);
```

Each call to `new Person()` creates a **new object**.

---

## Naming Convention (Interview Expectation)

Constructor functions are **capitalized** by convention:

```js
function User() {}
```

This signals that the function should be used with `new`.

---

## What Happens Internally When Using a Constructor?

```js
const p = new Person('Ankit');
```

Internally:

1. A new empty object is created
2. `this` is bound to that object
3. Object’s `[[Prototype]]` is set to `Person.prototype`
4. Constructor code executes
5. The object is returned

---

## Constructor Functions vs Regular Functions

```js
function Car(model) {
  this.model = model;
}

const c = Car('BMW');
console.log(c); // undefined (without new)
```

❌ Forgetting `new` causes bugs.

---

## Adding Methods to Constructor Functions

### ❌ Bad Practice (Creates New Function for Each Object)

```js
function Person(name) {
  this.sayHi = function () {
    return `Hi ${name}`;
  };
}
```

---

### ✅ Correct Way (Using Prototype)

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  return `Hi ${this.name}`;
};
```

All instances share **one method**.

---

## Prototype Relationship (Very Important)

```js
p1.__proto__ === Person.prototype; // true
```

Prototype chain:

```text
p1 → Person.prototype → Object.prototype → null
```

---

## Constructor Property

```js
p1.constructor === Person; // true
```

Points back to the constructor function.

---

## Returning Values from Constructor Functions

### Returning Object (Overrides `this`)

```js
function Test() {
  this.x = 10;
  return { y: 20 };
}

new Test(); // { y: 20 }
```

---

### Returning Primitive (Ignored)

```js
function Test() {
  this.x = 10;
  return 5;
}

new Test(); // { x: 10 }
```

---

## Constructor Functions vs ES6 Classes

```js
// Constructor Function
function Person(name) {
  this.name = name;
}

// ES6 Class
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

> ES6 classes are **syntactic sugar** over constructor functions.

---

## Why Constructor Functions Were Used

Before ES6:

* No `class` keyword
* Constructor functions were used for OOP

They are still important to understand legacy code.

---

## Common Interview Pitfalls

❌ Forgetting `new`
❌ Defining methods inside constructor
❌ Confusing `prototype` vs `__proto__`

---

## Interview One-Liners (SDE-2)

* "Constructor functions are used with `new`"
* "They initialize object properties"
* "Methods should be defined on prototype"
* "Classes are syntax sugar over constructors"

---

## Key Takeaways

* Constructor functions are normal functions used with `new`
* They create multiple similar objects
* Prototype is shared across instances
* Foundation of JavaScript OOP

---
