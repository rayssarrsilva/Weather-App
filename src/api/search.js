export async function searchLocation(query){
    if (!query.trim()) {
        return [];
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?name= ${encodeURIComponent(query)}&count=5&language=en&format=json`;

    const response = await fetch(url);

    if (!response.ok){
        throw Error("Failed to search locations");
    }

    const data = await response.json();

    return data.results || [];
}