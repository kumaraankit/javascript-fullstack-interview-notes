
# NestJS Advanced Concepts – DI Internals, Microservices, Performance & Architecture

This document covers **advanced NestJS topics** with **WHAT, WHY, HOW, and WHEN** explanations.
It is designed for **senior backend engineers, system design rounds, and production-grade NestJS applications**.

---

## 1. How Does the NestJS Dependency Injection Container Work Internally?

### WHAT
NestJS uses an **IoC (Inversion of Control) container** to manage class instantiation and dependency resolution.

### HOW (Internals – High Level)
1. Application starts
2. NestJS scans modules
3. Builds a dependency graph
4. Registers providers with tokens
5. Resolves dependencies at runtime

```ts
@Module({
  providers: [UserService],
})
export class UserModule {}
```

### WHY
- Loose coupling
- Easier testing
- Lifecycle management

### WHEN
- Always — DI is the backbone of NestJS

---

## 2. Request-Scoped vs Singleton Providers

### Singleton (Default)
- One instance per application
- Shared across requests
- Best performance

```ts
@Injectable()
export class LoggerService {}
```

### Request-Scoped
- New instance per request
- Useful for request-specific data

```ts
@Injectable({ scope: Scope.REQUEST })
export class RequestLogger {}
```

### WHEN to Use Request Scope?
- Multi-tenant apps
- Per-request context

---

## 3. How to Implement RBAC in NestJS?

### WHAT
RBAC controls access based on user roles.

### HOW
1. Define roles
2. Create custom decorator
3. Use guard

```ts
@SetMetadata('roles', ['admin'])
```

```ts
@Injectable()
export class RolesGuard implements CanActivate {}
```

### WHY
- Security
- Controlled access

### WHEN
- Admin dashboards
- Multi-role systems

---

## 4. How Does NestJS Support Microservices?

### WHAT
NestJS supports **event-based and message-based microservices**.

### HOW
- Transport layers
- Message patterns

```ts
NestFactory.createMicroservice(AppModule, {
  transport: Transport.TCP,
});
```

### WHEN
- Distributed systems
- High scalability

---

## 5. Difference Between TCP, Redis, Kafka Transport Layers

| Transport | Use Case |
|--------|---------|
| TCP | Simple RPC |
| Redis | Pub/Sub |
| Kafka | Event streaming |

### WHEN
- Kafka → high throughput
- Redis → lightweight events
- TCP → direct communication

---

## 6. Handling Transactions in NestJS with TypeORM

### WHY
Ensure atomic database operations.

### HOW
```ts
await manager.transaction(async em => {
  await em.save(User);
});
```

### WHEN
- Financial operations
- Multi-step DB writes

---

## 7. Optimizing Performance in NestJS Applications

### Techniques
- Use Fastify
- Enable caching
- Use pagination
- Avoid request-scoped providers
- Use async providers

### WHY
- Reduce latency
- Improve throughput

---

## 8. Event-Driven Architecture in NestJS

### WHAT
Services communicate via events instead of direct calls.

### HOW
- EventEmitterModule
- Kafka / Redis events

```ts
this.eventEmitter.emit('order.created', payload);
```

### WHY
- Loose coupling
- Scalability

### WHEN
- Microservices
- Async workflows

---

## Interview-Ready Summary

- NestJS DI builds a dependency graph
- Singleton providers are fastest
- Request scope trades performance for isolation
- RBAC uses guards + metadata
- Microservices scale via messaging
- Kafka excels at high-throughput events
- Transactions ensure data consistency
- Event-driven systems improve resilience

---

## Conclusion
Mastering these topics places you at **senior-level NestJS proficiency** and prepares you for **architecture and system design interviews**.
