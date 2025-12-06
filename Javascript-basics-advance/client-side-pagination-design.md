# Client-Side Pagination Design

### A Complete, Interview-Ready Guide (SDE-2 Level)

------------------------------------------------------------------------

# 📌 Introduction

Client-side pagination is a UI/UX + performance pattern where **all data
is fetched at once**, stored in memory on the client (browser), and the
view renders only the relevant subset (page).

It is widely used when:\
- Dataset size is reasonably small (e.g., \< 5000--10000 items)\
- No need for continuous syncing with the server\
- Faster navigation across pages is required\
- Offline or semi-offline viewing is supported

Client-side pagination is common in dashboards, tables, admin UIs, and
static datasets.

------------------------------------------------------------------------

# 🚀 Why Client-Side Pagination?

### ✔ Advantages

-   Instant page switching (no network calls)\
-   Smooth UX\
-   Lower load on server\
-   Supports local filtering, searching, sorting

### ✔ Disadvantages

-   Large datasets → high memory usage\
-   Initial load time is larger (fetch all data first)\
-   Not suitable for millions of records

------------------------------------------------------------------------

# 🧠 When to Use Client-Side Pagination?

Use client-side pagination when:\
1. Data size is small-to-medium (\<100k records ideally)\
2. All data can be loaded with a single API call\
3. You want fast filtering/sorting locally\
4. Offline or cached experience matters\
5. UX demands instant switching

------------------------------------------------------------------------

# 🧩 When NOT to Use Client-Side Pagination

Avoid client-side pagination when:\
1. Dataset is huge (1M+)\
2. Data changes frequently\
3. Server-side sorting/filtering/searching is required\
4. Network constraints limit large payloads\
5. Memory restrictions (mobile devices)

------------------------------------------------------------------------

# 🔧 Architecture of Client-Side Pagination

### Step-by-step architecture:

    [Server] → (Fetch all data once) → [Client Memory Cache] → [Pagination Logic] → [UI Rendering]

### Components:

1.  **Data Fetching Layer**\
    Fetch entire dataset once using REST/GraphQL.\
    Store in:

    -   React state\
    -   Redux\
    -   LocalStorage\
    -   In-memory variable

2.  **Pagination Engine**\
    Inputs:

    -   currentPage\
    -   pageSize\
    -   dataset

    Outputs:

    -   paginatedData\
    -   totalPages\
    -   boundary states (first/last page)

3.  **UI Renderer**\
    Table/list/grid that displays paginated slice.

4.  **Controls**

    -   Next / Previous\
    -   Page numbers\
    -   Page size selector\
    -   Go to page input (optional)

------------------------------------------------------------------------

# 📐 Pagination Formula

The slice of data to display for any page is:

    startIndex = (currentPage - 1) * pageSize  
    endIndex = currentPage * pageSize
    pageData = data.slice(startIndex, endIndex)

Example:\
Page = 2, Page Size = 10\
`start = 10`, `end = 20`

------------------------------------------------------------------------

# 🧪 Example JavaScript Implementation

``` js
function paginate(data, currentPage = 1, pageSize = 10) {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  return {
    pageData: data.slice(startIndex, endIndex),
    totalPages,
    currentPage,
    pageSize
  };
}
```

------------------------------------------------------------------------

# ⚛ Example React Client-Side Pagination Design

``` jsx
import { useState, useEffect } from "react";

export default function ClientPagination() {
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/products");
      const json = await res.json();
      setAllData(json);
    }
    loadData();
  }, []);

  const totalPages = Math.ceil(allData.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = page * pageSize;

  const paginatedData = allData.slice(start, end);

  return (
    <div>
      <h2>Products</h2>

      {paginatedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}

      <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
        Prev
      </button>

      <span>{page} / {totalPages}</span>

      <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
        Next
      </button>
    </div>
  );
}
```

------------------------------------------------------------------------

# 🧠 Client-Side Pagination Performance Tips

### ✔ 1. Virtualized Lists

Use:\
- react-window\
- react-virtualized

Only render what is visible---boosts performance for 100k+ rows.

### ✔ 2. Use memoization

Memoize slices so they aren't recalculated unnecessarily.

### ✔ 3. Avoid storing paginated data in state

Store only:\
- data\
- page\
- pageSize

Let UI derive paginated view.

------------------------------------------------------------------------

# 🧩 Interview-Level Explanation (SDE-2 Recommended Answer)

> *"Client-side pagination loads the entire dataset once and performs
> slicing in the browser.\
> It improves responsiveness for small/medium datasets but increases
> memory usage and initial load time.\
> The architecture includes a data-fetch layer, a pagination algorithm,
> and dynamic UI rendering.\
> We compute page slices using indexes based on page number and page
> size.\
> Client-side pagination gives instant page transitions and supports
> local filtering/sorting without extra server load."*

------------------------------------------------------------------------

# 🏁 Final Summary

Client-side pagination is a powerful design when performance and UX
matter and the dataset fits in memory.\
It's simple, fast, and enables offline-like behavior with local
filtering and sorting.

If the dataset grows large or requires server filtering, **switch to
server-side or hybrid pagination**.

------------------------------------------------------------------------
