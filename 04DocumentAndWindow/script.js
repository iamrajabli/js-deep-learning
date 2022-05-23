'use strict';

const box = document.querySelector('.box');

// clientWidth => without border, scroll
// const width = box.clientWidth; 
// const height = box.clientHeight;

// offsetWidth => with border, scroll
const width = box.offsetWidth
const height = box.offsetHeight;

console.log(width, height);