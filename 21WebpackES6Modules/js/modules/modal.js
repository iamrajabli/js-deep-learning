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

export default modal;
export { closeModal };
export { openModal };