# Python for DSA — Complete Reference (Basics to Advanced)

Organized so you can jump straight to what you need mid-problem. Read once
top to bottom now; use as lookup later.

---

## 1. Core syntax you must have cold

```python
# Variables — no declaration keyword, dynamically typed
x = 5
x = "now a string"   # totally legal, be careful

# No braces, no semicolons — indentation IS the block
if x > 0:
    print("positive")
elif x == 0:
    print("zero")
else:
    print("negative")

# Ternary (conditional expression)
result = "even" if x % 2 == 0 else "odd"

# Multiple assignment / swap
a, b = 1, 2
a, b = b, a        # swap without a temp variable — use this constantly

# Chained comparison (Python-only convenience)
if 0 < x < 10:
    pass
```

**Gotcha:** `and`/`or`/`not` are the keywords, not `&&`/`||`/`!`. Using
`&`/`|` on booleans works but is bitwise — different operator precedence,
can silently produce wrong results. Use `and`/`or` for boolean logic.

---

## 2. Numbers & integer gotchas

```python
7 // 2      # 3   — floor division
-7 // 2     # -4  — floors toward NEGATIVE infinity, NOT toward zero!
7 % 2       # 1
-7 % 2      # 1   — Python's % always returns non-negative for positive divisor
int(-7 / 2) # -3  — truncates toward zero (use this if you need C-style truncation)

2 ** 10     # 1024 — power operator
float('inf'), float('-inf')  # for initializing max/min sentinels

import math
math.ceil(7 / 2)     # 4
math.floor(-7 / 2)   # -4
math.gcd(12, 18)     # 6
math.isqrt(50)       # 7 — integer sqrt, no float rounding issues
```

**Critical gotcha for problems like Evaluate RPN / Divide Two Integers:**
Python integers are **arbitrary precision** — no overflow, ever. If a
problem says "assume 32-bit signed integer overflow," you must manually
clamp: `max(-2**31, min(2**31 - 1, result))`. Don't forget this — it's a
common silent bug when porting a Python solution to match problem
constraints written for Java/C++.

---

## 3. Strings

```python
s = "hello world"

s[0]            # 'h'
s[-1]           # 'd' — negative indexing from the end
s[2:5]          # 'llo' — slice, end-exclusive
s[::-1]         # reversed string — extremely common trick
s[::2]          # every other character

s.lower(), s.upper()
s.strip()               # remove leading/trailing whitespace
s.split()               # split on whitespace -> list
s.split(",")             # split on a specific delimiter
"-".join(["a", "b", "c"])  # 'a-b-c' — join is a STRING method, called on the separator

s.replace("world", "there")
s.find("world")          # index or -1 if not found
s.index("world")         # index or raises ValueError if not found

ch.isalpha(), ch.isdigit(), ch.isalnum(), ch.isspace(), ch.isupper()
ord('a')                 # 97 — char to int
chr(97)                  # 'a' — int to char
```

**Critical gotcha: strings are immutable.** `s[0] = 'H'` raises a
`TypeError`. To build/modify a string, either:
```python
s = list(s)          # convert to list of chars, mutate, then:
s = ''.join(s)        # convert back
# OR build with a list and join once at the end (never do s += ch in a loop
# for large inputs — that's O(n) per concat, O(n^2) total)
```

---

## 4. Lists (dynamic arrays)

```python
arr = [1, 2, 3]

arr.append(4)          # O(1) amortized
arr.pop()               # O(1) — removes & returns LAST element
arr.pop(0)               # O(n) — removes FIRST element, shifts everything (avoid in loops!)
arr.insert(0, 99)        # O(n) — also shifts everything
arr.remove(2)             # O(n) — removes FIRST occurrence BY VALUE, not index
arr.extend([5, 6])        # append multiple, in place
arr.reverse()              # in place, O(n)
arr.sort()                  # in place, O(n log n), Timsort
arr.sort(reverse=True)
arr.sort(key=lambda x: x)   # custom key

sorted(arr)                  # returns NEW list, doesn't mutate original
new = arr[:]                 # shallow copy (also arr.copy(), or list(arr))
arr2d = [[0] * cols for _ in range(rows)]   # correct way to make a 2D grid
# NEVER do [[0] * cols] * rows — all rows are the SAME list object (see gotcha below)

len(arr)
arr[1:3]        # slice, end-exclusive
arr[:3]         # first 3
arr[3:]         # from index 3 to end
arr[::-1]       # reversed copy

max(arr), min(arr), sum(arr)
arr.index(3)     # first index of value 3, raises ValueError if absent
3 in arr          # O(n) membership check — for O(1), use a set instead
```

**Gotcha — the #1 silent bug in matrix/grid problems:**
```python
grid = [[0] * 3] * 3      # WRONG — 3 references to the SAME inner list
grid[0][0] = 1              # this changes grid[1][0] and grid[2][0] too!

grid = [[0] * 3 for _ in range(3)]   # CORRECT — 3 independent lists
```

**Gotcha — mutable default arguments:**
```python
def f(x, acc=[]):     # WRONG — acc is created ONCE, shared across ALL calls
    acc.append(x)
    return acc

def f(x, acc=None):    # CORRECT
    if acc is None:
        acc = []
    acc.append(x)
    return acc
```

---

## 5. Dictionaries (hashmaps)

```python
d = {"a": 1, "b": 2}

d["c"] = 3                # insert/update, O(1) average
d.get("z")                 # None if missing (no KeyError)
d.get("z", 0)                # default value if missing — huge for counting
d["z"]                        # raises KeyError if missing — use .get() unless certain

"a" in d                       # O(1) key existence check
del d["a"]                      # remove key
d.pop("a")                        # remove AND return value; d.pop("a", None) is safe

for k in d: ...                    # iterates keys
for k, v in d.items(): ...          # iterates key-value pairs — use this most often
for v in d.values(): ...

d.keys(), d.values(), d.items()      # view objects, not lists (but iterable/sliceable-ish)

# Building a frequency map manually:
count = {}
for ch in s:
    count[ch] = count.get(ch, 0) + 1
```

**Dict ordering:** since Python 3.7, dicts preserve insertion order
(guaranteed, not incidental). This matters for problems needing deterministic
iteration order.

**Gotcha:** dict keys must be hashable — lists can't be keys (unhashable),
but tuples can. This is exactly why "signature" keys (Group Anagrams) use
`tuple(count)`, not a list.

---

## 6. Sets

```python
s = {1, 2, 3}
s = set()               # empty set — {} alone creates an empty DICT, not a set!

s.add(4)
s.remove(4)               # KeyError if absent
s.discard(4)                # no error if absent — safer for "remove if present"
4 in s                        # O(1) average

a, b = {1,2,3}, {2,3,4}
a | b       # union {1,2,3,4}
a & b        # intersection {2,3}
a - b         # difference {1}
a ^ b          # symmetric difference {1,4}
```

**Gotcha:** `{}` is an empty dict, not an empty set. Use `set()` explicitly.

---

## 7. Tuples

```python
t = (1, 2, 3)     # immutable — hashable, usable as dict keys / set elements
a, b, c = t         # unpacking

# Common DSA use: storing coordinate pairs, or multi-value dict keys
visited = set()
visited.add((row, col))
if (row, col) in visited: ...
```

---

## 8. Comprehensions (use these constantly — cleaner and often faster than manual loops)

```python
squares = [x*x for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]
pairs = [(x, y) for x in range(3) for y in range(3)]   # nested loops, x is outer

# Dict comprehension
freq = {ch: s.count(ch) for ch in set(s)}    # (note: .count() here is O(n) each — fine for small demos, use Counter for real work)

# Set comprehension
uniq_lens = {len(w) for w in words}

# Generator expression (lazy, memory-efficient — use inside sum()/max()/any()/all())
total = sum(x*x for x in range(1000000))   # doesn't build the full list in memory
```

---

## 9. Essential built-in functions

```python
enumerate(arr)                # yields (index, value) pairs — use instead of range(len(arr))
enumerate(arr, start=1)        # start index from 1

zip(arr1, arr2)                  # pairs elements from multiple iterables together
list(zip([1,2,3], ['a','b','c']))  # [(1,'a'), (2,'b'), (3,'c')]

sorted(arr)                        # new sorted list
sorted(arr, reverse=True)
sorted(arr, key=lambda x: x[1])      # sort by second element of each tuple
sorted(words, key=len)                 # sort by length
sorted(strs, key=lambda s: (-len(s), s))  # multi-key: longest first, then alphabetical

map(func, arr)                    # apply func to every element (lazy — wrap in list())
filter(func, arr)                   # keep elements where func returns True (lazy)
list(map(str, [1,2,3]))               # ['1','2','3']
list(filter(lambda x: x > 0, arr))      # keep positives

any(condition for x in arr)         # True if ANY element satisfies condition
all(condition for x in arr)          # True if ALL elements satisfy condition

abs(x), round(x, 2), pow(x, y), divmod(a, b)  # divmod returns (a//b, a%b)
```

**`enumerate` is the #1 replacement for C-style indexing** — if you catch
yourself writing `for i in range(len(arr)): x = arr[i]`, switch to
`for i, x in enumerate(arr):`.

---

## 10. `collections` module (use these — they're expected knowledge)

```python
from collections import Counter, defaultdict, deque, OrderedDict

# Counter — frequency map with extra powers
c = Counter([1,1,2,3,3,3])
c.most_common(2)          # [(3, 3), (1, 2)] — top-2 most frequent, (value, count)
c[5]                        # 0, NOT a KeyError, even if 5 was never added — huge advantage over dict
c1 - c2                       # subtract counts (keeps only positive results)

# defaultdict — auto-initializes missing keys, avoids .get() boilerplate
d = defaultdict(list)          # missing key -> new empty list automatically
d["x"].append(1)                 # no need to check "if x in d" first
d = defaultdict(int)               # missing key -> 0
d["y"] += 1                          # just works

# deque — double-ended queue, O(1) append/pop from BOTH ends (list is O(n) from the front!)
dq = deque([1,2,3])
dq.append(4)          # add to right
dq.appendleft(0)         # add to left — O(1), unlike list.insert(0, x) which is O(n)
dq.pop()                   # remove from right
dq.popleft()                 # remove from left — THIS is why deque is the go-to for BFS queues
```

**Gotcha:** never use a plain `list` as a BFS queue with `.pop(0)` — that's
O(n) per dequeue, making your "O(n)" BFS secretly O(n²). Always use
`collections.deque` for queue behavior.

---

## 11. `heapq` — priority queue / min-heap

```python
import heapq

heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 1)
heapq.heappush(heap, 3)
heapq.heappop(heap)          # 1 — always pops the SMALLEST

heapq.heapify(arr)              # convert existing list into a heap in place, O(n)

# Python only has a MIN-heap. For a max-heap, negate values on push/pop:
heapq.heappush(heap, -val)
biggest = -heapq.heappop(heap)

# Pushing tuples: heap compares element-by-element, first element is the priority
heapq.heappush(heap, (priority, item))

# k-largest / k-smallest without a full sort:
heapq.nlargest(k, arr)       # O(n log k)
heapq.nsmallest(k, arr)
```

**Gotcha:** if you push tuples where the first elements can tie, Python
compares the *second* element next — if that's an uncomparable type (like a
custom object without `__lt__`), you'll get a `TypeError`. Fix: push
`(priority, unique_tiebreaker, item)` using an incrementing counter or index
as the tiebreaker.

---

## 12. `bisect` — binary search helpers (know these exist; also know how to write binary search by hand, since interviewers often ban `bisect`)

```python
import bisect

arr = [1, 3, 3, 5, 7]
bisect.bisect_left(arr, 3)     # 1 — leftmost insertion point for 3
bisect.bisect_right(arr, 3)      # 3 — rightmost insertion point for 3
bisect.insort(arr, 4)              # insert 4 keeping arr sorted, O(n) due to shifting
```

---

## 13. Functions, `*args`/`**kwargs`, lambdas

```python
def f(a, b=10, *args, **kwargs):
    # a: required positional
    # b: optional, default 10
    # args: tuple of extra positional args
    # kwargs: dict of extra keyword args
    pass

square = lambda x: x * x            # anonymous inline function
sorted(pairs, key=lambda p: p[1])     # most common lambda use in DSA: custom sort key

# Recursion — set this explicitly for problems with deep recursion (default limit ~1000)
import sys
sys.setrecursionlimit(10000)
```

---

## 14. Memoization / caching

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
```

**Gotcha:** `@lru_cache` requires all arguments to be **hashable** — you
can't decorate a function that takes a `list` argument directly (lists
aren't hashable). Convert to `tuple` first, or write manual dict-based
memoization if the state includes mutable structures.

**Manual memoization (more control, works with any state representation):**
```python
def solve(l, r, memo={}):
    if (l, r) in memo:
        return memo[(l, r)]
    # ... compute result ...
    memo[(l, r)] = result
    return result
```

---

## 15. Classes — the ones you'll define yourself constantly

**Linked list node:**
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

**Binary tree node:**
```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

**Graph node (when not just using adjacency list/dict):**
```python
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
```

**Custom comparison for sorting custom objects (needed if you ever push
objects into a heap):**
```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __lt__(self, other):
        return (self.x**2 + self.y**2) < (other.x**2 + other.y**2)
```

---

## 16. Copying — shallow vs deep (silent bug source in matrix/backtracking problems)

```python
import copy

a = [[1,2],[3,4]]
b = a                    # SAME object — mutating b mutates a
b = a[:]                   # shallow copy — new OUTER list, but inner lists still shared!
b = a.copy()                 # same as above, still shallow
b = copy.deepcopy(a)           # fully independent copy, safe for nested mutation

# For 2D grids specifically:
b = [row[:] for row in a]        # idiomatic, fast shallow-per-row copy — usually all you need
```

**When this bites you:** backtracking problems where you build a path/grid,
append a *reference* to your result list, then keep mutating the original —
every entry in your result ends up pointing to the same final (wrong) state.
Fix: append a copy (`path[:]` or `list(path)`), not the live object.

---

## 17. Common patterns you'll type from muscle memory

```python
# Swap without temp
a, b = b, a

# Initialize with sentinel values for min/max tracking
best = float('-inf')     # for max-tracking
best = float('inf')       # for min-tracking

# 2D grid traversal directions
directions = [(0,1), (0,-1), (1,0), (-1,0)]   # right, left, down, up
for dr, dc in directions:
    nr, nc = row + dr, col + dc
    if 0 <= nr < rows and 0 <= nc < cols:
        ...

# Building result strings efficiently (don't += in a loop)
parts = []
for x in items:
    parts.append(str(x))
result = ''.join(parts)

# Early exit patterns
if not arr:
    return []
```

---

## 18. Complexity cheat sheet for built-in operations (memorize this table)

| Operation                          | Complexity        |
|---|---|
| `list.append(x)` / `list.pop()`     | O(1) amortized     |
| `list.pop(0)` / `list.insert(0, x)`  | O(n)               |
| `x in list`                           | O(n)               |
| `x in set` / `x in dict`               | O(1) average       |
| `dict[key]` get/set                     | O(1) average       |
| `list.sort()` / `sorted()`               | O(n log n)         |
| `heapq.heappush` / `heappop`               | O(log n)           |
| `deque.append` / `appendleft` / `pop` / `popleft` | O(1)       |
| String concatenation `s += ch` in a loop     | O(n) per op, O(n²) total — avoid |
| `''.join(list_of_strs)`                        | O(total length)    |

---

## How to use this during practice

1. If you're ever unsure whether an operation is O(1) or O(n), check Section
   18 before you write it — this is where accidental O(n²) solutions sneak
   in (`list.pop(0)` in a loop is the most common offender).
2. Default to `collections.Counter`/`defaultdict` over manual `dict` +
   `.get()` boilerplate — it's faster to write and signals fluency.
3. Default to `deque` the instant you're doing BFS or need queue behavior —
   never a plain list.
4. Before submitting, scan for: mutable default args, `[[0]*n]*m` grid
   bug, shallow-copy-when-you-needed-deep-copy in backtracking, and
   `-7 // 2` type sign gotchas if the problem involves negative numbers.
