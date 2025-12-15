# 20 Scenario-Based DOM Interview Questions with Answers

This document contains **20 scenario-based DOM interview questions** with explanations and example code, suitable for 6–7 years experienced frontend/full-stack candidates.

---

## 1. Dynamic List Creation

**Scenario:** Create a dynamic list of items from an array based on a condition.

**Answer:**

```js
const items = [1,2,3,4,5];
const ul = document.querySelector('#list');
items.forEach(item => {
  if(item % 2 === 0){ // condition
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  }
});
```

*Explanation: Only items meeting the condition are appended to the DOM.*

---

## 2. Event Delegation

**Scenario:** Efficiently handle delete buttons in a large table.

**Answer:**

```js
document.querySelector('table').addEventListener('click', (e) => {
  if(e.target.classList.contains('delete-btn')){
    e.target.closest('tr').remove();
  }
});
```

*Explanation: One listener handles all delete buttons via event bubbling.*

---

## 3. Form Validation

```js
form.addEventListener('input', (e) => {
  if(e.target.value.trim() === ''){
    e.target.classList.add('error');
  } else {
    e.target.classList.remove('error');
  }
});
```

*Explanation: Real-time input validation with DOM class manipulation.*

---

## 4. Toggle Class on Click

```js
document.querySelector('#darkModeBtn').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
```

*Explanation: Uses `classList.toggle` to switch classes.*

---

## 5. Modal Popup

```js
const modal = document.querySelector('#modal');
const openBtn = document.querySelector('#open');
const closeBtn = document.querySelector('#close');
openBtn.addEventListener('click', () => modal.style.display='block');
closeBtn.addEventListener('click', () => modal.style.display='none');
window.addEventListener('click', e => { if(e.target==modal) modal.style.display='none'; });
```

*Explanation: Handles multiple events to open/close modal.*

---

## 6. Live Search Filter

```js
const input = document.querySelector('#search');
const items = document.querySelectorAll('li');
input.addEventListener('input', () => {
  const val = input.value.toLowerCase();
  items.forEach(li => li.style.display = li.textContent.toLowerCase().includes(val) ? 'list-item' : 'none');
});
```

*Explanation: Filters list items dynamically based on input.*

---

## 7. Drag-and-Drop List

```js
const draggable = document.querySelectorAll('.draggable');
draggable.forEach(el => el.addEventListener('dragstart', e => e.dataTransfer.setData('text', e.target.id)));
const dropzone = document.querySelector('#drop');
dropzone.addEventListener('dragover', e => e.preventDefault());
dropzone.addEventListener('drop', e => {
  const id = e.dataTransfer.getData('text');
  dropzone.appendChild(document.getElementById(id));
});
```

*Explanation: Implements drag-and-drop using HTML5 API.*

---

## 8. Infinite Scroll

```js
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100){
    loadMoreContent();
  }
});
```

*Explanation: Checks scroll position and loads more content dynamically.*

---

## 9. Accordion Component

```js
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    document.querySelectorAll('.accordion-content').forEach(c => c.style.display='none');
    header.nextElementSibling.style.display = 'block';
  });
});
```

*Explanation: Shows only one content at a time.*

---

## 10. Tab Navigation

```js
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab-content').forEach(c => c.style.display='none');
    document.querySelector('#' + tab.dataset.target).style.display='block';
  });
});
```

*Explanation: Switches tab content based on clicked tab.*

---

## 11. Highlight Current Menu Item

```js
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    if(window.scrollY >= sec.offsetTop){
      document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
      document.querySelector('.menu a[href="#' + sec.id + '"]').classList.add('active');
    }
  });
});
```

*Explanation: Updates menu item based on scroll.*

---

## 12. Image Carousel

```js
let index = 0;
const slides = document.querySelectorAll('.slide');
setInterval(() => {
  slides.forEach(s => s.style.display='none');
  slides[index].style.display='block';
  index = (index+1)%slides.length;
}, 3000);
```

*Explanation: Cycles images every 3 seconds.*

---

## 13. Tooltip on Hover

```js
const tooltip = document.createElement('div');
tooltip.className='tooltip';
document.body.appendChild(tooltip);
document.querySelectorAll('.hoverable').forEach(el => {
  el.addEventListener('mouseover', () => { tooltip.textContent = el.dataset.tip; tooltip.style.display='block'; });
  el.addEventListener('mouseout', () => { tooltip.style.display='none'; });
});
```

*Explanation: Shows/hides tooltip dynamically.*

---

## 14. Sticky Header

```js
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 100);
});
```

*Explanation: Toggles class based on scroll position.*

---

## 15. Countdown Timer

```js
let time = 10;
const display = document.querySelector('#timer');
const interval = setInterval(() => {
  display.textContent = time;
  time--;
  if(time<0) clearInterval(interval);
}, 1000);
```

*Explanation: Updates DOM every second.*

---

## 16. Editable Table Cells

```js
document.querySelectorAll('td').forEach(td => {
  td.addEventListener('click', () => {
    const input = document.createElement('input');
    input.value = td.textContent;
    td.textContent='';
    td.appendChild(input);
    input.focus();
    input.addEventListener('blur', () => td.textContent = input.value);
  });
});
```

*Explanation: Enables inline editing.*

---

## 17. Copy to Clipboard

```js
document.querySelector('#copyBtn').addEventListener('click', () => {
  const input = document.querySelector('#textToCopy');
  input.select();
  navigator.clipboard.writeText(input.value);
});
```

*Explanation: Copies input value to clipboard.*

---

## 18. Highlight Text Selection

```js
const div = document.querySelector('#content');
div.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  console.log('Selected text:', selection.toString());
});
```

*Explanation: Detects selected text inside a div.*

---

## 19. Lazy Load Images

```js
const imgs = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
});
imgs.forEach(img => observer.observe(img));
```

*Explanation: Loads images only when entering viewport using IntersectionObserver.*

---

## 20. Shadow DOM Component

```js
const host = document.querySelector('#host');
const shadow = host.attachShadow({mode:'open'});
shadow.innerHTML = `<style>p{color:red;}</style><p>Shadow content</p>`;
```

*Explanation: Encapsulates DOM and styles inside shadow root.*

---

