# What Does an API Gateway Do?

An **API Gateway** is a server that acts as a **single entry point** for all clients (web, mobile, IoT) to communicate with multiple backend services. It helps manage, route, secure, transform, and aggregate requests.

---

## 🌐 Why Do We Need an API Gateway?

Modern systems often follow **microservices architecture**, where each service handles a specific responsibility. Instead of clients calling each service directly, the API Gateway simplifies communication.

---

## ✅ Core Responsibilities of an API Gateway

### 1. **Request Routing**

It determines which microservice should handle an incoming request.

```
Client → API Gateway → User Service
```

**Example**:

```js
GET /users → routed to User Service
POST /orders → routed to Order Service
```

---

### 2. **Authentication & Authorization**

The gateway validates tokens (JWT, OAuth) before forwarding requests.

```js
If (!token.isValid) → Block request
Else → Forward to service
```

---

### 3. **Rate Limiting / Throttling**

Protects services from overload.

**Example:**

* Max 100 requests/min per user

---

### 4. **Load Balancing**

Distributes requests across multiple instances of a service.

```
API Gateway → Order Service (Instance 1 / 2 / 3)
```

---

### 5. **Request/Response Transformation**

Converts formats to match service expectations.

**Example:**
Client sends:

```json
{"userId": "123"}
```

Gateway converts to:

```json
{"id": "123"}
```

---

### 6. **Caching**

Reduces load by returning cached responses.

**Example:**

```
GET /products → Cached for 60s
```

---

### 7. **Aggregation (Backend For Frontend - BFF)**

Combines responses from multiple services into one.

**Example:**

```
GET /profile
 → User Service
 → Orders Service
 → Notifications Service

Gateway returns combined object
```

---

## 📌 Simple Architecture Diagram

```
          ┌──────────┐
          │  Client   │
          └─────┬────┘
                │
        ┌───────▼────────┐
        │   API Gateway   │
        └───┬──────┬─────┘
            │      │
      ┌─────▼──┐  ┌▼───────────┐
      │User Svc│  │Order Svc    │
      └────────┘  └─────────────┘
```

---

## 🧠 Quick Summary for Interviews

* **API Gateway = Single entry point** for all clients.
* Handles **routing, authentication, rate‑limiting, caching, monitoring**.
* Enables **microservices** to stay simple by offloading cross‑cutting concerns.
* Improves **performance** and **security**.

---
