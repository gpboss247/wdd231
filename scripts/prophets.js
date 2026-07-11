// prophets.js
// Fetches Latter-day Prophet data via the Fetch API and builds a card
// for each prophet using the DOM API.

const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets); // temporary testing of data response
  displayProphets(data.prophets); // reference the prophets array, not the whole object
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements to add to the div#cards element
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let dateOfBirth = document.createElement('p');
    let placeOfBirth = document.createElement('p');

    // Build the h2 content out to show the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Build the image portrait by setting all the relevant attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Build the date of birth and place of birth content
    dateOfBirth.classList.add('prophet-detail');
    dateOfBirth.innerHTML = `<span class="detail-label">Born:</span> ${prophet.birthdate}`;

    placeOfBirth.classList.add('prophet-detail');
    placeOfBirth.innerHTML = `<span class="detail-label">Place:</span> ${prophet.birthplace}`;

    // Show each prophet's order in the line of succession as a badge
    card.setAttribute('data-order', `#${prophet.order}`);

    // Append the section (card) with the created elements
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(dateOfBirth);
    card.appendChild(placeOfBirth);

    cards.appendChild(card);
  }); // end of arrow function and forEach loop
};

getProphetData();