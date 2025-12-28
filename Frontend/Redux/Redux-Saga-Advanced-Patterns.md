
# Redux-Saga Advanced & Patterns – Interview Guide (Senior Level)

This document covers **advanced Redux-Saga concepts, concurrency patterns, and real-world usage** that are frequently asked in **senior React / frontend interviews**.

---

## 1. Blocking vs Non-Blocking Call

### Blocking Call
The saga **waits** for the task to complete before moving to the next line.

```js
yield call(apiCall);
```

- Execution pauses
- Easier error handling
- Sequential flow

---

### Non-Blocking Call
The saga **does not wait** and continues execution.

```js
yield fork(apiCall);
```

- Runs in background
- Enables parallel execution

---

## 2. Difference Between `call`, `fork`, and `spawn`

| Effect | Blocking | Linked to Parent | Error Propagation |
|------|----------|------------------|------------------|
| call | Yes | Yes | Yes |
| fork | No | Yes | Yes |
| spawn | No | No | No |

```js
yield call(task);
yield fork(task);
yield spawn(task);
```

---

## 3. What Happens When a Saga Throws an Error?
- Error propagates to the parent saga
- Saga execution stops
- Forked child sagas are cancelled

If unhandled, the saga crashes.

---

## 4. How Do You Handle Errors in Redux-Saga?
Use `try/catch` blocks inside sagas.

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

---

## 5. How Do You Cancel a Saga?
Cancellation can occur when:
- Parent saga is cancelled
- `cancel` effect is called explicitly

```js
const task = yield fork(workerSaga);
yield cancel(task);
```

---

## 6. What is `cancel` Effect?
`cancel` stops a running saga task.

```js
yield cancel(task);
```

Used to prevent:
- Stale API responses
- Unnecessary background tasks

---

## 7. What is `cancelled()`?
`cancelled()` checks if the saga was cancelled.

```js
finally {
  if (yield cancelled()) {
    console.log('Cleanup after cancellation');
  }
}
```

Useful for cleanup logic.

---

## 8. How Do You Debounce an API Call in Redux-Saga?
### Using `takeLatest`
```js
yield takeLatest('SEARCH', searchSaga);
```

### Using `delay`
```js
yield delay(500);
yield call(api);
```

Best for search inputs.

---

## 9. How Do You Throttle an API Call?
Limits execution to fixed intervals.

```js
yield throttle(1000, 'SCROLL', scrollSaga);
```

Used for scroll and resize events.

---

## 10. How to Retry a Failed API Request?
Use `retry` effect.

```js
yield retry(3, 1000, apiCall);
```

Retries 3 times with 1-second delay.

---

## 11. What is `all` Effect?
Runs multiple effects **in parallel**.

```js
yield all([
  call(fetchUsers),
  call(fetchOrders)
]);
```

---

## 12. Difference Between `all` and `race`

| all | race |
|----|-----|
| Waits for all effects | Resolves on first completion |
| Used for parallel tasks | Used for timeouts / cancellation |

---

## 13. What is `race` Effect Used For?
`race` runs multiple effects and returns the one that finishes first.

```js
yield race({
  data: call(api),
  timeout: delay(5000)
});
```

Used for:
- API timeouts
- Cancellation scenarios

---

## 14. How to Run Sagas in Parallel?
- Use `all`
- Use multiple `fork`

```js
yield all([
  fork(saga1),
  fork(saga2)
]);
```

---

## 15. How to Wait for Multiple Actions?
Use `take` with `all`.

```js
yield all([
  take('ACTION_ONE'),
  take('ACTION_TWO')
]);
```

Saga resumes after both actions are dispatched.

---

## 16. How to Create Reusable Sagas?
- Extract common logic into worker sagas
- Pass parameters to sagas

```js
function* apiWorker(apiFn, action) {
  const data = yield call(apiFn, action.payload);
}
```

---

## 17. How to Chain Sagas?
Dispatch actions from one saga to trigger another.

```js
yield put(actionOneSuccess());
```

Another saga listens:

```js
yield takeLatest('ACTION_ONE_SUCCESS', sagaTwo);
```

---

## Interview-Ready Summary
- `call` blocks, `fork/spawn` don’t
- Errors bubble unless handled
- Cancellation is explicit and controlled
- `all` runs parallel tasks
- `race` handles timeouts and cancellations
- Sagas can be composed, reused, and chained

---

## Conclusion
These patterns represent **production-grade Redux-Saga usage** and are commonly evaluated in **senior frontend interviews**.
