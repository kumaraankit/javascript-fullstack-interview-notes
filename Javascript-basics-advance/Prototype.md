# JavaScript Prototypes — Deep Understanding

Prototypes are the foundation of JavaScript’s inheritance model. Unlike classical languages (Java/C#), JavaScript uses **prototypal inheritance**: objects inherit directly from other objects.

This document explains prototypes clearly and concisely with practical examples you can reuse.

---

## 1. What is a Prototype?

Every JavaScript object has an internal link (often called `[[Prototype]]`) that points to another object or `null`. The object it points to is called its **prototype**.

When you access a property on an object, JavaScript looks for the property on the object itself; if not found, it follows the prototype link — this is the **prototype chain**.

---

## 2. `prototype` vs `__proto__` vs `[[Prototype]]`

* `[[Prototype]]` is the internal slot (engine-level).
* `obj.__proto__` is a historical accessor to read/write `[[Prototype]]` (not recommended but commonly used).
* `SomeConstructor.prototype` is a property on the constructor function: when you create an instance with `new`, that instance’s `[[Prototype]]` is set to `SomeConstructor.prototype`.

Example:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() { return `Hi, I'm ${this.name}`; };

const p = new Person('Alice');
console.log(p.__proto__ === Person.prototype); // true
```

---

## 3. Property Lookup and Shadowing

When accessing `obj.prop`:

1. Check `obj` own properties.
2. If not present, check `obj.[[Prototype]]`.
3. Continue up the chain until found or reach `null`.

If an own property has the same name as a prototype property, the own property **shadows** the prototype property.

```js
const proto = { x: 1 };
const obj = Object.create(proto);
obj.x = 5; // shadows proto.x
console.log(obj.x); // 5
```

---

## 4. Methods on Prototype vs Instance

Putting methods on the prototype lets all instances share the same function (memory efficient). Putting methods on the instance creates a new function per instance (more expensive).

```js
function A() { this.v = 1; }
A.prototype.m = function(){}; // shared

function B() { this.v = 1; this.m = function(){}; } // per-instance
```

Use prototype for methods; use instance properties for per-instance state.

---

## 5. Creating Inheritance (Prototypal)

### Constructor + prototype

```js
function Animal(name) { this.name = name; }
Animal.prototype.speak = function(){ return `${this.name} makes a noise`; };

function Dog(name) { Animal.call(this, name); }
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function(){ return `${this.name} barks`; };
```

### `class` (ES6) — syntactic sugar

```js
class Animal {
  constructor(name){ this.name = name }
  speak(){ return `${this.name} makes a noise` }
}
class Dog extends Animal{
  speak(){ return `${this.name} barks` }
}
```

Both approaches produce the same prototype chain under the hood.

---

## 6. `Object.create` — direct prototypal inheritance

`Object.create(proto)` creates a new object whose `[[Prototype]]` is `proto`.

```js
const proto = { hello(){ return 'hi' } };
const obj = Object.create(proto);
obj.name = 'x';
console.log(obj.hello()); // 'hi' (inherited)
```

This is a clean way to make objects that delegate to others.

---

## 7. Enumerability, `hasOwnProperty`, and `in`

* `for...in` iterates over **enumerable own + inherited** properties.
* `Object.keys(obj)` lists **enumerable own** properties only.
* `obj.hasOwnProperty('p')` checks if `p` is an **own** property.
* `'p' in obj` returns true for own or inherited properties.

Example:

```js
const proto = { a: 1 };
const obj = Object.create(proto);
obj.b = 2;
for (let k in obj) console.log(k); // 'b', 'a'
console.log(obj.hasOwnProperty('a')); // false
console.log('a' in obj); // true
```

---

## 8. Modifying the Prototype at Runtime

You can add methods to a prototype after instances are created — they will see the new methods because prototype lookup is dynamic.

```js
function C(){}
const c = new C();
C.prototype.say = () => 'hello';
console.log(c.say()); // 'hello'
```

But avoid modifying built-in prototypes (e.g., `Array.prototype`) in production — it causes compatibility and maintenance issues.

---

## 9. Prototype Chain Performance Considerations

Property lookup walks the chain; deep chains add lookup cost. Modern engines optimize property access heavily, but prefer:

* Shallow chain for hot paths
* Methods on prototype (avoid creating functions per instance)

---

## 10. Prototype Pollution (Security)

If you allow untrusted data to set object paths (e.g., `obj['__proto__'].polluted = true`), attackers can modify `Object.prototype` and affect all objects. Always validate input and avoid blindly merging user objects into global objects.

---

## 11. Useful Introspection APIs

* `Object.getPrototypeOf(obj)` — returns `[[Prototype]]`.
* `Object.setPrototypeOf(obj, proto)` — sets the prototype (slow; avoid in hot code).
* `obj.hasOwnProperty(prop)` — check own property.
* `Object.create(proto)` — create object with specified prototype.

---

## 12. Quick Examples Summary

* Shared method example (memory-efficient): methods on prototype.
* Inheritance example: `Object.create` or constructor-prototype chaining.
* Class example: ES6 `class` and `extends` are sugar over prototypes.

---

## 13. Additional Practical Examples

### Example: Method Sharing via Prototype

```js
function Car(model) {
  this.model = model;
}

Car.prototype.start = function () {
  console.log(`${this.model} started`);
};

const c1 = new Car('BMW');
const c2 = new Car('Audi');

c1.start(); // BMW started
c2.start(); // Audi started

console.log(c1.start === c2.start); // true (shared method)
```

---

### Example: Prototype Chain Lookup

```js
const grandParent = { a: 1 };
const parent = Object.create(grandParent);
parent.b = 2;
const child = Object.create(parent);
child.c = 3;

console.log(child.a, child.b, child.c); // 1 2 3
```

Lookup order:

```
child → parent → grandParent → Object.prototype → null
```

---

### Example: Function Prototype vs Object Prototype

```js
function X() {}
const x = new X();

console.log(X.prototype);      // prototype object used by instances
console.log(x.__proto__);      // points to X.prototype
console.log(X.__proto__);      // Function.prototype
```

---

## 14. Visual Diagram of Prototype Chain

```
       ┌─────────────────────────────┐
       │         child object        │
       │ { c: 3 }                    │
       └───────────────┬─────────────┘
                       │ __proto__
                       ▼
       ┌─────────────────────────────┐
       │        parent object        │
       │ { b: 2 }                    │
       └───────────────┬─────────────┘
                       │ __proto__
                       ▼
       ┌─────────────────────────────┐
       │     grandParent object      │
       │ { a: 1 }                    │
       └───────────────┬─────────────┘
                       │ __proto__
                       ▼
       ┌─────────────────────────────┐
       │      Object.prototype       │
       └───────────────┬─────────────┘
                       │ __proto__
                       ▼
                     null
```

---

## 15. Visualizing Constructor + Prototype

```
 function Person(name) ─────────────┐
        │ constructor               │
        │                           │
        ▼                           │
  ┌───────────────┐                 │
  │   instance p  │                 │
  │ { name: 'A' } │                 │
  └──────┬────────┘                 │
         │ __proto__                │
         ▼                          │
  ┌──────────────────────┐          │
  │ Person.prototype     │◄─────────┘
  │ { greet: f() }       │
  └───────────┬──────────┘
              │ __proto__
              ▼
     Object.prototype
```

---

## 16. Real-World Pattern: Mixins with Prototypes

```js
const canWalk = {
  walk() { console.log('walking...'); }
};

const canEat = {
  eat() { console.log('eating...'); }
};

function Person(name) {
  this.name = name;
}

Object.assign(Person.prototype, canWalk, canEat);

const p = new Person('John');
p.walk(); // walking...
p.eat();  // eating...
```

---

## 17. Real-World Pattern: Prototypal Delegation (OLOO)

Objects Linking to Other Objects (OLOO):

```js
const Vehicle = {
  init(name) { this.name = name; },
  drive() { console.log(`${this.name} driving`); }
};

const car = Object.create(Vehicle);
car.init('Tesla');
car.drive(); // Tesla driving
```

This patte
Prototypes are powerful and flexible. Think of objects as **delegating** to their prototype for missing properties. Use:

* Prototypes for shared behavior (methods).
* Instances for per-object state.
* `Object.create` for clear delegation.
