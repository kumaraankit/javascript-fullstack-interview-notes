# DRY Principle – Don’t Repeat Yourself

---

## 1. What Is the DRY Principle?

**DRY** stands for **Don’t Repeat Yourself**.

### Definition

> Every piece of knowledge or logic should have a **single, unambiguous, authoritative representation** within a system.

In simple words:

* ❌ Avoid duplicating logic
* ✅ Centralize behavior and rules

---

## 2. Why DRY Is Important

Repeating logic leads to:

* Bugs when one copy changes and others don’t
* Harder maintenance
* Inconsistent behavior

Benefits of DRY:

* Easier refactoring
* Better readability
* Improved maintainability
* Reduced bugs

---

## 3. Common DRY Violations

---

## 3.1 Duplicate Business Logic

### ❌ Violation

```js
function calculateTax(price) {
  return price * 0.18;
}

function getInvoiceTotal(price) {
  return price + price * 0.18;
}
```

Tax logic is duplicated.

### ✅ Solution

```js
function calculateTax(price) {
  return price * 0.18;
}

function getInvoiceTotal(price) {
  return price + calculateTax(price);
}
```

---

## 3.2 Copy-Paste Code Across Files

### ❌ Violation

```js
if (!email.includes('@')) {
  throw new Error('Invalid email');
}
```

Repeated in many places.

### ✅ Solution

```js
function validateEmail(email) {
  if (!email.includes('@')) throw new Error('Invalid email');
}
```

---

## 3.3 Duplicate UI Components (Frontend)

### ❌ Violation

```jsx
<button className="primary">Save</button>
<button className="primary">Submit</button>
```

### ✅ Solution

```jsx
function PrimaryButton({ label }) {
  return <button className="primary">{label}</button>;
}
```

---

## 4. DRY vs Abstraction (Important Distinction)

⚠️ **DRY does NOT mean creating abstractions everywhere**.

### Over-Abstraction (Bad)

```js
function processA() { common(); }
function processB() { common(); }
function common() { /* unclear logic */ }
```

### Correct DRY

* Extract **only meaningful shared behavior**
* Avoid premature abstraction

---

## 5. DRY in Backend Architecture

### Example: Validation Logic

❌ Validation in Controller + Service

```js
if (!user.email) throw new Error('Required');
```

✅ Centralized Validator

```js
class UserValidator {
  static validate(user) {
    if (!user.email) throw new Error('Required');
  }
}
```

---

## 6. DRY in Frontend Applications

### Component Reuse

* Buttons
* Modals
* Form inputs

### Custom Hooks (React)

```js
function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, [url]);
  return data;
}
```

---

## 7. DRY and Configuration Duplication

### ❌ Violation

```js
const API_URL = 'https://api.example.com';
```

Repeated everywhere.

### ✅ Solution

```js
export const API_URL = 'https://api.example.com';
```

---

## 8. DRY vs WET Code

**WET** means:

* Write Everything Twice
* We Enjoy Typing

DRY eliminates WET behavior by centralizing logic.

---

## 9. When NOT to Apply DRY

Important interview insight ❗

Do NOT force DRY when:

* Logic is likely to diverge
* Abstraction reduces readability
* Early-stage experimentation

Duplication is sometimes better than **wrong abstraction**.

---

## 10. DRY vs SOLID (Relationship)

* DRY complements **SRP**
* DRY helps **OCP** by centralizing logic
* DRY improves maintainability

But DRY alone does NOT guarantee good design.

---

## 11. Interview-Ready Explanation (30 Seconds)

> “The DRY principle means avoiding duplication of logic by having a single source of truth. It improves maintainability and reduces bugs, but should be applied carefully to avoid over-abstraction.”

---

## 12. Summary

* DRY = single source of truth
* Reduces bugs and maintenance cost
* Overusing DRY causes complexity
* Apply pragmatically

