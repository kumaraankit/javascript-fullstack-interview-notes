# Blind 75 — Full Solutions (Part 1 of ~5: Array)

Each problem includes: problem summary, brute force (where meaningfully
different), optimal solution, inline comments, and time/space complexity
for both. Building this in parts to keep every solution correct and
well-explained — Two Pointers/Sliding Window/Stack/Binary Search/Linked
List/Trees/Heap/Graph/DP/Interval/Matrix/String categories follow in
subsequent parts.

---

## 1. Two Sum

**Problem:** Given an array of integers and a target, return indices of the
two numbers that add up to target.

**Brute force — check every pair:**
```python
def two_sum_brute(nums: list[int], target: int) -> list[int]:
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
```
- Time: O(n²) — nested loop over all pairs
- Space: O(1)

**Optimal — hashmap complement lookup:**
```python
def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}  # maps value -> index we've already visited
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            # found a pair: the earlier index (seen[complement]) and current index i
            return [seen[complement], i]
        seen[n] = i  # record this value's index for future lookups
    return []
```
- Time: O(n) — single pass, O(1) average dict lookup
- Space: O(n) — dict can hold up to n entries

---

## 2. Best Time to Buy and Sell Stock

**Problem:** Given daily prices, find the max profit from one buy + one sell
(buy must happen before sell).

**Brute force — check every buy/sell pair:**
```python
def max_profit_brute(prices: list[int]) -> int:
    best = 0
    for i in range(len(prices)):
        for j in range(i + 1, len(prices)):
            best = max(best, prices[j] - prices[i])
    return best
```
- Time: O(n²)
- Space: O(1)

**Optimal — track running minimum:**
```python
def max_profit(prices: list[int]) -> int:
    min_price = float('inf')  # lowest price seen so far
    best = 0
    for price in prices:
        min_price = min(min_price, price)      # update the best day to have bought
        best = max(best, price - min_price)     # profit if we sold today
    return best
```
- Time: O(n) — single pass
- Space: O(1)

---

## 3. Contains Duplicate

**Problem:** Return True if any value appears at least twice.

**Brute force — sort then check neighbors:**
```python
def contains_duplicate_brute(nums: list[int]) -> bool:
    nums = sorted(nums)         # duplicates become adjacent after sorting
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            return True
    return False
```
- Time: O(n log n) — dominated by the sort
- Space: O(1) extra (ignoring sort's internal space) or O(n) depending on sort implementation

**Optimal — set membership:**
```python
def contains_duplicate(nums: list[int]) -> bool:
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False
```
- Time: O(n)
- Space: O(n)

---

## 4. Product of Array Except Self

**Problem:** Return an array where each element is the product of all other
elements, without using division, in O(n).

**Brute force — for each index, multiply everything else:**
```python
def product_except_self_brute(nums: list[int]) -> list[int]:
    n = len(nums)
    res = []
    for i in range(n):
        product = 1
        for j in range(n):
            if i != j:
                product *= nums[j]
        res.append(product)
    return res
```
- Time: O(n²)
- Space: O(1) extra (excluding output)

**Optimal — prefix and suffix product passes:**
```python
def product_except_self(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n

    prefix = 1
    for i in range(n):
        res[i] = prefix          # everything to the LEFT of i, multiplied
        prefix *= nums[i]

    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix          # multiply in everything to the RIGHT of i
        suffix *= nums[i]

    return res
```
- Time: O(n) — two passes
- Space: O(1) extra (output array not counted)

---

## 5. Maximum Subarray

**Problem:** Find the contiguous subarray with the largest sum.

**Brute force — check every subarray:**
```python
def max_subarray_brute(nums: list[int]) -> int:
    best = float('-inf')
    for i in range(len(nums)):
        cur_sum = 0
        for j in range(i, len(nums)):
            cur_sum += nums[j]
            best = max(best, cur_sum)
    return best
```
- Time: O(n²)
- Space: O(1)

**Optimal — Kadane's algorithm:**
```python
def max_subarray(nums: list[int]) -> int:
    best = nums[0]
    cur = 0
    for n in nums:
        # if the running sum goes negative, it can only hurt future sums —
        # better to restart the subarray from the current element
        if cur < 0:
            cur = 0
        cur += n
        best = max(best, cur)
    return best
```
- Time: O(n) — single pass
- Space: O(1)

---

## 6. Maximum Product Subarray

**Problem:** Find the contiguous subarray with the largest product.

**Brute force — check every subarray:**
```python
def max_product_brute(nums: list[int]) -> int:
    best = float('-inf')
    for i in range(len(nums)):
        cur_product = 1
        for j in range(i, len(nums)):
            cur_product *= nums[j]
            best = max(best, cur_product)
    return best
```
- Time: O(n²)
- Space: O(1)

**Optimal — track running max AND min (negatives flip them):**
```python
def max_product(nums: list[int]) -> int:
    res = max(nums)
    cur_max, cur_min = 1, 1   # track both because a negative number can
                                 # turn the smallest product into the largest

    for n in nums:
        if n == 0:
            cur_max, cur_min = 1, 1   # reset — a zero breaks any subarray product
            continue
        temp = cur_max * n
        cur_max = max(n, temp, cur_min * n)
        cur_min = min(n, temp, cur_min * n)
        res = max(res, cur_max)

    return res
```
- Time: O(n)
- Space: O(1)

**Why track a running min too:** unlike sum, product can flip sign. A large
negative running product can become the maximum if multiplied by another
negative number — so you must track the running *minimum* (most negative)
alongside the max, since the min is what a future negative multiplier could
turn into the new max.

---

## 7. Find Minimum in Rotated Sorted Array

**Problem:** A sorted array was rotated at an unknown pivot. Find the
minimum element in O(log n).

**Brute force — linear scan:**
```python
def find_min_brute(nums: list[int]) -> int:
    return min(nums)
```
- Time: O(n)
- Space: O(1)

**Optimal — binary search on the rotation point:**
```python
def find_min(nums: list[int]) -> int:
    l, r = 0, len(nums) - 1
    while l < r:
        mid = (l + r) // 2
        # if mid's value is greater than the rightmost value, the minimum
        # must be somewhere to the RIGHT of mid (rotation point is ahead)
        if nums[mid] > nums[r]:
            l = mid + 1
        else:
            # otherwise mid could BE the minimum, or it's to the left — keep mid in range
            r = mid
    return nums[l]
```
- Time: O(log n)
- Space: O(1)

---

## 8. Search in Rotated Sorted Array

**Problem:** Search for target in a rotated sorted array in O(log n).

**Brute force — linear scan:**
```python
def search_brute(nums: list[int], target: int) -> int:
    for i, n in enumerate(nums):
        if n == target:
            return i
    return -1
```
- Time: O(n)
- Space: O(1)

**Optimal — modified binary search, identify which half is sorted:**
```python
def search(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target:
            return mid

        if nums[l] <= nums[mid]:            # left half [l..mid] is normally sorted
            if nums[l] <= target < nums[mid]:
                r = mid - 1                    # target is inside the sorted left half
            else:
                l = mid + 1                     # target must be in the right half
        else:                                    # right half [mid..r] is normally sorted
            if nums[mid] < target <= nums[r]:
                l = mid + 1                        # target is inside the sorted right half
            else:
                r = mid - 1                         # target must be in the left half
    return -1
```
- Time: O(log n)
- Space: O(1)

---

## 9. 3Sum

**Problem:** Find all unique triplets that sum to zero.

**Brute force — check every triplet:**
```python
def three_sum_brute(nums: list[int]) -> list[list[int]]:
    n = len(nums)
    res = set()   # use a set of sorted tuples to dedupe
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if nums[i] + nums[j] + nums[k] == 0:
                    res.add(tuple(sorted([nums[i], nums[j], nums[k]])))
    return [list(t) for t in res]
```
- Time: O(n³)
- Space: O(n) for the result set

**Optimal — sort + two pointers per anchor:**
```python
def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []

    for i in range(len(nums)):
        if nums[i] > 0:
            break          # smallest remaining value is positive -> no triplet can sum to 0
        if i > 0 and nums[i] == nums[i - 1]:
            continue         # skip duplicate anchors to avoid duplicate triplets

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
                    l += 1     # skip duplicate left values to avoid duplicate triplets

    return res
```
- Time: O(n²) — O(n log n) sort + O(n) outer loop × O(n) inner two-pointer scan
- Space: O(1) extra (excluding output and sort space)

---

## 10. Container With Most Water

**Problem:** Given heights, find two lines that, with the x-axis, form a
container holding the most water.

**Brute force — check every pair of lines:**
```python
def max_area_brute(height: list[int]) -> int:
    best = 0
    for i in range(len(height)):
        for j in range(i + 1, len(height)):
            best = max(best, min(height[i], height[j]) * (j - i))
    return best
```
- Time: O(n²)
- Space: O(1)

**Optimal — two pointers, always move the shorter wall:**
```python
def max_area(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    best = 0
    while l < r:
        h = min(height[l], height[r])
        best = max(best, h * (r - l))
        # moving the SHORTER wall inward is the only move that could improve
        # the result — moving the taller one can only shrink width while
        # keeping the same (or worse) limiting height
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return best
```
- Time: O(n) — each pointer moves at most n times total
- Space: O(1)

---

## Array category — summary table

| # | Problem | Brute Force | Optimal |
|---|---|---|---|
| 1 | Two Sum | O(n²) | O(n) time, O(n) space |
| 2 | Best Time to Buy/Sell Stock | O(n²) | O(n) time, O(1) space |
| 3 | Contains Duplicate | O(n log n) | O(n) time, O(n) space |
| 4 | Product of Array Except Self | O(n²) | O(n) time, O(1) extra space |
| 5 | Maximum Subarray | O(n²) | O(n) time, O(1) space |
| 6 | Maximum Product Subarray | O(n²) | O(n) time, O(1) space |
| 7 | Find Minimum in Rotated Sorted Array | O(n) | O(log n) time, O(1) space |
| 8 | Search in Rotated Sorted Array | O(n) | O(log n) time, O(1) space |
| 9 | 3Sum | O(n³) | O(n²) time, O(1) extra space |
| 10 | Container With Most Water | O(n²) | O(n) time, O(1) space |

---


