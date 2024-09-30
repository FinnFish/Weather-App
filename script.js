// Function to fetch weather data
async function fetchWeather(city) {
    try {
        // Calling the Netlify Function with the city as a parameter
        const response = await fetch(`/.netlify/functions/weather?city=${city}`);
        console.log(`API URL: ${response.url}`); 
        if (!response.ok) {
            throw new Error('City not found or an error occurred. Please try again.');
        }
        const data = await response.json();
        console.log(data); // Debugging: Log returned data
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
        console.error('Error fetching weather data:', error); // Debugging: Log error
    }
}

// Function to update UI with weather data
function updateWeatherUI(data) {
    const cityElement = document.getElementById('city');
    const dateElement = document.getElementById('date');
    const tempElement = document.getElementById('temp');
    const weatherElement = document.getElementById('weather');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');
    const weatherIcon = document.getElementById('weather-icon');

    // Current city and country
    cityElement.textContent = `${data.location.name}, ${data.location.country}`;

    // Update date
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    dateElement.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;

    // Update weather data
    tempElement.innerHTML = `<h2>${Math.round(data.current.temp_c)}°C</h2>`;
    weatherElement.textContent = data.current.condition.text;
    humidityElement.textContent = `${data.current.humidity}%`;
    windElement.textContent = `${data.current.wind_kph} km/h`;

    // Update weather icon based on the weather condition
    if (weatherCondition.includes("sunny")) {
        weatherIcon.src = "assets/clear.svg"; // Sunny icon
    } else if (weatherCondition.includes("rain")) {
        weatherIcon.src = "assets/rain.svg"; // Rainy icon
    } else if (weatherCondition.includes("cloudy")) {
        weatherIcon.src = "assets/clouds.svg"; // Cloudy icon
    } else if (weatherCondition.includes("fog") || weatherCondition.includes("haze")) {
        weatherIcon.src = "assets/atmosphere.svg"; // Fog icon
    } else if (weatherCondition.includes("drizzle")) {
        weatherIcon.src = "assets/drizzle.svg"; // Drizzle icon
    } else if (weatherCondition.includes("snow")) {
        weatherIcon.src = "assets/snow.svg"; // Snow icon
    } else if (weatherCondition.includes("thunderstorm")) {
        weatherIcon.src = "assets/thunderstorm.svg"; // Thunderstorm icon
    } else {
        weatherIcon.src = "assets/clear.svg"; // Fallback icon
    }
    

    const weatherCondition = data.current.condition.text.toLowerCase();
    const iconPath = Object.keys(weatherIcons).find(condition => weatherCondition.includes(condition)) 
                     ? weatherIcons[condition] 
                     : weatherIcons.sunny; // Fallback icon

    weatherIcon.src = iconPath;
    weatherIcon.alt = `Weather icon for ${data.current.condition.text}`; // Accessibility improvement
}

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', () => {
    const cityInput = document.getElementById('city-input').value.trim();
    if (cityInput) {
        fetchWeather(cityInput);
    } else {
        alert('Please enter a city');
    }
});

// Function to show default weather on page load
window.onload = () => {
    fetchWeather('Berlin');
};
