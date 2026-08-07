import SearchBar from "./SearchBar.js";
import Controls from "./Controls.js";
import { cloudLogo } from "../icons.js";
import { showHome } from "../../router.js";

export default function Header(onPreferencesChange) {
  const header = document.createElement("header");
  header.classList.add("app-header");

  const logo = document.createElement("button");
  logo.type = "button";
  logo.classList.add("logo-mark");
  logo.setAttribute("aria-label", "WeatherSearch home");
  logo.innerHTML = cloudLogo();
  logo.addEventListener("click", () => showHome());

  header.append(logo, SearchBar(), Controls(onPreferencesChange));
  return header;
}