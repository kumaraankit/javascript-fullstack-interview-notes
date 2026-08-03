# Blind 75 — Full Solutions (Part 6 of 6: Interval + Matrix + String + Heap)

---
---

# INTERVAL

## 56. Insert Interval

**Problem:** Insert a new interval into a sorted, non-overlapping list of
intervals, merging as needed.

**Optimal — single pass, three phases (before, overlapping, after):**
```python
def insert(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:
    res = []
    i = 0
    n = len(intervals)

    # phase 1: add all intervals ending before new_interval starts
    while i < n and intervals[i][1] < new_interval[0]:
        res.append(intervals[i])
        i += 1

    # phase 2: merge all overlapping intervals into new_interval
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    res.append(new_interval)

    # phase 3: add remaining intervals (all start after new_interval ends)
    while i < n:
        res.append(intervals[i])
        i += 1

    return res
```
- Time: O(n) — single pass
- Space: O(n) for the output (O(1) extra beyond that)

---

## 57. Merge Intervals

**Problem:** Merge all overlapping intervals in an unsorted list.

**Brute force — repeatedly scan and merge until no more overlaps:**
```python
def merge_brute(intervals: list[list[int]]) -> list[list[int]]:
    intervals = [list(i) for i in intervals]
    merged = True
    while merged:
        merged = False
        for i in range(len(intervals)):
            for j in range(i + 1, len(intervals)):
                a, b = intervals[i], intervals[j]
                if a[0] <= b[1] and b[0] <= a[1]:   # overlap check
                    a[0], a[1] = min(a[0], b[0]), max(a[1], b[1])
                    intervals.pop(j)
                    merged = True
                    break
            if merged:
                break
    return intervals
```
- Time: O(n³) worst case — repeated full rescans
- Space: O(n)

**Optimal — sort by start, then merge in one pass:**
```python
def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    res = [intervals[0]]

    for start, end in intervals[1:]:
        last_end = res[-1][1]
        if start <= last_end:                       # overlaps with the last merged interval
            res[-1][1] = max(last_end, end)            # extend it
        else:
            res.append([start, end])                     # no overlap -> new interval

    return res
```
- Time: O(n log n) — dominated by the sort
- Space: O(n) for output

---

## 58. Non-overlapping Intervals

**Problem:** Find the minimum number of intervals to remove so the rest are
non-overlapping.

**Optimal — greedy, sort by END time, keep the earliest-ending options:**
```python
def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda x: x[1])    # sort by END, not start — this is the key choice
    removed = 0
    prev_end = float('-inf')

    for start, end in intervals:
        if start >= prev_end:
            prev_end = end          # no overlap -> keep this interval
        else:
            removed += 1              # overlaps -> must remove one

    return removed
```
- Time: O(n log n) — dominated by the sort
- Space: O(1) extra

**Trick — why sort by END, not START:** classic "activity selection" greedy.
Keeping the interval that ends earliest whenever there's a conflict always
leaves the most room for future intervals to also not overlap.

---

## 59. Meeting Rooms (Premium — commonly included)

**Problem:** Given meeting time intervals, determine if a person can attend
all meetings (no overlaps allowed).

```python
def can_attend_meetings(intervals: list[list[int]]) -> bool:
    intervals.sort(key=lambda x: x[0])
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:   # current starts before previous ends
            return False
    return True
```
- Time: O(n log n)
- Space: O(1) extra

## 60. Meeting Rooms II (Premium — commonly included)

**Problem:** Find the minimum number of meeting rooms required.

**Brute force — simulate with a list of room end-times:**
```python
def min_meeting_rooms_brute(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda x: x[0])
    room_end_times = []

    for start, end in intervals:
        placed = False
        for i in range(len(room_end_times)):
            if room_end_times[i] <= start:
                room_end_times[i] = end
                placed = True
                break
        if not placed:
            room_end_times.append(end)

    return len(room_end_times)
```
- Time: O(n²) worst case
- Space: O(n)

**Optimal — two sorted arrays of start/end times, two-pointer sweep:**
```python
def min_meeting_rooms(intervals: list[list[int]]) -> int:
    starts = sorted(i[0] for i in intervals)
    ends = sorted(i[1] for i in intervals)

    rooms = 0
    max_rooms = 0
    s = e = 0

    while s < len(starts):
        if starts[s] < ends[e]:
            rooms += 1        # a meeting starts before the earliest ongoing one ends
            s += 1
            max_rooms = max(max_rooms, rooms)
        else:
            rooms -= 1          # a meeting ended -> free up a room
            e += 1

    return max_rooms
```
- Time: O(n log n) — dominated by sorting both arrays
- Space: O(n) for the sorted arrays

**Trick:** separating starts and ends into their own sorted arrays lets you
"sweep" through time chronologically without an actual heap.

---
---

# MATRIX

## 61. Set Matrix Zeroes

**Problem:** If an element is 0, set its entire row and column to 0, in place.

**Brute force — mark rows/cols to zero in separate sets, then apply:**
```python
def set_zeroes_brute(matrix: list[list[int]]) -> None:
    rows, cols = len(matrix), len(matrix[0])
    zero_rows, zero_cols = set(), set()

    for r in range(rows):
        for c in range(cols):
            if matrix[r][c] == 0:
                zero_rows.add(r)
                zero_cols.add(c)

    for r in range(rows):
        for c in range(cols):
            if r in zero_rows or c in zero_cols:
                matrix[r][c] = 0
```
- Time: O(rows * cols)
- Space: O(rows + cols) for the sets

**Optimal — use the first row/column as markers (O(1) extra space):**
```python
def set_zeroes(matrix: list[list[int]]) -> None:
    rows, cols = len(matrix), len(matrix[0])
    first_row_has_zero = any(matrix[0][c] == 0 for c in range(cols))
    first_col_has_zero = any(matrix[r][0] == 0 for r in range(rows))

    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0

    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0

    if first_row_has_zero:
        for c in range(cols):
            matrix[0][c] = 0
    if first_col_has_zero:
        for r in range(rows):
            matrix[r][0] = 0
```
- Time: O(rows * cols)
- Space: O(1) — reuses the matrix's own first row/column as marker storage

---

## 62. Spiral Matrix

**Problem:** Return all elements of a matrix in spiral order.

```python
def spiral_order(matrix: list[list[int]]) -> list[int]:
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        for c in range(left, right + 1):        # top row, left to right
            res.append(matrix[top][c])
        top += 1

        for r in range(top, bottom + 1):           # right column, top to bottom
            res.append(matrix[r][right])
        right -= 1

        if top <= bottom:                              # guard: might already be exhausted
            for c in range(right, left - 1, -1):          # bottom row, right to left
                res.append(matrix[bottom][c])
            bottom -= 1

        if left <= right:                                    # guard: might already be exhausted
            for r in range(bottom, top - 1, -1):                # left column, bottom to top
                res.append(matrix[r][left])
            left += 1

    return res
```
- Time: O(rows * cols) — visits every element once
- Space: O(1) extra (excluding output)

**Trick:** the two `if` guards prevent re-traversal in single-row/column
matrices after boundaries shrink past each other.

---

## 63. Rotate Image

**Problem:** Rotate an n×n matrix 90 degrees clockwise, in place.

**Brute force — build a new rotated matrix, copy back:**
```python
def rotate_brute(matrix: list[list[int]]) -> None:
    n = len(matrix)
    rotated = [[0] * n for _ in range(n)]
    for r in range(n):
        for c in range(n):
            rotated[c][n - 1 - r] = matrix[r][c]
    for r in range(n):
        for c in range(n):
            matrix[r][c] = rotated[r][c]
```
- Time: O(n²)
- Space: O(n²) — extra matrix

**Optimal — transpose, then reverse each row (true in-place):**
```python
def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)

    for r in range(n):                           # step 1: transpose
        for c in range(r + 1, n):
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]

    for row in matrix:                             # step 2: reverse each row
        row.reverse()
```
- Time: O(n²)
- Space: O(1)

**Trick:** "rotate 90° clockwise" decomposes exactly into "transpose" +
"reverse each row."

---

## 64. Word Search

**Problem:** Given a board and a word, determine if the word can be formed
by sequentially adjacent cells.

```python
def exist(board: list[list[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])

    def dfs(r, c, i):
        if i == len(word):
            return True
        if (r < 0 or r >= rows or c < 0 or c >= cols or
                board[r][c] != word[i]):
            return False

        temp = board[r][c]
        board[r][c] = '#'    # mark visited to prevent reuse within this path

        found = (dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1) or
                 dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1))

        board[r][c] = temp     # backtrack

        return found

    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False
```
- Time: O(rows * cols * 4^L) — L = word length
- Space: O(L) recursion stack

---
---

# STRING

## 65. Longest Substring Without Repeating Characters

**Brute force:**
```python
def length_of_longest_substring_brute(s: str) -> int:
    best = 0
    for i in range(len(s)):
        seen = set()
        for j in range(i, len(s)):
            if s[j] in seen:
                break
            seen.add(s[j])
            best = max(best, j - i + 1)
    return best
```
- Time: O(n²)
- Space: O(min(n, charset))

**Optimal — sliding window with a set:**
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
- Time: O(n)
- Space: O(min(n, charset))

---

## 66. Longest Repeating Character Replacement

**Optimal — sliding window with frequency tracking:**
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
        while (r - l + 1) - max_freq > k:
            count[s[l]] -= 1
            l += 1
        best = max(best, r - l + 1)
    return best
```
- Time: O(n)
- Space: O(1) — bounded by 26 letters

---

## 67. Minimum Window Substring

**Optimal — two frequency maps with have/need counters:**
```python
from collections import Counter, defaultdict

def min_window(s: str, t: str) -> str:
    if not t or not s:
        return ""
    need = Counter(t)
    window = defaultdict(int)
    have, need_count = 0, len(need)
    res, res_len = [-1, -1], float('inf')
    l = 0

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

    l, r = res
    return s[l:r+1] if res_len != float('inf') else ""
```
- Time: O(n + m)
- Space: O(m)

---

## 68. Valid Anagram

```python
from collections import Counter

def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    return Counter(s) == Counter(t)
```
- Time: O(n)
- Space: O(1) — bounded by 26 letters

---

## 69. Group Anagrams

```python
from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups = defaultdict(list)
    for s in strs:
        count = [0] * 26
        for ch in s:
            count[ord(ch) - ord('a')] += 1
        groups[tuple(count)].append(s)
    return list(groups.values())
```
- Time: O(n * k) — k = avg string length
- Space: O(n * k)

---

## 70. Valid Parentheses

```python
def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in pairs:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
        else:
            stack.append(ch)
    return not stack
```
- Time: O(n)
- Space: O(n)

---

## 71. Valid Palindrome

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
- Time: O(n)
- Space: O(1)

---

## 72. Longest Palindromic Substring

**Brute force — check every substring:**
```python
def longest_palindrome_brute(s: str) -> str:
    def is_pal(sub):
        return sub == sub[::-1]

    best = ""
    for i in range(len(s)):
        for j in range(i, len(s)):
            sub = s[i:j+1]
            if is_pal(sub) and len(sub) > len(best):
                best = sub
    return best
```
- Time: O(n³) — O(n²) substrings, O(n) to check each
- Space: O(n) for substring slices

**Optimal — expand around center:**
```python
def longest_palindrome(s: str) -> str:
    res = ""

    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l + 1:r]     # l, r overshot by one when the loop exits

    for i in range(len(s)):
        odd = expand(i, i)         # odd-length palindrome centered AT i
        even = expand(i, i + 1)      # even-length palindrome centered BETWEEN i, i+1
        for cand in (odd, even):
            if len(cand) > len(res):
                res = cand

    return res
```
- Time: O(n²) — n centers, O(n) expansion each
- Space: O(1) extra (excluding output)

**Trick:** every palindrome has either one center (odd length) or two
adjacent centers (even length) — checking both cases covers every palindrome.

---

## 73. Palindromic Substrings

**Brute force:**
```python
def count_substrings_brute(s: str) -> int:
    count = 0
    for i in range(len(s)):
        for j in range(i, len(s)):
            sub = s[i:j+1]
            if sub == sub[::-1]:
                count += 1
    return count
```
- Time: O(n³)
- Space: O(n)

**Optimal — expand around center, count instead of tracking longest:**
```python
def count_substrings(s: str) -> int:
    count = 0

    def expand(l, r):
        nonlocal count
        while l >= 0 and r < len(s) and s[l] == s[r]:
            count += 1     # every successful expansion is one more palindrome found
            l -= 1
            r += 1

    for i in range(len(s)):
        expand(i, i)         # odd length
        expand(i, i + 1)       # even length

    return count
```
- Time: O(n²)
- Space: O(1)

---

## 74. Encode and Decode Strings (Premium — commonly included)

**Problem:** Encode a list of strings into one string and decode it back —
must handle any characters, including delimiters, inside the strings.

**Optimal — length-prefix encoding:**
```python
def encode(strs: list[str]) -> str:
    # "length#content" — the length prefix means '#' can safely appear
    # INSIDE any string without ambiguity
    return ''.join(f"{len(s)}#{s}" for s in strs)

def decode(s: str) -> list[str]:
    res = []
    i = 0
    while i < len(s):
        j = i
        while s[j] != '#':          # find the delimiter marking end of length prefix
            j += 1
        length = int(s[i:j])
        start = j + 1
        res.append(s[start:start + length])
        i = start + length            # jump straight to the next encoded string
    return res
```
- Time: O(total characters) for both encode and decode
- Space: O(total characters)

**Trick:** a naive comma-join breaks if any string contains a comma.
Prefixing with exact length sidesteps this — you always know exactly how
many characters to consume next.

---
---

# HEAP / PRIORITY QUEUE

## 75. Top K Frequent Elements

**Brute force — sort by frequency:**
```python
from collections import Counter

def top_k_frequent_brute(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    return [item for item, freq in
            sorted(count.items(), key=lambda x: -x[1])[:k]]
```
- Time: O(n log n) — dominated by the sort
- Space: O(n)

**Optimal (heap-based) — min-heap of size k:**
```python
import heapq
from collections import Counter

def top_k_frequent_heap(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)
```
- Time: O(n log k)
- Space: O(n)

**Fastest optimal — bucket sort:**
```python
def top_k_frequent(nums: list[int], k: int) -> list[int]:
    count = {}
    freq = [[] for _ in range(len(nums) + 1)]

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
- Time: O(n) — true linear
- Space: O(n)

*(Merge K Sorted Lists — the other canonical heap problem — is fully
covered in Part 2 alongside the rest of Linked List.)*

---

## Part 6 — summary table

| # | Problem | Brute Force | Optimal |
|---|---|---|---|
| 56 | Insert Interval | — | O(n) time, O(n) space |
| 57 | Merge Intervals | O(n³) | O(n log n) time, O(n) space |
| 58 | Non-overlapping Intervals | — | O(n log n) time, O(1) extra space |
| 59 | Meeting Rooms | — | O(n log n) time, O(1) extra space |
| 60 | Meeting Rooms II | O(n²) | O(n log n) time, O(n) space |
| 61 | Set Matrix Zeroes | O(rows+cols) space | O(rows*cols) time, O(1) space |
| 62 | Spiral Matrix | — | O(rows*cols) time, O(1) extra space |
| 63 | Rotate Image | O(n²) space | O(n²) time, O(1) space |
| 64 | Word Search | — | O(rc·4^L) time, O(L) space |
| 65 | Longest Substring Without Repeating | O(n²) | O(n) time, O(min(n,charset)) space |
| 66 | Longest Repeating Char Replacement | — | O(n) time, O(1) space |
| 67 | Minimum Window Substring | — | O(n+m) time, O(m) space |
| 68 | Valid Anagram | — | O(n) time, O(1) space |
| 69 | Group Anagrams | — | O(n·k) time, O(n·k) space |
| 70 | Valid Parentheses | — | O(n) time, O(n) space |
| 71 | Valid Palindrome | — | O(n) time, O(1) space |
| 72 | Longest Palindromic Substring | O(n³) | O(n²) time, O(1) extra space |
| 73 | Palindromic Substrings | O(n³) | O(n²) time, O(1) space |
| 74 | Encode and Decode Strings | — | O(n) time, O(n) space |
| 75 | Top K Frequent Elements | O(n log n) | O(n) time (bucket sort), O(n) space |

---

*End of Part 6 — Blind 75 complete. See Parts 1-5 for Array, Binary,
Linked List, Trees, Tries, Graph, and Dynamic Programming.*
