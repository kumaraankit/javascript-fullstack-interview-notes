# Debounce vs Throttle in JavaScript

Understanding **Debounce** and **Throttle** is crucial in interviews because both are used to control how often a function executes—especially during high-frequency events like scrolling, resizing, or typing.

---

# 🔹 What is Debouncing?

Debouncing ensures that a function is executed **only after a certain time has passed without it being called again**.

### ✔ Best For

* Search input suggestions
* Auto-saving drafts
* Form validation while typing
* Window resize event

### 🧠 Interview Explanation

> "Debouncing groups multiple rapid calls into a single call. The function runs only when the user stops triggering the event for a specific delay."

### Example

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const handleInput = debounce(() => {
  console.log("API call triggered after user stopped typing");
}, 500);
```

---

# 🔹 What is Throttling?

Throttling ensures that a function executes **at most once in a fixed time interval**, no matter how many times it is triggered.

### ✔ Best For

* Scroll events
* Button spam clicks
* Drag and drop movement
* Infinite scroll loading

### 🧠 Interview Explanation

> "Throttling spreads out function calls so it runs once every X milliseconds, even if the event fires continuously."

### Example

```js
function throttle(fn, limit) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll handler called once every 300ms");
}, 300);
```

---

# 🔥 Visual Difference

```
User fires events rapidly:   █ █ █ █ █ █ █ █ █ █

Debounce executes:                     █
(Executes only after user stops)

Throttle executes:          █     █     █     █
(Executes at regular intervals)
```

---

# 🔍 When to Use What?

| Scenario                 | Debounce | Throttle |
| ------------------------ | -------- | -------- |
| Search typing            | ✅ Yes    | ❌ No     |
| API calls on input       | ✅ Yes    | ❌ No     |
| Window resize            | ✅ Yes    | ❌ No     |
| Scroll position tracking | ❌ No     | ✅ Yes    |
| Button repeated clicks   | ❌ No     | ✅ Yes    |
| Infinite scrolling       | ❌ No     | ✅ Yes    |

---

# 🎯 One-Line Interview Answers

### **Debounce**

"Debounce delays execution until the user stops triggering the event. It prevents unnecessary function calls."

### **Throttle**

"Throttle ensures a function runs at most once every X ms, even during continuous events."

---

# 🧩 Tricky Interview Example

### What will this do?

```js
const fn = debounce(() => console.log("Run"), 1000);
fn(); fn(); fn();
```

**Output:** `Run` (only once, after 1 second)

### What about throttle?

```js
const fn = throttle(() => console.log("Run"), 1000);
fn(); fn(); fn();
```

**Output:**

```
Run
(wait 1 second)
Run
```

---

# 🏁 Summary

* **Debounce** → Run function *after* user stops triggering the event.
* **Throttle** → Run function at most *once per interval*.
* Used for performance optimization.


