# Difference Between `event.target` and `event.currentTarget`

Understanding the difference between `event.target` and `event.currentTarget` is **crucial for DOM events**, especially for:

* Event bubbling & capturing
* Event delegation
* Writing bug-free UI code

This is a **frequently asked SDE-2 interview question**.

---

## Quick Interview Answer

> `event.target` is the **actual element that triggered the event**, while `event.currentTarget` is the **element on which the event handler is currently executing**.

---

## Basic Definitions

### event.target

* The **original source** of the event
* The deepest element that initiated the event
* Does **not change** during bubbling/capturing

---

### event.currentTarget

* The element to which the **event listener is attached**
* Changes as the event bubbles or captures

---

## Simple Example

### HTML

```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

### JavaScript

```js
document.getElementById('parent').addEventListener('click', function (e) {
  console.log('target:', e.target.id);
  console.log('currentTarget:', e.currentTarget.id);
});
```

### When Button Is Clicked

```text
target: child
currentTarget: parent
```

---

## Why Are They Different?

Because of **event bubbling**:

1. Event starts at the target element
2. Bubbles up through ancestors
3. Each ancestor runs its handler

`target` stays the same, `currentTarget` changes.

---

## Event Bubbling Flow (Visualization)

```text
button (target)
  ↓
div (currentTarget)
  ↓
body
  ↓
document
```

---

## Example with Multiple Listeners

```js
parent.addEventListener('click', e => {
  console.log('Parent currentTarget:', e.currentTarget.id);
});

child.addEventListener('click', e => {
  console.log('Child currentTarget:', e.currentTarget.id);
});
```

Clicking child prints:

```text
Child currentTarget: child
Parent currentTarget: parent
```

---

## Event Delegation (Very Important)

Event delegation relies heavily on `event.target`.

```js
document.getElementById('list').addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked item:', e.target.textContent);
  }
});
```

* Listener attached to parent
* Logic based on `target`

---

## target vs currentTarget — Comparison Table

| Feature                 | event.target           | event.currentTarget   |
| ----------------------- | ---------------------- | --------------------- |
| Refers to               | Actual clicked element | Element with listener |
| Changes during bubbling | ❌ No                   | ✅ Yes                 |
| Used in delegation      | ✅ Yes                  | ❌ No                  |
| Depends on listener     | ❌ No                   | ✅ Yes                 |

---

## Capturing Phase Behavior

During capturing:

```js
element.addEventListener('click', handler, true);
```

* `target` → still original element
* `currentTarget` → capturing element

---

## Common Mistakes

❌ Using `currentTarget` instead of `target` in delegation
❌ Assuming both are always same
❌ Confusing `this` with `target`

---

## this vs event.currentTarget

```js
element.addEventListener('click', function (e) {
  console.log(this === e.currentTarget); // true
});
```

In normal event listeners:

* `this === event.currentTarget`

---

## Interview One-Liners (SDE-2)

* "target is where event originated"
* "currentTarget is where handler runs"
* "target is key for event delegation"
* "currentTarget changes during bubbling"

---

## Key Takeaways

* `event.target` → source of event
* `event.currentTarget` → handler owner
* Understanding both avoids subtle bugs

---
