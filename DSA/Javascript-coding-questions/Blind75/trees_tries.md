# Blind 75 — Full Solutions (Part 3 of ~6: Trees + Tries)

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

---

## 22. Maximum Depth of Binary Tree

**Problem:** Find the maximum depth (number of nodes on the longest
root-to-leaf path).

**Brute force:** recursion IS the natural/optimal approach here; the
"alternative" worth showing is iterative BFS level counting.

**Approach A — recursive DFS:**
```python
def max_depth(root: TreeNode) -> int:
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
```
- Time: O(n) — visits every node once
- Space: O(h) — recursion stack, h = tree height (worst case O(n) for a skewed tree)

**Approach B — iterative BFS (level by level):**
```python
from collections import deque

def max_depth_bfs(root: TreeNode) -> int:
    if not root:
        return 0
    depth = 0
    queue = deque([root])
    while queue:
        depth += 1
        for _ in range(len(queue)):    # process one full level at a time
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return depth
```
- Time: O(n)
- Space: O(n) worst case — queue can hold an entire level (up to n/2 nodes)

---

## 23. Same Tree

**Problem:** Check if two binary trees are structurally identical with the
same values.

**Optimal — recursive comparison (this is already the optimal approach):**
```python
def is_same_tree(p: TreeNode, q: TreeNode) -> bool:
    if not p and not q:
        return True          # both empty -> match
    if not p or not q:
        return False           # one empty, one not -> mismatch
    if p.val != q.val:
        return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)
```
- Time: O(n) — visits each node once (stops early on mismatch)
- Space: O(h) — recursion stack

---

## 24. Invert/Flip Binary Tree

**Problem:** Mirror a binary tree (swap every left/right child).

**Optimal — recursive swap:**
```python
def invert_tree(root: TreeNode) -> TreeNode:
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root
```
- Time: O(n)
- Space: O(h) — recursion stack

**Iterative alternative (BFS with a queue):**
```python
from collections import deque

def invert_tree_iter(root: TreeNode) -> TreeNode:
    if not root:
        return None
    queue = deque([root])
    while queue:
        node = queue.popleft()
        node.left, node.right = node.right, node.left
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return root
```
- Time: O(n)
- Space: O(n) worst case for the queue

---

## 25. Binary Tree Maximum Path Sum

**Problem:** Find the maximum sum of any path in the tree (path can start
and end at any node, doesn't have to pass through the root).

**Optimal — post-order DFS, track best path through each node:**
```python
def max_path_sum(root: TreeNode) -> int:
    best = float('-inf')

    def dfs(node) -> int:
        nonlocal best
        if not node:
            return 0

        # only take a child's contribution if it's positive — a negative
        # branch would only hurt the sum, so treat it as 0 (skip it)
        left_gain = max(dfs(node.left), 0)
        right_gain = max(dfs(node.right), 0)

        # the best path THROUGH this node (as the peak) could use both children
        best = max(best, node.val + left_gain + right_gain)

        # but what we RETURN upward can only include ONE side, since a
        # path passed up to the parent can't branch in two directions
        return node.val + max(left_gain, right_gain)

    dfs(root)
    return best
```
- Time: O(n) — visits every node once
- Space: O(h) — recursion stack

**Trick — the key distinction to state out loud:** the value *returned* from
a recursive call (usable by the parent to extend a path) is different from
the value *recorded* as a candidate answer (which can use both children at
once, forming a "peak"). Conflating these two is the most common bug in
this problem.

---

## 26. Binary Tree Level Order Traversal

**Problem:** Return node values grouped by level.

**Optimal — BFS with level-size tracking:**
```python
from collections import deque

def level_order(root: TreeNode) -> list[list[int]]:
    if not root:
        return []
    res = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):    # exactly the nodes in the current level
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        res.append(level)
    return res
```
- Time: O(n)
- Space: O(n) — queue can hold up to a full level, output stores all nodes

---

## 27. Serialize and Deserialize Binary Tree

**Problem:** Design an algorithm to convert a tree to a string and back.

**Optimal — preorder DFS with null markers:**
```python
def serialize(root: TreeNode) -> str:
    vals = []

    def dfs(node):
        if not node:
            vals.append('N')          # marker for a null child — essential
                                          # for reconstructing exact structure
            return
        vals.append(str(node.val))
        dfs(node.left)
        dfs(node.right)

    dfs(root)
    return ','.join(vals)


def deserialize(data: str) -> TreeNode:
    vals = iter(data.split(','))

    def dfs():
        val = next(vals)
        if val == 'N':
            return None
        node = TreeNode(int(val))
        node.left = dfs()     # preorder: reconstruct left before right,
        node.right = dfs()      # matching the order values were serialized in
        return node

    return dfs()
```
- Time: O(n) for both serialize and deserialize
- Space: O(n) for the string/list, O(h) recursion stack

**Trick:** null markers are what make this reversible — without them,
you can't tell where one subtree ends and the next begins from a preorder
sequence alone.

---

## 28. Subtree of Another Tree

**Problem:** Check if `subRoot` is a subtree of `root` (identical structure
appearing anywhere in `root`).

**Brute force — check every node as a potential match root, reusing Same Tree:**
```python
def is_subtree(root: TreeNode, sub_root: TreeNode) -> bool:
    def is_same(a, b):
        if not a and not b:
            return True
        if not a or not b:
            return False
        return a.val == b.val and is_same(a.left, b.left) and is_same(a.right, b.right)

    if not root:
        return False
    if is_same(root, sub_root):
        return True
    return is_subtree(root.left, sub_root) or is_subtree(root.right, sub_root)
```
- Time: O(m * n) worst case — for each of m nodes in root, up to O(n) to
  compare against sub_root
- Space: O(h) recursion stack

**Optimization note:** this brute force IS the commonly accepted solution
for this problem (a true O(m+n) solution requires tree serialization +
string matching with a KMP-style algorithm, which is overkill for interview
purposes — but worth mentioning you know it exists):

**Faster alternative — serialize both trees, check substring (with markers to avoid false positives):**
```python
def is_subtree_serialize(root: TreeNode, sub_root: TreeNode) -> bool:
    def serialize(node):
        if not node:
            return "#"
        # include markers around each value so e.g. "12" doesn't falsely
        # match a serialized "1" followed by "2"
        return f"^{node.val}#{serialize(node.left)}{serialize(node.right)}"

    return serialize(sub_root) in serialize(root)
```
- Time: O(m + n) to build strings, but substring search is O(m*n) worst
  case with naive `in` (Python's `in` uses an efficient algorithm in
  practice, but worst-case is still O(m*n) for pathological inputs — true
  O(m+n) needs KMP)
- Space: O(m + n) for the serialized strings

---

## 29. Construct Binary Tree from Preorder and Inorder Traversal

**Problem:** Rebuild a binary tree given its preorder and inorder traversal
arrays.

**Optimal — recursive split using inorder index lookup:**
```python
def build_tree(preorder: list[int], inorder: list[int]) -> TreeNode:
    # map value -> index in inorder, for O(1) lookup instead of scanning
    inorder_index = {val: i for i, val in enumerate(inorder)}
    self_i = [0]   # mutable pointer into preorder, tracks the next root to use

    def build(left, right):
        if left > right:
            return None

        root_val = preorder[self_i[0]]
        self_i[0] += 1
        root = TreeNode(root_val)

        mid = inorder_index[root_val]     # splits inorder into left/right subtrees
        root.left = build(left, mid - 1)
        root.right = build(mid + 1, right)
        return root

    return build(0, len(inorder) - 1)
```
- Time: O(n) — each node processed once, O(1) index lookup via the hashmap
- Space: O(n) for the hashmap + O(h) recursion stack

**Trick:** preorder always gives you the ROOT first (`preorder[0]`, then
next root, etc.). The inorder array tells you how many nodes belong to the
left subtree vs right subtree of that root (everything before the root's
position in inorder = left subtree, everything after = right subtree). The
hashmap for inorder positions is what turns a naive O(n) linear search per
node into O(1), avoiding an accidental O(n²).

---

## 30. Validate Binary Search Tree

**Problem:** Check if a tree is a valid BST.

**Brute force — in-order traversal, check strictly increasing:**
```python
def is_valid_bst_brute(root: TreeNode) -> bool:
    vals = []
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        vals.append(node.val)
        inorder(node.right)
    inorder(root)
    return all(vals[i] < vals[i+1] for i in range(len(vals) - 1))
```
- Time: O(n)
- Space: O(n) — stores all values

**Optimal — recursive bounds checking, no extra array:**
```python
def is_valid_bst(root: TreeNode) -> bool:
    def valid(node, low, high) -> bool:
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return (valid(node.left, low, node.val) and
                valid(node.right, node.val, high))

    return valid(root, float('-inf'), float('inf'))
```
- Time: O(n)
- Space: O(h) — recursion stack only, no extra array

**Trick:** a common bug is only checking `node.val > node.left.val` locally
— that misses violations from deeper descendants (e.g. a right-left
grandchild that's smaller than the root but bigger than its immediate
parent). Passing down a `(low, high)` valid range at every level catches
this correctly.

---

## 31. Kth Smallest Element in a BST

**Problem:** Find the kth smallest value in a BST.

**Brute force — full in-order traversal, index into result:**
```python
def kth_smallest_brute(root: TreeNode, k: int) -> int:
    vals = []
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        vals.append(node.val)
        inorder(node.right)
    inorder(root)
    return vals[k - 1]
```
- Time: O(n) — visits every node even if k is small
- Space: O(n)

**Optimal — iterative in-order traversal, stop early at kth element:**
```python
def kth_smallest(root: TreeNode, k: int) -> int:
    stack = []
    cur = root

    while stack or cur:
        while cur:              # go as far left as possible
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()        # this is the next smallest value (in-order)
        k -= 1
        if k == 0:
            return cur.val
        cur = cur.right
```
- Time: O(h + k) — where h = tree height; stops as soon as the kth element
  is found instead of traversing the whole tree
- Space: O(h) — stack holds at most one root-to-leaf path

---

## 32. Lowest Common Ancestor of a Binary Search Tree

**Problem:** Find the lowest common ancestor of two nodes in a BST.

**Brute force — find root-to-node paths for both, compare:**
```python
def lca_brute(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    def find_path(node, target, path):
        if not node:
            return False
        path.append(node)
        if node == target:
            return True
        if (node.val > target.val and find_path(node.left, target, path)) or \
           (node.val < target.val and find_path(node.right, target, path)):
            return True
        path.pop()
        return False

    path_p, path_q = [], []
    find_path(root, p, path_p)
    find_path(root, q, path_q)

    lca = None
    for a, b in zip(path_p, path_q):
        if a == b:
            lca = a
        else:
            break
    return lca
```
- Time: O(h) — h = tree height
- Space: O(h) — two path lists

**Optimal — use BST ordering property directly, no extra storage:**
```python
def lca(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    cur = root
    while cur:
        if p.val > cur.val and q.val > cur.val:
            cur = cur.right          # both targets are bigger -> go right
        elif p.val < cur.val and q.val < cur.val:
            cur = cur.left             # both targets are smaller -> go left
        else:
            return cur                   # split point (or one target IS cur) -> found LCA
    return None
```
- Time: O(h)
- Space: O(1) — iterative, no recursion stack or path storage

**Trick:** the moment `p` and `q` fall on different sides of `cur` (or
either equals `cur`), that node is the split point — the deepest node
that's still an ancestor of both. The BST property lets you decide
direction in O(1) per step without exploring both children.

---

## 33. Implement Trie (Prefix Tree)

**Problem:** Implement `insert`, `search`, and `startsWith` for a trie.

**Optimal — nested dictionary-based trie (the standard, optimal approach):**
```python
class TrieNode:
    def __init__(self):
        self.children = {}     # char -> TrieNode
        self.is_end = False      # marks end of a valid inserted word

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._find(word)
        return node is not None and node.is_end

    def starts_with(self, prefix: str) -> bool:
        return self._find(prefix) is not None

    def _find(self, word: str):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node
```
- Time: O(k) for insert/search/startsWith, where k = length of the word/prefix
- Space: O(ALPHABET_SIZE * N * k) worst case across all inserted words
  (shared prefixes reduce this in practice)

---

## 34. Design Add and Search Words Data Structure

**Problem:** Support adding words and searching with `.` as a wildcard
matching any single character.

**Optimal — trie + DFS for wildcard matching:**
```python
class WordDictionary:
    def __init__(self):
        self.root = {}     # nested dict trie; use a special key for "end of word"

    def add_word(self, word: str) -> None:
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node['$'] = True     # marker for end-of-word

    def search(self, word: str) -> bool:
        def dfs(node, i):
            if i == len(word):
                return '$' in node
            ch = word[i]
            if ch == '.':
                # wildcard: try EVERY child branch
                for child in node:
                    if child != '$' and dfs(node[child], i + 1):
                        return True
                return False
            else:
                if ch not in node:
                    return False
                return dfs(node[ch], i + 1)

        return dfs(self.root, 0)
```
- Time: `add_word` O(k). `search` O(k) average, **O(26^k) worst case** if
  the word is all wildcards (must branch into every possible child at
  every level)
- Space: O(N * k) for the trie, O(k) recursion stack per search

**Trick worth stating out loud:** the wildcard worst-case complexity is
genuinely exponential — say this explicitly if asked, don't understate it.
In practice it's fast because real tries are sparse (few children per
node), but the theoretical worst case matters for a complete answer.

---

## 35. Word Search II

**Problem:** Given a board of letters and a list of words, find all words
that can be formed by sequentially adjacent cells (no cell reused within
one word).

**Brute force — run a separate DFS "Word Search" for every word in the list:**
```python
def find_words_brute(board: list[list[str]], words: list[str]) -> list[str]:
    rows, cols = len(board), len(board[0])

    def exists(word):
        def dfs(r, c, i):
            if i == len(word):
                return True
            if (r < 0 or r >= rows or c < 0 or c >= cols or
                board[r][c] != word[i]):
                return False
            temp = board[r][c]
            board[r][c] = '#'    # mark visited
            found = (dfs(r+1, c, i+1) or dfs(r-1, c, i+1) or
                     dfs(r, c+1, i+1) or dfs(r, c-1, i+1))
            board[r][c] = temp     # backtrack
            return found

        for r in range(rows):
            for c in range(cols):
                if dfs(r, c, 0):
                    return True
        return False

    return [w for w in words if exists(w)]
```
- Time: O(W * rows * cols * 4^L) — W words, each triggering a full board
  scan with DFS branching factor 4, depth L = word length
- Space: O(L) recursion stack per search

**Optimal — build a trie of all words, single DFS pass over the board:**
```python
def find_words(board: list[list[str]], words: list[str]) -> list[str]:
    root = {}
    for word in words:
        node = root
        for ch in word:
            node = node.setdefault(ch, {})
        node['$'] = word    # store the full word at the end marker

    rows, cols = len(board), len(board[0])
    res = set()

    def dfs(r, c, node):
        ch = board[r][c]
        if ch not in node:
            return
        next_node = node[ch]
        if '$' in next_node:
            res.add(next_node['$'])

        board[r][c] = '#'    # mark visited so we don't reuse this cell
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                dfs(nr, nc, next_node)
        board[r][c] = ch      # backtrack — restore the cell

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, root)

    return list(res)
```
- Time: O(rows * cols * 4^L) — ONE board scan total (not per word), L =
  longest word length, since all words share the trie traversal
- Space: O(sum of word lengths) for the trie + O(L) recursion stack

**Trick:** building a single shared trie means the DFS explores all words
*simultaneously* as it walks the board — shared prefixes between words are
only explored once, instead of redoing the same board paths once per word
like the brute force does.

---

## Trees + Tries — summary table

| # | Problem | Brute Force | Optimal |
|---|---|---|---|
| 22 | Maximum Depth of Binary Tree | — | O(n) time, O(h) space |
| 23 | Same Tree | — | O(n) time, O(h) space |
| 24 | Invert Binary Tree | — | O(n) time, O(h) space |
| 25 | Binary Tree Maximum Path Sum | — | O(n) time, O(h) space |
| 26 | Binary Tree Level Order Traversal | — | O(n) time, O(n) space |
| 27 | Serialize and Deserialize Binary Tree | — | O(n) time, O(n) space |
| 28 | Subtree of Another Tree | O(m*n) | O(m+n) build + O(m*n) worst-case search (serialize approach) |
| 29 | Construct Tree from Preorder/Inorder | O(n²) naive index search | O(n) time, O(n) space (with hashmap) |
| 30 | Validate Binary Search Tree | O(n) time, O(n) space | O(n) time, O(h) space |
| 31 | Kth Smallest Element in a BST | O(n) time, O(n) space | O(h+k) time, O(h) space |
| 32 | Lowest Common Ancestor of BST | O(h) time, O(h) space | O(h) time, O(1) space |
| 33 | Implement Trie | — | O(k) per operation |
| 34 | Add and Search Word | — | O(k) avg, O(26^k) worst case search |
| 35 | Word Search II | O(W * rc * 4^L) | O(rc * 4^L) time, one shared trie |

---

*End of Part 3 (Trees + Tries). Next: Part 4 — Graph.*
