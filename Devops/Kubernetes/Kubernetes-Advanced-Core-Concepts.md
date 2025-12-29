
# Kubernetes Advanced Core Concepts – Deep Dive Interview & Reference Guide

This document provides **detailed explanations (15–25+ lines per topic)** for important Kubernetes concepts
that are commonly asked in **intermediate to advanced interviews**.
Each section explains **WHAT the concept is, WHY it exists, HOW it works internally, and WHEN to use it**.

---

## 1. What is Liveness and Readiness Probe?

Liveness and readiness probes are mechanisms Kubernetes uses to **check the health of containers**.

- **Liveness probe** determines whether a container is still running correctly.
  If it fails, Kubernetes restarts the container.
- **Readiness probe** determines whether a container is ready to accept traffic.
  If it fails, traffic is stopped, but the container is not restarted.

Probes can be implemented using:
- HTTP requests
- TCP socket checks
- Command execution

These probes help Kubernetes achieve **self-healing** and **zero-downtime deployments**.
They are essential for production-grade workloads where applications may take time to start or recover.

---

## 2. How Does Kubernetes Perform Auto-Scaling?

Kubernetes performs auto-scaling by dynamically adjusting resources based on demand.
It supports scaling at different levels:
- Pod-level (HPA)
- Node-level (Cluster Autoscaler)
- Vertical scaling (VPA)

Auto-scaling is driven by metrics such as:
- CPU usage
- Memory usage
- Custom application metrics

Scaling decisions are made continuously to ensure optimal performance and cost efficiency.
This allows Kubernetes to handle traffic spikes automatically.

---

## 3. What is HPA (Horizontal Pod Autoscaler)?

The Horizontal Pod Autoscaler automatically adjusts the **number of pod replicas** based on observed metrics.

HPA works by:
- Collecting metrics from Metrics Server or Prometheus
- Comparing them against target thresholds
- Increasing or decreasing replicas accordingly

Example use cases:
- Scaling APIs during traffic spikes
- Reducing replicas during low usage

HPA ensures applications remain responsive while optimizing resource utilization.

---

## 4. How Does Kubernetes Networking Work?

Kubernetes networking follows a flat network model:
- Every Pod gets a unique IP
- Pods can communicate without NAT
- Services provide stable endpoints

Key components include:
- CNI plugins (Calico, Flannel, Cilium)
- kube-proxy
- DNS

This model simplifies service-to-service communication and supports microservices architecture.

---

## 5. Difference Between ClusterIP, NodePort, and LoadBalancer

Kubernetes Services expose Pods in different ways:

- **ClusterIP**: Internal-only access
- **NodePort**: Exposes service on node IP and port
- **LoadBalancer**: Integrates with cloud provider LBs

Choosing the correct type depends on environment, security, and exposure needs.

---

## 6. What is Ingress and How Does It Work?

Ingress manages **external HTTP/HTTPS access** to services.
It provides features like:
- URL-based routing
- SSL termination
- Host-based routing

Ingress requires an **Ingress Controller** (NGINX, Traefik).
It simplifies traffic management compared to NodePort and LoadBalancer.

---

## 7. What is a StatefulSet and When Should You Use It?

StatefulSet is a controller designed for **stateful applications**.

Key features:
- Stable pod identities
- Persistent storage
- Ordered deployment and scaling

Use StatefulSets for:
- Databases
- Message brokers
- Stateful distributed systems

They ensure data consistency and predictable networking.

---

## 8. How Does Kubernetes Handle Failures?

Kubernetes continuously monitors cluster state.
When failures occur:
- Pods are restarted
- Traffic is rerouted
- Nodes are marked unhealthy

Controllers work to restore desired state automatically.
This provides high availability and resilience.

---

## 9. What is Resource Request vs Limit?

Resource requests define **minimum guaranteed resources**.
Limits define **maximum allowed usage**.

Requests are used for scheduling.
Limits are enforced at runtime.

Correct configuration prevents resource starvation and ensures fair sharing.

---

## 10. What Are Taints and Tolerations?

Taints are applied to nodes to repel pods.
Tolerations allow pods to be scheduled on tainted nodes.

Use cases:
- Dedicated nodes
- Special workloads
- Node isolation

They provide fine-grained scheduling control.

---

## 11. What Are Labels and Selectors?

Labels are key-value pairs attached to resources.
Selectors are used to match labels.

They are used for:
- Service targeting
- Deployment management
- Resource organization

Labels enable Kubernetes to dynamically group and manage resources.

---

## Conclusion

These concepts are **critical for running Kubernetes in production**.
Mastering them demonstrates readiness for **mid-to-senior Kubernetes interviews** and real-world cloud-native systems.
