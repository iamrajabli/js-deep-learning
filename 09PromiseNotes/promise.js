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

// const req = new Promise((resolve, reject) => {
//     console.log('Загруска данных...');

//     setTimeout(() => {
//         console.log('Подготовка данных...');

//         const product = {
//             name: 'TV',
//             price: 2000
//         }

//         resolve(product);

//     }, 2000)
// });

// req.then(product => {

//     setTimeout(() => {
//         product.status = 'order';
//         console.log(product);
//     }, 2000)
// })


const req = new Promise((resolve, reject) => {
    console.log('Загруска данных...');

    setTimeout(() => {
        console.log('Подготовка данных...');

        const product = {
            name: 'TV',
            price: 2000
        }

        // resolve(product);
        reject();

    }, 2000)
});

req.then(product => new Promise((resolve, reject) => {
    setTimeout(() => {
        product.status = 'order';
        resolve(product);
    }, 2000);
}).then(product => {
    product.modify = true;
    return product;
}).then(product => {
    console.log(product);
})).catch(() => {
    console.error('Произошла ошибка');
}).finally(() => {
    console.log('Finally');
})