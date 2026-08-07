import { getWeather } from "../api/client.js";
import Header from "./components/Header.js";
import { formatTemp } from "../utils/preferences.js";
import { getWeatherIcon, detailIcons } from "./icons.js";
import "../style/header.css";
import "../style/card.css";

export default function Search(location) {
  const content = document.createElement("main");
  content.classList.add("search-page");

  const layout = document.createElement("div");
  layout.classList.add("weather-layout");

  const status = document.createElement("p");
  status.classList.add("status-message");
  status.textContent = "Loading weather…";
  layout.appendChild(status);

  let weatherData = null;

  function renderWeather() {
    if (!weatherData) return;
    layout.innerHTML = "";
    layout.appendChild(buildHeroCard(location, weatherData));
    layout.appendChild(buildDetailsColumn(weatherData));
  }

  content.append(Header(renderWeather), layout);

  getWeather(`${location.latitude},${location.longitude}`)
    .then((data) => {
      weatherData = data;
      renderWeather();
    })
    .catch((error) => {
      console.error(error);
      layout.innerHTML = "";
      const errorMsg = document.createElement("p");
      errorMsg.classList.add("status-message", "status-error");
      errorMsg.textContent = "Could not load weather for this location.";
      layout.appendChild(errorMsg);
    });

  return content;
}

function buildHeroCard(location, data) {
  const current = data.currentConditions || {};
  const today = (data.days && data.days[0]) || {};

  const card = document.createElement("section");
  card.classList.add("hero-card");

  const top = document.createElement("div");
  top.classList.add("hero-top");

  const place = document.createElement("div");
  const name = document.createElement("h1");
  name.classList.add("hero-location");
  const region = location.admin1 ? `, ${location.admin1}` : "";
  const country = location.country ? ` - ${location.country}` : "";
  name.textContent = `${location.name}${region}${country}`;
  const date = document.createElement("p");
  date.classList.add("hero-date");
  date.textContent = formatDate(today.datetime);
  place.append(name, date);

  const time = document.createElement("span");
  time.classList.add("hero-time");
  time.textContent = formatTime(current.datetime);

  top.append(place, time);

  const body = document.createElement("div");
  body.classList.add("hero-body");

  const tempBlock = document.createElement("div");
  tempBlock.classList.add("hero-temp-block");

  const temp = document.createElement("p");
  temp.classList.add("hero-temp");
  temp.textContent = formatTemp(current.temp);

  const range = document.createElement("p");
  range.classList.add("hero-range");
  range.innerHTML = `${formatTemp(today.tempmin)} / ${formatTemp(today.tempmax)} <span class="dot">•</span> ${current.conditions || ""}`;

  tempBlock.append(temp, range);

  const icon = document.createElement("div");
  icon.classList.add("hero-icon");
  icon.innerHTML = getWeatherIcon(current.icon, 140);

  body.append(tempBlock, icon);
  card.append(top, body);
  return card;
}

function buildDetailsColumn(data) {
  const current = data.currentConditions || {};
  const days = (data.days || []).slice(0, 5);

  const col = document.createElement("div");
  col.classList.add("details-column");

  const detailsPanel = document.createElement("section");
  detailsPanel.classList.add("panel");
  const detailsTitle = document.createElement("h2");
  detailsTitle.classList.add("panel-title");
  detailsTitle.textContent = "Today's weather details";
  detailsPanel.appendChild(detailsTitle);

  const rows = [
    { icon: "thermometer", label: "Thermal Sensation", value: formatTemp(current.feelslike) },
    { icon: "rain", label: "Rain Probability", value: `${Math.round(current.precipprob ?? 0)}%` },
    { icon: "wind", label: "Wind Speed", value: `${Math.round(current.windspeed ?? 0)} Km/h` },
    { icon: "humidity", label: "Air Humidity", value: `${Math.round(current.humidity ?? 0)}%` },
    { icon: "uv", label: "UV Index", value: `${current.uvindex ?? "-"}` },
  ];

  rows.forEach((row) => {
    const item = document.createElement("div");
    item.classList.add("detail-row");

    const iconEl = document.createElement("span");
    iconEl.classList.add("detail-icon");
    iconEl.innerHTML = detailIcons[row.icon];

    const label = document.createElement("span");
    label.classList.add("detail-label");
    label.textContent = row.label;

    const value = document.createElement("span");
    value.classList.add("detail-value");
    value.textContent = row.value;

    item.append(iconEl, label, value);
    detailsPanel.appendChild(item);
  });

  const forecastPanel = document.createElement("section");
  forecastPanel.classList.add("panel");
  const forecastTitle = document.createElement("h2");
  forecastTitle.classList.add("panel-title");
  forecastTitle.textContent = "Forecast for 5 days";
  forecastPanel.appendChild(forecastTitle);

  const strip = document.createElement("div");
  strip.classList.add("forecast-strip");

  days.forEach((day) => {
    const dayCard = document.createElement("div");
    dayCard.classList.add("forecast-day");

    const dayName = document.createElement("p");
    dayName.classList.add("forecast-day-name");
    dayName.textContent = weekdayName(day.datetime);

    const dayIcon = document.createElement("div");
    dayIcon.classList.add("forecast-icon");
    dayIcon.innerHTML = getWeatherIcon(day.icon, 44);

    const cond = document.createElement("p");
    cond.classList.add("forecast-condition");
    cond.textContent = day.conditions ? day.conditions.split(",")[0] : "";

    const temps = document.createElement("p");
    temps.classList.add("forecast-temps");
    temps.innerHTML = `<strong>${formatTemp(day.tempmax)}</strong> ${formatTemp(day.tempmin)}`;

    dayCard.append(dayName, dayIcon, cond, temps);
    strip.appendChild(dayCard);
  });

  forecastPanel.appendChild(strip);
  col.append(detailsPanel, forecastPanel);
  return col;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

function formatTime(timeStr) {
  return timeStr ? timeStr.slice(0, 5) : "";
}

function weekdayName(dateStr) {
  if (!dateStr) return "";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", { weekday: "long" });
}