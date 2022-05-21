const btns = document.querySelectorAll('button'),
    wrapper = document.querySelector('.btn-block');


// console.log(btns[0].classList); // show all classes
// console.log(btns[0].classList.length); // show all classes length
// console.log(btns[0].classList.item(0)); // show first class
// btns[0].classList.add('red'); // add class .red
// btns[0].classList.remove('blue'); // remove class .blue
// btns[0].classList.toggle('green'); // add or remove class .green

if (btns[0].classList.contains('some')) { // validate being class
    console.log(true);
}

btns[0].addEventListener('click', () => {
    // Example 1 - long if
    // if (!btns[1].classList.contains('green')) {
    //     btns[1].classList.add('green');
    // } else {
    //     btns[1].classList.remove('green');
    // }

    // Example 2 - short if
    // (!btns[1].classList.contains('green')) ?
    // btns[1].classList.add('green'): btns[1].classList.remove('green');

    // Example 3 - with toggle
    btns[1].classList.toggle('green');
});

wrapper.addEventListener('click', (event) => {
    // Example 1 - validate button
    if (event.target && event.target.tagName == 'BUTTON') {
        console.log('This is a button');
    }
})

const btn = document.createElement('button');
btn.classList.add('green');
wrapper.append(btn);