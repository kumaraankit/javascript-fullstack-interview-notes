# Python Reference — Arrays & Hashing, Two Pointers, Sliding Window, Stack

The exact syntax moves that should be automatic for these four categories,
so your hands type them before you've finished thinking through the logic.
Each section: reflex triggers, the exact code shape, the non-obvious lines
that cause silent bugs, and a "90% rule" to speed-run when you're stuck.

---
---

# PART 1 — Arrays & Hashing

## 1. The "existence/lookup" reflex

Every time you think **"have I seen this?"** or **"do I need O(1) lookup?"**:

```python
seen = set()
seen.add(x)
if x in seen: ...
```

Not `if x in list` — that's O(n) and defeats the entire point.

## 2. The "count things" reflex

Every time you think **"how many times does X appear?"**:

```python
from collections import Counter
count = Counter(arr)          # instant frequency map
count[x]                        # 0 if missing, never a KeyError
count.most_common(k)              # top-k frequent, sorted, done for you
```

Manual version (when you need custom per-element logic):

```python
count = {}
for x in arr:
    count[x] = count.get(x, 0) + 1
```

## 3. The "complement lookup" reflex (Two Sum family)

Every time you think **"pair that sums/matches to something"**:

```python
seen = {}                        # value -> index
for i, n in enumerate(arr):
    complement = target - n
    if complement in seen:
        return [seen[complement], i]
    seen[n] = i
```

**Order matters** — check before you add, every single time. #1 line-order
bug in this category.

## 4. The "group by signature" reflex (Group Anagrams family)

Every time you think **"bucket things that share some derived property"**:

```python
from collections import defaultdict
groups = defaultdict(list)
for item in items:
    key = derive_signature(item)   # e.g. tuple(sorted(item)), or tuple of counts
    groups[key].append(item)
return list(groups.values())
```

- `tuple(sorted(s))` — simple, O(k log k) per item
- `tuple(count_array)` — faster O(k), use when strings are long

## 5. The "iterate with index" reflex

Instead of `for i in range(len(arr))`, write:

```python
for i, val in enumerate(arr):
```

## 6. The "prefix/suffix pass" reflex (Product Except Self family)

Every time you think **"aggregate everything except position i"**:

```python
n = len(nums)
res = [1] * n

running = 1
for i in range(n):
    res[i] = running
    running *= nums[i]

running = 1
for i in range(n - 1, -1, -1):   # reversed range — memorize this exact form
    res[i] *= running
    running *= nums[i]
```

## 7. Set algebra (Longest Consecutive Sequence, intersections, etc.)

```python
a, b = set(x), set(y)
a & b        # intersection
a | b         # union
a - b          # difference
```

"Longest run" trick:
```python
num_set = set(nums)
for n in num_set:
    if n - 1 not in num_set:      # only expand from the START of a run
        length = 1
        while n + length in num_set:
            length += 1
```

## 8. Sorting with a custom key

```python
sorted(arr, key=lambda x: x[1])              # sort by 2nd element of each tuple
sorted(words, key=len)                          # sort by length
sorted(strs, key=lambda s: (-len(s), s))          # multi-key: longest first, alpha tiebreak
```

## 9. Tuple-as-dict-key

Lists can't be dict keys or set members (unhashable), tuples can:

```python
key = tuple(count_array)     # works
key = count_array             # fails — TypeError: unhashable type
```

## Arrays & Hashing — 90% rule

1. Need O(1) existence checks? → `set`
2. Need frequency counts? → `Counter` / `defaultdict(int)`
3. Looking for a complement/pair? → `dict` value→index, check-then-add
4. Grouping by a derived property? → `defaultdict(list)` + tuple key
5. Aggregating "everything except me"? → prefix pass + suffix pass
6. Sorting by something non-default? → `sorted(..., key=lambda ...)`

---
---

# PART 2 — Two Pointers

## 1. The base skeleton (opposite ends converging)

The instant you think **"sorted array, find a pair"**:

```python
l, r = 0, len(arr) - 1
while l < r:
    if condition_needs_bigger:
        l += 1
    else:
        r -= 1
```

`while l < r`, not `l <= r` — need two distinct indices.

## 2. The "always move the worse side" reflex (Container With Water family)

```python
if height[l] < height[r]:
    l += 1
else:
    r -= 1
```

Move the pointer at the smaller/weaker side — recognize this shape as a unit.

## 3. Same-direction fast/slow reflex (in-place compaction)

The instant you think **"modify array in place, O(1) space, preserve order"**:

```python
slow = 0
for fast in range(len(arr)):
    if keep_condition(arr[fast]):
        arr[slow] = arr[fast]
        slow += 1
return slow    # often the new length
```

`slow` = next write position, `fast` = scanner.

## 4. Fix-one-index-then-two-pointer (3Sum/4Sum family)

```python
nums.sort()                      # ALWAYS sort first
for i in range(len(nums)):
    if i > 0 and nums[i] == nums[i-1]:
        continue                   # skip duplicate anchors
    l, r = i + 1, len(nums) - 1
    while l < r:
        total = nums[i] + nums[l] + nums[r]
        if total < target:
            l += 1
        elif total > target:
            r -= 1
        else:
            # record answer
            l += 1
            r -= 1
            while l < r and nums[l] == nums[l-1]:
                l += 1               # skip duplicate results
```

Bake the duplicate-skip lines into the skeleton itself — easy to forget
under pressure.

## 5. Palindrome-style skip-junk reflex

```python
l, r = 0, len(s) - 1
while l < r:
    while l < r and not s[l].isalnum():
        l += 1
    while l < r and not s[r].isalnum():
        r -= 1
    if s[l].lower() != s[r].lower():
        return False
    l += 1
    r -= 1
return True
```

Nested `while` inside `while` still O(n) overall — each pointer only moves
forward/inward across the whole run.

## Two Pointers — 90% rule

1. Is the array sorted (or sortable without breaking the answer)? → two
   pointers likely in play.
2. Opposite-ends-converging, or same-direction fast/slow? → pick skeleton
   #1 or #3 first.
3. Reducing a 3Sum/4Sum-style problem by a dimension? → sort + fix outer
   index(es) + two-pointer the rest (#4).
4. Whenever you move a pointer: can you state in one sentence why it's
   safe to discard what you're skipping? If not, the logic is probably wrong.

---
---

# PART 3 — Sliding Window

## 1. Fixed-size window reflex

The instant you think **"subarray of size K"**:

```python
window_sum = sum(arr[:k])
best = window_sum
for i in range(k, len(arr)):
    window_sum += arr[i] - arr[i - k]     # add new right, drop old left
    best = max(best, window_sum)
```

Never recompute `sum(arr[i:i+k])` inside the loop — silently turns O(n)
into O(n*k).

## 2. Variable-size window with a `set` reflex (no-repeat family)

The instant you think **"longest substring without repeating X"**:

```python
seen = set()
l = 0
best = 0
for r in range(len(s)):
    while s[r] in seen:
        seen.remove(s[l])
        l += 1
    seen.add(s[r])
    best = max(best, r - l + 1)
```

`r - l + 1` = window length — write this expression on reflex.

## 3. Variable-size window with a frequency `dict` reflex

The instant you think **"at most K distinct"** or **"K replacements
allowed"**:

```python
from collections import defaultdict
count = defaultdict(int)
l = 0
best = 0
for r in range(len(s)):
    count[s[r]] += 1
    while window_is_invalid(count, r, l):
        count[s[l]] -= 1
        if count[s[l]] == 0:
            del count[s[l]]         # keep dict clean if checking len(count)
        l += 1
    best = max(best, r - l + 1)
```

## 4. Two-map exact-match reflex (Minimum Window Substring family)

The instant you think **"window must contain all of T"**:

```python
from collections import Counter, defaultdict
need = Counter(t)
window = defaultdict(int)
have, need_count = 0, len(need)
l = 0
res, res_len = [-1, -1], float('inf')

for r in range(len(s)):
    c = s[r]
    window[c] += 1
    if c in need and window[c] == need[c]:
        have += 1
    while have == need_count:
        if (r - l + 1) < res_len:
            res, res_len = [l, r], r - l + 1
        window[s[l]] -= 1
        if s[l] in need and window[s[l]] < need[s[l]]:
            have -= 1
        l += 1
```

`have`/`need_count` avoids comparing two full dicts every iteration.

## Sliding Window — 90% rule

1. Window size given explicitly? → fixed window, running accumulator (#1).
2. Otherwise: state the invalidity condition that triggers a shrink, in
   plain English, before coding the `while`.
3. Validity = "have I seen this char"? → `set` (#2). Validity = counts/
   thresholds? → frequency `dict` (#3). Validity = exact match vs another
   string? → two maps + `have`/`need` (#4).
4. Can you state why the shrink-`while` isn't O(n²)? (Left pointer only
   moves forward, bounded by n total.) If not, re-check the condition.

---
---

# PART 4 — Stack

A stack is just a Python `list` — `.append()` to push, `.pop()` to pop,
both O(1) at the end. No special class needed.

## 1. Matching/balancing reflex (Valid Parentheses family)

The instant you think **"nested pairs must close in reverse order"**:

```python
stack = []
pairs = {')': '(', ']': '[', '}': '{'}
for ch in s:
    if ch in pairs:
        if not stack or stack[-1] != pairs[ch]:
            return False
        stack.pop()
    else:
        stack.append(ch)
return not stack        # leftover opens = invalid
```

Check every time: empty-stack-on-close, and leftover-stack-at-end.

## 2. Aux-value-per-entry reflex (Min Stack family)

The instant you think **"O(1) getMin/getMax alongside a stack"**:

```python
stack = []   # store (value, running_min) tuples
def push(val):
    cur_min = val if not stack else min(val, stack[-1][1])
    stack.append((val, cur_min))
def get_min():
    return stack[-1][1]
```

Store the aggregate alongside each entry — a global variable breaks the
moment you pop past it.

## 3. Expression evaluation reflex (RPN family)

```python
stack = []
for tok in tokens:
    if tok in ('+', '-', '*', '/'):
        b = stack.pop()     # right operand — popped FIRST
        a = stack.pop()     # left operand — popped SECOND
        stack.append(apply(a, tok, b))
    else:
        stack.append(int(tok))
return stack[-1]
```

Second pop is the left-hand operand — say it out loud every time.

## 4. Monotonic stack reflex (Next Greater / Daily Temperatures family)

The instant you think **"for each element, how far until a bigger/smaller
one appears"**:

```python
res = [0] * len(arr)
stack = []          # holds INDICES, kept in monotonic order
for i, val in enumerate(arr):
    while stack and arr[stack[-1]] < val:
        prev_i = stack.pop()
        res[prev_i] = i - prev_i
    stack.append(i)
```

Store indices, not values. Say out loud: "each index pushed once, popped
at most once — O(n) despite the nested-looking while."

## 5. Boundary-extension reflex (Largest Rectangle in Histogram)

```python
stack = []   # (start_index, height) pairs, increasing height order
max_area = 0
for i, h in enumerate(heights):
    start = i
    while stack and stack[-1][1] > h:
        idx, height = stack.pop()
        max_area = max(max_area, height * (i - idx))
        start = idx           # extend backward through merged bars
    stack.append((start, h))
for idx, h in stack:
    max_area = max(max_area, h * (len(heights) - idx))
```

`start = idx` lets a popped bar's rectangle retroactively extend left
through everything already merged at that position.

## Stack — 90% rule

1. Does resolving element X depend on "the most recent unresolved thing
   before it"? → stack, generally.
2. Matching/nesting? → push-open, pop-and-check-on-close (#1).
3. Need O(1) running aggregate as you push/pop? → store alongside each
   entry (#2).
4. Evaluating an expression? → operand/operator stack, watch pop order (#3).
5. "Next greater/smaller" or "how far until X"? → monotonic stack of
   indices (#4).
6. `while` inside a `for` with a stack: can each element only ever be
   pushed once and popped once? If yes, it's O(n) — say so explicitly.

---
---

# Cross-cutting idea (all four categories)

The same justification reappears everywhere in this reference:

> **"Can each element only ever be processed a bounded number of times?"**

- Sliding window: the shrink pointer only moves forward → amortized O(n).
- Two pointers: both pointers only converge, never backtrack → O(n).
- Stack (monotonic): each index is pushed once, popped at most once → O(n).

If you can state this justification confidently for whichever pattern
you're using, you'll handle the "why isn't this O(n²)?" follow-up that
comes with nearly every one of these problems.
