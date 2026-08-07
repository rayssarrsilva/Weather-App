const KEY = process.env.KEY;

export default function getWeather() {
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/last30days?key=${KEY}`
  )
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}