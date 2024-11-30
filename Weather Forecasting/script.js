const apiKey = 'EHBJZP44YH4Y8AJEAUR89ELLW'; // Your Visual Crossing API key

// Get references to the DOM elements
const cityInput = document.getElementById('city');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Function to fetch weather data from Visual Crossing API
function fetchWeather(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found or invalid API key');
      }
      return response.json(); // Parse the response to JSON
    })
    .then(data => {
      // Process and display the weather data
      cityName.innerText = `${data.address}, ${data.resolvedAddress}`;
      temperature.innerText = `Temperature: ${data.currentConditions.temp}°C`;
      description.innerText = `Condition: ${data.currentConditions.conditions}`;
      humidity.innerText = `Humidity: ${data.currentConditions.humidity}%`;
      windSpeed.innerText = `Wind Speed: ${data.currentConditions.windspeed} m/s`;

      // Show the weather info
      weatherInfo.style.display = 'block';
    })
    .catch(err => {
      alert('Error fetching weather data: ' + err.message);
    });
}

// Event listener for the button click
getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city!');
  }
});

// Optional: You can also add an event listener for pressing "Enter" in the input field
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeatherBtn.click();
  }
});
