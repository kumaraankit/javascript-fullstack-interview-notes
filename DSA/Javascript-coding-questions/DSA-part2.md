# JavaScript Coding Questions 11–20 (Interview Deep Dive)

This document expands **Questions 11–20** with **Brute Force, Optimized, and Built-in / Idiomatic JS approaches**, including **time and space complexity**.

These questions are **very common in SDE-2 / Backend JavaScript & Node.js interviews**.

---

## 01. Two Sum

**Problem:** Given an array and a target, return indices of two numbers that add up to target.

### Brute Force

```js
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
}
```

**Time:** O(n²)
**Space:** O(1)

### Optimized (Hash Map)

```js
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
}
```

**Time:** O(n)
**Space:** O(n)

### Built-in

Same as optimized using `Map`.

---

## 02. Move Zeroes to End

### Brute Force

```js
function moveZeroes(arr) {
  const result = [];
  let zeros = 0;
  for (let num of arr) {
    if (num === 0) zeros++;
    else result.push(num);
  }
  while (zeros--) result.push(0);
  return result;
}
```

**Time:** O(n)
**Space:** O(n)

### Optimized (Two Pointers)

```js
function moveZeroes(arr) {
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) arr[index++] = arr[i];
  }
  while (index < arr.length) arr[index++] = 0;
}
```

**Time:** O(n)
**Space:** O(1)

### Built-in

```js
const moveZeroes = arr => arr.filter(n => n !== 0).concat(arr.filter(n => n === 0));
```

**Time:** O(n)
**Space:** O(n)

---

## 03. Rotate Array (K times)

### Brute Force

```js
function rotate(arr, k) {
  k %= arr.length;
  for (let i = 0; i < k; i++) {
    arr.unshift(arr.pop());
  }
}
```

**Time:** O(n·k)
**Space:** O(1)

### Optimized (Reverse Method)

```js
function rotate(arr, k) {
  k %= arr.length;
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
}
function reverse(arr, l, r) {
  while (l < r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++; r--;
  }
}
```

**Time:** O(n)
**Space:** O(1)

### Built-in

```js
const rotate = (arr, k) => arr.splice(0, 0, ...arr.splice(-k));
```

---

## 04. Intersection of Two Arrays

### Brute Force

```js
function intersection(a, b) {
  const res = [];
  for (let x of a) {
    if (b.includes(x) && !res.includes(x)) res.push(x);
  }
  return res;
}
```

**Time:** O(n²)

### Optimized

```js
function intersection(a, b) {
  const set = new Set(a);
  return [...new Set(b.filter(x => set.has(x)))];
}
```

**Time:** O(n)

### Built-in

Same using `Set`.

---

## 05. Debounce Function

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

**Use case:** Search input, resize events

**Time:** O(1) per call
**Space:** O(1)

---

## 06. Throttle Function

```js
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

**Use case:** Scroll, button clicks

---

## 07. Deep Clone Object

### Brute Force (JSON)

```js
const deepClone = obj => JSON.parse(JSON.stringify(obj));
```

**Limitation:** Loses functions, dates

### Optimized

```js
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  const copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    copy[key] = deepClone(obj[key]);
  }
  return copy;
}
```

**Time:** O(n)

---

## 08. Group By Property

```js
function groupBy(arr, key) {
  return arr.reduce((acc, obj) => {
    const k = obj[key];
    acc[k] = acc[k] || [];
    acc[k].push(obj);
    return acc;
  }, {});
}
```

---

## 09. Promise.all Polyfill

```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(res => {
          results[i] = res;
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
};
```

---

## 10. Event Emitter Implementation

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    (this.events[event] ||= []).push(listener);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }
  off(event, listener) {
    this.events[event] = (this.events[event] || []).filter(l => l !== listener);
  }
}
```

---