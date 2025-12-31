
# CRUD Operations Using Express.js (Interview Guide)

This guide demonstrates **basic CRUD operations using Express.js**, which is a **very common interview requirement** for Node.js backend roles.

---

## What This Example Covers
- Express server setup
- RESTful CRUD APIs
- Request body parsing
- Route handling
- JSON responses
- In-memory data storage

---

## Prerequisites
```bash
npm install express
```

---

## Sample Data (In-Memory)
```js
let users = [
  { id: 1, name: 'Ankit' },
  { id: 2, name: 'Rahul' }
];
```

---

## Complete CRUD Implementation Using Express

```js
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

let users = [
  { id: 1, name: 'Ankit' },
  { id: 2, name: 'Rahul' }
];

// READ - Get all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// CREATE - Add a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE - Update a user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = req.body.name;
  res.status(200).json(user);
});

// DELETE - Remove a user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);

  res.status(200).json({ message: 'User deleted successfully' });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## How to Test Using curl

### GET all users
```bash
curl http://localhost:3000/users
```

### CREATE user
```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name":"Suresh"}'
```

### UPDATE user
```bash
curl -X PUT http://localhost:3000/users/1 \
-H "Content-Type: application/json" \
-d '{"name":"Updated Name"}'
```

### DELETE user
```bash
curl -X DELETE http://localhost:3000/users/2
```

---

## Interview Notes
- Express simplifies routing and request parsing
- `express.json()` replaces manual body parsing
- RESTful routes follow HTTP semantics
- This structure easily scales with controllers & services

---

## Conclusion
CRUD using Express.js is the foundation of most Node.js APIs.  
Understanding this clearly helps you **ace backend interviews** and transition to scalable architectures easily.
