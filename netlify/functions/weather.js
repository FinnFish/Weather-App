export async function handler(event, context) {
    const apiKey = process.env.WEATHER_API_KEY; // Stellen Sie sicher, dass dieser korrekt gesetzt ist
    const city = event.queryStringParameters.city || 'Berlin'; // Standardwert

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=en`;

    try {
        const response = await fetch(url); // Verwenden Sie die eingebaute fetch-Funktion
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Stadt nicht gefunden oder ein Fehler ist aufgetreten.' }),
            };
        }
        const data = await response.json(); // Holen Sie sich die JSON-Daten
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Fehler beim Abrufen der Wetterdaten:', error); // Fehlerprotokollierung
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Fehler beim Abrufen der Wetterdaten.' }),
        };
    }
}
