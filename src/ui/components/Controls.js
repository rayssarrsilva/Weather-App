import { getTheme, getUnit, toggleTheme, toggleUnit } from "../../utils/preferences.js";
import { themeIcon } from "../icons.js";

export default function Controls(onChange) {
  const wrap = document.createElement("div");
  wrap.classList.add("controls");

  const themeBtn = document.createElement("button");
  themeBtn.type = "button";
  themeBtn.classList.add("control-btn");
  themeBtn.setAttribute("aria-label", "Toggle dark/light mode");

  const unitBtn = document.createElement("button");
  unitBtn.type = "button";
  unitBtn.classList.add("control-btn");
  unitBtn.setAttribute("aria-label", "Toggle Celsius/Fahrenheit");

  function render() {
    themeBtn.innerHTML = themeIcon(getTheme() === "dark" ? "sun" : "moon");
    unitBtn.textContent = getUnit() === "c" ? "°C" : "°F";
  }

  themeBtn.addEventListener("click", () => {
    toggleTheme();
    render();
    onChange?.();
  });

  unitBtn.addEventListener("click", () => {
    toggleUnit();
    render();
    onChange?.();
  });

  render();
  wrap.append(themeBtn, unitBtn);
  return wrap;
}