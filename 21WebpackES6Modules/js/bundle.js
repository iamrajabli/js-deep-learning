/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Calc
    const result = document.querySelector('.calculating__result span');
    let sex = 'famale',
        height, weight, age,
        ratio = 1.375;
    calcTotal();

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_____';
            return;
        }

        if (sex == 'famale') {
            result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(0);
        } else {
            result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(0);
        }
    }

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', e => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id')
                }

                elements.forEach(elem => elem.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                calcTotal()
            })
        })
    }

    getStaticInformation('#gender', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active')

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = '';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // Cards
    class MenuCard {
        constructor(src, alt, title, descr, price, selector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH();
            this.selector = document.querySelector(selector);
            this.classes = classes;
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
            this.selector.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(res => {
            res.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalSelector, modalTimerId) {
    // Forms
    const forms = document.querySelectorAll(formSelector),
        modal = document.querySelector(modalSelector);


    forms.forEach(form => {
        postForm(form);
    });

    const message = {
        loading: 'Загруска...',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Ой! Что-то пошло не так...'
    }

    function postForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form),
                statusMessage = document.createElement('div');
            statusMessage.innerHTML = message.loading;

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(() => {
                    showThanks(message.success);
                })
                .catch(() => {
                    showThanks(message.failure);
                })
                .finally(() => {
                    form.reset();
                })

            function showThanks(message) {
                ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
                const modalDialogPrev = document.querySelector('.modal__dialog');
                modalDialogPrev.classList.add('hide');

                const modalDialogNew = document.createElement('div');
                modalDialogNew.classList.add('modal__dialog');
                modalDialogNew.innerHTML = `
                    <div class="modal__content">
                    <form action="#">
                        <div data-close class="modal__close">&times;</div>
                        <div class="modal__title">${message}</div>
                    </form>
                    </div>
                    `;

                function closeNewModal() {
                    modalDialogNew.remove();
                    modalDialogPrev.classList.add('show');
                    modalDialogPrev.classList.remove('hide');
                }

                modal.addEventListener('click', (e) => {
                    if (e.target == modal || e.target.classList.contains('modal__close')) {
                        closeNewModal()
                    }
                });

                modal.append(modalDialogNew);

                setTimeout(() => {
                    closeNewModal();
                    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
                }, 3000)
            }

        });
    };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    })


    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.classList.contains('modal__close')) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {

    const slides = document.querySelectorAll(container),
        slider = document.querySelector(slide),
        prev = document.querySelector(nextArrow),
        next = document.querySelector(prevArrow),
        current = document.querySelector(totalCounter),
        total = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = 'all .5s';
    slidesWrapper.style.overflow = 'hidden';

    slider.style.position = 'relative';
    const indicator = document.createElement('ol'),
        dots = [];
    indicator.classList.add('carousel-indicators');
    indicator.style.cssText = `
     position: absolute;
     right: 0;
     bottom: 0;
     left: 0;
     z-index: 15;
     display: flex;
     justify-content: center;
     margin-right: 15%;
     margin-left: 15%;
     list-style: none;
 `;

    slider.append(indicator);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
     box-sizing: content-box;
     flex: 0 1 auto;
     width: 30px;
     height: 6px;
     margin-right: 3px;
     margin-left: 3px;
     cursor: pointer;
     background-color: #fff;
     background-clip: padding-box;
     border-top: 10px solid transparent;
     border-bottom: 10px solid transparent;
     opacity: .5;
     transition: opacity .6s ease;
     `;
        indicator.append(dot);
        dots.push(dot);
        if (i == 0) {
            dot.style.opacity = 1;
        }
    }

    let offset = 0;
    let slideIndex = 1;
    currentIndex();

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }


    function currentIndex() {
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }


    function dotCurrent() {
        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = '1';
    }

    slides.forEach(slide => slide.style.width = width)

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '')
    }

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
            slideIndex = slides.length;
        } else {
            offset -= deleteNotDigits(width);
            slideIndex--;
        }
        currentIndex();
        dotCurrent()
        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += deleteNotDigits(width);
            slideIndex++;
        }
        currentIndex();
        dotCurrent()
        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const dataSlideTo = e.target.getAttribute('data-slide-to');
            slideIndex = dataSlideTo;
            currentIndex();
            dotCurrent()
            offset = deleteNotDigits(width) * (slideIndex - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs

    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
            item.classList.remove('fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.add('fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass)
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                    item.classList.add(activeClass);
                }
            })
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    // Timer
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / (1000 * 60) % 60));
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async(url, data) => {
    const req = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await req.json();
}


const getResource = async url => {
    const req = await fetch(url);

    if (!req.ok) {
        throw new Error(`Could not fetch ${url}`);
    }

    return await req.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => { (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', modalTimerId); }, 300000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-09-12');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', '.modal', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slide',
        slide: '.offer__slider',
        nextArrow: '.offer__slider-prev',
        prevArrow: '.offer__slider-next',
        totalCounter: '#current',
        currentCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map