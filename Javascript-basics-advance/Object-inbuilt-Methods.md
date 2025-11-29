# JavaScript Array Inbuilt Methods

A complete, interview-ready list of all important JavaScript array methods with examples, when to use, advantages, and disadvantages.

---

## 1. Array Creation Methods

### **Array.from()**

Creates an array from iterable or array-like objects.

```js
Array.from("ANKIT"); // ['A','N','K','I','T']
```

**Use:** Converting iterable/array-like → array.

---

### **Array.of()**

Creates array from arguments.

```js
Array.of(3); // [3]
```

**Use:** When you want `[3]` instead of `new Array(3)`.

---

## 2. Array Checking

### **Array.isArray()**

```js
Array.isArray([1,2]); // true
```

---

## 3. Insert / Remove (Mutating)

### **push()** – Add at end

```js
[1].push(2); // [1,2]
```

### **pop()** – Remove last

```js
[1,2].pop(); // [1]
```

### **unshift()** – Add at start

```js
[2,3].unshift(1); // [1,2,3]
```

### **shift()** – Remove first

```js
[1,2].shift(); // [2]
```

### **splice()** – Add/remove at any position

```js
const a=[1,2,3];
a.splice(1,1); // removes 2 → [1,3]
```

---

## 4. Non-Mutating Extraction

### **slice()** – Returns new array

```js
[1,2,3,4].slice(1,3); // [2,3]
```

---

## 5. Search Methods

### **indexOf() / lastIndexOf()**

```js
[1,2,3,2].indexOf(2); // 1
```

### **includes()**

```js
[1,2,3].includes(2); // true
```

### **find()**

```js
[1,2,3].find(x => x > 1); // 2
```

### **findIndex()**

```js
[1,2,3].findIndex(x => x > 1); // 1
```

### **findLast() / findLastIndex()**

```js
[1,2,3,2].findLast(x => x === 2); // 2
```

---

## 6. Transformation Methods

### **map()**

```js
[1,2,3].map(x => x * 2); // [2,4,6]
```

### **filter()**

```js
[1,2,3].filter(x => x > 1); // [2,3]
```

### **reduce()**

```js
[1,2,3].reduce((sum,x)=>sum+x,0); // 6
```

### **flat()**

```js
[1,[2,[3]]].flat(2); // [1,2,3]
```

### **flatMap()**

```js
[1,2].flatMap(x => [x,x*2]); // [1,2,2,4]
```

---

## 7. Iteration Methods

### **forEach()**

```js
[1,2,3].forEach(x => console.log(x));
```

### **every()**

```js
[2,4,6].every(x => x % 2 === 0); // true
```

### **some()**

```js
[1,3,4].some(x => x % 2 === 0); // true
```

---

## 8. Sorting / Reversing

### **sort()**

```js
[10,2,5].sort((a,b)=>a-b); // [2,5,10]
```

### **reverse()**

```js
[1,2,3].reverse(); // [3,2,1]
```

---

## 9. Join / Convert

### **join()**

```js
[1,2,3].join('-'); // "1-2-3"
```

### **toString() / toLocaleString()**

Convert array to string.

---

## 10. Merge / Copy

### **concat()** – Non-mutating merge

```js
[1,2].concat([3,4]); // [1,2,3,4]
```

### **copyWithin()** – Mutates

```js
[1,2,3,4].copyWithin(1,2); // [1,3,4,4]
```

### **fill()**

```js
new Array(3).fill(0); // [0,0,0]
```

---

## 11. Iterators

### **entries()**

```js
for (const [i,v] of ['a','b'].entries()) console.log(i,v);
```

### **keys()** – Iterator of indexes

### **values()** – Iterator of values

---

This file contains all key inbuilt array methods with examples and usage guidance, prepared for interview and revision.

---

# Additional Definitions & Tricky Examples

## Array.from()

**Definition:** Creates a new array from an iterable or array-like object.

**Tricky Example:** Converting a NodeList into an array and mapping:

```js
const divs = document.querySelectorAll('div');
const ids = Array.from(divs, el => el.id);
```

---

## Array.of()

**Definition:** Creates an array from the provided arguments.

**Tricky Example:**

```js
Array.of(undefined, null, 0, false); // [undefined, null, 0, false]
```

Shows it doesn’t ignore falsy values.

---

## push()

**Definition:** Adds one or more elements to the end (mutates original).

**Tricky Example:** Push array INTO array:

```js
const a = [1];
a.push([2,3]); // [1, [2,3]]
```

Does NOT flatten.

---

## pop()

**Definition:** Removes last element.

**Tricky Example:**

```js
const a = [1];
console.log(a.pop(), a.pop()); // 1, undefined
```

---

## shift() / unshift()

**Definition:** Adds/removes from the beginning.

**Tricky Example:**

```js
let a=[1];
a.unshift(...[2,3]); // [2,3,1]
```

Expanding array into unshift.

---

## splice()

**Definition:** Add/remove elements at any index.

**Advanced Example:** Remove all except last 2 elements:

```js
const a = [1,2,3,4,5];
a.splice(0, a.length - 2); // a → [4,5]
```

---

## slice()

**Definition:** Returns a shallow copy of part of array.

**Tricky Example:** Copy array safely:

```js
const arr = [1,2,3];
const clone = arr.slice();
```

---

## includes()

**Definition:** Checks if an array contains a value.

**Tricky Example:** Unlike `indexOf`, works with NaN:

```js
[NaN].includes(NaN); // true
[NaN].indexOf(NaN); // -1
```

---

## find()

**Definition:** Returns first element satisfying a condition.

**Advanced Example:** Find object by partial match:

```js
const users = [{id:1},{id:2},{id:3}];
users.find(u => u.id > 1); // {id:2}
```

---

## map()

**Definition:** Creates new array by applying transformation.

**Tricky Example:** Index-based operations:

```js
['a','b','c'].map((v,i) => v+i); // ['a0','b1','c2']
```

---

## filter()

**Definition:** Returns elements matching condition.

**Advanced Example:** Removing empty values:

```js
['a', '', null, 3].filter(Boolean); // ['a', 3]
```

---

## reduce()

**Definition:** Reduces array to a single output.

**Advanced Example:** Grouping items:

```js
const data = ['a','b','a'];
const grouped = data.reduce((acc, x) => {
  acc[x] = (acc[x]||0) + 1;
  return acc;
}, {});
// { a: 2, b: 1 }
```

---

## flat()

**Definition:** Flattens nested arrays.

**Advanced Example:** Remove all nesting:

```js
const a = [1,[2,[3,[4]]]];
a.flat(Infinity); // [1,2,3,4]
```

---

## flatMap()

**Definition:** map() followed by flat(1).

**Tricky Example:** Split strings & flatten:

```js
['a b','c d'].flatMap(str => str.split(' '));
// ['a','b','c','d']
```

---

## forEach()

**Definition:** Iterates without returning a new array.

**Tricky Example:** Mutation inside loop:

```js
const a = [1,2,3];
a.forEach((v,i) => a[i] = v * 2);
// a = [2,4,6]
```

---

## sort()

**Definition:** Sorts array in place.

**Tricky Example:** Sorting objects:

```js
const users = [{age:30},{age:20}];
users.sort((a,b) => a.age - b.age);
```

---

## reverse()

**Definition:** Reverses array in place.

**Use carefully** when original order matters.

---

## concat()

**Definition:** Combines arrays without mutation.

**Tricky Example:**

```js
[1].concat([2],[3,4]); // [1,2,3,4]
```

---

## fill()

**Definition:** Fills entire or partial array with a value.

**Advanced Example:** Create range:

```js
Array(5).fill(0).map((_,i)=>i+1); // [1,2,3,4,5]
```

---

## entries() / keys() / values()

**Definition:** Returns iterators of array structure.

**Tricky Example:** Iterating entries:

```js
for (const [i,v] of ['x','y'].entries()) console.log(i,v);
// 0 'x'
// 1 'y'
```

---
