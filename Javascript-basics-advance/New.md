# How `new` Works Internally in JavaScript — Complete Explanation

Understanding how the `new` keyword works **internally** is a **must-know topic for SDE-2 interviews**. It connects multiple core JavaScript concepts:

* Prototypes
* `this` binding
* Constructor functions
* Object creation

---

## What Is the `new` Keyword?

The `new` keyword is used to:

* Create a **new object**
* Link it to a constructor’s prototype
* Bind `this`
* Return the created object

Example:

```js
function Person(name) {
  this.name = name;
}

const p1 = new Person('Ankit');
```

---

## High-Level Definition (Interview One-Liner)

> "`new` creates a new object, sets its prototype, binds `this` to it, executes the constructor, and returns the object."

---

## Step-by-Step: What Happens Internally?

When you execute:

```js
const obj = new Constructor(arg1, arg2);
```

JavaScript performs **4 internal steps**.

---

## Step 1: Create a New Empty Object

```js
const obj = {};
```

This object is freshly allocated in memory.

---

## Step 2: Set Prototype Link (`[[Prototype]]`)

The new object’s internal `[[Prototype]]` is set to:

```js
Constructor.prototype
```

Equivalent to:

```js
obj.__proto__ = Constructor.prototype;
```

This enables **prototype inheritance**.

---

## Step 3: Bind `this` to the New Object

Inside the constructor:

```js
this === obj; // true
```

So this works:

```js
function Person(name) {
  this.name = name;
}
```

---

## Step 4: Execute Constructor Function

```js
Constructor.call(obj, arg1, arg2);
```

* Properties are assigned to `obj`
* Any setup logic runs

---

## Step 5: Return the Object (Important Rule)

### Default Behavior

If constructor **does not return an object**:

```js
return obj;
```

---

### Special Case: Explicit Return

```js
function Test() {
  this.x = 10;
  return { y: 20 };
}

const t = new Test();
console.log(t); // { y: 20 }
```

❗ If constructor returns an **object**, that object is returned instead.

---

### Primitive Return Is Ignored

```js
function Test() {
  this.x = 10;
  return 5;
}

const t = new Test();
console.log(t.x); // 10
```

---

## Visual Memory Model

```text
obj → {}
  [[Prototype]] → Constructor.prototype
```

---

## Complete Internal Pseudo-Code

```js
function myNew(Constructor, ...args) {
  const obj = {};
  Object.setPrototypeOf(obj, Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}
```

---

## Example Walkthrough

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  return `Hi, ${this.name}`;
};

const p = new Person('Ankit');

p.sayHi(); // Hi, Ankit
```

Prototype chain is correctly established.

---

## `new` vs Factory Function

### Using `new`

```js
const p = new Person('Ankit');
```

### Factory Function

```js
function createPerson(name) {
  return {
    name,
    sayHi() {
      return `Hi, ${name}`;
    }
  };
}
```

---

## Why `new` Is Often Avoided in Modern JS

* Confusing `this`
* Easy to forget `new`
* Bugs in inheritance

Modern alternatives:

* ES6 `class`
* Factory functions

---

## `class` Is Just Syntax Sugar

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

Internally still uses `new`.

---

## Common Interview Pitfalls

❌ Forgetting prototype linkage
❌ Not knowing return object rule
❌ Confusing `__proto__` with `prototype`

---

## Interview One-Liners (SDE-2)

* "`new` performs object creation and prototype linking"
* "Constructor return object overrides default"
* "`class` uses `new` internally"

---

## Key Takeaways

* `new` performs **object creation + inheritance setup**
* Prototype chain is established automatically
* Explicit object return overrides default
* Core to understanding OOP in JavaScript

---


