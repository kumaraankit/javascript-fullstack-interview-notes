# JavaScript `'use strict'` — Complete Explanation

`'use strict'` enables **Strict Mode** in JavaScript, which changes how the language behaves by enforcing **stricter parsing and error handling**. It helps you write **safer, cleaner, and more predictable code**.

This is a **very common interview topic** and often asked as follow-ups like:

> *What problems does strict mode solve?*
> *What breaks when you enable strict mode?*

---

## What Is `'use strict'`?

`'use strict'` is a **directive** (not a statement) that tells the JavaScript engine to run code in **Strict Mode**.

```js
'use strict';

x = 10; // ❌ ReferenceError
```

Without strict mode, JavaScript allows many silent errors.

---

## How to Enable Strict Mode

### 1. Entire Script

```js
'use strict';

function test() {
  // strict mode enabled
}
```

### 2. Per Function

```js
function test() {
  'use strict';
  // only this function is strict
}
```

### 3. ES Modules (IMPORTANT)

```js
// Automatically strict
export function fn() {}
```

> **All ES modules are strict by default** — no need to write `'use strict'`.

---

## Why Strict Mode Exists

JavaScript was designed to be very permissive.

Strict mode fixes:

* Silent errors
* Accidental globals
* Unsafe `this`
* Duplicate parameters
* Hard-to-optimize patterns

---

## Key Changes Introduced by Strict Mode

---

## 1. No Accidental Global Variables

### Non-Strict

```js
x = 5; // Creates global variable
```

### Strict

```js
'use strict';
x = 5; // ❌ ReferenceError
```

---

## 2. `this` Is Undefined in Functions

### Non-Strict

```js
function show() {
  console.log(this); // window
}
show();
```

### Strict

```js
'use strict';
function show() {
  console.log(this); // undefined
}
show();
```

Prevents bugs caused by unintended global `this`.

---

## 3. Duplicate Function Parameters Are Not Allowed

```js
'use strict';
function sum(a, a) {} // ❌ SyntaxError
```

---

## 4. Cannot Delete Variables or Functions

```js
'use strict';
let x = 10;
delete x; // ❌ SyntaxError
```

---

## 5. Assigning to Read-Only Properties Throws Errors

```js
'use strict';
const obj = {};
Object.defineProperty(obj, 'x', { value: 10, writable: false });
obj.x = 20; // ❌ TypeError
```

---

## 6. Octal Literals Are Not Allowed

```js
'use strict';
let num = 010; // ❌ SyntaxError
```

---

## 7. `eval` and `arguments` Are Restricted

```js
'use strict';
let eval = 10; // ❌ SyntaxError
```

Prevents unsafe dynamic behavior.

---

## 8. `with` Statement Is Disallowed

```js
'use strict';
with (obj) {} // ❌ SyntaxError
```

Improves performance and predictability.

---

## Strict Mode & Performance

Strict mode allows JavaScript engines to:

* Optimize code better
* Remove legacy slow paths
* Detect errors earlier

> Strict mode often leads to **better performance**, not worse.

---

## Strict Mode vs Non-Strict (Quick Table)

| Feature            | Non-Strict | Strict    |
| ------------------ | ---------- | --------- |
| Accidental globals | Allowed    | Error     |
| `this` in function | window     | undefined |
| Duplicate params   | Allowed    | Error     |
| Silent failures    | Yes        | No        |
| Optimizations      | Limited    | Better    |

---

## Common Interview Traps

❌ Thinking strict mode slows code
❌ Forgetting ES modules are strict by default
❌ Using libraries that rely on sloppy mode

---

## When Should You Use `'use strict'`?

✅ Legacy scripts
✅ Older non-module code

Not needed when:

* Using ES modules
* Using modern frameworks (React, Angular, Vue)

---

## Interview One-Liners (SDE-2)

* "Strict mode eliminates silent JavaScript errors"
* "It prevents accidental globals"
* "ES modules are strict by default"
* "Strict mode improves safety and optimizability"

---

## Key Takeaways

* `'use strict'` makes JavaScript safer
* It catches bugs early
* Mandatory behavior in modern JS modules
* Essential knowledge for interviews

---

