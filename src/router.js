import Home from "./ui/Home.js";
import Location from "./ui/search.js";

const app = document.querySelector("#content");

export function showHome() {
  app.innerHTML = "";
  app.appendChild(Home());
}

export function showLocation(location) {
  app.innerHTML = "";
  app.appendChild(Location(location));
}