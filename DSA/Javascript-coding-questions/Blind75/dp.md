# Blind 75 — Full Solutions (Part 5 of ~6: Dynamic Programming)

---

## 44. Climbing Stairs

**Problem:** Count distinct ways to climb n stairs, taking 1 or 2 steps at
a time.

**Brute force — recursion without memoization:**
```python
def climb_stairs_brute(n: int) -> int:
    if n <= 2:
        return n
    return climb_stairs_brute(n - 1) + climb_stairs_brute(n - 2)
```
- Time: O(2^n) — recomputes the same subproblems exponentially many times
- Space: O(n) recursion stack

**Optimal — bottom-up DP (this is just Fibonacci):**
```python
def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    prev2, prev1 = 1, 2       # ways to reach step 1, ways to reach step 2
    for _ in range(3, n + 1):
        prev2, prev1 = prev1, prev1 + prev2   # ways(i) = ways(i-1) + ways(i-2)
    return prev1
```
- Time: O(n)
- Space: O(1) — only track the last two values, no array needed

---

## 45. Coin Change

**Problem:** Given coin denominations and a target amount, find the fewest
coins needed (or -1 if impossible).

**Brute force — try every coin at every amount recursively (no memo):**
```python
def coin_change_brute(coins: list[int], amount: int) -> int:
    def dfs(remaining):
        if remaining == 0:
            return 0
        if remaining < 0:
            return float('inf')
        best = float('inf')
        for coin in coins:
            best = min(best, 1 + dfs(remaining - coin))
        return best

    result = dfs(amount)
    return result if result != float('inf') else -1
```
- Time: O(coins^amount) — exponential, recomputes same subproblems repeatedly
- Space: O(amount) recursion depth

**Optimal — bottom-up DP array:**
```python
def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0    # base case: 0 coins needed to make amount 0

    for a in range(1, amount + 1):
        for coin in coins:
            if a - coin >= 0:
                dp[a] = min(dp[a], 1 + dp[a - coin])

    return dp[amount] if dp[amount] != float('inf') else -1
```
- Time: O(amount * len(coins))
- Space: O(amount)

---

## 46. Longest Increasing Subsequence

**Problem:** Find the length of the longest strictly increasing subsequence.

**Brute force — try every subsequence (via recursion, no memo):**
```python
def length_of_lis_brute(nums: list[int]) -> int:
    def dfs(i, prev):
        if i == len(nums):
            return 0
        # option 1: skip nums[i]
        result = dfs(i + 1, prev)
        # option 2: take nums[i], if it extends the increasing sequence
        if prev == -1 or nums[i] > nums[prev]:
            result = max(result, 1 + dfs(i + 1, i))
        return result

    return dfs(0, -1)
```
- Time: O(2^n) — exponential branching (take/skip each element)
- Space: O(n) recursion depth

**Optimal — O(n²) DP:**
```python
def length_of_lis(nums: list[int]) -> int:
    dp = [1] * len(nums)   # dp[i] = length of longest increasing subsequence ENDING at i

    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)
```
- Time: O(n²)
- Space: O(n)

**Further optimal — O(n log n) with binary search (patience sorting):**
```python
import bisect

def length_of_lis_fast(nums: list[int]) -> int:
    tails = []   # tails[i] = smallest possible tail value for an increasing
                    # subsequence of length i+1 (NOT necessarily the real subsequence)
    for n in nums:
        pos = bisect.bisect_left(tails, n)
        if pos == len(tails):
            tails.append(n)     # n extends the longest subsequence so far
        else:
            tails[pos] = n         # n can replace an existing tail with a smaller value,
                                       # keeping future extensions easier
    return len(tails)
```
- Time: O(n log n) — binary search per element
- Space: O(n)

**Trick:** `tails` isn't a real subsequence — it's a greedy "best possible
tail value for each length." Keeping tails as small as possible at every
length maximizes future extension opportunities, which is why binary search
(`bisect_left`) correctly finds where to update.

---

## 47. Longest Common Subsequence

**Problem:** Find the length of the longest subsequence common to two
strings.

**Brute force — recursive branching, no memo:**
```python
def lcs_brute(text1: str, text2: str) -> int:
    def dfs(i, j):
        if i == len(text1) or j == len(text2):
            return 0
        if text1[i] == text2[j]:
            return 1 + dfs(i + 1, j + 1)
        return max(dfs(i + 1, j), dfs(i, j + 1))
    return dfs(0, 0)
```
- Time: O(2^(m+n)) — exponential
- Space: O(m+n) recursion depth

**Optimal — 2D bottom-up DP:**
```python
def lcs(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]   # dp[i][j] = LCS of text1[:i] and text2[:j]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]     # characters match -> extend diagonal
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])   # take the better of skipping either char

    return dp[m][n]
```
- Time: O(m * n)
- Space: O(m * n) — can be optimized to O(min(m,n)) with rolling rows, but
  the 2D table is clearer for interview explanation

---

## 48. Word Break

**Problem:** Given a string and a word dictionary, determine if the string
can be segmented into dictionary words.

**Brute force — recursive branching, no memo:**
```python
def word_break_brute(s: str, word_dict: list[str]) -> bool:
    word_set = set(word_dict)

    def dfs(i):
        if i == len(s):
            return True
        for j in range(i + 1, len(s) + 1):
            if s[i:j] in word_set and dfs(j):
                return True
        return False

    return dfs(0)
```
- Time: O(2^n) worst case — exponential re-exploration of the same suffixes
- Space: O(n) recursion depth

**Optimal — bottom-up DP:**
```python
def word_break(s: str, word_dict: list[str]) -> bool:
    word_set = set(word_dict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[n] = True   # empty suffix is trivially "breakable"

    for i in range(n - 1, -1, -1):
        for j in range(i + 1, n + 1):
            if s[i:j] in word_set and dp[j]:
                dp[i] = True
                break

    return dp[0]
```
- Time: O(n² ) time for the DP loops, times O(n) for slicing = O(n³) worst
  case in practice (slicing costs O(n)); can be reduced with more careful
  indexing, but O(n²) * O(k) where k = avg word check cost is the standard
  way to state it
- Space: O(n)

---

## 49. Combination Sum IV

**Problem:** Count the number of combinations (order matters) that sum to
target, using given numbers (repetition allowed).

**Brute force — recursive branching, no memo:**
```python
def combination_sum4_brute(nums: list[int], target: int) -> int:
    def dfs(remaining):
        if remaining == 0:
            return 1
        if remaining < 0:
            return 0
        return sum(dfs(remaining - n) for n in nums)
    return dfs(target)
```
- Time: O(target^len(nums)) roughly — exponential branching
- Space: O(target) recursion depth

**Optimal — bottom-up DP:**
```python
def combination_sum4(nums: list[int], target: int) -> int:
    dp = [0] * (target + 1)
    dp[0] = 1   # one way to make 0: use nothing

    for t in range(1, target + 1):
        for n in nums:
            if t - n >= 0:
                dp[t] += dp[t - n]     # add ways to make (t - n), then append n

    return dp[target]
```
- Time: O(target * len(nums))
- Space: O(target)

**Trick — why this counts ORDER as distinct (permutations, not
combinations, despite the name):** the outer loop is over `t` (amount),
inner loop over `nums` — this ordering means `[1,2]` and `[2,1]` are
counted separately, because at each amount you try every number as a
possible "last step." (If you wanted true combinations where order doesn't
matter, you'd swap the loop order — outer over `nums`, inner over `t`.)

---

## 50. House Robber

**Problem:** Rob houses in a row to maximize loot, without robbing two
adjacent houses.

**Brute force — recursive branching, no memo:**
```python
def rob_brute(nums: list[int]) -> int:
    def dfs(i):
        if i >= len(nums):
            return 0
        return max(dfs(i + 1), nums[i] + dfs(i + 2))   # skip house i, or rob it
    return dfs(0)
```
- Time: O(2^n)
- Space: O(n) recursion depth

**Optimal — bottom-up DP, O(1) space:**
```python
def rob(nums: list[int]) -> int:
    rob1, rob2 = 0, 0   # rob1 = best up to i-2, rob2 = best up to i-1
    for n in nums:
        new_rob = max(rob1 + n, rob2)   # either rob current + best-before-previous, or skip current
        rob1 = rob2
        rob2 = new_rob
    return rob2
```
- Time: O(n)
- Space: O(1)

---

## 51. House Robber II

**Problem:** Same as House Robber, but houses are arranged in a circle
(first and last are adjacent).

**Optimal — run House Robber twice, excluding first or last house:**
```python
def rob2(nums: list[int]) -> int:
    if len(nums) == 1:
        return nums[0]

    def rob_line(houses):
        rob1, rob2 = 0, 0
        for n in houses:
            new_rob = max(rob1 + n, rob2)
            rob1 = rob2
            rob2 = new_rob
        return rob2

    # since first and last can't BOTH be robbed, the answer is the better of:
    # "exclude the last house" or "exclude the first house"
    return max(rob_line(nums[:-1]), rob_line(nums[1:]))
```
- Time: O(n) — two linear passes
- Space: O(1) extra (excluding the sliced arrays, which are O(n))

**Trick:** the circular constraint only affects the first/last pair — every
other adjacency constraint is identical to the linear version. So you just
solve the linear version twice, once forcibly excluding each end, and take
the max.

---

## 52. Decode Ways

**Problem:** Count the number of ways to decode a digit string into letters
(`'1'`→A ... `'26'`→Z).

**Brute force — recursive branching, no memo:**
```python
def num_decodings_brute(s: str) -> int:
    def dfs(i):
        if i == len(s):
            return 1
        if s[i] == '0':
            return 0     # a leading zero can never start a valid decode
        result = dfs(i + 1)     # decode one digit
        if i + 1 < len(s) and int(s[i:i+2]) <= 26:
            result += dfs(i + 2)   # decode two digits
        return result
    return dfs(0)
```
- Time: O(2^n) worst case
- Space: O(n) recursion depth

**Optimal — bottom-up DP:**
```python
def num_decodings(s: str) -> int:
    n = len(s)
    dp = [0] * (n + 1)
    dp[n] = 1   # empty suffix: exactly one way (decode nothing)

    for i in range(n - 1, -1, -1):
        if s[i] == '0':
            dp[i] = 0        # leading zero can't be decoded on its own
        else:
            dp[i] = dp[i + 1]     # take one digit
            if i + 1 < n and int(s[i:i+2]) <= 26:
                dp[i] += dp[i + 2]   # take two digits

    return dp[0]
```
- Time: O(n)
- Space: O(n) — can be reduced to O(1) tracking only the last two values

---

## 53. Unique Paths

**Problem:** Count paths from top-left to bottom-right of an m×n grid,
moving only right or down.

**Brute force — recursive branching, no memo:**
```python
def unique_paths_brute(m: int, n: int) -> int:
    def dfs(r, c):
        if r == m - 1 or c == n - 1:
            return 1
        return dfs(r + 1, c) + dfs(r, c + 1)
    return dfs(0, 0)
```
- Time: O(2^(m+n)) — exponential
- Space: O(m+n) recursion depth

**Optimal — bottom-up DP with a 1D rolling row:**
```python
def unique_paths(m: int, n: int) -> int:
    row = [1] * n   # bottom row: exactly one way to reach any cell (all rights)

    for _ in range(m - 1):
        new_row = [1] * n
        for c in range(n - 2, -1, -1):
            new_row[c] = new_row[c + 1] + row[c]   # paths from right + paths from below
        row = new_row

    return row[0]
```
- Time: O(m * n)
- Space: O(n) — only one row kept at a time instead of the full 2D grid

**Math alternative — combinatorics (fastest, worth mentioning):**
```python
from math import comb

def unique_paths_math(m: int, n: int) -> int:
    # total moves = (m-1) downs + (n-1) rights; choose which moves are "down"
    return comb((m - 1) + (n - 1), m - 1)
```
- Time: O(m+n) (or O(1) with an efficient factorial-based comb implementation)
- Space: O(1)

---

## 54. Jump Game

**Problem:** Given max-jump-lengths per index, determine if you can reach
the last index.

**Brute force — recursive branching over every possible jump length, no memo:**
```python
def can_jump_brute(nums: list[int]) -> bool:
    def dfs(i):
        if i >= len(nums) - 1:
            return True
        for step in range(1, nums[i] + 1):
            if dfs(i + step):
                return True
        return False
    return dfs(0)
```
- Time: O(2^n) worst case
- Space: O(n) recursion depth

**Optimal — greedy, track furthest reachable index from the end backward:**
```python
def can_jump(nums: list[int]) -> bool:
    goal = len(nums) - 1

    for i in range(len(nums) - 2, -1, -1):
        if i + nums[i] >= goal:
            goal = i     # this index can reach the current goal -> it becomes the new goal

    return goal == 0   # if the goal collapsed all the way to index 0, it's reachable
```
- Time: O(n) — single backward pass
- Space: O(1)

**Trick:** rather than asking "can I get FROM here TO the end" (which
branches expensively), the greedy version asks "what's the leftmost index
that can still reach a known-good goal" — shrinking the goal backward from
the end. If the goal ever reaches index 0, the start can reach the end.

---

## 55. Maximum Product Subarray

*(Already covered in Part 1 — Array category — since it's classified there
in Blind 75, though it's conceptually a DP problem, tracking running
max/min as state.)*

---

## Dynamic Programming category — summary table

| # | Problem | Brute Force | Optimal |
|---|---|---|---|
| 44 | Climbing Stairs | O(2^n) | O(n) time, O(1) space |
| 45 | Coin Change | O(coins^amount) | O(amount·coins) time, O(amount) space |
| 46 | Longest Increasing Subsequence | O(2^n) | O(n²) DP, or O(n log n) with binary search |
| 47 | Longest Common Subsequence | O(2^(m+n)) | O(m·n) time, O(m·n) space |
| 48 | Word Break | O(2^n) | O(n²)-O(n³) time (slicing cost), O(n) space |
| 49 | Combination Sum IV | O(target^len(nums)) | O(target·len(nums)) time, O(target) space |
| 50 | House Robber | O(2^n) | O(n) time, O(1) space |
| 51 | House Robber II | — | O(n) time, O(1) extra space |
| 52 | Decode Ways | O(2^n) | O(n) time, O(n) space (reducible to O(1)) |
| 53 | Unique Paths | O(2^(m+n)) | O(m·n) DP → O(n) space, or O(1) with combinatorics |
| 54 | Jump Game | O(2^n) | O(n) time, O(1) space |

---

*End of Part 5 (Dynamic Programming). Next: Part 6 — Interval + Matrix +
String + Heap (the final part).*
