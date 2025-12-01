# 50+ Tricky JavaScript Interview Questions (With Explanations)

A curated list of **tricky JavaScript interview questions** designed to rebuild your coding confidence and help you answer like an experienced engineer.

---

## 1. What is the output of the following?

```js
console.log([] + []);
```

### Explanation

Empty arrays convert to empty strings → `"" + "" = ""`.
**Output:** `""` (empty string)

---

## 2. What is the output?

```js
console.log([] + {});
console.log({} + []);
```

### Explanation

String coercion:

* `[] + {}` → `"[object Object]"`
* `{} + []` is parsed as a block + array → `0 + ""` → `""`

---

## 3. What happens here?

```js
console.log(typeof NaN);
```

**Output:** `"number"`
Because `NaN` is a special numeric value.

---

## 4. What is returned?

```js
console.log(NaN === NaN);
```

**Output:** `false`
NaN is never equal to itself.
Use:

```js
Object.is(NaN, NaN); // true
```

---

## 5. Predict output:

```js
console.log(0.1 + 0.2 === 0.3);
```

**False** due to floating point precision.

---

## 6. What does this print?

```js
console.log(1 < 2 < 3);
console.log(3 < 2 < 1);
```

### Explanation

`1 < 2 < 3`

* `1 < 2` → true → `true < 3` → `1 < 3` → **true**

`3 < 2 < 1`

* `3 < 2` → false → `false < 1` → `0 < 1` → **true**

---

## 7. Output?

```js
console.log([] == 0);
console.log([] === 0);
```

* `[] == 0` → true (coercion)
* `[] === 0` → false

---

## 8. What is the result?

```js
console.log([1,2,3] + [4,5,6]);
```

**"1,2,3" + "4,5,6" = "1,2,34,5,6"**
Array → string.

---

## 9. What is logged?

```js
let a = { x: 1 };
let b = a;
b.x = 10;
console.log(a.x);
```

Objects are reference types → **10**.

---

## 10. What is output?

```js
console.log("5" - 2);
console.log("5" + 2);
```

* Subtraction → number → **3**
* Addition → string → **"52"**

---

## 11. Output of setTimeout loop?

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

**4, 4, 4**
Because `var` is function-scoped.

Fix using `let`.

---

## 12. What happens?

```js
console.log("hello"[0] = 'H');
```

Strings are immutable → assignment ignored.

---

## 13. What is the value?

```js
console.log(null + 1);
```

`null → 0` → **1**

---

## 14. What about this?

```js
console.log(undefined + 1);
```

`undefined → NaN` → **NaN**

---

## 15. Predict output:

```js
console.log(typeof null);
```

Bug in JS → **"object"**

---

## 16. Output of this closure question?

```js
function outer() {
  let x = 10;
  return function inner() {
    console.log(x);
  }
}
outer()();
```

**10** because the inner function closes over `x`.

---

## 17. What is printed?

```js
console.log([...'abc']);
```

**["a", "b", "c"]**

---

## 18. What is the output?

```js
let x = (y = 5);
console.log(typeof x, typeof y);
```

* `y` becomes global → number
* `x` local → number

---

## 19. Output?

```js
console.log(true + true);
```

Booleans → numbers → **2**

---

## 20. Output?

```js
console.log("2" > "12");
```

String comparison (lexicographical) → **true**

---

## 21. What is logged?

```js
console.log([1] == [1]);
```

False → different references.

---

## 22. Function hoisting?

```js
foo();
function foo(){ console.log("hi"); }
```

Works → **hi**

---

## 23. But this?

```js
bar();
var bar = function(){ console.log("hi"); }
```

**TypeError** because `bar` is hoisted but initialized to undefined.

---

## 24. What is output?

```js
console.log(!!"false", !!"0");
```

Both are non-empty strings → **true true**

---

## 25. Output?

```js
console.log([] == ![]);
```

`![] → false`
`[] == false` → true

---

## 26. What happens?

```js
console.log({} == {});
```

Different references → **false**

---

## 27. What is printed?

```js
function test(a, b = a) {
  console.log(a, b);
}
test(5);
```

**5 5**

---

## 28. Rest + spread behavior:

```js
function test(...args) {
  console.log(args.length);
}
test(1,2,3);
```

**3**

---

## 29. Parameter shadowing:

```js
let a = 10;
function fn(a){
  console.log(a);
}
fn(20);
```

Shadowed → **20**

---

## 30. What is output?

```js
console.log([1,2,3].map(parseInt));
```

parseInt is called with (value, index):

```
parseInt(1,0) → 1
parseInt(2,1) → NaN
parseInt(3,2) → NaN
```

**[1, NaN, NaN]**

---

## 31. Output?

```js
console.log(Math.max());
```

**-Infinity**

---

## 32. What happens?

```js
console.log([1 < 2 < 3], [3 < 2 < 1]);
```

**true true** (refer Q6)

---

## 33. What is printed?

```js
console.log(typeof (() => {}));
```

**"function"**

---

## 34. Output?

```js
console.log(typeof new Number(5));
```

**"object"**

---

## 35. Output of promise?

```js
Promise.resolve(1).then(() => 2).then(console.log);
```

**2**

---

## 36. Async/await order:

```js
console.log(1);
setTimeout(() => console.log(2));
promise = Promise.resolve().then(() => console.log(3));
console.log(4);
```

Order:
**1,4,3,2**

---

## 37. What is logged?

```js
console.log(null == undefined);
```

**true** only for `==`.

---

## 38. Tricky coercion:

```js
console.log([] + 1);
```

→ `'' + 1 = '1'`

---

## 39. Output?

```js
console.log({} + 1);
```

Interpreted as block + 1 → **1**

---

## 40. What happens?

```js
console.log("" == 0);
```

Empty string → 0 → **true**

---

## 41. Output?

```js
console.log(1 == "1");
```

True (coercion)

---

## 42. Output?

```js
console.log(1 === "1");
```

False (strict)

---

## 43. What does this log?

```js
console.log(typeof []);
```

**"object"**

---

## 44. Output?

```js
console.log(!![]);
```

Non-empty array → **true**

---

## 45. What is printed?

```js
let x = [1,2];
let y = [...x];
y.push(3);
console.log(x);
```

Spread copies → x unaffected → **[1,2]**

---

## 46. Deep freeze problem:

```js
const obj = Object.freeze({ a: { b: 1 } });
obj.a.b = 2;
console.log(obj.a.b);
```

Freeze is shallow → **2**

---

## 47. What is printed?

```js
console.log('5' * 2);
```

Coerced to number → **10**

---

## 48. Why is this true?

```js
console.log([] instanceof Array);
```

Prototype chain check → true

---

## 49. Output?

```js
console.log([1,2,3] == "1,2,3");
```

Array → string → equal → true

---

## 50. Value of this expression:

```js
console.log(typeof (() => 123)());
```

**"number"**

---

## 51. Final tricky async one:

```js
async function test() {
  return 5;
}
console.log(test());
```

Async always returns Promise → **Promise { 5 }**

---

