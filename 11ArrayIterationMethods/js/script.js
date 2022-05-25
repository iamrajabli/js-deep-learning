'use strict';


// filter
const names = ['Ivan', 'Ann', 'Ksenia', 'Pragmatech'];
const shortNames = names.filter(name => name.length < 5);
console.log('filter: ', shortNames); // filter:  [ 'Ivan', 'Ann' ]

// map
const answers = ['BakU', 'NeTname', 'pRagMa', 'Unibank'];
const result = answers.map(item => item.toLowerCase());
console.log('map: ', result); // map:  [ 'baku', 'netname', 'pragma', 'unibank' ]

// some
const inputs = [12, 'hikmat', 'khnuvd'];
console.log('some result:', inputs.some(input => typeof(input) === 'number'));

// every
console.log('every result:', inputs.every(input => typeof(input) === 'number'));

// reduce
const numArr = [1, 2, 3, 4, 5];
const plus = numArr.reduce((sum, current) => sum + current);
console.log('+:', plus);

const strArr = ['apple', 'pear', 'orange'];
const strArrPlus = strArr.reduce((sum, current) => `${sum}, ${current}`);
console.log(strArrPlus);


// Object.entries()
const obj = {
    Hikmat: 'person',
    Ali: 'person',
    dog: 'animal',
    cat: 'animal'
}

const newArr = Object.entries(obj)
    .filter(item => item[1] === 'person')
    .map(item => item[0]);

console.log(newArr);