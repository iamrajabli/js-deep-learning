'use strict';

// const reg = new RegExp();
// /pattern/f

const ans = prompt('Enter your name');
const reg = /n/ig;

// console.log(ans.search(reg));
console.log(ans.match(reg));