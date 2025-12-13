# JavaScript Execution Context, Call Stack & Lexical Scope — Complete Explanation

These three concepts form the **core of how JavaScript runs code**. Almost every advanced topic (closures, hoisting, `this`, async, memory) depends on them.

This document is **interview-ready (SDE-2 level)** and suitable for long-term reference.

---

## High-Level Mental Model

```text
Code → Execution Context → Call Stack → Scope Resolution
```

* **Execution Context**: *Where code is executed*
* **Call Stack**: *How execution order is managed*
* **Lexical Scope**: *How variables are resolved*

---

## 1️⃣ Execution Context

### What Is an Execution Context?

An **Execution Context (EC)** is an abstract environment where JavaScript code is **evaluated and executed**.

> Every time JavaScript runs code, it does so inside an execution context.

---

## Types of Execution Contexts

### 1. Global Execution Context (GEC)

* Created when the script first loads
* Only **one** per program
* Creates:

  * Global object (`window` in browser, `global` in Node.js)
  * `this`
  * Global variables & functions

```js
var a = 10;
function foo() {}
```

---

### 2. Function Execution Context (FEC)

* Created **each time a function is called**
* Multiple can exist

```js
function add(x, y) {
  return x + y;
}
add(2, 3);
```

---

### 3. Eval Execution Context (Rare)

Created when `eval()` is used (generally avoided).

---

## Phases of Execution Context

Each execution context has **two phases**:

---

### Phase 1: Creation Phase (Memory Allocation)

* `this` is set
* Variables are allocated memory
* Functions are fully hoisted

```js
console.log(a); // undefined
var a = 10;
```

Memory state:

```text
a → undefined
```

---

### Phase 2: Execution Phase

* Code is executed line by line
* Variables get actual values

```js
a = 10;
```

---

## Execution Context Structure

```text
Execution Context {
  Lexical Environment
  Variable Environment
  thisBinding
}
```

---

## 2️⃣ Call Stack

### What Is the Call Stack?

The **Call Stack** is a **LIFO (Last In, First Out)** data structure that tracks **which execution context is currently running**.

---

## How Call Stack Works

```js
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log('Hello');
}

first();
```

### Stack Order

```text
Global()
first()
second()
third()
```

After `third()` finishes, it is popped off.

---

## Stack Overflow

Occurs when:

* Recursive calls have no base case
* Stack memory limit is exceeded

```js
function recurse() {
  recurse();
}
recurse(); // ❌ Stack Overflow
```

---

## Call Stack & Async Code (IMPORTANT)

The call stack **does not handle async tasks**.

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
```

Output:

```text
A
C
B
```

Async callbacks go to the **event loop**, not the stack.

---

## 3️⃣ Lexical Scope

### What Is Lexical Scope?

**Lexical Scope** means that variable access is determined by **where functions are written in the code**, not where they are called.

> Scope is decided at **compile time**, not runtime.

---

## Example of Lexical Scope

```js
let x = 10;

function outer() {
  let y = 20;

  function inner() {
    console.log(x, y);
  }

  inner();
}

outer(); // 10 20
```

`inner()` can access variables from `outer()` because of **lexical scoping**.

---

## Scope Chain

When a variable is accessed:

```text
Local Scope → Parent Scope → Global Scope
```

If not found → `ReferenceError`

---

## Lexical Scope vs Dynamic Scope

JavaScript uses **lexical scope**, NOT dynamic scope.

```js
let a = 1;
function foo() {
  console.log(a);
}
function bar() {
  let a = 2;
  foo();
}
bar(); // 1
```

Resolved by **where `foo` is defined**, not called.

---

## Lexical Scope & Closures

Closures exist because of **lexical scoping**.

```js
function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const inc = counter();
inc(); // 1
inc(); // 2
```

The inner function remembers its lexical environment.

---

## Relationship Between All Three

| Concept           | Purpose                      |
| ----------------- | ---------------------------- |
| Execution Context | Environment for running code |
| Call Stack        | Manages execution order      |
| Lexical Scope     | Resolves variable access     |

---

## Common Interview Pitfalls

❌ Confusing scope with execution context
❌ Thinking scope is runtime-based
❌ Forgetting creation vs execution phase

---

## Interview One-Liners (SDE-2)

* "Execution context defines how JS code is executed"
* "Call stack is a LIFO structure for execution contexts"
* "JavaScript uses lexical scoping"
* "Closures exist because of lexical scope"

---

## Key Takeaways

* Every JS code runs inside an execution context
* Call stack manages execution flow
* Lexical scope controls variable resolution
* These concepts explain closures, hoisting, `this`, and async

---
