import { openModal, closeModal } from "./modal";
import { postData } from "../services/services"

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

            postData('http://localhost:3000/requests', json)
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
                openModal('.modal', modalTimerId);
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
                    closeModal('.modal');
                }, 3000)
            }

        });
    };
}

export default forms;