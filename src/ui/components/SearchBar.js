import { searchLocation } from "../../api/search.js";
import { showSearch } from "../../router.js";
import "../../style/header.css";

export default function SearchBar() {
  const wrap = document.createElement("div");
  wrap.classList.add("search-container");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search location";
  input.autocomplete = "off";

  const suggestions = document.createElement("div");
  suggestions.classList.add("suggestions");

  wrap.append(input, suggestions);

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
            input.value = "";
            suggestions.innerHTML = "";
            suggestions.classList.remove("active");
            showSearch(location);
          });

          suggestions.appendChild(item);
        });

        if (locations.length > 0) suggestions.classList.add("active");
      } catch (error) {
        console.error(error);
      }
    }, 300);
  });

  return wrap;
}