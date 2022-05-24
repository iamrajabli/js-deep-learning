'use strict';

// console.log('Загруска данных...');

// setTimeout(() => {
//     console.log('Подготовка данных...');

//     const product = {
//         name: 'TV',
//         price: 2000
//     }

//     setTimeout(() => {
//         product.status = 'order';
//         console.log(product);
//     }, 2000)
// }, 2000)

const req = new Promise((resolve, reject) => {
    console.log('Загруска данных...');

    setTimeout(() => {
        console.log('Подготовка данных...');

        const product = {
            name: 'TV',
            price: 2000
        }

        resolve(product);

    }, 2000)
});

req.then(product => {

    setTimeout(() => {
        product.status = 'order';
        console.log(product);
    }, 2000)
})