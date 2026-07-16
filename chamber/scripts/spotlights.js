// spotlights.js
// Fetches chamber member data and displays 2-3 randomly selected
// gold or silver members as spotlight cards. Selection re randomizes
// on every page load.

const membersUrl = 'data/members.json';
const spotlightContainer = document.getElementById('spotlights-container');

const levelLabel = { 2: 'Silver Member', 3: 'Gold Member' };

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) throw new Error('Member data request failed');
    const data = await response.json();

    // Only gold (3) and silver (2) members are eligible for a spotlight.
    const eligible = data.members.filter(
      (member) => member.membership === 2 || member.membership === 3
    );

    const shuffled = shuffle(eligible);
    const spotlightCount = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffled.slice(0, spotlightCount);

    displaySpotlights(selected);
  } catch (error) {
    spotlightContainer.innerHTML = `<p class="weather-error">Spotlights are unavailable right now.</p>`;
    console.error('Error fetching spotlight data:', error);
  }
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = members.map((member) => `
    <div class="spotlight-card">
      <img class="spotlight-logo" src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="64" height="64">
      <span class="biz-level level-${member.membership}">${levelLabel[member.membership]}</span>
      <h3 class="spotlight-name">${member.name}</h3>
      <p class="spotlight-detail">${member.address}</p>
      <p class="spotlight-detail">${member.phone}</p>
      <a class="spotlight-link" href="${member.website}" target="_blank" rel="noopener">${member.website.replace('https://', '')}</a>
    </div>
  `).join('');
}

getSpotlights();