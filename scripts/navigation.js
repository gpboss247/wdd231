// navigation.js
// Handles the small-screen hamburger menu toggle.

const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primary-nav');

hamburger.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close the menu automatically if the viewport is resized past the
// mobile breakpoint while the menu is open.
window.addEventListener('resize', () => {
  if (window.innerWidth >= 700 && primaryNav.classList.contains('open')) {
    primaryNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});