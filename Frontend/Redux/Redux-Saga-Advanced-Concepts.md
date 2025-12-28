
# Redux-Saga Advanced Concepts – Interview Guide

This document covers **advanced Redux-Saga concepts** commonly asked in **senior frontend / React interviews**, focusing on concurrency, error handling, cancellation, and performance control.

---

## 1. Blocking vs Non-Blocking Calls

### Blocking Call
- Saga waits until the task finishes
- Execution pauses

```js
yield call(apiCall);
```

✔ Sequential execution  
✔ Easier error handling  

---

### Non-Blocking Call
- Saga continues execution immediately
- Task runs in background

```js
yield fork(apiCall);
```

✔ Parallel execution  
✔ Useful for background tasks  

---

## 2. Difference Between `call`, `fork`, and `spawn`

| Effect | Blocking | Linked to Parent | Error Propagation |
|------|----------|------------------|------------------|
| call | Yes | Yes | Yes |
| fork | No | Yes | Yes |
| spawn | No | No | No |

```js
yield call(task);   // waits
yield fork(task);   // runs in background
yield spawn(task); // detached
```

---

## 3. What Happens When a Saga Throws an Error?
- Error bubbles up to the parent saga
- Saga execution stops
- Forked tasks are cancelled

```js
function* saga() {
  throw new Error('Failed');
}
```

❗ Without handling, saga crashes

---

## 4. How Do You Handle Errors in Redux-Saga?
Use `try/catch` blocks.

```js
function* fetchSaga() {
  try {
    const data = yield call(api);
    yield put(success(data));
  } catch (err) {
    yield put(failure(err.message));
  }
}
```

✔ Centralized error handling  
✔ Clean async flow  

---

## 5. How Do You Cancel a Saga?
Saga cancellation happens when:
- Parent saga is cancelled
- Explicit `cancel` effect is used

```js
const task = yield fork(worker);
yield cancel(task);
```

---

## 6. What is `cancel` Effect?
`cancel` stops a running saga task.

```js
yield cancel(task);
```

✔ Used in cleanup  
✔ Prevents stale API responses  

---

## 7. What is `cancelled()`?
`cancelled()` checks if a saga was cancelled.

```js
finally {
  if (yield cancelled()) {
    console.log('Saga cancelled');
  }
}
```

✔ Useful for cleanup logic  

---

## 8. How Do You Debounce an API Call in Redux-Saga?
Debouncing delays execution until actions stop firing.

```js
function* debounceSaga() {
  yield delay(500);
  yield call(api);
}
```

Or using `takeLatest`:

```js
yield takeLatest('SEARCH', searchSaga);
```

✔ Ideal for search inputs  

---

## 9. How Do You Throttle an API Call?
Throttling limits execution to fixed intervals.

```js
yield throttle(1000, 'SCROLL', scrollSaga);
```

✔ Used for scroll, resize events  

---

## 10. How to Retry a Failed API Request?
Use `retry` effect.

```js
yield retry(3, 1000, apiCall);
```

✔ Retries 3 times  
✔ 1 second delay between retries  

---

## 11. What is `all` Effect?
`all` runs multiple effects in parallel.

```js
yield all([
  call(fetchUsers),
  call(fetchPosts)
]);
```

✔ Improves performance  
✔ Parallel execution  

---

## Interview-Ready Summary
- call is blocking, fork/spawn are non-blocking
- spawn detaches task completely
- Errors bubble unless handled
- Cancellation prevents stale work
- debounce and throttle control API calls
- retry handles transient failures
- all runs tasks in parallel

---

## Conclusion
Mastering these Redux-Saga patterns enables **robust, scalable, and high-performance async workflows**, and is a key expectation in **senior React interviews**.
