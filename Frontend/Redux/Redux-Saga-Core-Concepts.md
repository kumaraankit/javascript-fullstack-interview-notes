
# Redux-Saga Core Concepts – Interview Guide

This document explains **Redux-Saga core concepts and effects** that are commonly asked in **senior React / Redux interviews**.

---

## 1. What is a Saga?
A **Saga** is a generator function that handles **side effects** in a Redux application.

It:
- Listens to dispatched actions
- Performs async logic (API calls, delays, retries)
- Dispatches new actions

```js
function* fetchUsersSaga() {
  // saga logic
}
```

---

## 2. What are Generator Functions?
Generator functions are special JavaScript functions that can **pause and resume execution**.

They are defined using `function*` and use `yield`.

```js
function* generatorExample() {
  yield 1;
  yield 2;
}
```

Redux-Saga uses generators to **control async execution flow**.

---

## 3. What is an Effect in Redux-Saga?
An **effect** is a plain JavaScript object that describes an operation to be executed by the saga middleware.

Examples of effects:
- `call`
- `put`
- `take`
- `fork`
- `select`
- `delay`

```js
yield call(apiCall);
```

✔ Effects are declarative  
✔ Saga middleware executes them

---

## 4. Difference Between `call` and `fork`

| call | fork |
|----|-----|
| Blocking | Non-blocking |
| Waits for result | Runs in background |
| Used for sequential logic | Used for parallel tasks |

```js
yield call(fetchData); // waits
yield fork(fetchData); // does not wait
```

---

## 5. Difference Between `put` and `dispatch`

| put | dispatch |
|----|----------|
| Redux-Saga effect | Redux store method |
| Yielded inside saga | Used in components |
| Controlled by middleware | Immediate |

```js
yield put(fetchSuccess(data));
```

---

## 6. What Does `take` Do?
`take` pauses the saga until a specific action is dispatched.

```js
yield take('FETCH_USERS');
```

✔ Listens for one action  
✔ Blocking effect  

---

## 7. What is `takeEvery`?
`takeEvery` listens for every occurrence of an action and runs a saga for each.

```js
yield takeEvery('FETCH_USERS', fetchUsersSaga);
```

✔ Allows concurrent executions  
✔ Good for logging, analytics

---

## 8. What is `takeLatest`?
`takeLatest` runs only the **latest** saga and cancels previous ones.

```js
yield takeLatest('SEARCH_USERS', searchSaga);
```

✔ Prevents stale API responses  
✔ Ideal for search and filters

---

## 9. When to Use `takeEvery` vs `takeLatest`

| Scenario | Recommended |
|-------|------------|
| Logging | takeEvery |
| Analytics | takeEvery |
| Form submit | takeLatest |
| Search | takeLatest |

---

## 10. What Does `delay` Effect Do?
`delay` pauses the saga for a specified time.

```js
yield delay(1000);
```

✔ Useful for debouncing  
✔ Used in retry logic  

---

## 11. What is `select` Effect?
`select` is used to **read data from Redux store** inside a saga.

```js
const user = yield select(state => state.user);
```

✔ Access current state  
✔ Avoids passing state via actions

---

## Interview-Ready Summary
- Saga = generator handling side effects
- Generators allow pause/resume
- Effects describe async operations
- call vs fork controls blocking behavior
- takeEvery vs takeLatest controls concurrency
- select reads state inside saga

---

## Conclusion
Understanding Redux-Saga core effects is essential for **building scalable and predictable async workflows** and is frequently tested in **senior frontend interviews**.
