# Arrays & Hashing in JavaScript – Detailed DSA Interview Guide

This document is a **deep, interview‑oriented reference** for **Arrays & Hashing in JavaScript**.  
It is written so that **you can revise everything from one place** before DSA interviews at **product companies**.

It focuses on:
- WHY a concept exists
- HOW it is used in problems
- WHEN to apply it
- JavaScript‑specific behavior interviewers expect you to know

---

## 1. Arrays in JavaScript

### What is an Array?
An array is an **ordered, index‑based data structure** that stores elements contiguously in memory (conceptually).  
In JavaScript, arrays are **dynamic and heterogeneous**, meaning they can grow/shrink and store mixed types.

```js
const arr = [1, "a", true, { x: 1 }];
```

### Why arrays are critical in DSA
- Constant‑time index access **O(1)**
- Foundation for most patterns (two pointers, sliding window, prefix sums)
- Used to simulate stacks, queues, heaps, matrices

### When arrays are used
- Sequential data
- Subarrays / substrings
- Window‑based problems
- Index‑based lookups

---

## 2. Ways to Create Arrays (Interview Important)

### 1️⃣ Literal Syntax (Most Common)
```js
const arr = [1, 2, 3];
```

✔ Preferred in interviews  
✔ Clear intent  
✔ No surprises

---

### 2️⃣ Array Constructor (Be Careful)
```js
const arr = new Array(3);
```

This creates an array with **empty slots**, not `[0,0,0]`.

❌ Common interview pitfall:
```js
new Array(3).map(() => 0); // does nothing
```

✔ Correct approach:
```js
Array.from({ length: 3 }, () => 0);
```

---

### 3️⃣ Array.from()
```js
Array.from("abc"); // ['a','b','c']
```

Used to:
- Convert iterable → array
- Create arrays of fixed length safely

---

## 3. Array Operations & Time Complexity

| Operation | Example | Time |
|---------|--------|------|
| Access | arr[i] | O(1) |
| Push | arr.push(x) | O(1) |
| Pop | arr.pop() | O(1) |
| Shift | arr.shift() | O(n) |
| Unshift | arr.unshift(x) | O(n) |
| Insert middle | splice | O(n) |
| Search | includes | O(n) |

📌 **Interview Insight**  
Shifting/unshifting is expensive → avoid in loops.

---

## 4. Iterating Over Arrays

### Classic `for` loop (Most Control)
```js
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 5) break;
}
```

✔ Use when:
- You need index
- You need break/continue

---

### `for...of` (Clean & Safe)
```js
for (const val of arr) {
  console.log(val);
}
```

✔ Best balance of readability & control

---

### `forEach` (Limited)
```js
arr.forEach(v => console.log(v));
```

❌ Cannot break or return  
❌ Avoid in DSA interviews

---

## 5. Hashing – Core Concept

### What is Hashing?
Hashing maps **keys → values** using a hash function to achieve **O(1) average lookup time**.

### Why hashing is powerful
- Eliminates nested loops
- Converts O(n²) → O(n)
- Essential for frequency & existence checks

### When to think hashing
If a problem asks:
- “Exists?”
- “Count?”
- “Unique?”
- “Duplicate?”

➡️ **Think hashing immediately**

---

## 6. Hashing in JavaScript

JavaScript provides **three main tools**:
1. Object
2. Map
3. Set

---

## 7. Object as Hash Map

```js
const freq = {};
freq["a"] = 1;
freq["b"] = 2;
```

### Pros
- Simple syntax
- Fast access

### Cons (Interview Critical)
- Keys are strings only
- Prototype pollution risk
- No guaranteed order

⚠️ Because of these, **Map is preferred** in interviews.

---

## 8. Map – The Preferred Hash Structure

```js
const map = new Map();
map.set("a", 1);
map.set(1, "number key");
```

### Why Map is better
- Any data type as key
- Maintains insertion order
- Safe & predictable
- Cleaner iteration

### Common operations
```js
map.get(key);
map.has(key);
map.delete(key);
```

All **O(1)** average time.

---

## 9. Iterating Over Hash Maps

### Object
```js
for (const key in freq) {
  console.log(key, freq[key]);
}
```

### Map
```js
for (const [key, value] of map) {
  console.log(key, value);
}
```

📌 Interview Tip:  
Prefer `Map` for clean `[key, value]` iteration.

---

## 10. Set – Handling Uniqueness

### What is a Set?
A Set stores **only unique values**.

```js
const set = new Set();
set.add(1);
set.add(1); // ignored
```

### When to use Set
- Detect duplicates
- Remove duplicates
- Fast membership check

### Example: Contains Duplicate
```js
const seen = new Set();
for (const n of nums) {
  if (seen.has(n)) return true;
  seen.add(n);
}
return false;
```

---

## 11. Frequency Counting Pattern (VERY IMPORTANT)

Used in:
- Anagrams
- Sliding window
- Counting problems

```js
const freq = new Map();
for (const ch of str) {
  freq.set(ch, (freq.get(ch) || 0) + 1);
}
```

📌 Interview Expectation  
You should write this **from memory**.

---

## 12. Sorting with Arrays (JS Pitfall)

```js
nums.sort((a, b) => a - b);
```

❌ Default behavior:
```js
[10, 2].sort(); // [10, 2]
```

Why?  
JS sorts **strings by default**, not numbers.

---

## 13. Common DSA Patterns Using Arrays & Hashing

| Problem | Technique |
|------|----------|
| Contains Duplicate | Set |
| Two Sum | Map |
| Valid Anagram | Frequency Map |
| Sliding Window | Array + Map |
| Prefix Sum | Array + Hash |

---

## 14. Choosing the Right Structure

| Scenario | Use |
|-------|-----|
| Ordered access | Array |
| Fast lookup | Set |
| Key → value | Map |
| Counting | Map |

---

## 15. Time & Space Complexity Summary

| Structure | Lookup | Insert |
|--------|--------|--------|
| Array | O(n) | O(1)/O(n) |
| Object | O(1) | O(1) |
| Map | O(1) | O(1) |
| Set | O(1) | O(1) |

---

## 16. Interview Pitfalls (JS‑Specific)

❌ Using Object when Map is safer  
❌ Forgetting numeric sort comparator  
❌ Using forEach when break is needed  
❌ Using includes instead of Set  
❌ Modifying array while iterating incorrectly

---

## 17. Interviewer Mindset (IMPORTANT)

Interviewers want to see:
- Correct data structure choice
- Complexity improvement using hashing
- Clean loops
- Awareness of JS pitfalls

They care **more about your reasoning than syntax**.

---

## Final Takeaway

Arrays & Hashing are the **foundation of DSA**.  
If you master these concepts deeply in JavaScript, you can confidently solve **70–80% of easy & medium interview problems**.

This topic alone can make or break **product company interviews**.
