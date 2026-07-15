
// weather.js
// Fetches current weather and a 3-day forecast for Lagos, Nigeria
// from the OpenWeatherMap API.

const apiKey = 'fad819e5d0369ffb7d91576da49a7810';
const city = 'Lagos,NG';
const units = 'metric';
 
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
 
async function getCurrentWeather() {
  try {
    const response = await fetch(currentWeatherUrl);
    if (!response.ok) throw new Error('Current weather request failed');
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    document.getElementById('weather-current').innerHTML =
      `<p class="weather-error">Current weather is unavailable right now.</p>`;
    console.error('Error fetching current weather:', error);
  }
}
 
async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) throw new Error('Forecast request failed');
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    document.getElementById('forecast-container').innerHTML =
      `<p class="weather-error">Forecast is unavailable right now.</p>`;
    console.error('Error fetching forecast:', error);
  }
}
 
function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
 
  document.getElementById('current-temp').textContent = `${temp}°C`;
  document.getElementById('current-desc').textContent = description;
  document.getElementById('current-icon').setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  document.getElementById('current-icon').setAttribute('alt', description);
}
 
function displayForecast(data) {
  const forecastContainer = document.getElementById('forecast-container');
 
  // The free forecast endpoint returns data in 3 hour blocks for 5 days.
  // Pull the entry closest to midday for each of the next 3 days to
  // approximate a daily forecast.
  const middayEntries = data.list
    .filter((entry) => entry.dt_txt.includes('12:00:00'))
    .slice(0, 3);
 
  forecastContainer.innerHTML = middayEntries.map((entry) => {
    const date = new Date(entry.dt_txt);
    const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(entry.main.temp);
    return `
      <div class="forecast-day">
        <span class="forecast-label">${dayLabel}</span>
        <span class="forecast-temp">${temp}°C</span>
      </div>
    `;
  }).join('');
}
 
getCurrentWeather();
getForecast();