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

export default calc;