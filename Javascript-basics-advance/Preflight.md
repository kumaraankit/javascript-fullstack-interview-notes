# Preflight Request in HTTP (CORS)

This document explains the concept of **Preflight Request**, commonly encountered in web development and backend interviews.

---

## 1. What is a Preflight Request?

A **Preflight Request** is an **HTTP OPTIONS request** sent by the browser **before the actual request** to determine if the cross-origin request is safe to send.

It is part of **CORS (Cross-Origin Resource Sharing)** mechanism.

* Only triggered for **non-simple requests** (e.g., methods other than GET, POST, HEAD or with custom headers)
* Helps the server indicate which HTTP methods and headers are allowed from the client origin

---

## 2. When is Preflight Triggered?

A preflight request is sent automatically by the browser in cases such as:

1. HTTP method is not **GET, POST, or HEAD** (e.g., PUT, DELETE, PATCH)
2. Custom headers are added (e.g., `Authorization`, `X-Custom-Header`)
3. Content-Type is not `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`

---

## 3. Preflight Request Flow

1. Browser sends **OPTIONS request** to the server with headers:

```http
OPTIONS /api/data HTTP/1.1
Origin: https://example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Authorization, Content-Type
```

2. Server responds with allowed methods, headers, and origin:

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Max-Age: 86400
```

3. If the response allows it, **browser sends actual request** (GET/POST/PUT)

---

## 4. Key Headers

### Request Headers (Preflight)

| Header                         | Purpose                          |
| ------------------------------ | -------------------------------- |
| Origin                         | Origin of the request            |
| Access-Control-Request-Method  | HTTP method of actual request    |
| Access-Control-Request-Headers | Custom headers of actual request |

### Response Headers (Server)

| Header                       | Purpose                           |
| ---------------------------- | --------------------------------- |
| Access-Control-Allow-Origin  | Allowed origin                    |
| Access-Control-Allow-Methods | Allowed HTTP methods              |
| Access-Control-Allow-Headers | Allowed headers                   |
| Access-Control-Max-Age       | Time in seconds to cache response |

---

## 5. Example (Node.js / Express)

```js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://example.com',
  methods: ['GET','POST','PUT'],
  allowedHeaders: ['Content-Type','Authorization']
}));

app.put('/api/data', (req, res) => {
  res.json({ message: 'Data updated' });
});

app.listen(3000);
```

✅ Browser handles the preflight automatically when the client tries to PUT with `Authorization` header

---

## 6. Why is it Important?

* Ensures **security for cross-origin requests**
* Prevents unauthorized requests from unknown origins
* Helps servers define **allowed methods and headers**

---

## 7. Optimization Tips

* **Reduce Preflights** by:

  * Using simple requests when possible
  * Avoiding unnecessary custom headers
  * Using `Access-Control-Max-Age` to cache preflight responses

---

## 8. Summary

> A **preflight request** is an automatic **OPTIONS request sent by browsers** to check if the server allows the actual cross-origin request. It ensures security and compliance with **CORS**.

---
