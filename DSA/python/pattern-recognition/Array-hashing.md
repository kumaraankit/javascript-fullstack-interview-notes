# Arrays & Hashing — Pattern Recognition Guide (Python)

## The core mental model

Before anything else, ask: **"What am I looking up repeatedly?"**
If the answer is "whether something exists" or "how many times something occurred" or
"what's the complement/pair of this value" — you need a hash structure
(`set`, `dict`, `collections.Counter`, `collections.defaultdict`).

A brute force here is almost always O(n²) — nested loop comparing every pair.
A hashmap trick almost always drops it to O(n) time, O(n) space.
**That trade (space for time) is the single biggest idea in this entire category.**

---

## Pattern 1 — "Have I seen this before?" → `set`

**Signal:** duplicate detection, existence checks, "does X exist in the array."

```python
def contains_duplicate(nums: list[int]) -> bool:
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False
```
- Time: O(n) — one pass, O(1) average lookup/insert into a set
- Space: O(n) — worst case store all n elements

**Even faster one-liner (same complexity, less control):**
```python
return len(nums) != len(set(nums))
```

---

## Pattern 2 — "Complement lookup" → `dict` mapping value → index/count

**Signal:** "find two numbers that sum to X," "find a pair/pattern where one value
determines what you're looking for."

**Two Sum:**
```python
def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}  # value -> index
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []
```
- Time: O(n) — single pass
- Space: O(n)

**Key trick:** build the map *as you go*, not upfront. If you fill the whole map
first then loop again, you risk matching an element with itself, and it's an
unnecessary second pass. Check-then-add, in that order.

---

## Pattern 3 — Frequency counting → `Counter` / `defaultdict(int)`

**Signal:** anagrams, "same characters/elements with same frequency," majority
element, "group things that share a property."

**Valid Anagram:**
```python
from collections import Counter

def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    return Counter(s) == Counter(t)
```
- Time: O(n)
- Space: O(1) technically (bounded by 26 letters) or O(n) generally

**Group Anagrams** (frequency signature as dict key):
```python
from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups = defaultdict(list)
    for s in strs:
        # count-based key avoids sort's O(k log k) per string
        count = [0] * 26
        for ch in s:
            count[ord(ch) - ord('a')] += 1
        groups[tuple(count)].append(s)
    return list(groups.values())
```
- Time: O(n * k) where k = avg string length (vs O(n * k log k) if you sort each string as the key)
- Space: O(n * k)

**Trick:** when you need a hashable "signature" for a group, a `tuple` of counts
beats `sorted(s)` when strings are long, because sorting costs `k log k` per
string — counting is `O(k)`.

---

## Pattern 4 — Prefix / Suffix aggregation → precomputed arrays

**Signal:** "product/sum of everything except this index," "running total,"
"range query," explicitly forbidden from using division.

**Product of Array Except Self:**
```python
def product_except_self(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n

    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]

    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]

    return res
```
- Time: O(n) — two passes
- Space: O(1) extra (output array doesn't count)

**Trick:** whenever a problem says "without division" and involves an aggregate
over "everything except me," think **two passes: left-to-right accumulator,
then right-to-left accumulator**, combining into the output array.

---

## Pattern 5 — Bucket sort for "Top K frequent" → avoid O(n log n)

**Signal:** "top K frequent elements," when a heap gives O(n log k) but you can
actually do better since frequency is bounded by n.

```python
def top_k_frequent(nums: list[int], k: int) -> list[int]:
    count = {}
    freq = [[] for _ in range(len(nums) + 1)]  # index = frequency

    for n in nums:
        count[n] = count.get(n, 0) + 1
    for n, c in count.items():
        freq[c].append(n)

    res = []
    for i in range(len(freq) - 1, 0, -1):
        for n in freq[i]:
            res.append(n)
            if len(res) == k:
                return res
    return res
```
- Time: O(n) — true linear, beats the heap approach's O(n log k)
- Space: O(n)

**Trick:** frequency can never exceed `n` (array length), so you can use
frequency itself as a bucket index instead of sorting — this is the "cheat"
that turns an O(n log n) sorting problem into O(n).

---

## Pattern 6 — "Growing a sequence from its start" → set, check predecessors

**Signal:** "longest consecutive sequence," anything where you need O(n) but a
sort would cost O(n log n).

```python
def longest_consecutive(nums: list[int]) -> int:
    num_set = set(nums)
    longest = 0

    for n in num_set:
        # only start counting if n is the START of a sequence
        if n - 1 not in num_set:
            length = 1
            while n + length in num_set:
                length += 1
            longest = max(longest, length)

    return longest
```
- Time: O(n) — looks like O(n²) but each number is only ever visited as part
  of one sequence's inner while loop, across the whole run
- Space: O(n)

**Trick:** the `if n - 1 not in num_set` guard is what keeps this O(n) instead
of O(n²) — it ensures you only ever walk a sequence forward from its true
start, once.

---

## Quick-reference: symptom → tool

| If the problem says or implies...                          | Reach for...                          |
|---|---|
| "duplicate", "does X exist"                                 | `set`                                 |
| "two elements that sum/relate to X"                         | `dict` (value → index), check-then-add |
| "anagram", "same frequency", "group by property"            | `Counter` / `defaultdict` + signature key |
| "except self", "running total", "no division allowed"       | prefix + suffix arrays                |
| "top K frequent", frequency bounded by n                    | bucket sort by frequency              |
| "consecutive sequence", "longest run"                       | set + only-expand-from-start trick    |
| "substring/subarray with constraint" (different category, but adjacent) | sliding window + hashmap |

---

## Complexity habits to state out loud in interviews

- Always state **both** time and space, and justify space separately (e.g.
  "O(n) auxiliary space for the hashmap, O(1) if we don't count the output array").
- If you replace a sort (`O(n log n)`) with a hashmap or bucket approach
  (`O(n)`), **say so explicitly** — that's the exact kind of trade interviewers
  are listening for.
- Watch for "space O(1) if the character set is bounded" (e.g. lowercase
  English letters → 26 is a constant, not `n`) — this is a common
  clarification interviewers expect you to raise unprompted.

---

## How to drill this

1. Read the problem statement once. Before touching code, say out loud which
   row of the table above it maps to.
2. Write the hashmap/set skeleton first (the "what am I storing" decision),
   then fill in the loop logic.
3. After solving, always state complexity — force yourself to justify it in
   one sentence, not just name it.
4. If you're stuck for >5 min, don't peek at the solution — ask "what am I
   looking up repeatedly?" again. It's almost always the unlock.
