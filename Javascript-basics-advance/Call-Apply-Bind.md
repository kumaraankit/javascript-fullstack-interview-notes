# call vs apply vs bind — Complete Explanation (JavaScript)

`call`, `apply`, and `bind` are **Function methods** in JavaScript used to **explicitly control the value of `this`** during function execution.

This topic is **extremely important for SDE-2 interviews**, especially when discussing:

* `this` keyword
* Function borrowing
* Reusability
* Polyfills

---

## Why Do We Need call / apply / bind?

In JavaScript:

* The value of `this` depends on **how a function is called**, not where it is defined
* Sometimes we need to **manually set `this`**

That’s exactly what `call`, `apply`, and `bind` do.

---

## The Problem Without call/apply/bind

```js
const user = {
  name: 'Ankit'
};

function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

greet('Hello'); // Hello, undefined
```

`this` is not bound to `user`.

---

## Function.prototype.call()

### What is `call`?

`call` invokes a function **immediately**, allowing you to specify:

1. The value of `this`
2. Arguments **comma-separated**

### Syntax

```js
fn.call(thisArg, arg1, arg2, ...);
```

---

### Example: call

```js
greet.call(user, 'Hello'); // Hello, Ankit
```

---

## Function.prototype.apply()

### What is `apply`?

`apply` is **almost identical to `call`**, except:

* Arguments are passed as an **array**

### Syntax

```js
fn.apply(thisArg, [arg1, arg2, ...]);
```

---

### Example: apply

```js
greet.apply(user, ['Hi']); // Hi, Ankit
```

---

## call vs apply (Key Difference)

| Feature    | call            | apply        |
| ---------- | --------------- | ------------ |
| Invocation | Immediate       | Immediate    |
| Arguments  | Comma-separated | Array        |
| Use case   | Known args      | Dynamic args |

---

## Function.prototype.bind()

### What is `bind`?

`bind` **does NOT execute the function immediately**.

Instead, it:

* Returns a **new function**
* Permanently binds `this`
* Can preset arguments (partial application)

---

### Syntax

```js
const boundFn = fn.bind(thisArg, arg1, arg2, ...);
```

---

### Example: bind

```js
const greetUser = greet.bind(user, 'Hello');

greetUser(); // Hello, Ankit
```

---

## call/apply vs bind (Core Difference)

| Feature              | call / apply | bind      |
| -------------------- | ------------ | --------- |
| Executes immediately | ✅ Yes        | ❌ No      |
| Returns function     | ❌ No         | ✅ Yes     |
| `this` binding       | Temporary    | Permanent |

---

## Function Borrowing (Very Important)

```js
const person1 = {
  name: 'Ankit'
};

const person2 = {
  name: 'Rahul'
};

function intro(city) {
  console.log(`${this.name} from ${city}`);
}

intro.call(person1, 'Delhi');
intro.call(person2, 'Mumbai');
```

---

## apply with Math Methods (Classic Example)

```js
const nums = [3, 7, 2, 9];

const max = Math.max.apply(null, nums);
console.log(max); // 9
```

---

## bind in Event Handlers

```js
const button = {
  text: 'Click me',
  handleClick() {
    console.log(this.text);
  }
};

setTimeout(button.handleClick.bind(button), 1000);
```

Without `bind`, `this` would be lost.

---

## Partial Application Using bind

```js
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);

double(5); // 10
```

---

## call/apply/bind with Arrow Functions (Interview Trap)

```js
const obj = { name: 'Ankit' };

const greetArrow = () => {
  console.log(this.name);
};

greetArrow.call(obj); // undefined
```

### Why?

* Arrow functions **do not have their own `this`**
* `this` is lexically bound

---

## Polyfill for bind (Interview Bonus)

```js
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};
```

---

## Common Interview Pitfalls

❌ Saying bind executes immediately
❌ Forgetting apply takes array
❌ Trying to rebind arrow functions

---

## Interview One-Liners (SDE-2)

* "call and apply invoke immediately"
* "bind returns a new function"
* "apply is useful for dynamic arguments"
* "bind enables partial application"

---

## Summary Table

| Method | Executes Immediately | Arguments | Returns  |
| ------ | -------------------- | --------- | -------- |
| call   | ✅                    | List      | Value    |
| apply  | ✅                    | Array     | Value    |
| bind   | ❌                    | List      | Function |

---

## Key Takeaways

* `call`, `apply`, and `bind` control `this`
* `bind` is used when delayed execution is needed
* Arrow functions ignore these methods
* Frequently asked in interviews

---

