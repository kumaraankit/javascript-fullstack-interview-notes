# How the Web Works (with JavaScript)

---

## 1. What Happens When You Type a URL in the Browser?

### Step-by-step Flow

1. **URL Parsing**

   * Browser breaks URL into protocol, domain, port, path, query.
   * Example: `https://example.com/api/users`

2. **DNS Resolution**

   * Domain name → IP address (via DNS servers).

3. **TCP Connection**

   * Browser establishes TCP connection with the server.

4. **TLS Handshake (HTTPS)**

   * Secure connection using SSL/TLS encryption.

5. **HTTP Request Sent**

   * Browser sends an HTTP request to the server.

6. **Server Response**

   * Server responds with HTML, CSS, JS, JSON, etc.

7. **Rendering**

   * Browser parses and renders the page.

---

## 2. HTTP Request–Response Cycle

### Request Contains

* Method: GET, POST, PUT, DELETE
* Headers
* Body (optional)

### Response Contains

* Status code (200, 404, 500)
* Headers
* Body (HTML / JSON / JS)

### Example

```http
GET /api/users HTTP/1.1
Host: example.com
```

---

## 3. Browser Rendering Process

### Critical Rendering Path

1. Parse HTML → **DOM**
2. Parse CSS → **CSSOM**
3. DOM + CSSOM → **Render Tree**
4. Layout (reflow)
5. Paint

⚠️ JavaScript can block rendering if not optimized.

---

## 4. Role of JavaScript in the Web

JavaScript is responsible for:

* DOM manipulation
* Handling user interactions
* Fetching data from APIs
* Updating UI dynamically

Example:

```js
document.querySelector('button').addEventListener('click', () => {
  alert('Clicked');
});
```

---

## 5. JavaScript Execution in the Browser

### JavaScript Engine

* Chrome → V8
* Firefox → SpiderMonkey

### Execution Flow

1. Call Stack
2. Heap
3. Web APIs
4. Callback Queue
5. Event Loop

---

## 6. Event Loop (Very Important for Interviews)

### How Async JS Works

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
```

**Output:**

```
A
C
B
```

Explanation:

* `setTimeout` moves to Web API
* Callback waits in queue
* Event loop pushes it after stack is empty

---

## 7. Microtasks vs Macrotasks

### Microtasks

* Promise callbacks
* `queueMicrotask`

### Macrotasks

* setTimeout
* setInterval
* DOM events

Microtasks execute **before** macrotasks.

---

## 8. How JavaScript Interacts with the DOM

* DOM is not part of JS engine
* Browser exposes DOM via Web APIs

```js
const div = document.createElement('div');
div.textContent = 'Hello';
document.body.appendChild(div);
```

---

## 9. Fetching Data from Server (AJAX / Fetch)

```js
fetch('/api/users')
  .then(res => res.json())
  .then(data => console.log(data));
```

Flow:
JS → HTTP request → Server → Response → UI update

---

## 10. Single Page Applications (SPA)

* Page does not reload fully
* JS handles routing and DOM updates

Technologies:

* React
* Angular
* Vue

---

## 11. How Browser Stores Data

| Storage        | Scope           | Size | Persistence  |
| -------------- | --------------- | ---- | ------------ |
| Cookies        | Server + Client | ~4KB | Configurable |
| localStorage   | Client          | ~5MB | Permanent    |
| sessionStorage | Client          | ~5MB | Tab-based    |

---

## 12. Security Basics in Web

* CORS
* XSS
* CSRF
* HTTPS

Example (XSS risk):

```js
element.innerHTML = userInput; // Dangerous
```

---

## 13. Performance Optimization

* Minify JS
* Tree shaking
* Code splitting
* Lazy loading
* Avoid blocking scripts

---

## 14. How Backend and Frontend Work Together

1. Frontend sends request
2. Backend processes logic
3. Database interaction
4. Response sent back

JavaScript runs on:

* Browser (Frontend)
* Node.js (Backend)

---

## 15. JavaScript on the Server (Node.js)

* Non-blocking I/O
* Event-driven architecture

```js
app.get('/users', (req, res) => {
  res.json({ users: [] });
});
```

## 16. Summary

* Web works on **request–response** model
* Browser renders HTML/CSS and executes JS
* JavaScript enables dynamic behavior
* Event loop makes JS asynchronous

---
