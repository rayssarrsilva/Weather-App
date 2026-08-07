import { searchLocation } from "../api/search.js";
import "../style/home.css";

export default function Home() {
    const content = document.createElement("main");
    content.classList.add("home");

    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.textContent = "WeatherSearch";

    const title = document.createElement("h1");
    title.textContent = "Welcome To ";

    const Title2 = document.createElement("span");
    Title2.textContent = "WeatherSearch";

    title.appendChild(Title2);

    const description = document.createElement("p");
    description.textContent = 
    "Choose a location to view the weather forecast";

    const search = document.createElement("div");
    search.classList.add("search-container");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search Location";
    input.autocomplete = "off";

    const sugestions = document.createElement("div");
    sugestions.classList.add("suggestions");

    search.append(input, sugestions);
    content.append(
        logo,
        title,
        description,
        search
    );

    let timeout;

    input.addEventListener("input", () => {
    clearTimeout(timeout);

    const query = input.value.trim();

    suggestions.innerHTML = "";
    suggestions.classList.remove("active");

    if (!query) {
        return;
    }

    timeout = setTimeout(async () => {
        try {
        const locations = await searchLocations(query);

        locations.forEach((location) => {
            const item = document.createElement("button");
            item.classList.add("suggestion");

            const region = location.admin1
            ? `, ${location.admin1}`
            : "";

            const country = location.country
            ? `, ${location.country}`
            : "";

            item.textContent =
            `${location.name}${region}${country}`;

            item.addEventListener("click", () => {
            input.value = location.name;
            suggestions.innerHTML = "";
            suggestions.classList.remove("active");

            console.log(location);
            });

            suggestions.appendChild(item);
        });

        if (locations.length > 0) {
            suggestions.classList.add("active");
        }
        } catch (error) {
        console.error(error);
        }
    }, 300);
    });

    return content;
}