'use strict';

// const reg = new RegExp();
// /pattern/f

// const ans = prompt('Enter your name');
// const reg = /n/ig;

// console.log(ans.search(reg));
// console.log(ans.match(reg));

// const pass = prompt('enter password');

// just "."
// console.log(pass.replace(/\./g, "*"));

// all 
// console.log(pass.replace(/./g, "*"));

// let time = '12-15-18';
// console.log(time.replace(/-/g, ':')); // 12:15:18

// const ans = prompt('enter px');
// console.log(ans.match(/\d/g));

const text = 'My name is R1R2';
console.log(text.match(/\w\d\w\d/));