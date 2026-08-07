const KEY = process.env.KEY;

export async function getWeather(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/?key=${KEY}`
    
    const response = await fetch(url);

    if (!response.ok){
        throw new Error("Failed to fetch weather data");
    }

    return response.json();
}