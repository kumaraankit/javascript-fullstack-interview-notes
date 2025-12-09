# Hydration in Web Applications

Hydration is the process in which a JavaScript framework (like React,
Next.js, Vue, etc.) takes over a server‑rendered HTML page and attaches
event listeners, state, and client-side functionality to make it fully
interactive.

## Why Hydration Is Needed

When HTML is rendered on the server (SSR), the browser receives static
markup with no JavaScript logic attached.\
Hydration allows reusing this HTML instead of re-rendering it from
scratch.

### Key Steps:

1.  **Server renders HTML** → Browser displays content quickly.
2.  **Browser downloads JS bundle**.
3.  **Framework hydrates** → Attaches event listeners & initializes
    components.
4.  Page becomes fully interactive.

------------------------------------------------------------------------

## Example of Hydration in React

### Server-Side Rendering (SSR)

``` jsx
// server.js
import express from "express";
import ReactDOMServer from "react-dom/server";
import App from "./App";

const app = express();

app.get("/", (req, res) => {
  const html = ReactDOMServer.renderToString(<App />);
  res.send(`
    <html>
      <body>
        <div id="root">${html}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000);
```

### Client-Side Hydration

``` jsx
// client.js
import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

hydrateRoot(document.getElementById("root"), <App />);
```

------------------------------------------------------------------------

## Why Not Just Use Pure Client Rendering?

Because SSR improves: - **Performance** (initial load faster) -
**SEO** - **User-perceived speed**

Hydration combines SSR performance with SPA interactivity.

------------------------------------------------------------------------

## Example Issues During Hydration

### 1. Mismatched Markup

Happens when server HTML ≠ client HTML.

``` jsx
// Server renders: <p>Hello</p>
// Client renders: <p>Hello World</p>
```

React will warn:

    Warning: Text content did not match...

### 2. Large Hydration Costs

If a page has many interactive components, hydration becomes slow.

------------------------------------------------------------------------

## Partial & Progressive Hydration

### Partial Hydration

Only interactive islands are hydrated.

### Example using Astro

``` html
<div>
  <StaticContent />
  <InteractiveCounter client:load />
</div>
```

### Progressive Hydration

Hydrate components only when they become visible.

------------------------------------------------------------------------

## Streaming Hydration (React 18)

React sends HTML in chunks and hydrates progressively.

``` jsx
import { renderToPipeableStream } from "react-dom/server";
```

------------------------------------------------------------------------

## Summary

Hydration: - Makes SSR-rendered HTML interactive - Lets frameworks take
over server-rendered markup - Improves SEO + UX - Can be optimized using
partial/progressive hydration

It is a core concept in frameworks like Next.js, Remix, Nuxt, and Astro.
