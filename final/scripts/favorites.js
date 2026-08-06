// favorites.js, ES module handling all localStorage read/write logic for the
// user's saved favorite dishes. Exported so other modules can
// import just the pieces they need.

const STORAGE_KEY = 'chopLagosFavorites';

export function getFavorites() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function isFavorite(dishId) {
  return getFavorites().includes(dishId);
}

export function toggleFavorite(dishId) {
  const favorites = getFavorites();
  const alreadySaved = favorites.includes(dishId);

  const updated = alreadySaved
    ? favorites.filter((id) => id !== dishId)
    : [...favorites, dishId];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return !alreadySaved;
}