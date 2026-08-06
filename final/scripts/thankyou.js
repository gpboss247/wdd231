// thankyou.js Reads the form data passed via the URL query string since the
// submit form uses method="get" and displays it.

const params = new URLSearchParams(window.location.search);

function displayField(id, paramName, fallback = 'Not provided') {
  const value = params.get(paramName);
  document.getElementById(id).textContent = value && value.trim() !== '' ? value : fallback;
}

displayField('out-name', 'submittername');
displayField('out-email', 'submitteremail');
displayField('out-dish', 'dishname');
displayField('out-region', 'region');
displayField('out-price', 'pricerange');
displayField('out-description', 'dishdescription');

const spiceLabels = { mild: 'Mild', hot: 'Hot', veryhot: 'Very Hot' };
const rawSpice = params.get('spicelevel');
document.getElementById('out-spice').textContent = spiceLabels[rawSpice] || 'Not provided';

const rawTimestamp = params.get('timestamp');
const timestampDate = rawTimestamp ? new Date(rawTimestamp) : null;
document.getElementById('out-timestamp').textContent =
  timestampDate && !isNaN(timestampDate)
    ? timestampDate.toLocaleString()
    : 'Not provided';