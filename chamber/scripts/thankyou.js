// thankyou.js Reads the form data passed via the URL query string 
//  and displays the required fields.

const params = new URLSearchParams(window.location.search);

function displayField(id, paramName, fallback = 'Not provided') {
  const value = params.get(paramName);
  document.getElementById(id).textContent = value && value.trim() !== '' ? value : fallback;
}

displayField('out-fname', 'fname');
displayField('out-lname', 'lname');
displayField('out-email', 'email');
displayField('out-phone', 'phone');
displayField('out-orgname', 'orgname');

const rawTimestamp = params.get('timestamp');
const timestampDate = rawTimestamp ? new Date(rawTimestamp) : null;
document.getElementById('out-timestamp').textContent =
  timestampDate && !isNaN(timestampDate)
    ? timestampDate.toLocaleString()
    : 'Not provided';