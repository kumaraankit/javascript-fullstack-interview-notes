
# System Design Core Concepts – Databases, Messaging, Scalability & Reliability

This document covers **essential system design concepts** with **WHAT, WHY, HOW, and WHEN** explanations.
These topics are **frequently asked in backend, distributed systems, and system design interviews**.

---

## 1. Database Types

### WHAT
Databases store and manage application data. Different types are optimized for different use cases.

### TYPES & WHEN TO USE

| Type | Examples | When to Use |
|----|--------|------------|
| Relational (SQL) | MySQL, PostgreSQL | Strong consistency, transactions |
| Key-Value | Redis, DynamoDB | Fast lookups, caching |
| Document | MongoDB | Flexible schema |
| Columnar | Cassandra | Large-scale writes |
| Graph | Neo4j | Relationship-heavy data |
| Time-Series | InfluxDB | Metrics, logs |

### WHY
Choosing the right database affects **scalability, performance, and consistency**.

---

## 2. Message Queues

### WHAT
Message queues enable **asynchronous communication** between services.

### WHY
- Decoupling
- Reliability
- Load smoothing

### HOW
- Producer sends message
- Broker stores message
- Consumer processes message

### TOOLS
- Kafka (high throughput)
- RabbitMQ (routing & reliability)
- SQS (managed)

### WHEN
- Background jobs
- Event-driven systems

---

## 3. Distributed Locking

### WHAT
Ensures only one process accesses a shared resource at a time.

### WHY
- Prevent race conditions
- Ensure data consistency

### HOW
- Redis (Redlock)
- Zookeeper
- Database locks

### WHEN
- Cron jobs
- Inventory systems

---

## 4. Data Redundancy

### WHAT
Storing multiple copies of data.

### WHY
- Fault tolerance
- High availability
- Disaster recovery

### HOW
- Replication
- Backups
- Geo-distribution

### WHEN
- Mission-critical systems

---

## 5. Database Architectures

### TYPES
- Single-node
- Master-slave replication
- Multi-master
- Sharding

### WHY
- Scale reads/writes
- Improve availability

### WHEN
- High traffic systems

---

## 6. Load Balancing

### WHAT
Distributes incoming traffic across multiple servers.

### WHY
- Scalability
- Fault tolerance

### HOW
- Round-robin
- Least connections
- Hash-based

### TOOLS
- NGINX
- HAProxy
- AWS ALB

---

## 7. API Gateway

### WHAT
A single entry point for clients.

### WHY
- Authentication
- Rate limiting
- Routing

### HOW
- Express/Fastify
- Kong
- AWS API Gateway

### WHEN
- Microservices architecture

---

## 8. Bloom Filters

### WHAT
A probabilistic data structure for membership checks.

### WHY
- Fast lookups
- Memory efficient

### HOW
- Hash functions
- Bit array

### WHEN
- Cache penetration prevention
- Databases

---

## 9. Idempotency

### WHAT
Same request can be processed multiple times without side effects.

### WHY
- Network retries
- Fault tolerance

### HOW
- Idempotency keys
- Request deduplication

### WHEN
- Payment systems
- Order processing

---

## 10. Microservices Guidelines

### PRINCIPLES
- Single responsibility
- Loose coupling
- Independent deployments
- Observability

### WHY
- Scalability
- Team autonomy

### WHEN
- Large systems
- Distributed teams

---

## Interview-Ready Summary

- Database choice matters
- Messaging enables resilience
- Distributed locking prevents race conditions
- Redundancy improves availability
- Load balancing enables scaling
- API Gateways centralize concerns
- Bloom filters save memory
- Idempotency is critical for reliability
- Microservices require discipline

---

## Conclusion
These system design fundamentals are **core building blocks of scalable, reliable distributed systems** and are essential for **system design interviews and real-world architectures**.
