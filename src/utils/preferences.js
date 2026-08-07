const THEME_KEY = "ws:theme";
const UNIT_KEY = "ws:unit";

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "dark";
}

export function getUnit() {
  return localStorage.getItem(UNIT_KEY) || "c";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

export function setUnit(unit) {
  localStorage.setItem(UNIT_KEY, unit);
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

export function toggleUnit() {
  setUnit(getUnit() === "c" ? "f" : "c");
}

export function initPreferences() {
  applyTheme(getTheme());
}

export function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

export function formatTemp(celsius, unit = getUnit()) {
  if (celsius === undefined || celsius === null) return "--°";
  const value = unit === "f" ? toFahrenheit(celsius) : Math.round(celsius);
  return `${value}°${unit.toUpperCase()}`;
}