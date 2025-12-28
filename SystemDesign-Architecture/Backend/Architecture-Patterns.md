
# System Design Architecture Patterns – Complete Guide (WHY, HOW, WHEN)

This document explains **major system design architecture patterns** commonly discussed in **backend, full‑stack, and system design interviews**.  
Each pattern is covered with **WHAT, WHY, HOW, and WHEN** to build strong architectural intuition.

---

## 1. CQRS (Command Query Responsibility Segregation)

### WHAT
CQRS separates **write operations (commands)** from **read operations (queries)** using different models.

### WHY
- Different scaling needs for reads vs writes
- Simplifies complex business logic
- Improves performance

### HOW
- Command side → validates & updates data
- Query side → optimized read models
- Often paired with Event Sourcing

### WHEN
- High read/write asymmetry
- Complex domains (finance, order systems)

---

## 2. Orchestration Architecture

### WHAT
A central orchestrator coordinates interactions between services.

### WHY
- Clear workflow control
- Centralized business logic

### HOW
- Orchestrator calls services in sequence
- Handles failures and retries

### WHEN
- Complex workflows
- Saga-based transactions

⚠️ Risk: Orchestrator can become tightly coupled.

---

## 3. MVP (Model‑View‑Presenter) Architecture

### WHAT
Separates UI logic from business logic.

### WHY
- Testable UI
- Cleaner separation of concerns

### HOW
- View → UI
- Presenter → logic
- Model → data

### WHEN
- UI‑heavy applications
- Legacy frontend systems

---

## 4. Event‑Driven Architecture

### WHAT
Components communicate via **events** instead of direct calls.

### WHY
- Loose coupling
- High scalability
- Asynchronous processing

### HOW
- Producers emit events
- Consumers react independently
- Uses message brokers (Kafka, RabbitMQ)

### WHEN
- Microservices
- Real‑time systems
- High throughput systems

---

## 5. DDD (Domain‑Driven Design)

### WHAT
Design approach focused on **business domains** and **ubiquitous language**.

### WHY
- Aligns code with business logic
- Manages complexity

### HOW
- Bounded contexts
- Aggregates
- Entities & value objects

### WHEN
- Large, complex business domains

---

## 6. Space‑Based Architecture

### WHAT
Architecture that removes database bottlenecks by using **in‑memory data grids**.

### WHY
- Extreme scalability
- Low latency

### HOW
- Data stored in memory
- Processing distributed across nodes

### WHEN
- High‑traffic systems
- Real‑time analytics

---

## 7. Microservices Architecture

### WHAT
System composed of **independently deployable services**.

### WHY
- Scalability
- Team autonomy
- Fault isolation

### HOW
- Services communicate via APIs or events
- Independent databases
- API Gateway

### WHEN
- Large teams
- High scale systems

---

## 8. Microkernel (Plugin) Architecture

### WHAT
Core system with **plug‑in extensions**.

### WHY
- Extensibility
- Customization

### HOW
- Core handles common functionality
- Plugins add features

### WHEN
- IDEs
- Payment systems
- Product platforms

---

## 9. Layered / N‑Tier Architecture

### WHAT
System divided into layers (UI, Business, Data).

### WHY
- Simplicity
- Clear responsibilities

### HOW
- Each layer communicates only with adjacent layers

### WHEN
- Small to medium applications
- Monolithic systems

---

## Comparison Summary

| Architecture | Best For |
|------------|----------|
| CQRS | Complex domains |
| Orchestration | Workflow management |
| MVP | UI separation |
| Event‑Driven | Scalability |
| DDD | Business‑heavy systems |
| Space‑Based | Ultra‑scalable systems |
| Microservices | Large systems |
| Microkernel | Extensible platforms |
| Layered | Simplicity |

---

## Interview‑Ready Summary

- Architecture choice depends on scale & complexity
- Event‑driven & microservices favor scalability
- DDD handles business complexity
- CQRS optimizes read/write workloads
- Layered architecture is simplest

---

## Conclusion
Understanding these architecture patterns helps you **design scalable systems**, **explain trade‑offs clearly**, and **perform confidently in system design interviews**.
