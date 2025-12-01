# Understanding `this` in JavaScript — Interview-Ready Guide

JavaScript's `this` behaves differently depending on **how** a function is called, not where it is defined. Below is a crisp, interview-focused explanation with examples for each context.

---

# 🔥 1. `this` in the Global Context

In the global scope:

* In **browsers**, `this` → `window`
* In **Node.js**, `this` → `{}` (module scope), NOT `global`

### Example

```js
console.log(this); // browser → window , Node → {}
```

---

# 🔥 2. `this` in Object Methods

When a function is called as a method of an object, `this` refers to **the object before the dot**.

### Example

```js
const user = {
  name: "Ankit",
  show() {
    console.log(this.name); // Ankit
  }
};

user.show(); // 'this' → user
```

### ❗ Common Mistake

Extracting a method loses `this`.

```js
const f = user.show;
f(); // undefined (or error in strict mode)
```

Why? Because it's no longer called on `user` — it's a normal function now.

---

# 🔥 3. `this` in Regular Functions

In **non-strict mode**, `this` defaults to the **global object**.
In **strict mode**, `this` becomes **undefined**.

### Example

```js
function test() {
  console.log(this);
}

// non-strict → window, strict → undefined
test();
```

---

# 🔥 4. `this` in Constructor Functions (`new` keyword)

Using `new` creates:

* a new empty object
* sets `this` to that new object

### Example

```js
function Person(name) {
  this.name = name;
}

const p = new Person("Ankit");
console.log(p.name); // Ankit
```

---

# 🔥 5. `this` in Arrow Functions

Arrow functions **do not have their own `this`**.
They inherit `this` from the **surrounding lexical scope**.

### Example

```js
const obj = {
  name: "Ankit",
  show: function () {
    const arrow = () => {
      console.log(this.name);
    };
    arrow();
  }
};

obj.show(); // Ankit
```

### Wrong usage: arrow function as method

```js
const obj = {
  name: "Ankit",
  show: () => {
    console.log(this.name);
  }
};

obj.show(); // undefined (arrow takes global this)
```

---

# 🔥 6. `this` in Event Listeners

In DOM event listeners:

* `this` refers to the **element** that triggered the event.

### Example

```js
document.querySelector("#btn").addEventListener("click", function () {
  console.log(this); // the button element
});
```

Arrow functions capture surrounding `this` instead.

```js
btn.addEventListener("click", () => {
  console.log(this); // NOT the button → window
});
```

---

# 🔥 7. `call`, `apply`, `bind` to Control `this`

### Example

```js
function show() {
  console.log(this.name);
}

const user = { name: "Ankit" };

show.call(user);   // Ankit
show.apply(user);  // Ankit
const f = show.bind(user);
f();               // Ankit
```

---

# ⭐ Interview Summary Answer

> **`this` is determined by how a function is called.
> In the global scope it refers to the global object.
> In object methods it refers to the object.
> Arrow functions do not have their own `this` and instead inherit it lexically.
> `new` binds `this` to a newly created object.
> `call`, `apply`, and `bind` let you manually set `this`.**

---

