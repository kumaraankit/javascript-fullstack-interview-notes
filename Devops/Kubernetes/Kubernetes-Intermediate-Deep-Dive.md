
# Kubernetes Intermediate Concepts – Deep Dive Interview & Reference Guide

This document provides **detailed explanations (15–25+ lines per topic)** for key intermediate Kubernetes concepts.
Each section explains **WHAT the concept is, WHY it exists, HOW it works internally, and WHEN to use it**.
This is suitable for **interview preparation and real-world Kubernetes operations**.

---

## 1. How Does Kubernetes Scheduling Work?

Kubernetes scheduling is the process of deciding **which node a Pod should run on**.
This responsibility is handled by the **kube-scheduler**, a core control plane component.

The scheduling process happens in multiple phases:
1. **Filtering (Predicates)** – removes nodes that cannot run the Pod based on requirements like CPU, memory, node selectors, taints, and tolerations.
2. **Scoring (Priorities)** – ranks the remaining nodes based on resource availability, affinity rules, and custom policies.
3. **Binding** – assigns the Pod to the chosen node by updating the API server.

Scheduling considers:
- Resource requests and limits
- Node affinity / anti-affinity
- Taints and tolerations
- Pod affinity rules

This mechanism ensures efficient resource utilization, high availability, and workload distribution across the cluster.

---

## 2. What is etcd and Why is it Important?

etcd is a **distributed, consistent key-value store** used as Kubernetes’ **single source of truth**.
All cluster state information is stored in etcd.

etcd stores:
- Cluster configuration
- Node and Pod metadata
- Secrets and ConfigMaps
- Desired and current state of resources

Why etcd is critical:
- Strong consistency guarantees
- High availability using leader election
- Fast read/write performance

If etcd becomes unavailable or corrupted, the Kubernetes cluster cannot function properly.
That’s why etcd requires:
- Regular backups
- Encryption
- Secure access controls

---

## 3. Explain Kubernetes Control Plane Components

The Kubernetes control plane manages the **overall state of the cluster**.
It ensures the cluster’s desired state matches the actual state.

Core control plane components:
- **API Server** – entry point for all requests
- **Scheduler** – assigns Pods to nodes
- **Controller Manager** – runs controllers to reconcile state
- **etcd** – stores cluster state
- **Cloud Controller Manager** (optional) – integrates with cloud providers

Each component works independently but communicates through the API server.
This modular design improves reliability and scalability.

---

## 4. How Does Kubernetes Handle Service Discovery?

Kubernetes provides **built-in service discovery** using DNS and environment variables.

When a Service is created:
- Kubernetes assigns a stable IP (ClusterIP)
- DNS entry is automatically created
- Pods can access the service using its name

Service discovery enables:
- Loose coupling between services
- Dynamic scaling
- Automatic load balancing

This eliminates the need for hardcoded IPs and simplifies microservices communication.

---

## 5. What is ConfigMap and How is it Used?

A ConfigMap is used to store **non-sensitive configuration data** separately from application code.

ConfigMaps can store:
- Environment variables
- Configuration files
- Command-line arguments

They allow:
- Config changes without rebuilding images
- Environment-specific configurations
- Better separation of concerns

ConfigMaps can be injected into Pods as:
- Environment variables
- Mounted files
- Command arguments

They are essential for building flexible and portable applications.

---

## 6. What is a Secret in Kubernetes?

A Secret is used to store **sensitive information** such as:
- Passwords
- API keys
- Certificates
- Tokens

Secrets are base64-encoded and stored in etcd.
They can be:
- Mounted as files
- Injected as environment variables

Why Secrets matter:
- Prevents hardcoding credentials
- Supports secure configuration management
- Enables RBAC-based access control

In production, Secrets should be encrypted at rest and access tightly controlled.

---

## 7. How Does Kubernetes Handle Rolling Updates?

Rolling updates allow Kubernetes to update applications **without downtime**.
This is commonly managed through Deployments.

The update process:
- Gradually creates new Pods with updated version
- Terminates old Pods incrementally
- Maintains desired availability during update

Key parameters:
- maxSurge
- maxUnavailable

Rolling updates ensure:
- Zero or minimal downtime
- Safe application upgrades
- Easy rollback in case of failure

This feature is crucial for production-grade deployments.

---

## Conclusion

These intermediate Kubernetes concepts are critical for **operating clusters at scale**.
Understanding them demonstrates readiness for **mid to senior-level Kubernetes interviews** and real-world cloud-native systems.
