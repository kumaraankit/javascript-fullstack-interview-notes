# Stack — Pattern Recognition Guide (Python)

## The core mental model

Ask: **"Do I need to remember things in a way where the most recently seen
item is the first one I need to act on / undo / compare against — and once I
resolve it, I never need it again?"**

That's LIFO (last-in, first-out) — the defining property of a stack. In
Python you almost never need a real `Stack` class: a plain `list` with
`.append()` / `.pop()` (both O(1) at the end) is the stack.

**The giveaway phrases:**
- "matching pairs" / "nested" / "balanced" → parentheses-style stack
- "next greater/smaller element", "next warmer day" → monotonic stack
- "evaluate an expression" → operator/operand stack
- "undo", "most recent", "backtrack to a previous state" → stack of history

**How it differs from queue-based BFS problems:** if order of *processing*
must reverse relative to order of *arrival* (last thing in gets handled
first), that's a stack. If order of processing must match order of arrival,
that's a queue — different tool, don't reach for stack there.

---

## Pattern 1 — Matching / balancing → push open, pop on close

**Signal:** "valid parentheses," "balanced brackets," anything about nested
pairs that must close in the reverse order they opened.

**Valid Parentheses:**
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

    return not stack  # must be fully closed
```
- Time: O(n) — one pass, O(1) push/pop
- Space: O(n) — worst case all opening brackets

**Trick:** two failure modes people forget — (1) `stack` being empty when you
hit a closing bracket (`stack[-1]` would crash / logically means "closing
something that was never opened"), and (2) leftover unclosed brackets at the
end (`return not stack`, not just `return True` after the loop).

---

## Pattern 2 — Track an auxiliary value alongside each stack entry → Min Stack

**Signal:** "design a stack that also supports getMin/getMax in O(1)."

```python
class MinStack:
    def __init__(self):
        self.stack = []       # (value, min_so_far) pairs

    def push(self, val: int) -> None:
        cur_min = val if not self.stack else min(val, self.stack[-1][1])
        self.stack.append((val, cur_min))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]
```
- Time: O(1) for every operation
- Space: O(n) — storing a running min alongside every value

**Trick:** the "aha" is storing the min *as of that point in the stack*
alongside each element, not maintaining one global min variable — a global
min breaks the moment you pop the element that produced it, because you'd
have no idea what the previous min was. Storing it per-entry means popping
"restores" the correct previous min for free.

---

## Pattern 3 — Expression evaluation → operand/operator stack

**Signal:** "evaluate reverse Polish notation," "basic calculator," any
expression-parsing problem.

**Evaluate Reverse Polish Notation:**
```python
def eval_rpn(tokens: list[str]) -> int:
    stack = []
    ops = {
        '+': lambda a, b: a + b,
        '-': lambda a, b: a - b,
        '*': lambda a, b: a * b,
        '/': lambda a, b: int(a / b),  # truncate toward zero, not floor
    }

    for tok in tokens:
        if tok in ops:
            b = stack.pop()   # order matters: second operand popped first
            a = stack.pop()
            stack.append(ops[tok](a, b))
        else:
            stack.append(int(tok))

    return stack[-1]
```
- Time: O(n)
- Space: O(n)

**Trick:** the pop order is the classic bug source — when you pop for a
binary operator, the **first** pop is the *right-hand* operand (`b`), the
**second** pop is the *left-hand* operand (`a`), because the operand pushed
later is on top. Also: Python's `//` floors toward negative infinity, not
zero, so integer division here needs `int(a / b)` to truncate correctly for
negative results.

---

## Pattern 4 — Monotonic stack → "next greater/smaller element" family

**Signal:** "next greater element," "daily temperatures," "next warmer day" —
anything asking, for each element, "how far until a bigger/smaller one
appears."

This is the single highest-value pattern in this category — it turns an
apparent O(n²) (for each element, scan forward until you find one bigger)
into O(n).

**Daily Temperatures:**
```python
def daily_temperatures(temperatures: list[int]) -> list[int]:
    res = [0] * len(temperatures)
    stack = []  # stores indices, kept in decreasing temperature order

    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            prev_i = stack.pop()
            res[prev_i] = i - prev_i
        stack.append(i)

    return res
```
- Time: O(n) — each index is pushed once and popped at most once, ever
- Space: O(n)

**Trick — this is the one to really internalize:** the stack only ever holds
indices whose "answer" isn't known yet, kept in **monotonically decreasing**
value order. The moment a bigger value shows up, it resolves (pops) every
smaller value still waiting below it — and once popped, an index is *done
forever*. That's why total work is O(n) despite the `while` loop: **every
index is pushed exactly once and popped at most once across the whole run**
— same amortized argument as the sliding-window shrink pointer, just applied
to push/pop instead of pointer movement.

**Car Fleet** (same monotonic-stack DNA, dressed differently):
```python
def car_fleet(target: int, position: list[int], speed: list[int]) -> int:
    cars = sorted(zip(position, speed), reverse=True)  # closest-to-target first
    stack = []

    for pos, spd in cars:
        time_to_target = (target - pos) / spd
        stack.append(time_to_target)
        # if this car catches up to (or is slower than) the one ahead,
        # it merges into the same fleet -> doesn't count as a new fleet
        if len(stack) >= 2 and stack[-1] <= stack[-2]:
            stack.pop()

    return len(stack)
```
- Time: O(n log n) — dominated by the sort
- Space: O(n)

**Trick:** recognizing this as a stack problem at all is the hard part — the
"signal" isn't a keyword like "next greater," it's that each car's fate
depends only on the car *immediately ahead of it that hasn't merged yet*,
which is exactly a LIFO relationship once you sort by position.

---

## Pattern 5 — Stack of indices for area/boundary problems → histogram-style

**Signal:** "largest rectangle in histogram," "trapping rain water" (can also
be solved with two pointers) — anything needing, for each bar, the nearest
smaller bar to the left and right.

**Largest Rectangle in Histogram** (the hardest common stack problem — know the shape):
```python
def largest_rectangle_area(heights: list[int]) -> int:
    stack = []  # (index, height) pairs, kept in increasing height order
    max_area = 0

    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            max_area = max(max_area, height * (i - idx))
            start = idx  # this bar's rectangle could extend back to idx
        stack.append((start, h))

    # anything left in the stack extends all the way to the end
    for idx, h in stack:
        max_area = max(max_area, h * (len(heights) - idx))

    return max_area
```
- Time: O(n) — same "each index pushed/popped once" argument as pattern 4
- Space: O(n)

**Trick:** this is the monotonic stack pattern (Pattern 4) applied in two
directions at once — when a bar pops another off the stack because it's
shorter, that popped bar's rectangle is finalized because it now knows both
its left boundary (what's still on the stack) and right boundary (current
index `i`). The `start = idx` line is what lets the popped bar's rectangle
retroactively extend leftward through any bars of equal or greater height
that were already merged.

---

## Quick-reference: symptom → tool

| If the problem says or implies...                              | Reach for...                                   |
|---|---|
| "valid/balanced parentheses", "nested pairs"                    | push open, pop-and-check on close              |
| "design a stack with O(1) getMin/getMax"                        | store aux value alongside each stack entry     |
| "evaluate expression", "reverse Polish notation"                | operand/operator stack, watch pop order        |
| "next greater/smaller element", "daily temperatures"            | monotonic stack of indices                     |
| "car fleet", "merges into the one ahead"                        | monotonic stack (less obvious signal — think "depends only on the most recent unresolved thing") |
| "largest rectangle", boundary-based area problems               | monotonic stack tracking (index, height)       |

---

## Complexity habits to state out loud in interviews

- For any monotonic stack problem, explicitly state: **"each element is
  pushed once and popped at most once, so total work across the while loops
  is O(n), not O(n²)"** — this is the exact justification interviewers want
  to hear, because the code *looks* like nested loops.
- State whether you're storing values or indices on the stack, and why —
  usually indices, because you need position information (distance, boundary)
  that a raw value would lose.
- For expression evaluation, call out pop order explicitly (which operand is
  "b" vs "a") — it's a common silent bug, and naming it shows you know why.

---

## How to drill this

1. Check: does resolving element X depend on "the most recent thing before
   it that hasn't been resolved yet"? If yes, stack.
2. Decide: are you storing raw values, or (index, value) pairs? Default to
   indices whenever you need position/distance in the answer.
3. If it's a "next greater/smaller" flavor, decide the stack's invariant
   up front — is it increasing or decreasing? — and write that as a comment
   before coding the `while` condition.
4. Trace through a tiny example (3-4 elements) by hand, watching the stack's
   contents after each step, before trusting the code.
5. State complexity, explicitly justifying the amortized O(n) push/pop count.
