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
    const weatherIcons = {
        sunny: "assets/clear.svg",
        rain: "assets/rain.svg",
        cloudy: "assets/clouds.svg",
        fog: "assets/atmosphere.svg",
        haze: "assets/atmosphere.svg",
        drizzle: "assets/drizzle.svg",
        snow: "assets/snow.svg",
        thunderstorm: "assets/thunderstorm.svg",
    };

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
    fetchWeather('Frankfurt am Main');
};
