import fetch from 'node-fetch'; // Import node-fetch with ESM syntax

export async function handler(event, context) {
    const apiKey = process.env.WEATHER_API_KEY; // API key from environment variables

    // Default city is Berlin if not provided
    const city = event.queryStringParameters.city ? event.queryStringParameters.city.trim() : 'Berlin';

    // Validate city input
    if (!city) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please provide a valid city name.' }),
        };
    }

    const apiBaseUrl = 'https://api.weatherapi.com/v1/current.json?';
    const url = `${apiBaseUrl}key=${apiKey}&q=${city}&lang=en`;

    try {
        const response = await fetch(url);

        // Check for response errors
        if (!response.ok) {
            if (response.status === 404) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ error: 'City not found. Please check the name.' }),
                };
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error fetching weather data:', error); // Log the error for debugging
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error retrieving weather data.' }),
        };
    }
}
