import SearchBar from "./components/SearchBar.js";
import Controls from "./components/Controls.js";
import "../style/home.css";

export default function Home() {
  const content = document.createElement("main");
  content.classList.add("home");

  const rings = document.createElement("div");
  rings.classList.add("isobars");
  rings.setAttribute("aria-hidden", "true");

  const hero = document.createElement("div");
  hero.classList.add("hero");

  const logo = document.createElement("div");
  logo.classList.add("logo");
  logo.textContent = "WeatherSearch";

  const title = document.createElement("h1");
  title.textContent = "Welcome to ";
  const titleAccent = document.createElement("span");
  titleAccent.textContent = "WeatherSearch";
  title.appendChild(titleAccent);

  const description = document.createElement("p");
  description.textContent = "Choose a location to view the weather forecast";

  hero.append(logo, title, description, SearchBar());

  const footer = document.createElement("footer");
  footer.classList.add("home-footer");
  footer.textContent = `© ${new Date().getFullYear()} Rayssa Roberta R. Silva. All rights reserved.`;

  content.append(rings, Controls(), hero, footer);
  return content;
}