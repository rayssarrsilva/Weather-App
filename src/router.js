import Home from "./ui/Home.js";
import Search from "./ui/Search.js";
import { renderPage } from "./ui/Page.js";

export function showHome() {
  renderPage(Home());
}

export function showSearch(location) {
  renderPage(Search(location));
}