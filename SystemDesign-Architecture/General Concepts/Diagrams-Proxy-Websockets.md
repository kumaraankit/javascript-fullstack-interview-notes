
# System Design Fundamentals – Diagrams, Proxies & WebSockets (With WHY, HOW, WHEN)

This document explains **core system design concepts** frequently discussed in **backend, full‑stack, and system design interviews**.
Each concept is covered with **WHAT, WHY, HOW, and WHEN** to build strong conceptual clarity.

---

## 1. Class Diagram

### WHAT
A **Class Diagram** represents the **static structure** of a system by showing:
- Classes
- Attributes
- Methods
- Relationships (inheritance, association, composition)

### WHY
- Helps understand object-oriented design
- Visualizes domain models
- Improves communication between developers

### HOW
Key elements:
- Class name
- Fields
- Methods
- Relationships

Example (conceptual):
```
User
+ id
+ name
+ login()

Order
+ orderId
+ placeOrder()

User 1 ---- * Order
```

### WHEN
- Designing OO systems
- Modeling domain entities
- Before writing code

---

## 2. Use Case Diagram

### WHAT
A **Use Case Diagram** shows how **actors (users or systems)** interact with the system.

### WHY
- Captures functional requirements
- Clarifies system scope
- Useful for stakeholder discussions

### HOW
Components:
- Actor
- Use case
- System boundary

Example:
```
User → Login
User → Place Order
Admin → Manage Users
```

### WHEN
- Requirement gathering
- Early design phase

---

## 3. Sequence Diagram

### WHAT
A **Sequence Diagram** shows how objects interact **over time** through messages.

### WHY
- Understand request flow
- Identify bottlenecks
- Clarify API interactions

### HOW
- Vertical lifelines
- Horizontal messages
- Time flows downward

Example:
```
User → API → Service → DB
```

### WHEN
- Designing APIs
- Debugging complex flows
- System design interviews

---

## 4. Activity Diagram

### WHAT
An **Activity Diagram** represents **workflow or business logic**.

### WHY
- Models decision-making
- Shows parallel activities
- Useful for business processes

### HOW
- Start/end nodes
- Actions
- Decision nodes
- Fork/join for parallel flows

### WHEN
- Business logic modeling
- Process automation design

---

## 5. State Machine Diagram

### WHAT
A **State Machine Diagram** shows how an entity transitions between states.

### WHY
- Handles complex state-dependent behavior
- Prevents invalid state transitions

### HOW
- States
- Events
- Transitions

Example:
```
Order: Created → Paid → Shipped → Delivered
```

### WHEN
- Order lifecycle
- Payment systems
- Workflow engines

---

## 6. Proxy vs Reverse Proxy

### WHAT
A **Proxy** acts on behalf of a **client**.
A **Reverse Proxy** acts on behalf of a **server**.

### WHY
- Security
- Load balancing
- Caching

### HOW

| Proxy | Reverse Proxy |
|-----|--------------|
| Client-side | Server-side |
| Hides client | Hides server |
| Used for anonymity | Used for scaling |

Examples:
- Proxy → VPN
- Reverse Proxy → NGINX

### WHEN
- Reverse proxy for microservices
- Proxy for client security

---

## 7. WebSockets

### WHAT
WebSockets provide **full‑duplex, persistent communication** between client and server.

### WHY
- Real-time updates
- Low latency
- Efficient for frequent messages

### HOW
- Starts with HTTP handshake
- Upgrades to WebSocket protocol
- Persistent connection

### WHEN
- Chat applications
- Live dashboards
- Notifications
- Gaming

---

## Interview-Ready Summary

- Diagrams clarify different system perspectives
- Class diagrams model structure
- Use case diagrams capture requirements
- Sequence diagrams show interaction flow
- Activity diagrams model workflows
- State diagrams manage lifecycle complexity
- Reverse proxies are essential for scalability
- WebSockets enable real-time systems

---

## Conclusion
Mastering these system design concepts helps you **communicate designs clearly**, **reason about complex systems**, and **perform confidently in system design interviews**.
