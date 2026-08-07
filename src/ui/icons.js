function svg(size, inner) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

const SUN = `
  <defs>
    <radialGradient id="sunGrad" cx="50%" cy="42%" r="60%">
      <stop offset="0%" stop-color="#ffe6ab"/>
      <stop offset="55%" stop-color="#ffb547"/>
      <stop offset="100%" stop-color="#f2851b"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="32" fill="url(#sunGrad)"/>
`;

const MOON = `<path d="M62 22a30 30 0 1 0 16 44 24 24 0 0 1-16-44z" fill="#dfe6f5"/>`;

function cloudPath(x, y, scale, color) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M14 46c-9 0-16-7-16-16 0-8 6-15 14-16C14 5 22-1 32-1c11 0 20 8 22 18h1c9 0 16 7 16 16s-7 16-16 16H14z" fill="${color}"/>
  </g>`;
}

const CLOUD_LIGHT = (x, y, s) => cloudPath(x, y, s, "#eef2f8");
const CLOUD_MUTED = (x, y, s) => cloudPath(x, y, s, "#c6ced9");

const RAIN_DROPS = `<g stroke="#7fb2ff" stroke-width="4" stroke-linecap="round">
  <line x1="34" y1="72" x2="30" y2="84"/><line x1="50" y1="72" x2="46" y2="84"/><line x1="66" y1="72" x2="62" y2="84"/>
</g>`;

const SNOW_DOTS = `<g fill="#dfe9fb">
  <circle cx="32" cy="78" r="3.5"/><circle cx="50" cy="82" r="3.5"/><circle cx="68" cy="78" r="3.5"/>
</g>`;

const WIND_LINES = `<g stroke="#9fb4d8" stroke-width="5" stroke-linecap="round" fill="none">
  <path d="M18 40h44a10 10 0 1 0-9-14"/><path d="M18 58h56a10 10 0 1 1-9 16"/><path d="M18 76h32"/>
</g>`;

const ICONS = {
  "clear-day": (s) => svg(s, SUN),
  "clear-night": (s) => svg(s, MOON),
  "partly-cloudy-day": (s) => svg(s, `<g transform="translate(-6 -8) scale(0.72)">${SUN}</g>${CLOUD_LIGHT(28, 46, 0.62)}`),
  "partly-cloudy-night": (s) => svg(s, `<g transform="translate(-6 -8) scale(0.72)">${MOON}</g>${CLOUD_LIGHT(28, 46, 0.62)}`),
  cloudy: (s) => svg(s, CLOUD_LIGHT(18, 28, 0.78)),
  fog: (s) => svg(s, CLOUD_MUTED(18, 28, 0.78)),
  rain: (s) => svg(s, CLOUD_LIGHT(18, 14, 0.78) + RAIN_DROPS),
  "showers-day": (s) => svg(s, CLOUD_LIGHT(18, 14, 0.78) + RAIN_DROPS),
  "showers-night": (s) => svg(s, CLOUD_LIGHT(18, 14, 0.78) + RAIN_DROPS),
  "thunder-rain": (s) => svg(s, CLOUD_MUTED(18, 14, 0.78) + RAIN_DROPS),
  "thunder-showers-day": (s) => svg(s, CLOUD_MUTED(18, 14, 0.78) + RAIN_DROPS),
  "thunder-showers-night": (s) => svg(s, CLOUD_MUTED(18, 14, 0.78) + RAIN_DROPS),
  snow: (s) => svg(s, CLOUD_LIGHT(18, 14, 0.78) + SNOW_DOTS),
  wind: (s) => svg(s, WIND_LINES),
};

export function getWeatherIcon(code, size = 64) {
  const build = ICONS[code] || ICONS["clear-day"];
  return build(size);
}

export const detailIcons = {
  thermometer: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3a2 2 0 0 0-2 2v9.34a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2Z"/><circle cx="12" cy="17" r="2"/></svg>`,
  rain: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 16a4 4 0 0 1-1-7.87A5 5 0 0 1 15.9 7 4.5 4.5 0 0 1 16 16H7Z"/><path d="M9 19v1M12 19v2M15 19v1"/></svg>`,
  wind: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 8h11a2.5 2.5 0 1 0-2-4"/><path d="M3 14h14a2.5 2.5 0 1 1-2 4"/><path d="M3 18h7"/></svg>`,
  humidity: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2s6 7.2 6 11.5A6 6 0 0 1 6 13.5C6 9.2 12 2 12 2Z"/></svg>`,
  uv: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8" stroke-linecap="round"/></svg>`,
};

export function themeIcon(type) {
  if (type === "sun") {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8" stroke-linecap="round"/></svg>`;
  }
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/></svg>`;
}

export function cloudLogo() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 16a4 4 0 0 1-.6-7.96A5 5 0 0 1 17 8.2 4 4 0 0 1 16 16H8Z" fill="#7f9dff"/>
    <path d="M5 19a3 3 0 0 1-.4-5.98A3.6 3.6 0 0 1 11 12.2" fill="#4f6fe0"/>
  </svg>`;
}