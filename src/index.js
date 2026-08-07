import InitialPage from "./ui/Home.js";
import getWeather from "./api/client.js";

const app = document.querySelector("#content");

app.appendChild(InitialPage());

getWeather().then((data) => {
  const section = document.querySelector(".initial-content");

  const temperature = document.createElement("p");
  temperature.textContent = `Temperature: ${data.days[0].temp}°F`;

  section.appendChild(temperature);
});