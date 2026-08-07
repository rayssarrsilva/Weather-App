import Home from "./ui/Home.js";
import {getWeather} from "./api/client.js";

const app = document.querySelector("#content");

app.appendChild(Home());

getWeather().then((data) => {
  const section = document.querySelector(".home");

  const temperature = document.createElement("p");
  temperature.textContent = `Temperature: ${data.days[0].temp}°F`;

  section.appendChild(temperature);
});