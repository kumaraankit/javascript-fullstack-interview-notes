# Repaint vs Reflow

When the browser updates the UI, it performs two operations: **reflow** and **repaint**. Both are part of the rendering pipeline, but they differ in cost and what triggers them.

---

## 1. Reflow (Layout)

Reflow occurs when the browser must **recalculate the layout** of part or all of the webpage.  
It computes the **size, position, and geometry** of each affected element.

### What triggers a reflow?
- Changing width/height of an element  
- Changing layout properties (margin, padding, border, display, position)  
- Adding/removing DOM elements  
- Changing fonts or text size  
- Page resize  
- Measuring layout (`offsetHeight`, `scrollTop`, etc.)

### Cost
- **Very expensive** because it may require recalculating layout for the entire document.

---

## 2. Repaint (Redraw)

Repaint occurs when an element’s **visual appearance changes**, but its **layout does NOT change**.

### What triggers a repaint?
- Changing background color  
- Changing text color  
- Changing visibility (`visibility: hidden`)  
- Applying box-shadow or outline  

### Cost
- **Cheaper** than reflow since no layout computation happens.

---

## Reflow vs Repaint Summary

| Feature | Reflow | Repaint |
|--------|--------|----------|
| Layout recalculation | Yes | No |
| Pixel redraw | Yes | Yes |
| Performance impact | High | Low |
| Triggered by | Size/position/layout changes | Visual changes only |
| Examples | width, height, DOM changes | background, color |

---

## Summary

- **Reflow = layout recalculation** (expensive)  
- **Repaint = visual update only** (cheaper)  
- Optimize UI changes to reduce reflows and improve performance.

