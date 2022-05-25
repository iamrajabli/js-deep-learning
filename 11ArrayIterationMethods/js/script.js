'use strict';


// filter
const names = ['Ivan', 'Ann', 'Ksenia', 'Pragmatech'];
const shortNames = names.filter(name => name.length < 5);
console.log('filter: ', shortNames); // filter:  [ 'Ivan', 'Ann' ]

// map
const answers = ['BakU', 'NeTname', 'pRagMa', 'Unibank'];
const result = answers.map(item => item.toLowerCase());
console.log('map: ', result); // map:  [ 'baku', 'netname', 'pragma', 'unibank' ]