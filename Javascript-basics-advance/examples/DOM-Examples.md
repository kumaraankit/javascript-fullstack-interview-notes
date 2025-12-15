# DOM Hands-On Examples for JavaScript Interviews

This document provides **20-30 practical DOM examples** covering key concepts for frontend and full-stack interviews. Suitable for candidates with **6-7 years experience**.

---

## 1. Selecting Elements

```js
const elementById = document.getElementById('myId');
const elementsByClass = document.getElementsByClassName('myClass');
const elementsByTag = document.getElementsByTagName('div');
const elementQuery = document.querySelector('.myClass');
const elementsQueryAll = document.querySelectorAll('div');
```

## 2. Modifying Content

```js
const div = document.querySelector('#myDiv');
div.textContent = 'Hello World';
div.innerHTML = '<span>Hi</span>';
```

## 3. Modifying Attributes

```js
const img = document.querySelector('img');
img.setAttribute('src', 'image.png');
img.getAttribute('alt');
img.removeAttribute('title');
```

## 4. Manipulating Styles

```js
const box = document.querySelector('.box');
box.style.backgroundColor = 'red';
box.classList.add('active');
box.classList.remove('hidden');
box.classList.toggle('highlight');
```

## 5. Creating & Appending Elements

```js
const ul = document.querySelector('ul');
const li = document.createElement('li');
li.textContent = 'New Item';
ul.appendChild(li);
```

## 6. Removing Elements

```js
const removeDiv = document.querySelector('#removeMe');
removeDiv.remove();
```

## 7. Event Handling

```js
const button = document.querySelector('button');
button.addEventListener('click', (e) => {
  alert('Button clicked!');
});
```

## 8. Event Delegation

```js
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent);
  }
});
```

## 9. Form Handling

```js
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form submitted');
});
```

## 10. Input Value

```js
const input = document.querySelector('input');
console.log(input.value);
input.value = 'New Value';
```

## 11. DOM Traversal

```js
const parent = document.querySelector('.parent');
const children = parent.children;
const firstChild = parent.firstElementChild;
const lastChild = parent.lastElementChild;
const nextSibling = parent.nextElementSibling;
const prevSibling = parent.previousElementSibling;
```

## 12. Node Properties

```js
const node = document.querySelector('#node');
console.log(node.nodeType);
console.log(node.nodeName);
console.log(node.childNodes);
```

## 13. Cloning Nodes

```js
const original = document.querySelector('#original');
const clone = original.cloneNode(true);
document.body.appendChild(clone);
```

## 14. Data Attributes

```js
const div = document.querySelector('div');
console.log(div.dataset.userId);
div.dataset.role = 'admin';
```

## 15. Local Storage Interaction

```js
localStorage.setItem('name', 'Ankit');
console.log(localStorage.getItem('name'));
localStorage.removeItem('name');
```

## 16. Session Storage Interaction

```js
sessionStorage.setItem('session', '12345');
console.log(sessionStorage.getItem('session'));
sessionStorage.clear();
```

## 17. DOMContentLoaded Event

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
});
```

## 18. Window Events

```js
window.addEventListener('resize', () => {
  console.log('Window resized');
});
window.addEventListener('scroll', () => {
  console.log('Window scrolled');
});
```

## 19. Element Position

```js
const el = document.querySelector('.element');
console.log(el.getBoundingClientRect());
```

## 20. setTimeout / setInterval with DOM

```js
setTimeout(() => {
  document.body.style.backgroundColor = 'lightblue';
}, 2000);

const interval = setInterval(() => {
  console.log('Interval tick');
}, 1000);
clearInterval(interval);
```

## 21. Scroll Into View

```js
const section = document.querySelector('#section1');
section.scrollIntoView({ behavior: 'smooth' });
```

## 22. Creating a Modal Dynamically

```js
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = '<p>Modal Content</p><button id="close">Close</button>';
document.body.appendChild(modal);
document.querySelector('#close').addEventListener('click', () => modal.remove());
```

## 23. Toggle Visibility

```js
const box = document.querySelector('.box');
box.style.display = (box.style.display === 'none') ? 'block' : 'none';
```

## 24. Animation using DOM

```js
const box = document.querySelector('.box');
let pos = 0;
const id = setInterval(() => {
  if (pos >= 200) clearInterval(id);
  pos++;
  box.style.left = pos + 'px';
}, 10);
```

## 25. Template Literals & DOM

```js
const user = { name: 'Ankit', age: 25 };
document.body.innerHTML += `<div>${user.name} - ${user.age}</div>`;
```

## 26. Querying Attributes

```js
const link = document.querySelector('a');
console.log(link.href);
link.href = 'https://example.com';
```

## 27. Using document.createDocumentFragment

```js
const fragment = document.createDocumentFragment();
for(let i=0;i<5;i++){
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
document.querySelector('ul').appendChild(fragment);
```

## 28. Drag and Drop Example

```js
const draggable = document.querySelector('#drag');
draggable.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', draggable.id);
});
const dropzone = document.querySelector('#drop');
dropzone.addEventListener('dragover', (e) => e.preventDefault());
dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text');
  dropzone.appendChild(document.getElementById(id));
});
```

## 29. Event Bubbling and Capturing

```js
document.querySelector('#parent').addEventListener('click', () => console.log('Parent clicked'), true); // capture
document.querySelector('#child').addEventListener('click', () => console.log('Child clicked')); // bubble
```

## 30. Shadow DOM Example

```js
const host = document.querySelector('#host');
const shadow = host.attachShadow({ mode: 'open' });
shadow.innerHTML = `<p>Shadow Content</p>`;
```

---
