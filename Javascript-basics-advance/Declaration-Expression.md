# Function Declaration vs Function Expression — Complete Explanation

Understanding **Function Declarations** and **Function Expressions** is fundamental in JavaScript. This topic is heavily asked in **SDE interviews** due to nuances in **hoisting, scope, and `this` binding**.

---

## 1️⃣ Function Declaration (FD)

A **function declaration** defines a named function and is of the form:

```js
function greet(name) {
  return `Hello, ${name}`;
}
```

### Key Features

* **Hoisted completely**: Both name and body are hoisted
* Can be called **before its definition**
* Always **named**
* Creates a **function object** in memory during the **creation phase**

### Example

```js
console.log(sayHi('Ankit')); // Works due to hoisting

function sayHi(name) {
  return `Hi, ${name}`;
}
```

---

## 2️⃣ Function Expression (FE)

A **function expression** assigns a function to a variable:

```js
const greet = function(name) {
  return `Hello, ${name}`;
};
```

### Key Features

* **Not hoisted** like declarations (the variable is hoisted but `undefined`)
* Can be **anonymous** or **named**
* Evaluated at **runtime**
* Often used in **callbacks or HOFs**

### Example

```js
console.log(sayHello); // undefined
// console.log(sayHello('Ankit')); // ❌ TypeError

var sayHello = function(name) {
  return `Hello, ${name}`;
};
```

> Using `let` or `const` causes a **ReferenceError** due to TDZ (Temporal Dead Zone)

---

## 3️⃣ Arrow Functions (Special Function Expression)

Arrow functions are **syntactic sugar** for function expressions:

```js
const add = (a, b) => a + b;
```

### Differences from normal FE

* **No `this` binding** of its own (lexical `this`)
* Cannot be used as constructors
* Cannot use `arguments` object

---

## 4️⃣ Comparison Table

| Feature                         | Function Declaration | Function Expression          | Arrow Function |
| ------------------------------- | -------------------- | ---------------------------- | -------------- |
| Hoisting                        | Fully hoisted        | Variable hoisted (undefined) | Same as FE     |
| Name                            | Must have            | Optional                     | Optional       |
| `this`                          | Dynamic              | Dynamic                      | Lexical        |
| Can be called before definition | ✅                    | ❌                            | ❌              |
| Can be constructor              | ✅                    | ✅                            | ❌              |
| Arguments object                | ✅                    | ✅                            | ❌              |

---

## 5️⃣ When to Use What

* **Function Declaration**:

  * Top-level utility functions
  * Functions that need to be hoisted

* **Function Expression**:

  * Callback functions
  * HOFs
  * Anonymous functions

* **Arrow Function**:

  * Concise functions
  * Functional programming patterns
  * Preserve `this` from outer context

---

## 6️⃣ Hoisting Deep Dive (IMPORTANT)

### Function Declaration

```js
hoistFD(); // Works
function hoistFD() { console.log('FD hoisted'); }
```

### Function Expression (var)

```js
hoistFE(); // ❌ TypeError: hoistFE is not a function
var hoistFE = function() { console.log('FE'); }
```

### Function Expression (let/const)

```js
hoistFE(); // ❌ ReferenceError (TDZ)
const hoistFE = () => {};
```

---

## 7️⃣ Common Interview Pitfalls

❌ Confusing hoisting behavior between declarations and expressions
❌ Forgetting TDZ for `let` and `const`
❌ Assuming arrow functions have `this`
❌ Using FE before declaration

---

## 8️⃣ Real-World Use Cases

* **FD**: Utility functions, event handlers that need hoisting
* **FE**: Callbacks in `map`, `filter`, `reduce`, promises, middleware
* **Arrow FE**: Inline handlers, concise syntax, preserving outer `this`

---

## 9️⃣ Quick Revision One-Liners

* "Function declarations are fully hoisted"
* "Function expressions are not hoisted; variable is hoisted"
* "Arrow functions do not have their own `this`"
* "Use declarations for top-level functions and expressions for callbacks"

---

## 10️⃣ Key Takeaways

* Know **hoisting differences**
* Understand **`this` binding**
* Arrow functions are **lexical, concise, non-constructible**
* This knowledge is crucial for **interview and production code**

---
