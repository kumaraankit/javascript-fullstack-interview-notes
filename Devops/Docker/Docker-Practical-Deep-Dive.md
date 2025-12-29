
# Docker Practical Concepts – Deep Dive Interview & Reference Guide

This document provides **very detailed explanations (15–25+ lines each)** for commonly used Docker commands and concepts.
It is suitable for **hands-on interviews**, **real-world Docker usage**, and **long-term reference**.

---

## 1. What is `.dockerignore` and Why is it Used?

`.dockerignore` is a file used to specify which files and directories should be **excluded from the Docker build context**.
When you run `docker build`, Docker sends the entire build context (current directory) to the Docker daemon. Without `.dockerignore`, unnecessary files such as `node_modules`, logs, `.git`, and build artifacts are also sent.

Why this matters:
- Increases build time
- Increases image size
- Exposes sensitive files accidentally
- Breaks layer caching

Using `.dockerignore` improves:
- Faster builds
- Smaller images
- Better security
- Cleaner images

Example:
```
node_modules
.git
.env
logs
```

In production systems, `.dockerignore` is considered a **best practice** and is almost always present in real projects.

---

## 2. Difference Between `docker pull` and `docker run`

`docker pull` is used to **download an image** from a container registry (like Docker Hub) to your local machine.
It does not start a container.

`docker run` is used to **create and start a container** from an image.
If the image is not available locally, Docker will automatically perform a `docker pull` first.

Key differences:
- `docker pull` → downloads image only
- `docker run` → pulls image (if needed) + creates container + starts it

Example:
```bash
docker pull node:18
docker run node:18
```

`docker run` is effectively a combination of:
- docker pull
- docker create
- docker start

---

## 3. What Does `docker ps` Show?

`docker ps` displays a list of **currently running containers** on the system.
It provides important runtime information such as:
- Container ID
- Image used
- Command being executed
- Status (running, uptime)
- Exposed ports
- Container names

Example:
```bash
docker ps
docker ps -a
```

- `docker ps` → running containers only
- `docker ps -a` → all containers (running + stopped)

This command is frequently used for:
- Debugging
- Monitoring
- Managing container lifecycle

---

## 4. Difference Between `docker stop` and `docker kill`

`docker stop` sends a **SIGTERM signal** to the container, allowing the application to shut down gracefully.
Docker waits (default 10 seconds) before forcefully stopping the container.

`docker kill` sends a **SIGKILL signal**, immediately terminating the container without cleanup.

Key differences:
- `docker stop` → graceful shutdown
- `docker kill` → forceful termination

Use cases:
- `docker stop` → production systems
- `docker kill` → hung or unresponsive containers

Understanding this difference is critical for **data safety and graceful shutdowns**.

---

## 5. What is `docker exec` Used For?

`docker exec` allows you to **run commands inside a running container**.

Common use cases:
- Debugging
- Inspecting filesystem
- Running database commands
- Opening a shell

Example:
```bash
docker exec -it my-container sh
```

Unlike `docker run`, `docker exec` does not create a new container.
It interacts with an already running container.

This command is heavily used during development and troubleshooting.

---

## 6. Explain `docker logs`

`docker logs` displays the **stdout and stderr output** of a container.

It is the primary way to:
- Debug applications
- View runtime logs
- Investigate crashes

Example:
```bash
docker logs my-container
docker logs -f my-container
```

- `-f` follows logs in real time
- Logs persist even if container stops

In production, logs are usually shipped to centralized logging systems, but `docker logs` is still critical for local debugging.

---

## 7. What is a Docker Volume?

A Docker volume is a **persistent storage mechanism** managed by Docker.

Volumes:
- Exist outside container lifecycle
- Survive container restarts and deletions
- Are stored in Docker-managed directories

Example:
```bash
docker volume create my-volume
docker run -v my-volume:/data app
```

Volumes are commonly used for:
- Databases
- File uploads
- Shared data

---

## 8. Difference Between Bind Mount and Volume

Bind mounts map a **host directory directly** into a container.
Volumes are **managed by Docker**.

| Feature | Bind Mount | Volume |
|------|-----------|--------|
| Host dependency | Yes | No |
| Portability | Low | High |
| Performance | Good | Optimized |
| Use case | Local dev | Production |

Bind mounts are useful for development.
Volumes are recommended for production.

---

## 9. What is Docker Networking?

Docker networking enables containers to **communicate with each other and the outside world**.

Docker provides multiple network drivers:
- bridge
- host
- overlay
- none

Networking handles:
- IP allocation
- DNS resolution
- Service discovery

Docker abstracts networking complexity, making container communication easy.

---

## 10. What is the Default Docker Network?

The default Docker network is called **bridge**.

Characteristics:
- Containers get private IPs
- NAT used for external access
- Containers can communicate via IP

Example:
```bash
docker network ls
```

Bridge network is suitable for:
- Single-host setups
- Local development

---

## 11. How Do Containers Communicate With Each Other?

Containers communicate using:
- Docker DNS
- Network aliases
- Container names

When containers are on the same user-defined network, they can access each other using **container names as hostnames**.

Example:
```bash
http://backend:3000
```

Docker automatically manages DNS resolution.
This makes service-to-service communication reliable and scalable.

---

## Interview-Ready Summary

- `.dockerignore` optimizes builds
- `docker run` creates and starts containers
- `docker ps` monitors containers
- `docker stop` is graceful, `docker kill` is forceful
- `docker exec` enables debugging
- `docker logs` shows application output
- Volumes provide persistence
- Docker networking enables container communication

---

## Conclusion

These Docker concepts are **used daily in real projects**.
Understanding them deeply is essential for **backend, DevOps, and system design interviews**.
