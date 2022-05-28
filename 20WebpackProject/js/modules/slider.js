function slider() {
    // Forms
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        postData(form);
    });

    const message = {
        loading: 'Загруска...',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Ой! Что-то пошло не так...'
    }

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form),
                statusMessage = document.createElement('div');
            statusMessage.innerHTML = message.loading;

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            axios.post('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanks(message.success);
                })
                .catch(() => {
                    showThanks(message.failure);
                })
                .finally(() => {
                    form.reset();
                })

            function showThanks(message) {
                openModal();
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
                    closeModal();
                }, 3000)
            }

        });
    };

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
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

module.exports = slider;