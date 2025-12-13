# Tree Shaking in JavaScript

This document explains **Tree Shaking**, a common optimization technique in modern JavaScript development, suitable for both frontend developers and SDE-2 interview preparation.

---

## 1. What is Tree Shaking?

Tree Shaking is a **dead code elimination technique** used by bundlers to remove **unused code** from the final JavaScript bundle.

* Helps reduce **bundle size** and improve **performance**
* Works primarily with **ES6 module syntax** (`import/export`)

---

## 2. How Tree Shaking Works

1. Bundler scans all **imported modules**
2. Identifies which **exports are actually used**
3. Removes unused exports from the final bundle

```js
// lodash.js (library)
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// main.js
import { add } from './lodash.js';
console.log(add(2, 3));
```

* Only `add` function is included in the bundle
* `multiply` is removed by tree shaking

---

## 3. Requirements for Tree Shaking

* **ES6 module syntax** (`import` / `export`)
* Bundler support (Webpack, Rollup, Parcel)
* Production build (`mode: 'production'` in Webpack)
* No side-effects in modules (otherwise cannot safely remove code)

---

## 4. Side Effects and Tree Shaking

* Tree shaking works safely only if modules have **no side-effects**
* Use `package.json` to define `"sideEffects": false`

```json
{
  "name": "my-lib",
  "sideEffects": false
}
```

* Prevents bundler from including unused code that might have side-effects

---

## 5. Tree Shaking vs Minification

| Feature | Tree Shaking          | Minification                                                       |
| ------- | --------------------- | ------------------------------------------------------------------ |
| Purpose | Remove unused code    | Reduce size of existing code (rename variables, remove whitespace) |
| Scope   | Import/export modules | All JS code                                                        |
| Timing  | Build time            | Build time                                                         |

---

## 6. Example with Library

```js
// utils.js
export function log(msg) { console.log(msg); }
export function debug(msg) { console.debug(msg); }

// main.js
import { log } from './utils.js';
log('Hello');
```

* After tree shaking, only `log` is included in the bundle
* `debug` is removed

---

## 7. Benefits of Tree Shaking

* Smaller **bundle size**
* Faster **load time**
* Reduced **memory footprint**
* Better **performance**, especially on mobile devices

---

## 8. Tools Supporting Tree Shaking

* **Webpack**: enabled in production mode
* **Rollup**: optimized for ES modules
* **Parcel**: auto tree-shaking
* **Babel**: helps with module transformation (use `@babel/preset-env` carefully)

---

## 9. Best Practices

* Always use **ES6 modules**
* Avoid importing the **whole library** if only a few functions are needed
* Mark side-effect-free libraries correctly in `package.json`
* Analyze bundle with tools like **webpack-bundle-analyzer**

---

## 10. Summary

> Tree Shaking is a build-time optimization that removes unused code from JavaScript bundles, reducing size and improving performance. It works best with ES6 modules, side-effect-free libraries, and modern bundlers.

---

