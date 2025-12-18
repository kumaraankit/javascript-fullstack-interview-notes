# Top 20 JavaScript Coding Questions (Interview Practice)

This document is **SDE-1 / SDE-2 interview oriented**, with **three approaches for each problem**:

* **Brute Force**
* **Optimized**
* **Built-in / Idiomatic JS**

Each problem includes **clear explanation, code, and time & space complexity**.

---

## 1. Reverse a String

### Brute Force

```js
function reverseString(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
```

**Time:** O(n)
**Space:** O(n)

### Optimized (Two Pointers)

```js
function reverseString(str) {
  const arr = str.split('');
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++; right--;
  }
  return arr.join('');
}
```

**Time:** O(n)
**Space:** O(n)

### Built-in

```js
const reverseString = str => str.split('').reverse().join('');
```

**Time:** O(n)
**Space:** O(n)

---

## 2. Check Palindrome

### Brute Force

```js
function isPalindrome(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}
```

**Time:** O(n)
**Space:** O(n)

### Optimized

```js
function isPalindrome(str) {
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++; right--;
  }
  return true;
}
```

**Time:** O(n)
**Space:** O(1)

### Built-in

```js
const isPalindrome = s => s === [...s].reverse().join('');
```

**Time:** O(n)
**Space:** O(n)

---

## 3. Find Maximum Number in Array

### Brute Force

```js
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
```

**Time:** O(n)
**Space:** O(1)

### Optimized

Same as brute force (already optimal).

### Built-in

```js
const findMax = arr => Math.max(...arr);
```

**Time:** O(n)
**Space:** O(n)

---

## 4. Remove Duplicates from Array

### Brute Force

```js
function removeDuplicates(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) result.push(arr[i]);
  }
  return result;
}
```

**Time:** O(n²)
**Space:** O(n)

### Optimized

```js
function removeDuplicates(arr) {
  const seen = new Set();
  const result = [];
  for (let num of arr) {
    if (!seen.has(num)) {
      seen.add(num);
      result.push(num);
    }
  }
  return result;
}
```

**Time:** O(n)
**Space:** O(n)

### Built-in

```js
const removeDuplicates = arr => [...new Set(arr)];
```

**Time:** O(n)
**Space:** O(n)

---

## 5. Find Missing Number (1 to N)

### Brute Force

```js
function findMissing(arr, n) {
  for (let i = 1; i <= n; i++) {
    if (!arr.includes(i)) return i;
  }
}
```

**Time:** O(n²)
**Space:** O(1)

### Optimized

```js
function findMissing(arr, n) {
  const total = (n * (n + 1)) / 2;
  const sum = arr.reduce((a, b) => a + b, 0);
  return total - sum;
}
```

**Time:** O(n)
**Space:** O(1)

### Built-in

Same as optimized using `reduce`.

---

## 6. Count Character Frequency

### Brute Force

```js
function charFrequency(str) {
  const freq = {};
  for (let char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}
```

**Time:** O(n)
**Space:** O(k)

### Optimized

Same as brute force.

### Built-in

```js
const charFrequency = s =>
  [...s].reduce((acc, c) => (acc[c] = (acc[c] || 0) + 1, acc), {});
```

**Time:** O(n)
**Space:** O(k)

---

## 7. Find Second Largest Element

### Brute Force

```js
function secondLargest(arr) {
  const sorted = [...new Set(arr)].sort((a,b)=>b-a);
  return sorted[1];
}
```

**Time:** O(n log n)
**Space:** O(n)

### Optimized

```js
function secondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  for (let num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }
  return second;
}
```

**Time:** O(n)
**Space:** O(1)

### Built-in

```js
const secondLargest = arr => [...new Set(arr)].sort((a,b)=>b-a)[1];
```

---

## 8. Check Anagram

### Brute Force

```js
function isAnagram(a, b) {
  return a.split('').sort().join('') === b.split('').sort().join('');
}
```

**Time:** O(n log n)

### Optimized

```js
function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const map = {};
  for (let c of a) map[c] = (map[c] || 0) + 1;
  for (let c of b) {
    if (!map[c]) return false;
    map[c]--;
  }
  return true;
}
```

**Time:** O(n)

### Built-in

```js
const isAnagram = (a,b) => [...a].sort().join('') === [...b].sort().join('');
```

---

## 9. Flatten Nested Array

### Brute Force (Recursion)

```js
function flatten(arr) {
  let res = [];
  for (let el of arr) {
    if (Array.isArray(el)) res = res.concat(flatten(el));
    else res.push(el);
  }
  return res;
}
```

**Time:** O(n)

### Optimized

Same recursion (already optimal).

### Built-in

```js
const flatten = arr => arr.flat(Infinity);
```

---

## 10. Find First Non-Repeating Character

### Brute Force

```js
function firstUnique(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) return str[i];
  }
}
```

**Time:** O(n²)

### Optimized

```js
function firstUnique(str) {
  const freq = {};
  for (let c of str) freq[c] = (freq[c] || 0) + 1;
  for (let c of str) if (freq[c] === 1) return c;
}
```

**Time:** O(n)

### Built-in

Same using `reduce`.

---