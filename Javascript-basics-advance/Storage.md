# localStorage vs sessionStorage vs Cookies

This document explains the differences between **localStorage**, **sessionStorage**, and **Cookies** in a clear, interview-ready format. Suitable for frontend, backend, and SDE-2 level interview preparation.

---

## 1. localStorage

### What is it?

A browser-based storage mechanism that stores key–value pairs **persistently** with no expiration time.

### Key Characteristics

* Data persists even after browser restart
* Stored per **origin** (protocol + domain + port)
* Accessible only via JavaScript
* **Not sent** with HTTP requests

### Capacity

* ~5–10 MB per origin

### Example

```js
localStorage.setItem("token", "abc123");
const token = localStorage.getItem("token");
localStorage.removeItem("token");
localStorage.clear();
```

### Common Use Cases

* Theme or language preferences
* Client-side caching
* Remembering UI state

### Pros

* Large storage size
* Simple API
* Persistent

### Cons

* Vulnerable to XSS attacks
* No built-in expiration
* Not accessible by the server

> ⚠️ **Do NOT store authentication tokens in localStorage in production**

---

## 2. sessionStorage

### What is it?

Similar to localStorage, but data exists only for the **current browser tab session**.

### Key Characteristics

* Cleared automatically when the tab/window is closed
* Separate storage per tab
* Accessible only via JavaScript
* **Not sent** with HTTP requests

### Capacity

* ~5 MB per tab

### Example

```js
sessionStorage.setItem("step", "2");
const step = sessionStorage.getItem("step");
sessionStorage.clear();
```

### Common Use Cases

* Multi-step forms
* Temporary user flows (OTP, onboarding)
* Wizard-style UI state

### Pros

* Auto cleanup on tab close
* Safer for temporary data

### Cons

* Still vulnerable to XSS
* Data lost when tab closes

---

## 3. Cookies

### What are Cookies?

Small pieces of data stored in the browser and **automatically sent with every HTTP request** to the server.

### Key Characteristics

* Accessible by both client and server
* Can have expiration and security flags
* Used heavily for authentication

### Capacity

* ~4 KB per cookie
* ~20–50 cookies per domain

### Client-side Example

```js
document.cookie = "token=abc123; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
```

### Server-side Example (Node.js / Express)

```js
res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
});
```

### Important Security Flags

| Flag              | Purpose                                     |
| ----------------- | ------------------------------------------- |
| HttpOnly          | Prevents JavaScript access (XSS protection) |
| Secure            | Sent only over HTTPS                        |
| SameSite          | Protects against CSRF                       |
| Max-Age / Expires | Controls cookie lifetime                    |

### Common Use Cases

* Authentication (JWT, session IDs)
* CSRF protection
* Server-side sessions

### Pros

* Accessible by server
* Secure when configured properly
* Required for modern authentication flows

### Cons

* Very small storage size
* Sent on every request (performance overhead)

---

## Comparison Table

| Feature                  | localStorage | sessionStorage | Cookies                 |
| ------------------------ | ------------ | -------------- | ----------------------- |
| Lifetime                 | Permanent    | Tab session    | Configurable            |
| Size                     | 5–10 MB      | ~5 MB          | ~4 KB                   |
| Sent with HTTP request   | ❌ No         | ❌ No           | ✅ Yes                   |
| Accessible by JavaScript | ✅ Yes        | ✅ Yes          | ✅ Yes (unless HttpOnly) |
| Accessible by Server     | ❌ No         | ❌ No           | ✅ Yes                   |
| XSS Protection           | ❌ No         | ❌ No           | ✅ (HttpOnly)            |
| CSRF Protection          | ❌ No         | ❌ No           | ✅ (SameSite)            |

---

## Interview Rule of Thumb (SDE-2)

* ✅ **Authentication / Authorization** → Cookies (`HttpOnly + Secure + SameSite`)
* ✅ **Temporary UI state** → sessionStorage
* ✅ **User preferences / caching** → localStorage

🚫 **Never store JWTs in localStorage for production authentication**

---
