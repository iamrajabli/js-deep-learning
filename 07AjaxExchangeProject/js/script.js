'use strict';

const inputAzn = document.querySelector('#azn'),
    inputUsd = document.querySelector('#usd');


inputAzn.addEventListener('input', () => {
    const request = new XMLHttpRequest();

    request.open('GET', './js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('load', () => {
        if (request.status == 200) {
            const response = JSON.parse(request.response);
            inputUsd.value = (inputAzn.value / response.current.usd).toFixed(2);
        }
    });


})