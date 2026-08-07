import { getWeather } from "../api/client.js";
import "../style/home.css";

export default function Location(location) {
  const content = document.createElement("main");
  content.classList.add("location");

  const title = document.createElement("h1");
  title.textContent = location.name;

  const info = document.createElement("p");
  info.textContent = `${location.admin1 || ""}, ${location.country || ""}`;

  content.append(title, info);

  getWeather(location.name)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

  return content;
}