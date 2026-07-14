// directory.js
// Fetches chamber member data from members.json and renders it as
// either a card grid or a one column list, based on user selection.

const url = 'data/members.json';
const directoryContainer = document.getElementById('directory-container');
const gridBtn = document.getElementById('btn-grid');
const listBtn = document.getElementById('btn-list');
const resultCount = document.getElementById('result-count');

const levelLabel = { 1: 'Member', 2: 'Silver Member', 3: 'Gold Member' };

async function getMembers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members, 'grid');
  } catch (error) {
    directoryContainer.innerHTML = `<p>Sorry, member data could not be loaded right now.</p>`;
    console.error('Error fetching member data:', error);
  }
}

function displayMembers(members, view) {
  directoryContainer.className = view === 'grid' ? 'biz-grid' : 'biz-list';

  directoryContainer.innerHTML = members.map((member) => `
    <div class="biz-card">
      <div class="card-top">
        ${view === 'grid' ? `<img class="biz-logo" src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="54" height="54">` : ''}
        <div class="biz-header">
          <div class="biz-name">${member.name}</div>
          <div class="biz-tagline">${member.tagline}</div>
          <span class="biz-level level-${member.membership}">${levelLabel[member.membership]}</span>
        </div>
      </div>
      <div class="biz-info">
        <div class="info-row"><span class="icon">@</span>${member.address}</div>
        <div class="info-row"><span class="icon">#</span>${member.phone}</div>
        <div class="info-row"><span class="icon">&gt;</span><a href="${member.website}" target="_blank" rel="noopener">${member.website.replace('https://', '')}</a></div>
      </div>
    </div>
  `).join('');

  resultCount.textContent = `${members.length} member businesses`;

  // Store the last-fetched members so the toggle buttons can re-render
  // without a second network request.
  directoryContainer.dataset.loaded = 'true';
  window.__members = members;
}

gridBtn.addEventListener('click', () => {
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
  if (window.__members) displayMembers(window.__members, 'grid');
});

listBtn.addEventListener('click', () => {
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
  if (window.__members) displayMembers(window.__members, 'list');
});

getMembers();