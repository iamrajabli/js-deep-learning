const btns = document.querySelectorAll('button');

console.log(btns[0].classList); // show all classes
console.log(btns[0].classList.length); // show all classes length
console.log(btns[0].classList.item(0)); // show first class
btns[0].classList.add('red'); // add class .red
btns[0].classList.remove('blue'); // remove class .blue