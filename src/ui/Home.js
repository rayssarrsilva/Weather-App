import { searchLocation } from "../api/search.js";
import { showLocation } from "../router.js";
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

  const search = document.createElement("div");
  search.classList.add("search-container");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search location";
  input.autocomplete = "off";

  const suggestions = document.createElement("div");
  suggestions.classList.add("suggestions");

  search.append(input, suggestions);
  hero.append(logo, title, description, search);

  const footer = document.createElement("footer");
  footer.classList.add("home-footer");
  footer.textContent = `© ${new Date().getFullYear()} WeatherSearch. All rights reserved.`;

  content.append(rings, hero, footer);

  let timeout;
  input.addEventListener("input", () => {
    clearTimeout(timeout);
    const query = input.value.trim();
    suggestions.innerHTML = "";
    suggestions.classList.remove("active");
    if (!query) return;

    timeout = setTimeout(async () => {
      try {
        const locations = await searchLocation(query);
        suggestions.innerHTML = "";

        locations.forEach((location) => {
          const item = document.createElement("button");
          item.type = "button";
          item.classList.add("suggestion");

          const region = location.admin1 ? `, ${location.admin1}` : "";
          const country = location.country ? `, ${location.country}` : "";

          const name = document.createElement("span");
          name.classList.add("suggestion-name");
          name.textContent = location.name;

          const place = document.createElement("span");
          place.classList.add("suggestion-place");
          place.textContent = `${region}${country}`.replace(/^,\s*/, "");

          item.append(name, place);

          item.addEventListener("click", () => {
            input.value = location.name;
            suggestions.innerHTML = "";
            suggestions.classList.remove("active");
            console.log(location);
          });

          suggestions.appendChild(item);
        });

        if (locations.length > 0) suggestions.classList.add("active");
      } catch (error) {
        console.error(error);
      }
    }, 300);
  });

  return content;
}