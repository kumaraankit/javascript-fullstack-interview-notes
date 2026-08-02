# Blind 75 — Full Solutions (Part 4 of ~6: Graph)

---

## 36. Clone Graph

**Problem:** Deep-copy a connected undirected graph given a reference node.

**Optimal — DFS with a hashmap tracking original → clone:**
```python
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def clone_graph(node: 'Node') -> 'Node':
    if not node:
        return None

    old_to_new = {}   # maps original node -> its clone

    def dfs(n):
        if n in old_to_new:
            return old_to_new[n]     # already cloned -> avoid infinite loop on cycles

        copy = Node(n.val)
        old_to_new[n] = copy           # register BEFORE recursing into neighbors —
                                           # this is what prevents infinite recursion on cycles
        for neighbor in n.neighbors:
            copy.neighbors.append(dfs(neighbor))
        return copy

    return dfs(node)
```
- Time: O(V + E) — visits every node and edge once
- Space: O(V) — hashmap + recursion stack

**Trick:** registering the clone in `old_to_new` *before* recursing into
neighbors is essential — since the graph can have cycles, without this you'd
recurse infinitely the moment a neighbor points back to a node currently
being cloned.

---

## 37. Course Schedule

**Problem:** Given course prerequisites, determine if it's possible to
finish all courses (i.e., no cycle in the dependency graph).

**Optimal — DFS cycle detection with a "visiting" state:**
```python
def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    graph = {i: [] for i in range(num_courses)}
    for course, prereq in prerequisites:
        graph[course].append(prereq)

    # 0 = unvisited, 1 = currently in the recursion stack ("visiting"), 2 = fully processed
    state = [0] * num_courses

    def dfs(course) -> bool:
        if state[course] == 1:
            return False        # found a course we're already in the middle of processing -> cycle
        if state[course] == 2:
            return True           # already fully verified as safe -> no need to recheck

        state[course] = 1
        for prereq in graph[course]:
            if not dfs(prereq):
                return False
        state[course] = 2
        return True

    return all(dfs(c) for c in range(num_courses))
```
- Time: O(V + E) — each node visited once (state 2 short-circuits repeats)
- Space: O(V + E) — graph adjacency + state array + recursion stack

**Trick:** the three-state marking (unvisited / visiting / done) is what
distinguishes "this node is an ancestor of itself in the current DFS path"
(state 1, a real cycle) from "this node was already fully explored safely
via a different path" (state 2, not a cycle) — using only visited/unvisited
(two states) can't tell these apart and gives false positives.

**Alternative — Kahn's algorithm (BFS topological sort, in-degree based):**
```python
from collections import deque

def can_finish_bfs(num_courses: int, prerequisites: list[list[int]]) -> bool:
    graph = {i: [] for i in range(num_courses)}
    in_degree = [0] * num_courses
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1

    queue = deque([c for c in range(num_courses) if in_degree[c] == 0])
    visited = 0

    while queue:
        course = queue.popleft()
        visited += 1
        for next_course in graph[course]:
            in_degree[next_course] -= 1
            if in_degree[next_course] == 0:
                queue.append(next_course)

    return visited == num_courses   # if not all courses processed, a cycle blocked some
```
- Time: O(V + E)
- Space: O(V + E)

---

## 38. Pacific Atlantic Water Flow

**Problem:** Given a heightmap, find cells from which water can flow to
both the Pacific (top/left edges) and Atlantic (bottom/right edges) oceans.
Water flows from higher/equal to lower height.

**Brute force — for every cell, run a flood-fill/BFS to check if it can
reach BOTH oceans:**
```python
def pacific_atlantic_brute(heights: list[list[int]]) -> list[list[int]]:
    if not heights:
        return []
    rows, cols = len(heights), len(heights[0])

    def can_reach(r, c, is_pacific):
        visited = set()
        stack = [(r, c)]
        while stack:
            cr, cc = stack.pop()
            if is_pacific and (cr == 0 or cc == 0):
                return True
            if not is_pacific and (cr == rows - 1 or cc == cols - 1):
                return True
            visited.add((cr, cc))
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = cr + dr, cc + dc
                if (0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in visited
                        and heights[nr][nc] <= heights[cr][cc]):
                    stack.append((nr, nc))
        return False

    return [[r, c] for r in range(rows) for c in range(cols)
            if can_reach(r, c, True) and can_reach(r, c, False)]
```
- Time: O((rows*cols)²) — a full flood-fill per cell, twice
- Space: O(rows*cols) per flood-fill call

**Optimal — reverse the flow: BFS/DFS FROM each ocean's border inward:**
```python
def pacific_atlantic(heights: list[list[int]]) -> list[list[int]]:
    if not heights:
        return []
    rows, cols = len(heights), len(heights[0])
    pacific, atlantic = set(), set()

    def dfs(r, c, visited, prev_height):
        if ((r, c) in visited or r < 0 or r >= rows or c < 0 or c >= cols
                or heights[r][c] < prev_height):
            return
        visited.add((r, c))
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            dfs(r + dr, c + dc, visited, heights[r][c])

    for c in range(cols):
        dfs(0, c, pacific, heights[0][c])            # top row touches Pacific
        dfs(rows - 1, c, atlantic, heights[rows-1][c])  # bottom row touches Atlantic
    for r in range(rows):
        dfs(r, 0, pacific, heights[r][0])              # left column touches Pacific
        dfs(r, cols - 1, atlantic, heights[r][cols-1])   # right column touches Atlantic

    return [[r, c] for r in range(rows) for c in range(cols)
            if (r, c) in pacific and (r, c) in atlantic]
```
- Time: O(rows * cols) — each cell visited a constant number of times
  across both flood-fills combined
- Space: O(rows * cols) for the two visited sets

**Trick — the big conceptual flip:** instead of asking "can THIS cell reach
the ocean" (expensive per cell), ask "which cells can the ocean reach,
flowing UPHILL from the border inward" (cheap, done once per ocean). Since
water-flows-downhill is symmetric with can-be-reached-flowing-uphill, this
reverses an O(n²)-per-cell problem into two O(n) flood-fills total.

---

## 39. Number of Islands

**Problem:** Count the number of islands (connected groups of `'1'`s) in a
grid.

**Optimal — DFS/BFS flood-fill, marking visited cells:**
```python
def num_islands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    visited = set()
    count = 0

    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or
                grid[r][c] == '0' or (r, c) in visited):
            return
        visited.add((r, c))   # mark visited
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            dfs(r + dr, c + dc)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1' and (r, c) not in visited:
                dfs(r, c)
                count += 1   # every fresh unvisited land cell starts a NEW island

    return count
```
- Time: O(rows * cols) — each cell visited once
- Space: O(rows * cols) — visited set + recursion stack worst case

---

## 40. Longest Consecutive Sequence

**Problem:** Find the length of the longest consecutive elements sequence,
in O(n).

*(Already covered in the Arrays & Hashing checklist — repeated here for
completeness since it's officially in the Graph category of Blind 75, as
it's conceptually a connectivity/sequence-building problem.)*

**Brute force — sort, then scan for consecutive runs:**
```python
def longest_consecutive_brute(nums: list[int]) -> int:
    if not nums:
        return 0
    nums = sorted(set(nums))
    longest = 1
    cur = 1
    for i in range(1, len(nums)):
        if nums[i] == nums[i-1] + 1:
            cur += 1
            longest = max(longest, cur)
        else:
            cur = 1
    return longest
```
- Time: O(n log n) — dominated by the sort
- Space: O(n)

**Optimal — set + only-expand-from-sequence-start:**
```python
def longest_consecutive(nums: list[int]) -> int:
    num_set = set(nums)
    longest = 0

    for n in num_set:
        if n - 1 not in num_set:      # only start counting from the BEGINNING of a run
            length = 1
            while n + length in num_set:
                length += 1
            longest = max(longest, length)

    return longest
```
- Time: O(n) — each number is only ever part of one sequence's inner
  while loop across the entire run
- Space: O(n)

---

## Graph category (premium-adjacent, worth knowing)

These three are commonly included in Blind 75 lists but are LeetCode
Premium — included here since NeetCode covers them and they're foundational
graph patterns.

### 41. Alien Dictionary

**Problem:** Given a sorted list of words in an alien language, derive a
valid character ordering.

**Optimal — build a graph from adjacent word comparisons, topological sort:**
```python
from collections import defaultdict, deque

def alien_order(words: list[str]) -> str:
    graph = defaultdict(set)
    in_degree = {ch: 0 for word in words for ch in word}

    for w1, w2 in zip(words, words[1:]):
        min_len = min(len(w1), len(w2))
        # edge case: if w1 is a longer PREFIX of w2's start but comes first
        # with extra chars, no valid ordering can exist (e.g. "abc" before "ab")
        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
            return ""

        for c1, c2 in zip(w1, w2):
            if c1 != c2:
                if c2 not in graph[c1]:
                    graph[c1].add(c2)
                    in_degree[c2] += 1
                break    # only the FIRST differing character gives ordering info

    queue = deque([c for c in in_degree if in_degree[c] == 0])
    res = []

    while queue:
        c = queue.popleft()
        res.append(c)
        for neighbor in graph[c]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    if len(res) != len(in_degree):
        return ""     # not all characters processed -> a cycle exists -> invalid ordering
    return ''.join(res)
```
- Time: O(C) — C = total length of all words (building the graph), plus
  O(V + E) for the topological sort where V = unique chars
- Space: O(1) — bounded by alphabet size (at most 26 characters/edges)

### 42. Graph Valid Tree

**Problem:** Given n nodes and a list of edges, determine if they form a
valid tree (connected, no cycles).

**Optimal — Union-Find (Disjoint Set Union):**
```python
def valid_tree(n: int, edges: list[list[int]]) -> bool:
    if len(edges) != n - 1:
        return False    # a tree with n nodes must have EXACTLY n-1 edges

    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]   # path compression — flattens the tree
            x = parent[x]
        return x

    def union(x, y) -> bool:
        root_x, root_y = find(x), find(y)
        if root_x == root_y:
            return False       # already connected -> adding this edge would form a cycle
        parent[root_x] = root_y
        return True

    for a, b in edges:
        if not union(a, b):
            return False

    return True   # n-1 edges + no cycles detected -> must be connected and acyclic
```
- Time: O(E * α(n)) — α = inverse Ackermann function, effectively O(1) per
  operation with path compression
- Space: O(n) for the parent array

**Trick:** the `n - 1` edge count check is a fast pre-filter — a tree with
`n` nodes has *exactly* `n-1` edges, no more, no less. Combined with
Union-Find cycle detection, this confirms both "no cycles" and (implicitly)
"fully connected," since exactly n-1 edges with no cycle can only form one
connected tree, not a forest.

### 43. Number of Connected Components in an Undirected Graph

**Problem:** Count connected components given n nodes and a list of edges.

**Optimal — Union-Find, count distinct roots:**
```python
def count_components(n: int, edges: list[list[int]]) -> int:
    parent = list(range(n))
    count = n     # start assuming every node is its own component

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(x, y):
        nonlocal count
        root_x, root_y = find(x), find(y)
        if root_x != root_y:
            parent[root_x] = root_y
            count -= 1     # merging two components reduces the total count by one

    for a, b in edges:
        union(a, b)

    return count
```
- Time: O(E * α(n)) — near-O(1) per union with path compression
- Space: O(n)

**Alternative — plain DFS/BFS, count how many times you start a fresh
traversal:**
```python
def count_components_dfs(n: int, edges: list[list[int]]) -> int:
    graph = {i: [] for i in range(n)}
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)

    visited = set()
    count = 0

    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)

    for node in range(n):
        if node not in visited:
            dfs(node)
            count += 1    # each fresh unvisited node starts a new component

    return count
```
- Time: O(V + E)
- Space: O(V + E)

---

## Graph category — summary table

| # | Problem | Brute Force | Optimal |
|---|---|---|---|
| 36 | Clone Graph | — | O(V+E) time, O(V) space |
| 37 | Course Schedule | — | O(V+E) time, O(V+E) space |
| 38 | Pacific Atlantic Water Flow | O((rows*cols)²) | O(rows*cols) time/space |
| 39 | Number of Islands | — | O(rows*cols) time/space |
| 40 | Longest Consecutive Sequence | O(n log n) | O(n) time, O(n) space |
| 41 | Alien Dictionary | — | O(C) time, O(1) space (bounded alphabet) |
| 42 | Graph Valid Tree | — | O(E·α(n)) time, O(n) space |
| 43 | Number of Connected Components | — | O(E·α(n)) time, O(n) space |

---

*End of Part 4 (Graph). Next: Part 5 — Dynamic Programming (1D + 2D).*
