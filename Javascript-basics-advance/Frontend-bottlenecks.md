# Common Frontend Bottlenecks

Modern frontend applications often feel slow not because of server latency, but due to bottlenecks introduced inside the browser. As an SDE-2, understanding these bottlenecks—and optimizing for them—is critical for delivering responsive, production-grade web applications.

This document summarizes the most common frontend bottlenecks, why they happen, and proven engineering approaches to fix them.

---

## 1. Large JavaScript Bundle Size

### Why It Happens
- Shipping unnecessary JavaScript.
- One large monolithic bundle.
- Lack of tree shaking.
- Heavy polyfills included for all users.

### Impact
- Increased JS parsing + execution time.
- Slower First Contentful Paint (FCP).
- Low-end devices struggle due to CPU cost.

### Fix
- Apply **code-splitting** using dynamic imports.
- Use **tree shaking** aggressively.
- Remove unused dependencies.
- Use modern formats + targeted builds (e.g., browserslist).

---

## 2. Excessive Re-Renders (React/Vue/Angular)

### Why It Happens
- Passing new object references on every render.
- Overuse of context in React.
- Not memoizing expensive operations.
- State placed too high in the component tree.

### Impact
- UI lag during interactions.
- Dropped frames.
- High CPU usage.

### Fix
- Apply `React.memo`, `useCallback`, and `useMemo`.
- Move global state to lightweight stores (Zustand/Jotai).
- Split components for finer granular updates.
- Avoid unnecessary reactivity in frameworks.

---

## 3. Heavy DOM Manipulation

### Why It Happens
- Direct DOM manipulation instead of virtual DOM.
- Layout reads/writes in tight loops.
- Forced synchronous reflow.

### Impact
- Layout thrashing.
- Janky animations.
- Slower paint & rendering.

### Fix
- Batch DOM updates.
- Separate reads and writes.
- Use `requestAnimationFrame()` for animation operations.

---

## 4. Unoptimized Images

### Why It Happens
- Serving full-resolution images.
- Using PNG/JPG instead of WebP/AVIF.
- No lazy loading.

### Impact
- Slow page load.
- High memory usage.
- Poor mobile performance.

### Fix
- Serve responsive images via `srcset`.
- Use modern formats.
- Apply `loading="lazy"` for below-the-fold content.

---

## 5. Main Thread Blocking

### Why It Happens
- Long JavaScript tasks.
- Complex loops and expensive computations.
- Large JSON parsing.
- Hydration cost in SPA frameworks.

### Impact
- UI freeze / unresponsive app.
- Low Time to Interactive (TTI).

### Fix
- Offload heavy work to **Web Workers**.
- Use streaming + chunked rendering.
- Adopt React Server Components where applicable.

---

## 6. Chatty or Unoptimized API Calls

### Why It Happens
- Making repeated API calls for the same data.
- No caching.
- No batching.
- Not debouncing search inputs.

### Impact
- Extra network latency.
- Unnecessary rerenders.
- UX feels slow.

### Fix
- Use React Query / SWR for caching and dedup.
- Debounce input-driven requests.
- Batch multiple API operations when possible.

---

## 7. Inefficient CSS

### Why It Happens
- Deeply nested selectors.
- Loading complete CSS frameworks.
- Unused CSS not removed.

### Impact
- Slower style recalculation.
- Larger payload size.

### Fix
- Use Tailwind or utility-first CSS.
- Enable PurgeCSS or similar.
- Keep CSS modular and flat.

---

## 8. Large Rendering Surfaces

### Why It Happens
- Rendering huge tables/lists (e.g., 10k rows).
- Large chart visualizations.
- Re-rendering entire UI for small changes.

### Impact
- High memory usage.
- Low FPS when scrolling.
- Sluggish interaction.

### Fix
- Use virtualization libraries (react-window, react-virtualized).
- Lazy render heavy UI components.
- Split UI into smaller rendering units.

---

## 9. Inefficient Event Handlers

### Why It Happens
- Attaching listeners to many DOM elements.
- No debouncing for input, scroll, resize.
- Expensive logic inside handlers.

### Impact
- Triggering heavy computation frequently.
- Layout thrashing due to event firing.

### Fix
- Debounce or throttle events.
- Use event delegation.
- Avoid work inside scroll/resize handlers.

---

## 10. Memory Leaks

### Why It Happens
- Unremoved event listeners.
- Stale closures capturing large objects.
- Retained DOM references.
- Large caches not cleared.

### Impact
- Slow app performance over time.
- Increased garbage collection.
- Potential crashes on low-memory devices.

### Fix
- Clean up listeners in SPA frameworks.
- Audit memory via Chrome DevTools.
- Avoid global variables holding DOM/data.

---

# When Should You Investigate Bottlenecks?

Investigate when:
- FCP/LCP/TTI are degraded.
- FPS drops below 40.
- Inputs lag or UI freezes.
- CPU usage is consistently high.
- Memory keeps rising over time.

Tools to monitor:
- Chrome DevTools Performance
- Lighthouse
- JS Profiler
- Memory Profiler
- Network Panel

---

# Conclusion

A performant frontend is built by:
- Minimizing JavaScript load
- Reducing main thread pressure
- Optimizing rendering cycles
- Keeping the DOM & CSS lightweight
- Using smarter data fetching strategies


