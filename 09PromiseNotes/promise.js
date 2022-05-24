'use strict';

console.log('Загруска данных...');

setTimeout(() => {
    console.log('Подготовка данных...');

    const product = {
        name: 'TV',
        price: 2000
    }

    setTimeout(() => {
        product.status = 'order';
        console.log(product);
    }, 2000)
}, 2000)