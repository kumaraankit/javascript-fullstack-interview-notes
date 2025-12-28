# RBAC Middleware (Role-Based Access Control) – Express.js
---

## 1. What Is RBAC Middleware?

RBAC (Role-Based Access Control) middleware is an **authorization middleware** that:

* Runs **after authentication middleware**
* Checks the role/permission of an authenticated user
* Allows or denies access to a route based on roles

👉 It answers the question:

> **What is this authenticated user allowed to do?**

---

## 2. WHY RBAC Is Implemented as Middleware

Without RBAC middleware:

* Role checks are scattered across controllers
* Business logic gets polluted with security logic
* Authorization rules become inconsistent and buggy

With RBAC middleware:

* Authorization rules are **centralized**
* Controllers stay clean
* Security is enforced before business logic executes

> Interviews expect RBAC to be enforced at the middleware layer, not inside controllers.

---

## 3. Authentication vs Authorization (Quick Revision)

| Authentication | Authorization          |
| -------------- | ---------------------- |
| Who are you?   | What can you do?       |
| JWT validation | Role/permission checks |
| Happens first  | Happens after auth     |

👉 RBAC **always depends on authentication**.

---

## 4. RBAC Mental Model (Execution Flow)

```
Client → Auth Middleware → RBAC Middleware → Route Handler → Response
```

Steps:

1. Auth middleware attaches `req.user`
2. RBAC middleware reads `req.user.role`
3. Role is matched against allowed roles
4. Request is allowed or rejected

---

## 5. Basic Assumption (Important)

Authentication middleware has already attached user data:

```js
req.user = {
  id: '123',
  role: 'ADMIN'
}
```

RBAC middleware **must never verify identity**, only permissions.

---

## 6. RBAC Middleware – Core Design

We use a **higher-order function** so roles can be passed dynamically.

```js
allowRoles('ADMIN', 'MANAGER')
```

Why this design?

* Reusable
* Declarative
* Clean route definitions

---

## 7. RBAC Middleware – Implementation

```js
function allowRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }

    next();
  };
}

module.exports = allowRoles;
```

---

## 8. How to Use RBAC Middleware

```js
const authenticate = require('./authenticate');
const allowRoles = require('./allowRoles');

app.get(
  '/admin/dashboard',
  authenticate,
  allowRoles('ADMIN'),
  (req, res) => {
    res.send('Welcome Admin');
  }
);

app.get(
  '/reports',
  authenticate,
  allowRoles('ADMIN', 'MANAGER'),
  (req, res) => {
    res.send('Reports Data');
  }
);
```

---

## 9. Expected Behavior

| User Role | Endpoint         | Result      |
| --------- | ---------------- | ----------- |
| ADMIN     | /admin/dashboard | ✅ Allowed   |
| MANAGER   | /admin/dashboard | ❌ Forbidden |
| USER      | /reports         | ❌ Forbidden |
| MANAGER   | /reports         | ✅ Allowed   |

---

## 10. Common Interview Mistakes (REAL FAIL POINTS)

### ❌ Mixing auth and RBAC logic

RBAC should never verify tokens.

### ❌ Hardcoding role checks inside controllers

Leads to unmaintainable code.

### ❌ Using 401 instead of 403

* 401 → not authenticated
* 403 → authenticated but not authorized

---

## 11. Advanced RBAC Patterns (Interview Bonus)

### Role Hierarchy

```js
ADMIN > MANAGER > USER
```

Handled by mapping roles to priority levels.

---

### Permission-Based Access Control (PBAC)

Instead of roles:

```js
allowPermissions('READ_REPORTS', 'EXPORT_DATA')
```

More flexible in large systems.

---

## 12. Interview-Ready Explanation (Say This)

> "RBAC middleware runs after authentication and checks whether the authenticated user’s role is included in the allowed roles for a route. If not, it blocks access with HTTP 403. This keeps authorization logic centralized and separate from business logic."
