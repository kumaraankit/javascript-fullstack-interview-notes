# HTTP — Master Notes

## 1. Definition

**HTTP (HyperText Transfer Protocol)** is an **application-layer protocol** used for communication between clients and servers over a network.

It follows a **request-response model**:

```text
Client
   │
   │ HTTP Request
   ↓
Server
   │
   │ HTTP Response
   ↓
Client
```

### Key characteristics

- Application-layer protocol
- Client-server model
- Request-response based
- Stateless by design
- Uses methods such as GET, POST, PUT, PATCH and DELETE
- Uses status codes to communicate the result of a request

---

## 2. HTTP Request

An HTTP request is a message sent by a client to a server asking it to perform an operation or return a resource.

```http
GET /users/123 HTTP/1.1
Host: example.com
Authorization: Bearer <token>
Accept: application/json
```

An HTTP request contains:

```text
Request
├── Method
├── URL / Path
├── Headers
├── Query Parameters
└── Body (optional)
```

### Important components

- **Method:** Defines the operation.
- **Headers:** Provide metadata about the request.
- **Query parameters:** Usually used for filtering, sorting and pagination.
- **Request body:** Carries data sent to the server, commonly with POST, PUT or PATCH.

---

## 3. HTTP Response

An HTTP response is the message returned by the server after processing a request.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "Ankit"
}
```

A response contains:

```text
Response
├── Status Code
├── Headers
└── Body
```

---

## 4. HTTP Methods

| Method | Meaning | Typical use |
|---|---|---|
| GET | Retrieve data | Get user |
| POST | Create/process | Create order |
| PUT | Replace resource | Replace user |
| PATCH | Partially modify | Update user's email |
| DELETE | Remove resource | Delete user |

### Interview point

**PUT vs PATCH**

> PUT generally represents replacement of the resource, while PATCH represents a partial modification.

---

## 5. Idempotency

### Definition

An operation is **idempotent** if performing it multiple times has the same intended effect as performing it once.

```text
GET      → Idempotent
PUT      → Idempotent
DELETE   → Idempotent
POST     → Generally NOT idempotent
```

### Why it matters

Imagine a payment request times out. The client doesn't know whether the server processed it.

We don't want:

```text
₹1000 payment
+
₹1000 payment
=
₹2000 charged
```

Use an **idempotency key**:

```text
POST /payments

Idempotency-Key: abc123
```

The server recognizes that `abc123` has already been processed.

---

## 6. HTTP Status Codes

### 2xx — Success

- **200 OK** — Request successfully processed.
- **201 Created** — A new resource was created.
- **204 No Content** — Request succeeded but there is no response body.

### 4xx — Client-side error

- **400 Bad Request** — Request is invalid.
- **401 Unauthorized** — Client is not properly authenticated.
  - Think: **"Who are you?"**
- **403 Forbidden** — Client is authenticated but doesn't have permission.
  - Think: **"I know who you are, but you're not allowed."**
- **404 Not Found** — Requested resource doesn't exist.
- **409 Conflict** — Request conflicts with the current state of the resource.
- **429 Too Many Requests** — Client exceeded the allowed request rate.

### 5xx — Server-side error

- **500 Internal Server Error** — Unexpected server-side failure.
- **502 Bad Gateway** — Gateway/proxy received an invalid response from an upstream server.
- **503 Service Unavailable** — Server/service is currently unable to handle the request.

---

## 7. HTTP Headers

### Definition

**HTTP headers are key-value pairs that carry metadata about a request or response.**

Common headers:

```text
Content-Type
Authorization
Accept
Cache-Control
User-Agent
Cookie
```

### Important headers

**Content-Type**

Describes the format of the request/response body.

```text
Content-Type: application/json
```

**Authorization**

Carries authentication credentials/token.

**Cache-Control**

Controls caching behavior.

**Accept**

Tells the server what response formats the client can handle.

---

## 8. HTTP vs HTTPS

### HTTP

Data is transmitted without TLS encryption.

### HTTPS

**HTTPS = HTTP + TLS**

TLS provides:

- Encryption
- Authentication of the server
- Data integrity

### Interview point

HTTPS protects the HTTP communication between the client and server using TLS. It does not mean every piece of data everywhere in the system is encrypted.

---

## 9. Statelessness

### Definition

A **stateless HTTP interaction** means the server does not inherently retain client-specific state between requests. Each request should contain the information needed to process it.

### Why is this useful?

Stateless services are easier to:

- Horizontally scale
- Load balance
- Fail over
- Deploy across multiple instances

```text
             Load Balancer
              /    |                 ↓     ↓     ↓
          Server Server Server
```

Any server can handle the request.

---

## 10. HTTP Cookies

### Definition

A **cookie is a small piece of data stored by the client/browser and associated with a domain.**

Common uses:

- Session identification
- Preferences
- Authentication-related state

Example:

```http
Set-Cookie: sessionId=abc123
```

The browser can then send:

```http
Cookie: sessionId=abc123
```

### Important security attributes

- `HttpOnly`
- `Secure`
- `SameSite`

---

## 11. HTTP Keep-Alive / Persistent Connections

HTTP can reuse an existing TCP connection for multiple requests instead of creating a new connection for every request.

Benefits:

- Less connection-establishment overhead
- Lower latency
- Lower resource consumption

---

## 12. HTTP/1.1 vs HTTP/2 vs HTTP/3

### HTTP/1.1

- Text-based protocol
- Persistent connections
- Multiple requests often require careful connection management
- HTTP-level head-of-line blocking can occur

### HTTP/2

Important improvements:

- Binary framing
- Multiplexing
- Header compression
- Multiple streams over a single connection

```text
HTTP/2

Single Connection
 ├── Stream 1
 ├── Stream 2
 ├── Stream 3
 └── Stream 4
```

### HTTP/3

Runs over **QUIC**, which uses UDP underneath.

Important benefits:

- Reduced connection-establishment latency
- Better behavior when network conditions change

---

## 13. HTTP Request Lifecycle

High-level flow:

```text
Client
  ↓
DNS
  ↓
TCP / TLS
  ↓
Load Balancer / Reverse Proxy
  ↓
API Server
  ↓
Authentication
  ↓
Authorization
  ↓
Business Logic
  ↓
Cache / Database / External Service
  ↓
Response
  ↓
Client
```

This flow is important for:

- Backend interviews
- System design
- Performance discussions
- Security discussions
- Distributed systems

---

## 14. Common Interview Questions

### Basic

1. What is HTTP?
2. HTTP vs HTTPS?
3. What is an HTTP request?
4. What is an HTTP response?
5. GET vs POST?
6. PUT vs PATCH?
7. What are HTTP status codes?
8. 401 vs 403?
9. What are HTTP headers?
10. What does stateless mean?

### Intermediate

11. What is idempotency?
12. Which HTTP methods are idempotent?
13. Why is POST generally not idempotent?
14. How would you make a payment API idempotent?
15. What are cookies?
16. What is Keep-Alive?
17. HTTP/1.1 vs HTTP/2?
18. What is HTTP/3?
19. What is HTTPS actually doing?
20. Explain the lifecycle of an HTTP request.

### Senior-level

21. How would you design an idempotent API?
22. How would you handle millions of API requests?
23. How does HTTP interact with load balancing?
24. How does statelessness help horizontal scaling?
25. When would you use HTTP vs WebSockets?

---

## 15. 🔥 Interview Answer to Remember

If an interviewer asks:

> **"What is HTTP?"**

> **"HTTP, or HyperText Transfer Protocol, is an application-layer, client-server protocol based on a request-response model. A client sends an HTTP request containing things like the method, URL, headers and optionally a body, and the server returns a response containing a status code, headers and optionally a body. HTTP is stateless by design, which makes it well suited for scalable web services."**

---

## 16. 🧠 Mental Model

```text
                 HTTP
                  │
        ┌─────────┴─────────┐
        ↓                   ↓
     REQUEST             RESPONSE
        │                   │
   ┌────┼────┐          ┌───┼────┐
   ↓    ↓    ↓          ↓   ↓    ↓
Method URL Headers    Status Headers Body
              │
             Body
```

Connect HTTP to the next concepts:

```text
HTTP
 │
 ├── REST
 │
 ├── Authentication
 │      ├── JWT
 │      └── OAuth
 │
 ├── API Design
 │      ├── Idempotency
 │      ├── Pagination
 │      └── Versioning
 │
 ├── Security
 │      ├── HTTPS
 │      ├── CORS
 │      └── Cookies
 │
 └── Scalability
        ├── Load Balancer
        ├── Caching
        └── Stateless Services
```

---

## 17. Quick Revision Checklist

- [ ] What is HTTP?
- [ ] Request vs response
- [ ] HTTP methods
- [ ] PUT vs PATCH
- [ ] HTTP status codes
- [ ] 401 vs 403
- [ ] HTTP headers
- [ ] HTTP vs HTTPS
- [ ] Statelessness
- [ ] Cookies
- [ ] Idempotency
- [ ] Idempotency keys
- [ ] Keep-Alive
- [ ] HTTP/1.1 vs HTTP/2
- [ ] HTTP/3 at a high level
- [ ] HTTP request lifecycle
- [ ] HTTP vs WebSockets
