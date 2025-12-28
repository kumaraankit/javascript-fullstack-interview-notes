# JavaScript Medium-Level Coding Problems (Interview Oriented)

## 1. Find All Pairs with Given Sum

### Brute Force

```js
function pairSum(arr, target) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) res.push([arr[i], arr[j]]);
    }
  }
  return res;
}
```

**Time:** O(n²) | **Space:** O(1)

### Optimized (Hash Set)

```js
function pairSum(arr, target) {
  const seen = new Set();
  const res = [];
  for (let n of arr) {
    if (seen.has(target - n)) res.push([n, target - n]);
    seen.add(n);
  }
  return res;
}
```

**Time:** O(n) | **Space:** O(n)

---

## 2. Longest Word in a Sentence

### Brute Force

```js
function longestWord(str) {
  const words = str.split(' ');
  let longest = '';
  for (let w of words) if (w.length > longest.length) longest = w;
  return longest;
}
```

### Optimized

Same as brute force (already optimal).

---

## 3. Check if Array is Sorted

### Brute Force

```js
function isSorted(arr) {
  const sorted = [...arr].sort((a,b)=>a-b);
  return arr.every((v,i)=>v===sorted[i]);
}
```

**Time:** O(n log n)

### Optimized

```js
function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i-1]) return false;
  }
  return true;
}
```

**Time:** O(n)

---

## 4. First Repeating Element

### Brute Force

```js
function firstRepeat(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return arr[i];
    }
  }
}
```

### Optimized

```js
function firstRepeat(arr) {
  const seen = new Set();
  for (let n of arr) {
    if (seen.has(n)) return n;
    seen.add(n);
  }
}
```

---

## 5. Longest Substring Without Repeating Characters

### Brute Force

```js
function longestUnique(s) {
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    let set = new Set();
    for (let j = i; j < s.length; j++) {
      if (set.has(s[j])) break;
      set.add(s[j]);
      max = Math.max(max, j - i + 1);
    }
  }
  return max;
}
```

**Time:** O(n²)

### Optimized (Sliding Window)

```js
function longestUnique(s) {
  let set = new Set(), l = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    while (set.has(s[r])) set.delete(s[l++]);
    set.add(s[r]);
    max = Math.max(max, r - l + 1);
  }
  return max;
}
```

**Time:** O(n)

---

## 6. Count Frequency of Elements

### Brute Force

```js
function frequency(arr) {
  const freq = {};
  for (let n of arr) freq[n] = (freq[n] || 0) + 1;
  return freq;
}
```

### Optimized

Same as brute force (hashing).

---

## 7. Remove Falsy Values

### Brute Force

```js
function removeFalsy(arr) {
  const res = [];
  for (let v of arr) if (v) res.push(v);
  return res;
}
```

### Optimized

```js
const removeFalsy = arr => arr.filter(Boolean);
```

---

## 8. Flatten One-Level Array

### Brute Force

```js
function flatten(arr) {
  let res = [];
  for (let el of arr) {
    if (Array.isArray(el)) res.push(...el);
    else res.push(el);
  }
  return res;
}
```

### Optimized

```js
const flatten = arr => arr.flat();
```

---

## 9. Capitalize First Letter of Each Word

### Brute Force

```js
function capitalize(str) {
  let words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
}
```

### Optimized

```js
const capitalize = s => s.split(' ').map(w => w[0].toUpperCase()+w.slice(1)).join(' ');
```

---

## 10. Find Missing Numbers in Range

### Brute Force

```js
function missing(arr, n) {
  const res = [];
  for (let i = 1; i <= n; i++) if (!arr.includes(i)) res.push(i);
  return res;
}
```

**Time:** O(n²)

### Optimized

```js
function missing(arr, n) {
  const set = new Set(arr);
  const res = [];
  for (let i = 1; i <= n; i++) if (!set.has(i)) res.push(i);
  return res;
}
```

**Time:** O(n)

---

## 11. Chunk Array

```js
function chunk(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}
```

---

## 12. Count Words in String

```js
const countWords = s => s.trim().split(/\s+/).length;
```

---

## 13. Find Intersection of Two Arrays

```js
function intersection(a, b) {
  const set = new Set(a);
  return [...new Set(b.filter(x => set.has(x)))];
}
```

---

## 14. Rotate String

```js
function rotateString(s, k) {
  k %= s.length;
  return s.slice(-k) + s.slice(0, -k);
}
```

---

## 15. Memoization Function

```js
function memoize(fn) {
  const cache = {};
  return function (n) {
    if (cache[n]) return cache[n];
    return cache[n] = fn(n);
  };
}
```

---

## 16. Once Function

```js
function once(fn) {
  let called = false;
  return function (...args) {
    if (!called) {
      called = true;
      return fn(...args);
    }
  };
}
```

---

## 17. Find Majority Element

```js
function majority(arr) {
  let count = 0, candidate;
  for (let n of arr) {
    if (count === 0) candidate = n;
    count += (n === candidate) ? 1 : -1;
  }
  return candidate;
}
```

---

## 18. Validate Parentheses

```js
function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  for (let ch of s) {
    if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    } else stack.push(ch);
  }
  return stack.length === 0;
}
```

---

## 19. Find Peak Element

```js
function peak(arr) {
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] > arr[i-1] && arr[i] > arr[i+1]) return arr[i];
  }
}
```

---

## 20. Convert Array of Objects to Object

```js
function toObject(arr, key) {
  return arr.reduce((acc, obj) => {
    acc[obj[key]] = obj;
    return acc;
  }, {});
}
```

---



