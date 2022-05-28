'use strict';

class User {
    constructor(name, age) {
        this.name = name;
        this._age = age;
    }
    getInfo() {
        console.log(`This is ${this.name}. ${this.name} is ${this.age} years old`);
    }

    get age() {
        return this._age;
    }

    set age(n) {
        if (typeof n == 'number' && n > 0 && n < 100) {
            this._age = n;
        } else {
            console.log('Ой... что-то пошло не так!');
        }
    }
}

const hikmat = new User('Hikmat', 22);

hikmat.age = 30;
console.log(hikmat.age);
hikmat.getInfo();