# SSR vs CSR vs SSG

## 1. CSR — Client-Side Rendering
**Rendering Location:** Browser  
**HTML Generated:** After JavaScript loads on client

### How it works:
- Browser loads a basic/empty HTML file  
- JavaScript bundle downloads  
- JavaScript fetches data and builds the UI dynamically  

### Pros:
- Very interactive (SPA experience)  
- Great for dashboards & apps needing fast UI updates  

### Cons:
- Slow initial load (blank screen until JS loads)  
- Poor SEO by default  

### Examples:
React SPA, Vue SPA, Angular SPA

---

## 2. SSR — Server-Side Rendering
**Rendering Location:** Server  
**HTML Generated:** On every request

### How it works:
- User requests a page  
- Server prepares HTML with data  
- Browser gets fully rendered HTML  
- JavaScript hydrates the page for interactivity  

### Pros:
- Faster first load  
- Excellent SEO  
- Good for dynamic content  

### Cons:
- Higher server load  
- Navigation slower than CSR  
- More complex setup  

### Examples:
Next.js SSR, Nuxt.js SSR, Remix

---

## 3. SSG — Static Site Generation
**Rendering Location:** Build Time  
**HTML Generated:** Once during build, served as static files

### How it works:
- Build process generates HTML for all pages  
- Pages are served directly via CDN  
- JavaScript adds optional interactivity  

### Pros:
- Extremely fast (pre-rendered pages)  
- Zero runtime server cost  
- Great SEO  

### Cons:
- Not suitable for frequently changing content  
- Requires rebuilds for data updates  

### Examples:
Next.js SSG, Gatsby, Hugo, Jekyll

---

## Summary Table

| Feature | CSR | SSR | SSG |
|--------|-----|-----|-----|
| Rendered at | Browser | Server | Build time |
| First load speed | Slow | Fast | Very fast |
| SEO | Weak | Strong | Strong |
| Best Use Case | Dashboards, SPAs | Dynamic pages | Blogs, Docs |

