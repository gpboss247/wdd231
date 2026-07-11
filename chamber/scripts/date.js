// date.js
// Dynamically outputs the copyright year and last modified date
// in the Chamber site footer.

document.getElementById('currentyear').textContent = new Date().getFullYear();

document.getElementById('lastModified').textContent =
  `Last Modification: ${document.lastModified}`;