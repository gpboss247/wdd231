// modal.js, ES module handling the dish detail modal. The dishes.js module
// imports openDishModal and calls it whenever a card is clicked.

const modal = document.getElementById('dish-modal');
const closeButton = document.getElementById('closeDishModal');

closeButton.addEventListener('click', () => {
  modal.close();
});

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

export function openDishModal(dish, favoriteButtonHTML) {
  modal.innerHTML = `
    <button id="closeDishModal" class="closeModal" aria-label="Close">&#10005;</button>
    <img src="${dish.image}" alt="${dish.name}" width="320" height="220">
    <h2>${dish.name}</h2>
    <p class="modal-meta"><strong>Region:</strong> ${dish.region} &middot; <strong>Spice Level:</strong> ${dish.spiceLevel} &middot; <strong>Price:</strong> ${dish.priceRange}</p>
    <p>${dish.description}</p>
    ${favoriteButtonHTML}
  `;

 
  document.getElementById('closeDishModal').addEventListener('click', () => {
    modal.close();
  });

  modal.showModal();
}

export function closeDishModal() {
  modal.close();
}