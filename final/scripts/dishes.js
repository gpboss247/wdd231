// dishes.js, Main ES module for the Explore Dishes page. Imports favorites and
// modal logic from their own modules, fetches the dish data, and
// handles all filtering, rendering, and event wiring.

import { getFavorites, isFavorite, toggleFavorite } from './favorites.js';
import { openDishModal } from './modal.js';

const url = 'data/dishes.json';
const dishGrid = document.getElementById('dish-grid');
const resultCount = document.getElementById('dish-result-count');
const filterButtons = document.querySelectorAll('.spice-filter button');
const favoritesToggle = document.getElementById('favorites-toggle');

let allDishes = [];
let activeSpiceFilter = 'all';
let showFavoritesOnly = false;

async function getDishes() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Dish data request failed with status ${response.status}`);
    }

    const data = await response.json();
    allDishes = data.dishes;
    renderDishes();
  } catch (error) {
    dishGrid.innerHTML = `<p class="dish-error">Sorry, the dish list could not be loaded right now. Please try again later.</p>`;
    console.error('Error fetching dish data:', error);
  }
}

function getFilteredDishes() {
  let filtered = allDishes;

  if (activeSpiceFilter !== 'all') {
    filtered = filtered.filter((dish) => dish.spiceLevel === activeSpiceFilter);
  }

  if (showFavoritesOnly) {
    const favoriteIds = getFavorites();
    filtered = filtered.filter((dish) => favoriteIds.includes(dish.id));
  }

  return filtered;
}

function favoriteButtonMarkup(dish) {
  const saved = isFavorite(dish.id);
  return `
    <button class="favorite-btn ${saved ? 'saved' : ''}" data-id="${dish.id}" type="button" aria-label="${saved ? 'Remove from favorites' : 'Save to favorites'}">
      ${saved ? '★ Saved' : '☆ Save'}
    </button>
  `;
}

function renderDishes() {
  const dishes = getFilteredDishes();

  if (dishes.length === 0) {
    dishGrid.innerHTML = `<p class="dish-error">No dishes match this filter yet.</p>`;
    resultCount.textContent = '0 dishes';
    return;
  }

  dishGrid.innerHTML = dishes.map((dish) => `
    <div class="dish-card" data-id="${dish.id}">
      <img src="${dish.image}" alt="${dish.name}" loading="lazy" width="320" height="220">
      <div class="dish-card-body">
        <h2>${dish.name}</h2>
        <p class="dish-meta"><span>${dish.region}</span> &middot; <span>${dish.spiceLevel}</span></p>
        <p class="dish-price">${dish.priceRange}</p>
        ${favoriteButtonMarkup(dish)}
      </div>
    </div>
  `).join('');

  resultCount.textContent = `${dishes.length} ${dishes.length === 1 ? 'dish' : 'dishes'}`;

  attachCardListeners(dishes);
}

function attachCardListeners(dishes) {
  document.querySelectorAll('.dish-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      // Ignore clicks that originated on the favorite button itself,
      // so saving a dish doesn't also pop the modal open.
      if (event.target.closest('.favorite-btn')) return;

      const dishId = Number(card.dataset.id);
      const dish = dishes.find((d) => d.id === dishId);
      openDishModal(dish, favoriteButtonMarkup(dish));

      // Re attach a fresh listener for the button now inside the modal
      const modalFavBtn = document.querySelector('#dish-modal .favorite-btn');
      modalFavBtn.addEventListener('click', () => handleFavoriteClick(dishId, modalFavBtn));
    });
  });

  document.querySelectorAll('.favorite-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const dishId = Number(button.dataset.id);
      handleFavoriteClick(dishId, button);
    });
  });
}

function handleFavoriteClick(dishId, button) {
  const nowSaved = toggleFavorite(dishId);
  button.classList.toggle('saved', nowSaved);
  button.textContent = nowSaved ? '★ Saved' : '☆ Save';
  button.setAttribute('aria-label', nowSaved ? 'Remove from favorites' : 'Save to favorites');

  // update the matching card button on the grid behind the modal
  const gridButton = document.querySelector(`.dish-card[data-id="${dishId}"] .favorite-btn`);
  if (gridButton && gridButton !== button) {
    gridButton.classList.toggle('saved', nowSaved);
    gridButton.textContent = nowSaved ? '★ Saved' : '☆ Save';
  }

  // If currently viewing "favorites only" and a dish was just removed,
  // refresh the list so it disappears immediately.
  if (showFavoritesOnly && !nowSaved) {
    renderDishes();
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    activeSpiceFilter = button.dataset.spice;
    renderDishes();
  });
});

favoritesToggle.addEventListener('click', () => {
  showFavoritesOnly = !showFavoritesOnly;
  favoritesToggle.classList.toggle('active', showFavoritesOnly);
  favoritesToggle.textContent = showFavoritesOnly ? '★ Showing Favorites' : '☆ Show Favorites Only';
  renderDishes();
});

getDishes();