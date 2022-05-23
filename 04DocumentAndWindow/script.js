'use strict';

const box = document.querySelector('.box'),
    btn = document.querySelector('button');

// clientWidth => without border, scroll
// const width = box.clientWidth; 
// const height = box.clientHeight;

// offsetWidth => with border, scroll
// const width = box.offsetWidth
// const height = box.offsetHeight;

// scrollWidth => with scroll
const width = box.scrollWidth
const height = box.scrollHeight;

btn.addEventListener('click', () => {
    console.log(box.scrollTop);
});

// get all sizes
console.log(box.getBoundingClientRect());

// get all css styles
const styleBox = window.getComputedStyle(box);

console.log(styleBox.display);