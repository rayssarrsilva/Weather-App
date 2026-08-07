import { getWeather } from "../api/client.js";
import "../style/card.css";
import "../style/header.css";

export default function Search(location) {
  const content = document.createElement("main");
  content.classList.add("search-page");

  const title = document.createElement("h1");
  title.textContent = location.name;

  const place = document.createElement("p");
  place.textContent = `${location.admin1 || ""}, ${location.country || ""}`;

  content.append(title, place);

  getWeather(location.name)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

  return content;
}