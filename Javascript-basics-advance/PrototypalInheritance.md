# Prototypal Inheritance in JavaScript

Prototypal inheritance is one of the **core concepts** in JavaScript's object system. Instead of classes (like in Java or C#), JavaScript uses **objects inheriting from other objects**.

This system is flexible, dynamic, and powerful — making it a common topic in interviews.

---

# 🔹 What Is Prototypal Inheritance?

In JavaScript, every object has an internal reference to another object called its **prototype**.

If a property or method is not found on the object itself, JavaScript will **look up the prototype chain** until it finds it—or reaches the end (`null`).

---

# 🔹 Visual Diagram

```
Object ---> Prototype ---> Parent Prototype ---> ... ---> null
```

Example:

```
user.__proto__  --->  Person.prototype  --->  Object.prototype  ---> null
```

---

# 🔹 Basic Example

```js
const person = {
  greet() {
    console.log("Hello!");
  }
};

const user = Object.create(person);  // user inherits from person

user.greet(); // Output: Hello!
```

**Why did this work?**

* `user` has no `greet()` method.
* JavaScript looks at its prototype (`person`).
* Finds `greet()` there → calls it.

---

# 🔹 Prototype Chain Lookup

```js
user.greet();   // found in person
user.toString(); // not in user → not in person → found in Object.prototype
```

---

# 🔹 Constructor Functions and Prototype

Before ES6 classes, constructor functions were used.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const user = new Person("Ankit");
user.sayHello();  // Hello, I'm Ankit
```

### What happens behind the scenes?

* `new Person()` creates an empty object.
* Sets `user.__proto__ = Person.prototype`.
* Returns the object.

---

# 🔹 ES6 Classes (Still Prototype-based)

Classes in JavaScript are **syntactic sugar** over prototypal inheritance.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

const user = new Person("Kumar");
user.greet();
```

Under the hood:

```
Person.prototype.greet  ---> function
user.__proto__ = Person.prototype
```

---

# 🔥 Tricky Example (Common in Interviews)

```js
function Person() {}
Person.prototype.age = 25;

const p1 = new Person();
const p2 = new Person();

p1.age = 30;

console.log(p1.age); // 30 (own property)
console.log(p2.age); // 25 (from prototype)
```

### Why?

* `p1.age = 30` creates its own property.
* `p2` did not modify anything → inherits from prototype.

---

# 🔥 Another Tricky Example

```js
const obj = { a: 1 };
const child = Object.create(obj);

child.b = 2;

console.log(child.a); // 1 (from prototype)
console.log(child.hasOwnProperty('a')); // false
```

---

# 🔍 How to Check Prototype

```js
Object.getPrototypeOf(obj);
obj.__proto__;
```

---

# 📌 Summary

* JavaScript uses **prototypal inheritance**, not classical inheritance.
* Objects inherit directly from other objects.
* Properties are searched **along the prototype chain**.
* Constructor functions and ES6 classes are built on prototypes.
* Changes to the prototype affect all objects inheriting from it.

---

## More Tricky Examples

### 1. Shadowing Properties in the Prototype Chain

```js
function Car() {}
Car.prototype.wheels = 4;

const tesla = new Car();
console.log(tesla.wheels); // 4 (from prototype)

tesla.wheels = 6; // shadowing
console.log(tesla.wheels); // 6 (own property)

delete tesla.wheels;
console.log(tesla.wheels); // 4 (falls back to prototype)
```

**Key point:** Deleting a shadowed property restores access to the prototype version.

### 2. Method Borrowing Using Prototype

```js
const obj1 = {
  name: "Ankit",
  greet() {
    console.log(`Hello ${this.name}`);
  }
};

const obj2 = { name: "Kumar" };

obj2.__proto__ = obj1;
obj2.greet(); // Hello Kumar
```

**Key point:** Inherited methods still use `this` of the calling object.

### 3. Prototype Chain Pitfall with Reference Types

```js
function Student() {}
Student.prototype.marks = [];

const s1 = new Student();
const s2 = new Student();

s1.marks.push(95);
console.log(s2.marks); // [95] ❗ Unexpected shared state
```

**Key point:** Never store mutable reference types in prototypes.

### 4. Reassigning a Prototype Breaks the Constructor Reference

```js
function Animal() {}
Animal.prototype = {
  eats: true
};

const a = new Animal();
console.log(a.constructor === Animal); // false ❗
```

**Key point:** Overwriting a prototype removes the default `constructor`. Always restore it manually.

### 5. Dynamic Prototype Lookup

```js
function Person() {}
Person.prototype.role = "Guest";

const p = new Person();
console.log(p.role); // Guest

Person.prototype.role = "Admin"; // changed later
console.log(p.role); // Admin 🔥
```

**Key point:** Prototype lookup is dynamic — changes reflect immediately on all instances.

### 6. Inheritance with `Object.create()`

```js
const base = { x: 10 };
const child = Object.create(base);

console.log(child.x); // 10
child.x = 20;
console.log(base.x); // 10 (not mutated)
```

**Key point:** `Object.create()` gives clean inheritance without constructor functions.

### 7. Checking Inheritance Correctly

```js
function User() {}
const u = new User();

console.log(u instanceof User); // true
console.log(User.prototype.isPrototypeOf(u)); // true
console.log(Object.getPrototypeOf(u) === User.prototype); // true
```

**Key point:** `instanceof` uses the prototype chain — helpful in interviews.
