
# System Design Core Concepts – Caching, Scalability, Reliability & Consistency

This document explains **WHAT, WHY, HOW, and WHEN** for critical **system design concepts** that are frequently evaluated in **backend, distributed systems, and system design interviews**.

---

## 1. Caching

### WHAT
Caching stores frequently accessed data in a **faster storage layer** to reduce latency.

### WHY
- Faster responses
- Reduced database load
- Better scalability

### HOW
- In-memory caches (Redis, Memcached)
- Application-level caching
- HTTP caching

### WHEN
- Read-heavy workloads
- Frequently accessed data

---

## 2. Content Delivery Network (CDN)

### WHAT
A CDN is a **globally distributed network of servers** that serve static and dynamic content closer to users.

### WHY
- Reduced latency
- Lower origin server load
- Better availability

### HOW
- Content cached at edge locations
- DNS routes users to nearest edge

### WHEN
- Static assets
- Media-heavy applications
- Global user base

---

## 3. Failover

### WHAT
Failover is the process of **automatically switching** to a backup system when the primary fails.

### WHY
- High availability
- Fault tolerance

### HOW
- Active-passive setup
- Active-active setup
- Automated health checks

### WHEN
- Mission-critical systems

---

## 4. Heartbeats

### WHAT
Heartbeats are **periodic signals** sent to verify system health.

### WHY
- Detect failures early
- Enable automated recovery

### HOW
- Regular ping messages
- Health-check endpoints

### WHEN
- Distributed systems
- Cluster management

---

## 5. Caching Strategies

### COMMON STRATEGIES
- Cache-aside
- Write-through
- Write-behind
- Read-through

### WHY
- Balance consistency and performance

### WHEN
- Depends on read/write patterns

---

## 6. Distributed Caching

### WHAT
Caching shared across multiple application instances.

### WHY
- Horizontal scalability
- Consistent cached data

### HOW
- Redis clusters
- Sharded caches

### WHEN
- Scaled microservices

---

## 7. Database Scaling

### TYPES
- Vertical scaling
- Horizontal scaling
- Read replicas

### WHY
- Handle growth
- Improve throughput

### WHEN
- Increased traffic or data size

---

## 8. Checksums

### WHAT
A checksum verifies **data integrity**.

### WHY
- Detect corruption
- Ensure accurate transmission

### HOW
- Hash functions (MD5, SHA)

### WHEN
- File transfers
- Distributed storage

---

## 9. Domain Name System (DNS)

### WHAT
DNS maps **domain names to IP addresses**.

### WHY
- Human-readable URLs
- Load balancing
- Failover support

### HOW
- Recursive and authoritative servers
- TTL-based caching

### WHEN
- All internet-based systems

---

## 10. Database Sharding

### WHAT
Splitting data across multiple databases.

### WHY
- Scale writes
- Reduce contention

### HOW
- Hash-based sharding
- Range-based sharding

### WHEN
- Very large datasets

---

## 11. APIs

### WHAT
APIs allow systems to communicate.

### WHY
- Decoupling
- Reusability

### HOW
- REST
- GraphQL
- gRPC

### WHEN
- Any service communication

---

## 12. Consistency Patterns

### TYPES
- Strong consistency
- Eventual consistency
- Causal consistency

### WHY
- Trade-offs with availability

### WHEN
- Distributed systems

---

## 13. Data Replication

### WHAT
Copying data across multiple nodes.

### WHY
- High availability
- Fault tolerance

### HOW
- Synchronous replication
- Asynchronous replication

### WHEN
- High availability systems

---

## 14. Circuit Breaker

### WHAT
A circuit breaker prevents cascading failures by **stopping calls** to failing services.

### WHY
- Protect system stability
- Fail fast

### HOW
- Closed, Open, Half-open states

### WHEN
- Microservices communication

---

## Interview-Ready Summary

- Caching improves performance
- CDNs reduce global latency
- Failover ensures availability
- Heartbeats detect failures
- Distributed caching scales systems
- Sharding enables massive data growth
- Consistency patterns define guarantees
- Circuit breakers improve resilience

---

## Conclusion
Understanding these concepts enables you to design **scalable, resilient, and high-performing distributed systems** and confidently tackle **system design interviews**.
