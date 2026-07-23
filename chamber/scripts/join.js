// join.js Sets the hidden timestamp field on page load, and wires up the
// four membership benefit modals.

const timestampField = document.getElementById('timestamp');
timestampField.value = new Date().toString();

const modalTriggers = document.querySelectorAll('.modal-trigger');
const benefitModals = document.querySelectorAll('.benefits-modal');

modalTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const modalId = trigger.dataset.modal;
    const modal = document.getElementById(modalId);
    modal.showModal();
  });
});

benefitModals.forEach((modal) => {
  // Close button inside each modal
  const closeButton = modal.querySelector('.closeModal');
  closeButton.addEventListener('click', () => {
    modal.close();
  });

  // Close when the user clicks outside the modal's content box
  modal.addEventListener('click', (event) => {
    const modalBounds = modal.getBoundingClientRect();
    const clickedOutside =
      event.clientX < modalBounds.left ||
      event.clientX > modalBounds.right ||
      event.clientY < modalBounds.top ||
      event.clientY > modalBounds.bottom;

    if (clickedOutside) {
      modal.close();
    }
  });
});