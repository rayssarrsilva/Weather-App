const app = document.querySelector("#content");

export function renderPage(page) {
  app.innerHTML = "";
  app.appendChild(page);
}