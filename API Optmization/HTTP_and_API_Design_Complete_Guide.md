
# HTTP and API Design – Complete Practical & Interview-Ready Guide

This document provides a **deep, structured, and practical explanation** of **HTTP and API design**.
It is written for **backend interviews, Node.js developers, system design rounds, and long-term reference**.

---

## 1. What is HTTP?

### Definition
HTTP (HyperText Transfer Protocol) is a **stateless, application-layer protocol**
used for communication between a **client** and a **server** using a request–response model.

📌 Interview definition:
> “HTTP is a stateless protocol that defines how clients and servers communicate over the web.”

---

## 2. Stateless Nature of HTTP

Each HTTP request:
- Is independent
- Does not retain client state
- Must contain all necessary information

State is usually managed via:
- Tokens (JWT)
- Cookies
- Sessions

📌 Interview line:
> “HTTP is stateless; state management is handled at the application level.”

---

## 3. HTTP Request Structure

An HTTP request consists of:

1. Method (GET, POST, etc.)
2. URL
3. Headers
4. Body (optional)

Example:
```http
POST /users HTTP/1.1
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Alice"
}
```

---

## 4. HTTP Response Structure

An HTTP response contains:

1. Status code
2. Headers
3. Body

Example:
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 1,
  "name": "Alice"
}
```

---

## 5. HTTP Methods (VERY IMPORTANT)

| Method | Purpose | Idempotent |
|------|--------|------------|
| GET | Read data | Yes |
| POST | Create data | No |
| PUT | Replace data | Yes |
| PATCH | Partial update | No |
| DELETE | Remove data | Yes |

📌 Interview line:
> “Correct HTTP method usage is fundamental to good API design.”

---

## 6. REST API Design Principles

### 6.1 Resource-Based URLs
Use nouns, not verbs.

❌ `/getUser?id=1`  
✅ `/users/1`

---

### 6.2 Proper Use of HTTP Methods
❌ `POST /deleteUser`  
✅ `DELETE /users/1`

---

### 6.3 Stateless APIs
- No server-side session dependency
- Authentication via tokens

---

### 6.4 Consistency
- Consistent naming
- Consistent responses
- Predictable behavior

📌 Interview line:
> “Consistency matters more than perfection in API design.”

---

## 7. HTTP Status Codes (INTERVIEW MUST)

### Success
- 200 OK
- 201 Created
- 204 No Content

### Client Errors
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict

### Server Errors
- 500 Internal Server Error
- 503 Service Unavailable

📌 Interview line:
> “Status codes communicate outcome clearly to clients.”

---

## 8. Headers You Must Know

### Request Headers
- Content-Type
- Authorization
- Accept

### Response Headers
- Cache-Control
- Set-Cookie
- Location

---

## 9. API Error Handling (VERY IMPORTANT)

### Bad ❌
```json
{
  "error": "Something went wrong"
}
```

### Good ✅
```json
{
  "errorCode": "USER_NOT_FOUND",
  "message": "User does not exist"
}
```

📌 Interview line:
> “Error responses should be predictable and actionable.”

---

## 10. Pagination, Filtering & Sorting

### Pagination
```http
GET /users?page=2&limit=20
```

### Filtering
```http
GET /users?role=admin
```

### Sorting
```http
GET /users?sort=createdAt&order=desc
```

📌 Interview line:
> “Never return unbounded collections.”

---

## 11. API Versioning

### Why?
- Backward compatibility
- Safe evolution

### Common Approaches
```http
/api/v1/users
```

📌 Interview line:
> “Versioning allows APIs to evolve without breaking clients.”

---

## 12. Authentication & Authorization

### Authentication
- Who the user is
- JWT, OAuth, Sessions

### Authorization
- What the user can access
- Role-based or permission-based

📌 Interview line:
> “Authentication verifies identity; authorization controls access.”

---

## 13. Security Best Practices

- Always use HTTPS
- Validate input
- Protect against XSS & CSRF
- Rate limit APIs
- Use proper CORS settings

📌 Interview line:
> “Security must be built into API design, not added later.”

---

## 14. Idempotency

### What?
Multiple identical requests produce the same result.

Example:
```http
PUT /users/1
```

📌 Interview line:
> “Idempotency is critical for safe retries.”

---

## 15. Performance Considerations

- Use caching
- Optimize database queries
- Reduce payload size
- Use compression
- Avoid unnecessary calls

📌 Interview line:
> “Good API design includes performance considerations from day one.”

---

## 16. API Documentation

Use tools like:
- OpenAPI / Swagger
- Postman collections

Benefits:
- Faster onboarding
- Fewer misunderstandings

---

## 17. Common API Design Mistakes (INTERVIEW GOLD)

❌ Using wrong HTTP methods  
❌ Ignoring status codes  
❌ Returning huge payloads  
❌ No versioning  
❌ Inconsistent error responses  

---

## 18. Real-World API Design Checklist

Before production:
- RESTful URLs
- Correct HTTP methods
- Status codes defined
- Error handling standardized
- Pagination enabled
- Versioning strategy decided
- Security measures applied

---

## 19. Interview-Ready 30-Second Summary

> “HTTP is a stateless request–response protocol. I design RESTful APIs using resource-based URLs, correct HTTP methods, meaningful status codes, consistent error handling, pagination, versioning, authentication, and security best practices, while keeping performance and scalability in mind.”

---

## Final Thought

Good HTTP and API design is about **clarity, consistency, and correctness**.
Well-designed APIs are easier to use, scale, and maintain.
