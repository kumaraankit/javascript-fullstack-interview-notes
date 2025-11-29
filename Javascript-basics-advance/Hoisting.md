# JavaScript Hoisting

Hoisting in JavaScript means **variables and function declarations are moved to the top of their scope during the compilation phase**, before code execution. Only declarations are hoisted — **not initializations**.

---

## 1. Variable Hoisting

 ### `var`

`var` declarations are hoisted **with default value `undefined`**.

```js
console.log(x); // undefined
var x = 10;
```

**Why?**
During hoisting, JavaScript rewrites this internally as:

```js
var x;
console.log(x);
x = 10;
```

### `let` and `const`

These are hoisted **but stay in the Temporal Dead Zone (TDZ)** until the line where they are declared.

```js
console.log(a); // ❌ ReferenceError
let a = 5;
```

They exist but **cannot be accessed** before initialization.

---

## 2. Function Hoisting

### Function Declarations

Fully hoisted with their definitions.

```js
greet(); // Works
function greet() {
  console.log("Hello");
}
```

### Function Expressions (var)

Only the variable is hoisted, **not the function value**.

```js
sayHi(); // ❌ TypeError
var sayHi = function () {
  console.log("Hi");
};
```

Internally:

```js
var sayHi;
sayHi(); // Not a function
sayHi = function(){}
```

### Function Expressions (`let`, `const`)

Behave like normal `let`/`const` variables.

```js
hello(); // ❌ ReferenceError
const hello = () => {};
```

---

## 3. Quick Summary Table

| Type                            | Hoisted? | Value During Hoisting | Access Before Declaration |
| ------------------------------- | -------- | --------------------- | ------------------------- |
| var                             | Yes      | undefined             | Allowed (undefined)       |
| let                             | Yes      | TDZ                   | ❌ ReferenceError          |
| const                           | Yes      | TDZ                   | ❌ ReferenceError          |
| function declaration            | Yes      | Full function         | ✔️ Works                  |
| function expression (var)       | Yes      | undefined             | ❌ TypeError               |
| function expression (let/const) | Yes      | TDZ                   | ❌ ReferenceError          |

---

## Final Takeaway

Hoisting rearranges declarations at compile time. Understanding it helps avoid bugs related to **TDZ, undefined values, and function expression errors**.
