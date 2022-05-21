const btns = document.querySelectorAll('button');

console.log(btns[0].classList); // show all classes
console.log(btns[0].classList.length); // show all classes length
console.log(btns[0].classList.item(0)); // show first class
btns[0].classList.add('red'); // add class .red
btns[0].classList.remove('blue'); // remove class .blue
btns[0].classList.toggle('green'); // add or remove class .green

if (btns[0].classList.contains('some')) { // validate being class
    console.log(true);
}

btns[0].addEventListener('click', () => {
    // Example 1
    if (!btns[1].classList.contains('green')) {
        btns[1].classList.add('green');
    } else {
        btns[1].classList.remove('green');
    }
})