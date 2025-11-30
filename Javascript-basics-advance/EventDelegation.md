# Event Delegation in JavaScript

## 📌 What is Event Delegation?

Event delegation is a technique in JavaScript where instead of attaching an event listener to multiple child elements individually, you attach a **single event listener to their parent element**, and use event bubbling to catch events from the children.

This works because events bubble up from the target element to its ancestors.

---

## 🧠 Why Event Delegation?

### ✅ **Improved Performance**

* Instead of adding *N* event listeners for *N* child elements, you add **only one** to the parent.
* Saves memory and reduces overhead.

### ✅ **Handles Future Elements**

* Works for dynamically added child elements.
* No need to reattach listeners.

### ❌ **Potential Disadvantages**

* Not ideal for events that **don’t bubble** (e.g., `blur`, `focus`).
* Event logic may become more complex due to checking `event.target`.

---

## 🔍 How It Works — Visual Diagram

```
Parent (Event Listener Attached)
│
├── Child 1 (Click → bubbles up → parent handles)
├── Child 2
└── Child 3
```

Event Flow:

```
[Child Element Clicked]
      ↓  (Event bubbles)
[Parent Handles the Event]
```

---

## 🧪 Basic Example

### Without Event Delegation ❌

```js
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', () => {
    console.log(`Clicked on ${item.textContent}`);
  });
});
```

**Problem:** Attaches multiple listeners.

### With Event Delegation ✔

```js
document.querySelector('#parent').addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    console.log(`Clicked on ${e.target.textContent}`);
  }
});
```

---

## 💡 Tricky / Interview-Level Examples

### ### 1️⃣ Handling Dynamically Added Elements

```js
const parent = document.querySelector('#parent');

parent.addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    console.log('Button clicked:', e.target.innerText);
  }
});

// Adding elements later
document.querySelector('#add').addEventListener('click', () => {
  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.innerText = 'New Button';
  parent.appendChild(btn);
});
```

**Why Delegation Helps:** No need to attach listeners to newly created buttons.

---

### 2️⃣ Stop Event Delegation Using `stopPropagation()`

```js
document.querySelector('#parent').addEventListener('click', () => {
  console.log('Parent clicked');
});

document.querySelector('#child').addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('Child clicked');
});
```

**Result:** Child click does **not** bubble to parent.

---

### 3️⃣ Delegating Multiple Event Types

```js
const parent = document.querySelector('#list');

parent.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.style.background = 'lightblue';
  }
});

parent.addEventListener('mouseout', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.style.background = '';
  }
});
```

---

### 4️⃣ Efficient Table Click Handling

```js
document.querySelector('table').addEventListener('click', (e) => {
  const cell = e.target.closest('td');
  if (!cell) return;

  console.log('Cell value:', cell.innerText);
});
```

Uses `closest()` — very common in real-world code.

---

## 🧠 Key Notes for Interviews

* Uses **event bubbling**.
* Reduces **memory footprints**.
* Works perfectly with dynamically generated elements.
* Requires careful **target checking**.
* Not all events bubble → e.g., `focus`, `blur`.
* `event.target` vs `event.currentTarget` is a common interview twist.

---

## 🆚 Event Delegation vs Direct Binding

| Feature          | Direct Binding            | Event Delegation         |
| ---------------- | ------------------------- | ------------------------ |
| Performance      | ❌ Adds multiple listeners | ✔ Single listener        |
| Dynamic Elements | ❌ Re-bind required        | ✔ Auto-handles           |
| Complexity       | ✔ Simple                  | ❌ Requires target checks |
| Bubbling         | Not needed                | Required                 |

---

## 📘 Conclusion

Event delegation is a powerful JavaScript pattern that improves performance, reduces memory usage, and is essential for working with dynamic DOM structures.
