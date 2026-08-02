# Blind 75 — Full Solutions (Part 2 of ~6: Binary + Linked List)

---
---

# BINARY (Bit Manipulation)

## 11. Sum of Two Integers

**Problem:** Add two integers without using `+` or `-`.

**Brute force:** there isn't a meaningfully different "brute force" here —
the entire point of the problem is to avoid `+`/`-`, so there's only the bit
trick solution.

**Optimal — bit manipulation (XOR for sum, AND+shift for carry):**
```python
def get_sum(a: int, b: int) -> int:
    # Python ints are arbitrary precision, so we mask to 32 bits to
    # simulate fixed-width integer overflow behavior like Java/C++
    mask = 0xFFFFFFFF

    while b & mask:                  # while there's still a carry to add
        carry = (a & b) << 1           # bits where both a and b are 1 -> carry
        a = (a ^ b) & mask               # XOR gives sum without carry
        b = carry & mask

    # if a's sign bit (bit 31) is set, it's a "negative" number in 32-bit
    # terms — convert Python's unsigned representation back to a signed int
    return a if a <= 0x7FFFFFFF else ~(a ^ mask)
```
- Time: O(1) — bounded by 32 bit positions in the worst case
- Space: O(1)

**Trick:** `a ^ b` gives you the sum ignoring carries; `(a & b) << 1` gives
you exactly the carry bits, shifted into position. Repeat until there's no
carry left. The masking/sign-conversion at the end only matters because
Python doesn't have fixed-width integers natively — most other languages
don't need that part.

---

## 12. Number of 1 Bits

**Problem:** Count the number of set bits (1s) in an integer's binary
representation.

**Brute force — check every bit:**
```python
def hamming_weight_brute(n: int) -> int:
    count = 0
    for i in range(32):
        if n & (1 << i):    # check if bit i is set
            count += 1
    return count
```
- Time: O(32) = O(1) fixed, but conceptually O(k) for k-bit integers
- Space: O(1)

**Optimal — Brian Kernighan's trick (clear the lowest set bit each time):**
```python
def hamming_weight(n: int) -> int:
    count = 0
    while n:
        n &= (n - 1)   # clears the LOWEST set bit in one operation
        count += 1
    return count
```
- Time: O(k) where k = number of set bits (faster than 32 iterations when
  the number is sparse)
- Space: O(1)

**Trick:** `n & (n - 1)` always removes exactly the rightmost `1` bit — this
means the loop runs once per set bit, not once per bit position, so it's
faster than the brute force whenever the number has few 1s.

---

## 13. Counting Bits

**Problem:** For every number from 0 to n, count the number of 1 bits, return
as an array.

**Brute force — run "Number of 1 Bits" for each number:**
```python
def count_bits_brute(n: int) -> list[int]:
    def popcount(x):
        c = 0
        while x:
            x &= x - 1
            c += 1
        return c
    return [popcount(i) for i in range(n + 1)]
```
- Time: O(n log n) — O(log n) bits per number, n numbers
- Space: O(n) for output

**Optimal — DP using previously computed results:**
```python
def count_bits(n: int) -> list[int]:
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        # i >> 1 is i with the last bit removed (i.e. i // 2)
        # i & 1 is the last bit itself (0 or 1)
        # bit count of i = bit count of (i without last bit) + last bit
        dp[i] = dp[i >> 1] + (i & 1)
    return dp
```
- Time: O(n) — O(1) work per number, reusing prior results
- Space: O(n) for output (O(1) extra beyond that)

**Trick:** removing the last bit of `i` (via `i >> 1`) gives a smaller
number whose bit count you've *already computed* — this is the DP
recurrence. Classic "reuse subproblem results" pattern applied to bits.

---

## 14. Missing Number

**Problem:** Given an array containing n distinct numbers from `0` to `n`,
find the one missing number.

**Brute force — sort and find the gap:**
```python
def missing_number_brute(nums: list[int]) -> int:
    nums = sorted(nums)
    for i, n in enumerate(nums):
        if i != n:
            return i
    return len(nums)   # missing number is n itself (the largest)
```
- Time: O(n log n)
- Space: O(1) extra (ignoring sort space)

**Optimal — XOR trick (or sum formula):**
```python
def missing_number(nums: list[int]) -> int:
    n = len(nums)
    result = n   # start with n itself included, since indices only go 0..n-1
    for i, num in enumerate(nums):
        result ^= i ^ num   # XOR cancels out every matching index/value pair
    return result
```
- Time: O(n)
- Space: O(1)

**Trick:** XOR-ing a value with itself cancels to 0 (`x ^ x = 0`), and XOR
is order-independent. If you XOR every index `0..n` and every value in the
array together, every number that's present cancels out with its matching
index, leaving only the missing number. (Equally valid alternative: use the
arithmetic sum formula `n*(n+1)//2 - sum(nums)` — same complexity, simpler
to explain, XOR avoids any theoretical overflow concern in other languages.)

---

## 15. Reverse Bits

**Problem:** Reverse the bits of a given 32-bit unsigned integer.

**Brute force — extract each bit, build result bit by bit (this IS the
standard approach — there isn't a slower "brute force" alternative beyond
this):**
```python
def reverse_bits(n: int) -> int:
    result = 0
    for i in range(32):
        bit = (n >> i) & 1        # extract bit i from the original number
        result |= (bit << (31 - i))  # place it in the mirrored position
    return result
```
- Time: O(32) = O(1)
- Space: O(1)

**Trick:** bit `i` from the right in the input becomes bit `i` from the
left in the output — that's why the placement position is `31 - i`.

---
---

# LINKED LIST

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

## 16. Reverse Linked List

**Problem:** Reverse a singly linked list.

**Brute force — dump values into an array, rebuild reversed:**
```python
def reverse_list_brute(head: ListNode) -> ListNode:
    vals = []
    node = head
    while node:
        vals.append(node.val)
        node = node.next
    dummy = ListNode()
    cur = dummy
    for v in reversed(vals):
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next
```
- Time: O(n)
- Space: O(n) — extra array + new nodes

**Optimal — in-place pointer reversal:**
```python
def reverse_list(head: ListNode) -> ListNode:
    prev = None
    cur = head
    while cur:
        next_node = cur.next   # save the next node before we overwrite the link
        cur.next = prev          # reverse this node's pointer
        prev = cur                 # advance prev
        cur = next_node               # advance cur
    return prev   # prev is the new head once cur runs off the end
```
- Time: O(n)
- Space: O(1) — no extra structure, reuses existing nodes

---

## 17. Linked List Cycle (Detect Cycle)

**Problem:** Determine if a linked list has a cycle.

**Brute force — track visited nodes in a set:**
```python
def has_cycle_brute(head: ListNode) -> bool:
    seen = set()
    node = head
    while node:
        if node in seen:
            return True
        seen.add(node)
        node = node.next
    return False
```
- Time: O(n)
- Space: O(n)

**Optimal — Floyd's cycle detection (slow/fast pointers):**
```python
def has_cycle(head: ListNode) -> bool:
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next          # moves 1 step
        fast = fast.next.next        # moves 2 steps
        if slow == fast:
            return True                # they met -> cycle exists
    return False   # fast reached the end -> no cycle
```
- Time: O(n)
- Space: O(1)

**Trick:** if there's a cycle, the fast pointer (2x speed) will eventually
"lap" the slow pointer inside the loop and they'll land on the same node.
If there's no cycle, fast simply reaches `None` first.

---

## 18. Merge Two Sorted Lists

**Problem:** Merge two sorted linked lists into one sorted list.

**Brute force — dump both into an array, sort, rebuild:**
```python
def merge_two_lists_brute(l1: ListNode, l2: ListNode) -> ListNode:
    vals = []
    for node in (l1, l2):
        while node:
            vals.append(node.val)
            node = node.next
    vals.sort()
    dummy = ListNode()
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next
```
- Time: O((n+m) log(n+m)) — dominated by the sort
- Space: O(n+m)

**Optimal — merge in place using a dummy head:**
```python
def merge_two_lists(l1: ListNode, l2: ListNode) -> ListNode:
    dummy = ListNode()
    tail = dummy

    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next

    tail.next = l1 if l1 else l2   # attach whichever list has leftovers
    return dummy.next
```
- Time: O(n+m) — single pass through both lists
- Space: O(1) extra — reuses existing nodes, only the dummy is new

---

## 19. Merge K Sorted Lists

**Problem:** Merge k sorted linked lists into one sorted list.

**Brute force — dump all values, sort, rebuild:**
```python
def merge_k_lists_brute(lists: list[ListNode]) -> ListNode:
    vals = []
    for head in lists:
        node = head
        while node:
            vals.append(node.val)
            node = node.next
    vals.sort()
    dummy = ListNode()
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next
```
- Time: O(N log N) where N = total number of nodes across all lists
- Space: O(N)

**Optimal — min-heap of the current head of each list:**
```python
import heapq

def merge_k_lists(lists: list[ListNode]) -> ListNode:
    heap = []
    # seed the heap with the first node of each non-empty list
    # tuple = (value, unique_index, node) — unique_index breaks ties so
    # heapq never tries to compare ListNode objects directly (which would error)
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = ListNode()
    tail = dummy

    while heap:
        val, i, node = heapq.heappop(heap)   # smallest current value across all lists
        tail.next = node
        tail = tail.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next
```
- Time: O(N log k) — N total nodes, each heap push/pop is O(log k) for k lists
- Space: O(k) for the heap

**Alternative optimal — divide and conquer (merge pairs of lists):**
```python
def merge_k_lists_dc(lists: list[ListNode]) -> ListNode:
    if not lists:
        return None
    while len(lists) > 1:
        merged = []
        for i in range(0, len(lists), 2):
            l1 = lists[i]
            l2 = lists[i + 1] if i + 1 < len(lists) else None
            merged.append(merge_two_lists(l1, l2))   # reuse problem #18's solution
        lists = merged
    return lists[0]
```
- Time: O(N log k) — log k merge rounds, O(N) work per round
- Space: O(1) extra (excluding recursion/list overhead)

---

## 20. Remove Nth Node From End of List

**Problem:** Remove the nth node from the end of a linked list in one pass.

**Brute force — compute length first, then find the node to remove:**
```python
def remove_nth_from_end_brute(head: ListNode, n: int) -> ListNode:
    length = 0
    node = head
    while node:
        length += 1
        node = node.next

    dummy = ListNode(0, head)
    cur = dummy
    for _ in range(length - n):   # walk to the node BEFORE the one to remove
        cur = cur.next
    cur.next = cur.next.next
    return dummy.next
```
- Time: O(n) — two passes
- Space: O(1)

**Optimal — two pointers, one pass:**
```python
def remove_nth_from_end(head: ListNode, n: int) -> ListNode:
    dummy = ListNode(0, head)
    fast = slow = dummy

    for _ in range(n):
        fast = fast.next          # advance fast n steps ahead first

    while fast.next:
        fast = fast.next            # move both until fast hits the end
        slow = slow.next

    slow.next = slow.next.next        # slow is now right before the node to remove
    return dummy.next
```
- Time: O(n) — single pass
- Space: O(1)

**Trick:** the `n`-node gap between `fast` and `slow` is what lets `slow`
land exactly one node before the target when `fast` reaches the end — this
avoids needing a separate length-counting pass.

---

## 21. Reorder List

**Problem:** Given `L0 -> L1 -> ... -> Ln`, reorder to
`L0 -> Ln -> L1 -> Ln-1 -> ...` in place.

**Brute force — dump into an array, rebuild with two pointers:**
```python
def reorder_list_brute(head: ListNode) -> None:
    nodes = []
    node = head
    while node:
        nodes.append(node)
        node = node.next

    l, r = 0, len(nodes) - 1
    while l < r:
        nodes[l].next = nodes[r]
        l += 1
        if l == r:
            break
        nodes[r].next = nodes[l]
        r -= 1
    nodes[l].next = None   # terminate the list
```
- Time: O(n)
- Space: O(n) — array of node references

**Optimal — find middle, reverse second half, merge alternately:**
```python
def reorder_list(head: ListNode) -> None:
    # Step 1: find the middle using slow/fast pointers
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # Step 2: reverse the second half
    second = slow.next
    slow.next = None   # cut the list into two halves
    prev = None
    while second:
        nxt = second.next
        second.next = prev
        prev = second
        second = nxt
    second = prev   # second is now the head of the REVERSED second half

    # Step 3: merge the two halves alternately
    first = head
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2
```
- Time: O(n) — three O(n) passes (find middle, reverse, merge)
- Space: O(1) — no extra data structure, all done via pointer rewiring

**Trick:** this problem is really three previously-solved subproblems
chained together — find-the-middle (slow/fast pointers), reverse-a-list
(problem #16), and merge-alternately. Recognizing the decomposition is the
actual skill being tested, not any single new technique.

---

## Binary + Linked List — summary table

| # | Problem | Brute Force | Optimal |
|---|---|---|---|
| 11 | Sum of Two Integers | — (bit trick is the only approach) | O(1) time, O(1) space |
| 12 | Number of 1 Bits | O(32)=O(1) | O(k) time (k = set bits), O(1) space |
| 13 | Counting Bits | O(n log n) | O(n) time, O(n) space |
| 14 | Missing Number | O(n log n) | O(n) time, O(1) space |
| 15 | Reverse Bits | O(32)=O(1) (standard approach) | O(1) time, O(1) space |
| 16 | Reverse Linked List | O(n) time, O(n) space | O(n) time, O(1) space |
| 17 | Linked List Cycle | O(n) time, O(n) space | O(n) time, O(1) space |
| 18 | Merge Two Sorted Lists | O((n+m) log(n+m)) | O(n+m) time, O(1) extra space |
| 19 | Merge K Sorted Lists | O(N log N) | O(N log k) time, O(k) space |
| 20 | Remove Nth Node From End | O(n), two passes | O(n), one pass, O(1) space |
| 21 | Reorder List | O(n) time, O(n) space | O(n) time, O(1) space |

---

*End of Part 2 (Binary + Linked List). Next: Part 3 — Trees + Tries.*
