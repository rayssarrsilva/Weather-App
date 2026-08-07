const THEME_KEY = "ws:theme";
const UNIT_KEY = "ws:unit";

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "dark";
}

export function getUnit() {
  return localStorage.getItem(UNIT_KEY) || "f";
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
  setUnit(getUnit() === "f" ? "c" : "f");
}

export function initPreferences() {
  applyTheme(getTheme());
}

export function toCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) * 5 / 9);
}

export function formatTemp(fahrenheit, unit = getUnit()) {
  if (fahrenheit === undefined || fahrenheit === null) {
    return "--°";
  }

  const value =
    unit === "c"
      ? toCelsius(fahrenheit)
      : Math.round(fahrenheit);

  return `${value}°${unit.toUpperCase()}`;
}