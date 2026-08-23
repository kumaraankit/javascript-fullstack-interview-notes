# REST API — Master Notes

## 1. Definition

**REST (Representational State Transfer)** is an **architectural style** for designing networked applications, particularly web APIs.

A RESTful API uses HTTP to expose **resources** through well-defined URLs and HTTP methods.

```text
Client
   ↓
HTTP Request
   ↓
REST API
   ↓
Resource
   ↓
HTTP Response
```

**REST and HTTP are not the same thing.**
- HTTP = communication protocol
- REST = architectural style
- REST APIs commonly use HTTP

---

## 2. What is a Resource?

### Definition

A **resource** is a logical entity or piece of information exposed by an API.

Examples:

```text
User
Order
Product
Payment
Invoice
Notification
```

Resources are generally represented using **nouns** in URLs.

### Good

```text
/users
/orders
/products
/payments
```

### Avoid

```text
/getUsers
/createOrder
/deleteProduct
```

The HTTP method should communicate the operation.

---

## 3. REST + HTTP Methods

| Operation | HTTP Method | Example |
|---|---|---|
| Get collection | GET | `/users` |
| Get one resource | GET | `/users/123` |
| Create | POST | `/users` |
| Replace | PUT | `/users/123` |
| Partial update | PATCH | `/users/123` |
| Delete | DELETE | `/users/123` |

---

## 4. REST Constraints

### Client-Server

**Definition:** The client and server have separate responsibilities.

```text
Client
  │ Request
  ↓
Server
  │ Response
  ↓
Client
```

**Benefit:** Client and server can evolve independently.

### Stateless

**Definition:** Each request contains the information necessary for the server to process it. The server should not depend on previous requests.

Example:

```http
GET /orders/123
Authorization: Bearer XYZ
```

Statelessness makes systems easier to:
- Scale horizontally
- Load balance
- Fail over
- Deploy across multiple instances

```text
             Load Balancer
             /     |                 ↓      ↓      ↓
        Server  Server  Server
```

### Cacheable

**Definition:** A REST response should indicate whether it can be cached.

```http
Cache-Control: max-age=3600
```

Benefits:
- Lower latency
- Reduced backend/database load
- Higher throughput
- Better scalability

### Uniform Interface

**Definition:** REST aims to provide a consistent and predictable interface for interacting with resources.

```text
GET    /users/123
PATCH  /users/123
DELETE /users/123
```

### Layered System

**Definition:** A client should not need to know whether it communicates directly with the application server or through intermediate layers.

```text
Client
  ↓
CDN
  ↓
Load Balancer
  ↓
API Gateway
  ↓
Service
  ↓
Database
```

---

## 5. Resource Relationships

Suppose:

```text
User
 └── Orders
```

Possible API:

```text
/users/123/orders
```

Another possible design:

```text
/orders?userId=123
```

Both can be valid depending on the resource model and use case.

Avoid unnecessarily deep URLs:

```text
/users/123/orders/456/products/789/reviews/111
```

---

## 6. Query Parameters

Used for:
- Filtering
- Sorting
- Pagination
- Searching

Examples:

```text
GET /products?category=shoes
GET /products?category=shoes&brand=nike
GET /products?sort=price
GET /products?page=2&limit=20
GET /products?search=running
```

---

## 7. Pagination

### Definition

**Pagination** is the technique of returning a large dataset in smaller portions instead of returning everything at once.

Instead of:

```text
GET /users
```

when there are millions of users:

```text
GET /users?page=2&limit=20
```

### Offset Pagination

```text
?page=2&limit=20
```

Conceptually:

```text
OFFSET = (page - 1) × limit
```

Advantages:
- Simple
- Easy to understand
- Easy to jump to a page

Problem: large offsets can become expensive.

```text
OFFSET 900000
LIMIT 20
```

### Cursor Pagination

**Definition:** Cursor pagination uses a value representing the position of the last item retrieved instead of an offset.

```text
GET /users?limit=20&cursor=<cursor>
```

Advantages:
- Better for large datasets
- More stable when data changes
- Often more efficient for continuous feeds

### Offset vs Cursor

| Offset | Cursor |
|---|---|
| Simpler | More complex |
| Easy page jumping | Better for sequential navigation |
| Can become expensive at large offsets | Usually better for large datasets |
| Less stable when data changes | More stable for changing datasets |

---

## 8. API Versioning

### Definition

**API versioning** allows an API to evolve without immediately breaking existing clients.

### URL versioning

```text
/api/v1/users
/api/v2/users
```

### Header versioning

```http
Accept: application/vnd.company.v2+json
```

Choose the strategy based on client ecosystem, backward compatibility requirements, API architecture, and deployment strategy.

---

## 9. Request Validation

### Definition

**Request validation** means checking client input before processing it.

Never blindly trust client input.

Example:

```json
{
  "email": "invalid",
  "age": -50
}
```

Validate:
- Required fields
- Data types
- Formats
- Ranges
- Business constraints

Invalid input can return:

```http
400 Bad Request
```

---

## 10. Error Handling

### Definition

A good REST API should return **consistent and predictable error responses**.

Bad:

```json
{
  "error": "something went wrong"
}
```

Better:

```json
{
  "error": {
    "code": "INVALID_EMAIL",
    "message": "Email address is invalid"
  }
}
```

Clients should be able to reliably understand and handle API errors.

---

## 11. Idempotency

### Definition

An operation is **idempotent** when performing it multiple times has the same intended effect as performing it once.

This is especially important for critical operations such as payments.

```http
POST /payments
Idempotency-Key: payment-abc123
```

The server stores the result associated with the key. If the client retries with the same key, the server can return the previous result instead of creating another payment.

Important use cases:
- Payments
- Orders
- Financial transactions
- Resource creation
- External API calls

---

## 12. REST API Design Example

### Create order

```http
POST /orders
```

```json
{
  "productId": "P123",
  "quantity": 2
}
```

Response:

```http
201 Created
```

```json
{
  "id": "O123",
  "status": "CREATED"
}
```

### Get order

```http
GET /orders/O123
```

### Update order

```http
PATCH /orders/O123
```

```json
{
  "status": "CANCELLED"
}
```

### Delete order

```http
DELETE /orders/O123
```

### Get user's orders

```http
GET /users/U123/orders
```

or:

```http
GET /orders?userId=U123
```

---

## 13. REST vs RPC

### REST

Focuses on **resources**:

```text
GET /users/123
POST /orders
PATCH /orders/123
```

### RPC

Focuses more on **actions/functions**:

```text
getUser()
createOrder()
cancelOrder()
```

Neither is automatically better. The choice depends on the system and requirements.

---

## 14. REST vs GraphQL

### REST

Multiple endpoints:

```text
/users/123
/users/123/orders
/orders/456
```

The server controls the response structure.

### GraphQL

Typically uses one endpoint:

```text
/graphql
```

The client specifies the data it wants.

### REST advantages

- Simple
- HTTP-native
- Easy to understand
- Mature tooling
- Straightforward caching patterns

### GraphQL advantages

- Client controls requested fields
- Can reduce over-fetching
- Useful for complex client data requirements

---

## 15. Common REST API Mistakes

### ❌ Using verbs everywhere

```text
POST /createUser
POST /deleteUser
POST /updateUser
```

Prefer:

```text
POST   /users
DELETE /users/123
PATCH  /users/123
```

### ❌ Returning huge datasets

Use pagination.

### ❌ Inconsistent error structures

Keep errors predictable.

### ❌ Ignoring idempotency

Especially for financial or critical operations.

### ❌ Exposing internal database structure

The API should not necessarily mirror database tables.

### ❌ Deeply nested URLs

Avoid unnecessarily complicated resource paths.

---

## 16. Senior-Level Interview Questions

### Basic

1. What is REST?
2. What is a RESTful API?
3. What is a resource?
4. REST vs HTTP?
5. GET vs POST?
6. PUT vs PATCH?
7. What does stateless mean?

### Intermediate

8. What are REST constraints?
9. What is idempotency?
10. How would you design pagination?
11. Offset vs cursor pagination?
12. How would you version an API?
13. How would you design error handling?
14. How would you handle API validation?
15. How would you prevent duplicate payment requests?

### Senior

16. Design an API for an order management system.
17. How would you design an API that handles 100,000 requests/second?
18. How would you make a REST API horizontally scalable?
19. How would you handle backward compatibility?
20. REST vs GraphQL — when would you choose each?
21. REST vs RPC — when would you choose each?
22. How would you design an idempotent API?

---

## 17. 🔥 Interview Answer to Remember

If asked:

> **"What is REST?"**

> **"REST, or Representational State Transfer, is an architectural style for designing networked APIs around resources. A RESTful API typically uses HTTP methods such as GET, POST, PUT, PATCH and DELETE to operate on those resources, follows constraints such as statelessness and a uniform interface, and uses standard HTTP semantics like status codes and headers."**

---

## 18. 🧠 Mental Model

```text
                 REST API
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
       RESOURCES            HTTP
          │                   │
    ┌─────┼─────┐       ┌─────┼─────┐
    ↓     ↓     ↓       ↓     ↓     ↓
  Users Orders Products GET   POST  PATCH
                          │
                          ↓
                    Status Codes
```

Connection with HTTP:

```text
HTTP
 │
 └── REST
      │
      ├── Resources
      ├── HTTP Methods
      ├── Statelessness
      ├── Caching
      ├── Pagination
      ├── Versioning
      ├── Validation
      ├── Error Handling
      └── Idempotency
```

---

## 19. Quick Revision Checklist

- [ ] What is REST?
- [ ] What is a resource?
- [ ] REST vs HTTP
- [ ] REST constraints
- [ ] Client-server architecture
- [ ] Statelessness
- [ ] Cacheability
- [ ] Uniform interface
- [ ] Layered system
- [ ] Resource-oriented URLs
- [ ] Query parameters
- [ ] Pagination
- [ ] Offset vs cursor pagination
- [ ] API versioning
- [ ] Request validation
- [ ] Consistent error handling
- [ ] Idempotency
- [ ] REST vs RPC
- [ ] REST vs GraphQL
- [ ] Design a basic order API

---

## 20. Final 5-Minute Recall

Without looking at your notes, explain:

1. **What is REST?**
2. **What is a resource?**
3. **Why should URLs generally use nouns rather than verbs?**
4. **Why is statelessness important for scaling?**
5. **Offset vs cursor pagination?**
6. **How would you make a payment API idempotent?**
7. **How would you version an API?**
8. **How should a production API return errors?**
9. **REST vs RPC?**
10. **REST vs GraphQL?**

If you can answer these confidently, you're ready for:

> **Authentication & Authorization**
