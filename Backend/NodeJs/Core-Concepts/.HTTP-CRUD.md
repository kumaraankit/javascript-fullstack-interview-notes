
# CRUD Using Native HTTP Server in Node.js (Interview Guide)

This example demonstrates **basic CRUD operations using Node.js native `http` module** (without Express).  
This is a **common interview question** to test understanding of core Node.js concepts.

---

## What This Example Covers
- Creating an HTTP server
- Manual routing
- Parsing request body
- Handling HTTP methods
- Sending JSON responses
- In-memory data storage

---

## Sample Data (In-Memory)
```js
let users = [
  { id: 1, name: 'Ankit' },
  { id: 2, name: 'Rahul' }
];
```

---

## Complete CRUD Implementation

```js
const http = require('http');

let users = [
  { id: 1, name: 'Ankit' },
  { id: 2, name: 'Rahul' }
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  res.setHeader('Content-Type', 'application/json');

  // READ
  if (method === 'GET' && url === '/users') {
    res.writeHead(200);
    res.end(JSON.stringify(users));
  }

  // CREATE
  else if (method === 'POST' && url === '/users') {
    let body = '';

    req.on('data', chunk => body += chunk.toString());

    req.on('end', () => {
      const newUser = JSON.parse(body);
      newUser.id = users.length + 1;
      users.push(newUser);

      res.writeHead(201);
      res.end(JSON.stringify(newUser));
    });
  }

  // UPDATE
  else if (method === 'PUT' && url.startsWith('/users/')) {
    const id = parseInt(url.split('/')[2]);
    let body = '';

    req.on('data', chunk => body += chunk.toString());

    req.on('end', () => {
      const updatedData = JSON.parse(body);
      const user = users.find(u => u.id === id);

      if (!user) {
        res.writeHead(404);
        return res.end(JSON.stringify({ message: 'User not found' }));
      }

      user.name = updatedData.name;
      res.writeHead(200);
      res.end(JSON.stringify(user));
    });
  }

  // DELETE
  else if (method === 'DELETE' && url.startsWith('/users/')) {
    const id = parseInt(url.split('/')[2]);
    users = users.filter(u => u.id !== id);

    res.writeHead(200);
    res.end(JSON.stringify({ message: 'User deleted' }));
  }

  // INVALID ROUTE
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(3000, () => {
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
- Demonstrates core Node.js fundamentals
- No framework abstractions
- Manual routing and parsing
- Explains why Express is commonly used

---

## Conclusion
Understanding CRUD with the native HTTP module helps build a strong foundation in Node.js and is often tested in **backend interviews**.
