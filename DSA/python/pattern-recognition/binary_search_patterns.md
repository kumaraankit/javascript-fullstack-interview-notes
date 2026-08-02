# Binary Search — Pattern Recognition Guide (Python)

## The core mental model

Ask: **"Can I eliminate half the remaining search space with one comparison,
every time?"** That requires some monotonic property — not necessarily
"the array is sorted," but "there's a condition that's `False` for a prefix
and `True` for a suffix (or vice versa)" over the search space.

Binary search is O(log n) because each comparison discards half of what's
left. The classic form searches a sorted array, but the more general and
more interview-relevant form is **binary search on the answer** — searching
over a range of *possible answers*, not array indices at all.

**The giveaway phrases:**
- "sorted array" + "find target" → classic binary search
- "rotated sorted array" → modified classic, still O(log n)
- "minimize the maximum" / "maximize the minimum" / "smallest X such that
  condition holds" → binary search on the answer space
- Anything where brute force is O(n) or O(n log n) per check, but you only
  need to check O(log(range)) candidate answers

---

## Pattern 0 — The template (get this exact, memorize it)

```python
def binary_search(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1

    while l <= r:
        mid = l + (r - l) // 2   # avoids overflow (not a real issue in Python, but do it anyway — it's the convention interviewers expect)
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            l = mid + 1
        else:
            r = mid - 1

    return -1
```
- Time: O(log n)
- Space: O(1) iterative (O(log n) if you write it recursively, due to call stack)

**Trick — the two things people get wrong under pressure:**
1. `l <= r`, not `l < r`, for classic "find exact target" — you need to check
   the case where `l == r` (one element left).
2. `mid = l + (r - l) // 2` instead of `(l + r) // 2` — functionally the same
   in Python since ints don't overflow, but say it the "safe" way anyway;
   it signals you know why the naive version overflows in other languages.

---

## Pattern 1 — Modified classic: search in a rotated sorted array

**Signal:** "rotated sorted array," "search in rotated array," anything where
the array is sorted but was rotated at an unknown pivot — you can't just
compare `nums[mid]` to target directly the normal way.

```python
def search_rotated(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1

    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target:
            return mid

        if nums[l] <= nums[mid]:          # left half is sorted
            if nums[l] <= target < nums[mid]:
                r = mid - 1
            else:
                l = mid + 1
        else:                              # right half is sorted
            if nums[mid] < target <= nums[r]:
                l = mid + 1
            else:
                r = mid - 1

    return -1
```
- Time: O(log n)
- Space: O(1)

**Trick:** at every step, **one of the two halves (left of mid, or right of
mid) is guaranteed to be normally sorted**, even though the whole array isn't.
Figure out which half is sorted first (`nums[l] <= nums[mid]`), then check if
target falls in *that* half's range — if it does, recurse into it; if not,
it must be in the other half. This "identify the sorted half first" move is
the entire trick — everything else is bookkeeping.

---

## Pattern 2 — Binary search on the answer (minimize the max / find smallest valid X)

**Signal:** "minimize the maximum," "find the minimum capacity/speed/days
such that condition holds," "smallest X such that a check(X) function
returns True." This is the pattern that trips people up because there's no
array being searched at all — you're searching over a *range of candidate
answers*.

**Koko Eating Bananas** (canonical example of this pattern):
```python
import math

def min_eating_speed(piles: list[int], h: int) -> int:
    def hours_needed(speed: int) -> int:
        return sum(math.ceil(p / speed) for p in piles)

    l, r = 1, max(piles)   # search space = possible eating speeds, not indices
    res = r

    while l <= r:
        speed = (l + r) // 2
        if hours_needed(speed) <= h:
            res = speed      # this speed works — try to do better (smaller)
            r = speed - 1
        else:
            l = speed + 1    # too slow — need a bigger speed

    return res
```
- Time: O(n log m) — n = number of piles (cost of `hours_needed` per check),
  m = range of possible speeds (`max(piles)`)
- Space: O(1)

**Trick — this is the mental shift that matters:** don't think "am I
searching this array" — think **"is there a `check(x)` function that is
`False` for small x and `True` for large x (or vice versa), with a clean
crossover point?"** If yes, binary search the x-axis of that function, not
any array. `hours_needed(speed)` is monotonically *decreasing* as speed
increases — that monotonicity is what makes binary search valid here at all.
Always be ready to state that monotonic property explicitly; it's the
correctness argument, and interviewers will ask for it if you don't offer it.

**General template for "search on answer":**
```python
def binary_search_on_answer(lo: int, hi: int, check) -> int:
    res = hi  # or -1, or hi+1, depending on problem semantics
    while lo <= hi:
        mid = (lo + hi) // 2
        if check(mid):        # mid is a "good enough" answer
            res = mid
            hi = mid - 1      # try to find an even better (smaller) one
        else:
            lo = mid + 1
    return res
```

---

## Pattern 3 — Find a boundary (first/last occurrence, insertion point)

**Signal:** "find first/last position of target," "find insertion point,"
`bisect_left` / `bisect_right` style problems — you're not looking for *any*
match, you're looking for a specific edge of a range of matches.

```python
def find_first(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1
    res = -1

    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target:
            res = mid
            r = mid - 1        # keep searching left for an earlier occurrence
        elif nums[mid] < target:
            l = mid + 1
        else:
            r = mid - 1

    return res
```
- Time: O(log n)
- Space: O(1)

**Trick:** the difference from classic binary search is one line — on a
match, **don't return immediately**; record it and keep narrowing in the
direction that could yield an earlier (or later, for `find_last`) match.
This is exactly what Python's `bisect.bisect_left` / `bisect_right` do
internally — worth knowing they exist, but be able to write this by hand,
since interviewers often explicitly forbid using `bisect`.

---

## Quick-reference: symptom → tool

| If the problem says or implies...                                    | Reach for...                                    |
|---|---|
| "sorted array, find target"                                          | classic binary search template                  |
| "rotated sorted array"                                                | identify-the-sorted-half variant                |
| "minimize the maximum" / "smallest X such that check(X) holds"        | binary search on the answer space               |
| "first/last occurrence", "insertion point"                            | boundary search — record match, keep narrowing  |
| "search a 2D matrix" (sorted rows and columns)                        | treat as 1D via index math, or binary search rows then columns |

---

## Complexity habits to state out loud in interviews

- Always state the search space size, not just "O(log n)" blindly — for
  binary-search-on-answer problems it's `O(log(range))`, and the range might
  not be `n` at all (e.g. Koko's range is `max(piles)`, not the pile count).
- If your per-check function itself costs O(n) (like `hours_needed` above),
  multiply it in explicitly: `O(n log m)`, not just `O(log m)`.
- For boundary-search variants, explain in one sentence why you don't return
  immediately on a match — this is the detail that separates "knows the
  template" from "understands the template."

---

## How to drill this

1. Check: is there a sorted structure, OR a `check(x)` function that flips
   from False to True (or True to False) monotonically as x increases? If
   either is true, binary search is in play.
2. If it's "search on answer": explicitly define `lo`, `hi` (the *answer*
   range, not array indices) and write `check(mid)` first, standalone, before
   wiring up the search loop.
3. Decide: exact match (return immediately), or boundary (record and keep
   narrowing)? This changes one line but is the most common silent bug.
4. Trace `l <= r` vs `l < r` and your `mid ± 1` updates against a 2-3 element
   example by hand — off-by-one errors here are the #1 source of infinite
   loops and wrong answers in this category.
5. State complexity including the cost of any per-check function, not just
   the log factor.
