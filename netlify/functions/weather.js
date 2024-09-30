import fetch from 'node-fetch'; // Importiert node-fetch mit der ESM-Syntax

export async function handler(event, context) {
    const apiKey = process.env.WEATHER_API_KEY;  // API-Key aus Umgebungsvariablen
    const city = event.queryStringParameters.city || 'Berlin'; // Standardwert 'Berlin'

    const apiBaseUrl = 'https://api.weatherapi.com/v1/current.json?';

    const url = `${apiBaseUrl}key=${apiKey}&q=${city}&lang=en`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Fehler beim Abrufen der Wetterdaten' }),
        };
    }
}
