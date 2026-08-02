# Two Pointers — Pattern Recognition Guide (Python)

## The core mental model

Ask: **"Is the array sorted (or can I sort it), and can I eliminate possibilities
from both ends toward the middle instead of checking every pair?"**

Two pointers replaces an O(n²) nested loop (check every pair) with a single
O(n) pass by moving two indices toward each other (or in the same direction)
based on a comparison — never re-scanning ground you've already ruled out.

**The giveaway phrase:** "sorted array" + "pair/triplet that satisfies X" is
almost always two pointers instead of brute force.

---

## Pattern 1 — Opposite ends, converging inward → sorted-array pair problems

**Signal:** "sorted array," "find a pair that sums to X," "container holds
most water," anything where you compare a value from the left and a value
from the right and can safely discard one side.

**Two Sum II (sorted input):**
```python
def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    l, r = 0, len(numbers) - 1
    while l < r:
        total = numbers[l] + numbers[r]
        if total == target:
            return [l + 1, r + 1]  # 1-indexed, per typical problem spec
        elif total < target:
            l += 1   # need a bigger sum -> drop the smaller left value
        else:
            r -= 1   # need a smaller sum -> drop the bigger right value
    return []
```
- Time: O(n) — each pointer moves at most n times total
- Space: O(1)

**Trick to justify out loud:** because the array is sorted, if `total < target`
you know `numbers[l]` paired with *anything smaller than or equal to* `numbers[r]`
still can't reach target faster than moving `l` up — so it's safe to permanently
discard `numbers[l]` rather than re-checking it against every remaining `r`.
That's the O(n²) → O(n) collapse.

**Container With Most Water** (same skeleton, different comparison):
```python
def max_area(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    best = 0
    while l < r:
        h = min(height[l], height[r])
        best = max(best, h * (r - l))
        # move the shorter wall inward — the taller one can never
        # be the bottleneck again at a smaller width
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return best
```
- Time: O(n)
- Space: O(1)

**Trick:** always move the pointer at the **shorter** wall. Moving the taller
one can only shrink the width while keeping the same (or a smaller) limiting
height — strictly worse. This "always move the worse side" logic shows up
across many two-pointer problems, not just this one.

---

## Pattern 2 — Fixed one pointer, slide the other for triplets/quadruplets

**Signal:** "3Sum," "4Sum" — reduce an extra dimension by fixing one index
with a normal loop, then run two-pointer on the rest.

**3Sum:**
```python
def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []

    for i in range(len(nums)):
        if nums[i] > 0:
            break  # smallest remaining value is positive -> no triplet can sum to 0
        if i > 0 and nums[i] == nums[i - 1]:
            continue  # skip duplicate anchors

        l, r = i + 1, len(nums) - 1
        while l < r:
            total = nums[i] + nums[l] + nums[r]
            if total < 0:
                l += 1
            elif total > 0:
                r -= 1
            else:
                res.append([nums[i], nums[l], nums[r]])
                l += 1
                r -= 1
                while l < r and nums[l] == nums[l - 1]:
                    l += 1  # skip duplicates
    return res
```
- Time: O(n²) — O(n) outer loop × O(n) two-pointer inner scan
- Space: O(1) extra (excluding output; sort is O(log n) or O(n) depending on implementation)

**Trick:** sorting first is what *enables* two pointers here — 3Sum looks like
it should need O(n³) (three nested loops), but "fix one index + two-pointer
the rest" is the standard way to shave off a dimension. This pattern extends
directly to 4Sum (fix two indices, two-pointer the remaining pair).

---

## Pattern 3 — Same-direction (fast/slow) pointers → in-place array modification

**Signal:** "remove duplicates in place," "move zeroes," anything that says
"modify the array in place" with O(1) extra space, where you're filtering
or compacting elements while preserving relative order.

**Remove Duplicates from Sorted Array:**
```python
def remove_duplicates(nums: list[int]) -> int:
    if not nums:
        return 0
    slow = 1  # slow = index where the next unique value should go
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow - 1]:
            nums[slow] = nums[fast]
            slow += 1
    return slow
```
- Time: O(n) — single pass, `fast` visits every element once
- Space: O(1) — in place

**Trick:** `slow` always points at the next "write" position; `fast` explores
ahead looking for values worth keeping. This is the go-to skeleton whenever a
problem says "in-place" + "O(1) space" + "preserve order."

---

## Pattern 4 — Palindrome / string validation

**Signal:** "valid palindrome," "reverse in place," anything comparing
characters from both ends of a string.

**Valid Palindrome (ignore non-alphanumeric, case-insensitive):**
```python
def is_palindrome(s: str) -> bool:
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
- Time: O(n) — each pointer scans at most the full string once
- Space: O(1) — no extra string built (vs. `s[::-1]` which is O(n) space)

**Trick:** the inner `while` loops to skip junk characters look like they'd
make this O(n²), but each character is only ever examined once across the
*entire* run — `l` and `r` never move backward. Same amortized-O(n) argument
as pattern 1.

---

## Quick-reference: symptom → tool

| If the problem says or implies...                              | Reach for...                              |
|---|---|
| "sorted array" + "pair that sums to X"                          | opposite-end pointers, converge on comparison |
| "container/area between two lines"                              | opposite-end pointers, move the worse side |
| "3Sum" / "4Sum"                                                  | sort + fix outer index + two-pointer inner |
| "remove duplicates / element in place", "O(1) space"             | fast/slow same-direction pointers          |
| "palindrome check", "reverse in place"                           | opposite-end pointers on the string        |

---

## Complexity habits to state out loud in interviews

- If sorting is required first, call out the O(n log n) sort cost separately
  from the O(n) or O(n²) pointer-scan cost — don't let the final answer hide
  that the sort is often the dominant term for problems like 3Sum.
- For "amortized O(n) despite nested-looking while loops" cases (palindrome
  skip-junk, container-with-water), be ready to justify *why* it's not O(n²):
  each pointer only ever moves forward/inward, so total pointer movement
  across the whole run is bounded by n, not n per outer step.
- State explicitly when you've hit O(1) space — it's usually the entire point
  of choosing two pointers over a hashmap-based alternative.

---

## How to drill this

1. Check: is the input sorted, or does sorting it not break the problem
   (e.g. you only need indices in the answer sometimes, order doesn't matter)?
   If yes, two pointers is very likely in play.
2. Decide: opposite-ends-converging, or same-direction fast/slow? That choice
   alone determines the whole skeleton.
3. Identify the *rule* for moving a pointer — this is the one interviewers
   probe hardest ("why did you move the left pointer there and not the right?").
   Always be able to state the elimination argument, not just "it worked."
4. State complexity, specifically calling out any sort cost separately.
