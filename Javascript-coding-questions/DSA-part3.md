# JavaScript Basics – 20 Coding Questions
---

## 1. Print Numbers from 1 to N

### Brute Force

```js
function printNumbers(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
}
```

**Time:** O(n) | **Space:** O(1)

### Optimized

Already optimal.

---

## 2. Sum of All Numbers in an Array

### Brute Force

```js
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
```

**Time:** O(n) | **Space:** O(1)

### Optimized

```js
const sumArray = arr => arr.reduce((a, b) => a + b, 0);
```

**Time:** O(n) | **Space:** O(1)

---

## 3. Count Even Numbers in Array

### Brute Force

```js
function countEven(arr) {
  let count = 0;
  for (let num of arr) {
    if (num % 2 === 0) count++;
  }
  return count;
}
```

### Optimized

```js
const countEven = arr => arr.filter(n => n % 2 === 0).length;
```

**Time:** O(n) | **Space:** O(n)

---

## 4. Find Maximum Element

### Brute Force

```js
function maxElement(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
```

### Optimized

```js
const maxElement = arr => Math.max(...arr);
```

---

## 5. Reverse a String

### Brute Force

```js
function reverseString(str) {
  let res = "";
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i];
  }
  return res;
}
```

### Optimized

```js
const reverseString = str => str.split('').reverse().join('');
```

---

## 6. Check Palindrome

### Brute Force

```js
function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}
```

### Optimized

```js
function isPalindrome(str) {
  let l = 0, r = str.length - 1;
  while (l < r) {
    if (str[l] !== str[r]) return false;
    l++; r--;
  }
  return true;
}
```

---

## 7. Convert String to Uppercase (Without Built-in)

### Brute Force

```js
function toUpper(str) {
  let res = "";
  for (let ch of str) {
    const code = ch.charCodeAt(0);
    if (code >= 97 && code <= 122)
      res += String.fromCharCode(code - 32);
    else res += ch;
  }
  return res;
}
```

### Optimized

```js
const toUpper = str => str.toUpperCase();
```

---

## 8. Count Vowels in String

### Brute Force

```js
function countVowels(str) {
  let count = 0;
  for (let ch of str) {
    if ('aeiouAEIOU'.includes(ch)) count++;
  }
  return count;
}
```

### Optimized

```js
const countVowels = str => str.match(/[aeiou]/gi)?.length || 0;
```

---

## 9. Remove Duplicates from Array

### Brute Force

```js
function removeDuplicates(arr) {
  const res = [];
  for (let n of arr) {
    if (!res.includes(n)) res.push(n);
  }
  return res;
}
```

### Optimized

```js
const removeDuplicates = arr => [...new Set(arr)];
```

---

## 10. Find Index of Element

### Brute Force

```js
function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
```

### Optimized

```js
const findIndex = (arr, t) => arr.indexOf(t);
```

---

## 11. Multiply All Elements by 2

### Brute Force

```js
function multiply(arr) {
  const res = [];
  for (let n of arr) res.push(n * 2);
  return res;
}
```

### Optimized

```js
const multiply = arr => arr.map(n => n * 2);
```

---

## 12. Filter Numbers Greater Than X

### Brute Force

```js
function greaterThan(arr, x) {
  const res = [];
  for (let n of arr) if (n > x) res.push(n);
  return res;
}
```

### Optimized

```js
const greaterThan = (arr, x) => arr.filter(n => n > x);
```

---

## 13. Count Occurrences of Character

### Brute Force

```js
function countChar(str, ch) {
  let count = 0;
  for (let c of str) if (c === ch) count++;
  return count;
}
```

### Optimized

```js
const countChar = (s, c) => s.split(c).length - 1;
```

---

## 14. Merge Two Arrays

### Brute Force

```js
function merge(a, b) {
  const res = [];
  for (let x of a) res.push(x);
  for (let y of b) res.push(y);
  return res;
}
```

### Optimized

```js
const merge = (a, b) => [...a, ...b];
```

---

## 15. Check if Array is Empty

### Brute Force

```js
function isEmpty(arr) {
  return arr.length === 0;
}
```

### Optimized

Same as brute force.

---

## 16. Find Length of String (Without length)

### Brute Force

```js
function strLength(str) {
  let count = 0;
  for (let _ of str) count++;
  return count;
}
```

### Optimized

```js
const strLength = str => str.length;
```

---

## 17. Convert Array to String

### Brute Force

```js
function arrayToString(arr) {
  let res = '';
  for (let i = 0; i < arr.length; i++) {
    res += arr[i];
    if (i < arr.length - 1) res += ',';
  }
  return res;
}
```

### Optimized

```js
const arrayToString = arr => arr.join(',');
```

---

## 18. Check if Number Exists in Array

### Brute Force

```js
function exists(arr, x) {
  for (let n of arr) if (n === x) return true;
  return false;
}
```

### Optimized

```js
const exists = (arr, x) => arr.includes(x);
```

---

## 19. Square All Numbers

### Brute Force

```js
function square(arr) {
  const res = [];
  for (let n of arr) res.push(n * n);
  return res;
}
```

### Optimized

```js
const square = arr => arr.map(n => n * n);
```

---

## 20. Find First Character of Each Word

### Brute Force

```js
function firstChars(str) {
  const words = str.split(' ');
  let res = [];
  for (let w of words) res.push(w[0]);
  return res;
}
```

### Optimized

```js
const firstChars = str => str.split(' ').map(w => w[0]);
```

---

