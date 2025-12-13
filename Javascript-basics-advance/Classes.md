# JavaScript Classes — Complete Explanation

JavaScript **classes** were introduced in **ES6 (ES2015)** to provide a **cleaner, more familiar syntax** for object-oriented programming (OOP).

⚠️ **Important interview fact:** JavaScript classes are **NOT a new object model** — they are **syntactic sugar over constructor functions and prototypes**.

This topic is **very important for SDE-2 interviews**.

---

## What Is a JavaScript Class?

A **class** in JavaScript is a blueprint for creating objects that:

* Encapsulates **data (properties)**
* Defines **behavior (methods)**
* Uses **prototype-based inheritance internally**

---

## Basic Class Syntax

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    return `Hi, I am ${this.name}`;
  }
}

const p1 = new Person('Ankit', 28);
```

---

## Key Components of a Class

### 1. constructor()

* Special method
* Called automatically when `new` is used
* Used to initialize properties

```js
constructor(name) {
  this.name = name;
}
```

---

### 2. Methods

* Defined without the `function` keyword
* Stored on the **prototype**, not per instance

```js
sayHi() {
  return 'Hello';
}
```

---

## Classes Are Just Syntactic Sugar (Interview Gold)

This class:

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

Is equivalent to:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {};
```

---

## How `new` Works with Classes

```js
const p = new Person('Ankit');
```

Internally:

1. New empty object is created
2. Prototype is linked
3. `this` is bound
4. Constructor runs
5. Object is returned

Same as constructor functions.

---

## Class Inheritance (`extends`)

```js
class Employee extends Person {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}

const e = new Employee('Ankit', 28, 'SDE-2');
```

---

## The `super` Keyword

* Calls parent constructor
* Must be called **before using `this`** in child constructor

```js
super(name, age);
```

❌ This will throw error:

```js
this.role = role; // before super()
```

---

## Static Methods

Static methods belong to the **class itself**, not instances.

```js
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}

MathUtils.add(2, 3); // 5
```

---

## Private Fields (#)

Introduced in modern JavaScript.

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }

  checkPassword() {
    return this.#password === '123';
  }
}
```

Private fields:

* Are truly private
* Not accessible outside the class

---

## Getters and Setters

```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}

const r = new Rectangle(10, 20);
r.area; // 200
```

---

## Class Fields (Public Fields)

```js
class Counter {
  count = 0;

  increment() {
    this.count++;
  }
}
```

---

## Hoisting Behavior (Very Important)

```js
const p = new Person(); // ❌ ReferenceError

class Person {}
```

Classes are:

* **Not hoisted** like function declarations
* In **Temporal Dead Zone (TDZ)**

---

## Strict Mode by Default

All class code runs in:

```text
'use strict'
```

Even if not explicitly written.

---

## this Binding in Classes

* `this` refers to the instance
* Methods are **not auto-bound**

```js
const say = p1.sayHi;
say(); // undefined (this lost)
```

Solution:

* Use `bind`
* Or arrow functions

---

## Class vs Constructor Function

| Feature     | Class     | Constructor Function |
| ----------- | --------- | -------------------- |
| Syntax      | Clean     | Verbose              |
| Hoisting    | ❌ No      | ✅ Yes                |
| Strict mode | Default   | Optional             |
| Inheritance | `extends` | Manual               |

---

## When to Use Classes

✅ OOP-style design
✅ Inheritance-heavy systems
✅ Large codebases

Avoid when:

* Simple object creation
* Functional programming style

---

## Common Interview Pitfalls

❌ Thinking classes are real OOP like Java
❌ Forgetting `super()`
❌ Assuming methods are auto-bound

---

## Interview One-Liners (SDE-2)

* "Classes are syntax sugar over prototypes"
* "Methods live on prototype"
* "`extends` uses prototype inheritance"
* "Classes are not hoisted"

---

## Key Takeaways

* JavaScript classes simplify prototype-based OOP
* Internally still use constructor functions
* `new` keyword behavior remains the same
* Understanding internals is crucial for interviews

---

