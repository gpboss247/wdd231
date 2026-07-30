// discover.js
// ES module imports the 8 items of interest and builds a card for
// each, also handles the localStorage based last visit message.

import { discoverItems } from '../data/discover.mjs';

const cardContainer = document.getElementById('discover-grid');

function buildCard(item, index) {
  const card = document.createElement('div');
  card.classList.add('discover-card', `card-${index + 1}`);

  const heading = document.createElement('h2');
  heading.textContent = item.name;

  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.setAttribute('src', item.image);
  img.setAttribute('alt', item.name);
  img.setAttribute('loading', 'lazy');
  img.setAttribute('width', '300');
  img.setAttribute('height', '200');
  figure.appendChild(img);

  const address = document.createElement('address');
  address.textContent = item.address;

  const description = document.createElement('p');
  description.textContent = item.description;

  const learnMoreBtn = document.createElement('button');
  learnMoreBtn.type = 'button';
  learnMoreBtn.textContent = 'Learn More';
  learnMoreBtn.addEventListener('click', () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`;
    window.open(mapsUrl, '_blank', 'noopener');
  });

  card.appendChild(heading);
  card.appendChild(figure);
  card.appendChild(address);
  card.appendChild(description);
  card.appendChild(learnMoreBtn);

  return card;
}

discoverItems.forEach((item, index) => {
  cardContainer.appendChild(buildCard(item, index));
});

// Last VisitMessage LocalStorage 
function displayVisitMessage() {
  const visitBanner = document.getElementById('visit-message');
  const now = Date.now();
  const lastVisit = localStorage.getItem('discoverLastVisit');

  let message;

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const msSinceLastVisit = now - Number(lastVisit);
    const oneDay = 1000 * 60 * 60 * 24;

    if (msSinceLastVisit < oneDay) {
      message = "Back so soon! Awesome!";
    } else {
      const daysSince = Math.floor(msSinceLastVisit / oneDay);
      const dayWord = daysSince === 1 ? "day" : "days";
      message = `You last visited ${daysSince} ${dayWord} ago.`;
    }
  }

  visitBanner.textContent = message;
  localStorage.setItem('discoverLastVisit', now.toString());
}

displayVisitMessage();

const closeVisitMessage = document.getElementById('close-visit-message');
closeVisitMessage.addEventListener('click', () => {
  document.getElementById('visit-banner').classList.add('hidden');
});