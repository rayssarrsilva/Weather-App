const KEY = process.env.KEY;

export async function getWeather(location) {
  const url =
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` +
    `${encodeURIComponent(location)}` +
    `?unitGroup=us&key=${KEY}&contentType=json`;

  console.log("Weather URL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Visual Crossing error:", {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });

    throw new Error(
      `Weather API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}