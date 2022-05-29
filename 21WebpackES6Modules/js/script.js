import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import openModal from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => { openModal('.modal', modalTimerId); }, 300000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-09-12');
    cards();
    forms('form', '.modal', modalTimerId);
    slider({
        container: '.offer__slide',
        slide: '.offer__slider',
        nextArrow: '.offer__slider-prev',
        prevArrow: '.offer__slider-next',
        totalCounter: '#current',
        currentCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();
});