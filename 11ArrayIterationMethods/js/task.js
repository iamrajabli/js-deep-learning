// Task

const films = [{
        name: 'Titanic',
        rating: 9
    },
    {
        name: 'Die hard 5',
        rating: 5
    },
    {
        name: 'Matrix',
        rating: 8
    },
    {
        name: 'Some bad film',
        rating: 4
    }
];


function showGoodFilms(arr) {
    const rating = arr.filter(film => film['rating'] >= 8)

    return rating;
}

function showListOfFilms(arr) {
    const allFilms = arr.map(film => film['name'])
        .reduce((films, filmArr) => `${films}, ${filmArr}`)
    return allFilms;
}

function setFilmsIds(arr) {
    let count = 0;

    const setFilms = arr.map(film => {
        film.id = count++;
        return film;
    });

    return setFilms
}


const tranformedArray = setFilmsIds(films);

function checkFilms(arr) {
    return arr.some(film => film['id'])
}


const funds = [
    { amount: -1400 },
    { amount: 2400 },
    { amount: -1000 },
    { amount: 500 },
    { amount: 10400 },
    { amount: -11400 }
];

const getPositiveIncomeAmount = (data) => {
    return data.filter(fund => fund['amount'] > 0)
        .reduce((acc, curr) => acc + curr['amount'], 0)
};


const getTotalIncomeAmount = (data) => {

    return (data.some(fund => fund['amount'] < 0)) ? data.reduce((acc, curr) => acc + curr['amount'], 0) : getPositiveIncomeAmount(data);


};