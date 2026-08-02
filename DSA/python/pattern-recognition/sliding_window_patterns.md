# Sliding Window — Pattern Recognition Guide (Python)

## The core mental model

Ask: **"Am I looking for a contiguous subarray/substring that satisfies some
condition, where growing or shrinking it changes whether the condition holds
monotonically?"**

Sliding window replaces recomputing a "window" of the array from scratch for
every starting position (O(n²) or worse) with a single pass where you
**expand the right edge, and shrink the left edge only when needed** — never
re-scanning what the left pointer has already moved past.

**The giveaway phrase:** "contiguous subarray/substring" + "longest / shortest
/ maximum / at most K / exactly K" is almost always sliding window.

**How it differs from two pointers:** two pointers usually converge inward
from opposite ends of a sorted structure. Sliding window pointers both start
at the left and only ever move rightward, maintaining a *running range*, not
converging toward a middle.

---

## Pattern 1 — Fixed-size window → simple accumulator

**Signal:** "subarray of size K," a window length given explicitly in the
problem.

**Max Sum Subarray of Size K:**
```python
def max_sum_fixed_window(nums: list[int], k: int) -> int:
    window_sum = sum(nums[:k])
    best = window_sum

    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]  # add new right, drop old left
        best = max(best, window_sum)

    return best
```
- Time: O(n) — each element added once, removed once
- Space: O(1)

**Trick:** never recompute `sum(nums[i:i+k])` inside the loop — that's what
turns an O(n) sliding window into an accidental O(n*k). Maintain a running
total and adjust by ± one element per step.

---

## Pattern 2 — Variable-size window, shrink while invalid → "longest substring with constraint"

**Signal:** "longest substring without repeating characters," "longest
substring with at most K distinct characters" — window grows until it
breaks a rule, then shrinks from the left until valid again.

**Longest Substring Without Repeating Characters:**
```python
def length_of_longest_substring(s: str) -> int:
    seen = set()
    l = 0
    best = 0

    for r in range(len(s)):
        while s[r] in seen:
            seen.remove(s[l])
            l += 1
        seen.add(s[r])
        best = max(best, r - l + 1)

    return best
```
- Time: O(n) — `l` and `r` each move forward at most n times total, so the
  inner `while` doesn't make this O(n²) despite looking nested
- Space: O(min(n, charset size))

**Trick:** the inner `while` loop is the "shrink" step. It looks like nested
loops = O(n²), but `l` only ever moves forward and never resets — so across
the *entire* run, `l` advances at most n times total. This is the same
amortized-O(n) argument you saw in two-pointers (palindrome skip-junk,
container-with-water).

---

## Pattern 3 — Variable-size window, track a count/frequency map → "at most K distinct" style

**Signal:** "at most K distinct characters," "longest repeating character
replacement," anything needing a frequency map *inside* the window, not just
a set.

**Longest Repeating Character Replacement:**
```python
from collections import defaultdict

def character_replacement(s: str, k: int) -> int:
    count = defaultdict(int)
    l = 0
    max_freq = 0
    best = 0

    for r in range(len(s)):
        count[s[r]] += 1
        max_freq = max(max_freq, count[s[r]])

        # window is invalid if (window length - most frequent char count) > k
        # i.e. we'd need more than k replacements to make it uniform
        while (r - l + 1) - max_freq > k:
            count[s[l]] -= 1
            l += 1

        best = max(best, r - l + 1)

    return best
```
- Time: O(n) — 26-letter alphabet makes the max_freq recompute effectively O(1)
- Space: O(1) — bounded by charset (26 letters), not n

**Trick worth stating in an interview:** `max_freq` is technically never
decremented when the window shrinks, which means it can be stale (too high).
That's *fine* — a stale `max_freq` can only make the window shrink condition
less strict, never invalid, so it can never cause the algorithm to report an
answer that's too large. It just avoids revisiting all counts on every
shrink, which is what keeps this O(n) instead of O(n * 26).

---

## Pattern 4 — Window must satisfy an exact-match condition → two frequency maps

**Signal:** "minimum window substring," "find all anagrams in a string" —
you need the window to contain (or exactly match) another string's character
counts.

**Minimum Window Substring** (skeleton — this is the hardest one, know the shape):
```python
from collections import Counter, defaultdict

def min_window(s: str, t: str) -> str:
    if not t or not s:
        return ""

    need = Counter(t)
    window = defaultdict(int)
    have, need_count = 0, len(need)

    res, res_len = [-1, -1], float("inf")
    l = 0

    for r in range(len(s)):
        c = s[r]
        window[c] += 1
        if c in need and window[c] == need[c]:
            have += 1

        while have == need_count:
            if (r - l + 1) < res_len:
                res = [l, r]
                res_len = r - l + 1
            # shrink from the left
            window[s[l]] -= 1
            if s[l] in need and window[s[l]] < need[s[l]]:
                have -= 1
            l += 1

    l, r = res
    return s[l:r + 1] if res_len != float("inf") else ""
```
- Time: O(n + m) — n = len(s), m = len(t), each character in `s` visited by
  `l` and `r` at most once
- Space: O(m) — for the `need` map (bounded by t's distinct characters)

**Trick:** `have`/`need_count` tracks *how many distinct required characters
currently have enough count in the window* — not the raw count of matched
characters. This is what lets you check "is the window valid" in O(1) instead
of comparing two full frequency maps on every step.

---

## Quick-reference: symptom → tool

| If the problem says or implies...                                   | Reach for...                                  |
|---|---|
| "subarray of size K" (fixed length given)                            | fixed window, running sum/count               |
| "longest substring without repeating chars"                          | variable window + `set`, shrink while invalid |
| "longest substring with at most K distinct / K replacements"         | variable window + frequency `dict` + threshold check |
| "minimum window containing all characters of T" / "find all anagrams"| variable window + two frequency maps, `have`/`need` counters |

---

## Complexity habits to state out loud in interviews

- Always explain why the nested-looking `while` inside a `for` is still O(n)
  overall: the shrink pointer (`l`) only ever moves forward, so its total
  movement across the whole run is bounded by n — it's amortized, not
  per-iteration.
- Distinguish "space bounded by alphabet size" (O(1) for lowercase
  English letters, since 26 is a constant) from "space bounded by input
  size" (O(n) if the character set is unbounded, e.g. arbitrary strings/ints).
- For the two-map problems (min window substring, find anagrams), be ready to
  explain why you track a `have`/`need` counter instead of comparing full
  dictionaries every iteration — that's the difference between O(n) and
  O(n * distinct chars).

---

## How to drill this

1. Check: is this about a *contiguous* range, with "longest / shortest / max
   / min / at most K / exactly K" language? If yes, sliding window is likely.
2. Decide: fixed size (given explicitly) or variable size (grows/shrinks
   based on a validity condition)?
3. If variable: what's the *invalidity condition* that triggers a shrink?
   Write that condition out in plain English before coding the `while`.
4. Decide what state the window needs to track validity in O(1) per step —
   a `set`, a `dict` count, or a `have`/`need` pair — rather than
   recomputing validity by scanning the window each time.
5. State complexity, explicitly justifying the amortized-O(n) shrink loop.
