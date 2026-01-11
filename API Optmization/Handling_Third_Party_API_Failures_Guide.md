
# How to Handle Failures When a Third-Party API Is Down

This document provides a **deep, practical, interview-ready explanation** of how to handle failures
when a **third-party API becomes unavailable**.  
It is intended for **backend interviews, Node.js production systems, and long-term reference**.

---

## 1. Understanding the Problem

When your backend depends on a third-party API, you **do not control**:
- Its uptime
- Its performance
- Its deployment schedule
- Its breaking changes

If the third-party API goes down and you do nothing, the failure can:
- Cascade into your system
- Increase response times dramatically
- Cause request pileups
- Bring down your entire service

Handling failures correctly is about **containment**, not elimination.

---

## 2. Core Principles of Failure Handling

When a third-party API is down, your backend should aim to:

1. **Fail fast** instead of hanging
2. **Protect core services**
3. **Degrade gracefully**
4. **Recover automatically**
5. **Provide visibility to engineers**

These principles guide all strategies below.

---

## 3. Timeouts – Fail Fast (NON-NEGOTIABLE)

### Why Timeouts Are Critical
Without timeouts:
- Requests wait indefinitely
- Node.js event loop gets blocked
- Threads, memory, and sockets are exhausted

### Best Practice
Always configure **strict timeouts** for:
- Connection establishment
- Response waiting

```js
axios.get(url, { timeout: 3000 });
```

📌 Interview line:
> “A request without a timeout is a potential outage.”

---

## 4. Retries with Exponential Backoff

### When Retries Make Sense
Retries are useful only for **transient failures**:
- Network glitches
- Temporary 5xx errors

Do NOT retry:
- 4xx client errors
- Validation failures

### Exponential Backoff
Retries should wait longer between attempts:

- 1st retry → 500ms  
- 2nd retry → 1s  
- 3rd retry → 2s  

This prevents **retry storms**.

📌 Interview line:
> “Blind retries amplify failures instead of fixing them.”

---

## 5. Circuit Breaker Pattern (VERY IMPORTANT)

### What Is a Circuit Breaker?
A circuit breaker **stops calling a failing dependency**
after a certain failure threshold is reached.

### States
- **Closed** – normal calls allowed
- **Open** – calls blocked immediately
- **Half-open** – limited calls to test recovery

### Benefits
- Prevents cascading failures
- Reduces system load
- Enables faster recovery

📌 Interview line:
> “Circuit breakers isolate external failures from internal systems.”

---

## 6. Graceful Degradation

### What Is Graceful Degradation?
Instead of failing completely, the system:
- Returns partial data
- Uses fallback responses
- Disables non-critical features

### Examples
- Show cached data instead of live data
- Skip recommendations if recommender API is down
- Display warning message instead of error

📌 Interview line:
> “Not all features need 100% availability.”

---

## 7. Fallback Strategies

### Common Fallbacks
- Cached responses
- Default values
- Alternate providers
- Queued background jobs

### Example
If payment provider is down:
- Save order
- Mark as “pending payment”
- Retry later asynchronously

---

## 8. Caching as a Stability Mechanism

Caching is not just for performance — it is also for **resilience**.

### Benefits
- Reduces dependency calls
- Shields system during outages
- Improves user experience

### Example
- Cache exchange rates for 10 minutes
- Serve cached data when API is unavailable

📌 Interview line:
> “Cache can act as a shock absorber during outages.”

---

## 9. Asynchronous & Queue-Based Processing

### Why Async Helps
Do not block user requests waiting for failing services.

### Approach
- Accept request
- Push task to queue
- Process later when API recovers

Examples:
- Email sending
- Webhooks
- Notifications

This decouples user experience from third-party availability.

---

## 10. Rate Limiting & Load Shedding

### Why?
When a third-party API is down:
- Retrying too aggressively worsens the outage
- Your system must protect itself

### Techniques
- Reduce request rate
- Drop non-critical traffic
- Prioritize essential requests

📌 Interview line:
> “Load shedding keeps the system alive under stress.”

---

## 11. Error Mapping & User-Friendly Responses

Never expose raw third-party errors.

### Bad ❌
```json
{
  "error": "ECONNRESET from external-service.com"
}
```

### Good ✅
```json
{
  "errorCode": "DEPENDENCY_UNAVAILABLE",
  "message": "Service temporarily unavailable. Please try again later."
}
```

---

## 12. Monitoring, Alerts & Observability

### Monitor
- Error rates
- Timeout counts
- Latency spikes
- Circuit breaker state

### Alert
- Dependency failure percentage
- SLA breaches
- Sustained outages

📌 Interview line:
> “If you don’t monitor dependencies, outages become surprises.”

---

## 13. Versioning & Dependency Isolation

### Best Practices
- Wrap third-party APIs behind internal services
- Avoid leaking external models into core domain
- Version your integration logic

This allows fast changes when APIs break.

---

## 14. Testing Failure Scenarios

You must **test failures deliberately**.

### Techniques
- Mock API failures
- Chaos testing
- Simulate slow responses

This ensures your fallback logic actually works.

📌 Interview line:
> “Failure handling must be tested, not assumed.”

---

## 15. Real-World Failure Handling Checklist

Before production, ensure:
- Timeouts configured
- Retries with backoff
- Circuit breaker enabled
- Cache available
- Graceful degradation paths defined
- Async queues for non-critical work
- Alerts configured

---

## 16. Interview-Ready 30-Second Summary

> “When a third-party API is down, I fail fast using timeouts, apply retries with exponential backoff, use circuit breakers to stop cascading failures, degrade gracefully using cache or fallbacks, process work asynchronously, and monitor everything to recover quickly without impacting core services.”

---

## Final Thought

Third-party failures are inevitable.  
**Resilient systems are not those that never fail, but those that fail safely.**
