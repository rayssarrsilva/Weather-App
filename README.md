# WeatherSearch

A weather search and forecast web application built with plain JavaScript (Vanilla JS), featuring location search with autocomplete, current weather conditions, detailed weather metrics, and a 5-day forecast.

## About the Project

WeatherSearch lets users search for any city in the world and view, on a dedicated page, the current weather conditions for that location (temperature, feels-like temperature, chance of rain, wind speed, humidity, and UV index), along with the forecast for the following five days. The application also supports switching between dark and light themes and between Celsius and Fahrenheit units, with user preferences persisted across sessions.

## Features

- Location search with real-time suggestions (autocomplete)
- Result page with current weather conditions for the selected location
- Display of feels-like temperature, chance of rain, wind speed, air humidity, and UV index
- 5-day weather forecast
- Dark and light theme toggle
- Temperature unit toggle (Celsius and Fahrenheit)
- Theme and unit preferences saved locally across sessions
- Responsive interface

## Built With

- HTML5
- CSS3
- JavaScript (ES6, Vanilla JS)
- Open-Meteo Geocoding API
- Visual Crossing Weather API

## Concepts Practiced

- DOM manipulation without frameworks
- Code organization into reusable components
- Consuming external REST APIs
- Debounce on search input
- Simple routing between pages in a single-page application
- Managing user preferences with localStorage
- Conditional rendering and dynamic UI updates
- Handling loading and error states
- Responsiveness and basic accessibility (visible focus, prefers-reduced-motion)

## Project Structure

```
weathersearch/
├── api/
│   ├── client.js        # Integration with the Visual Crossing Weather API
│   └── search.js        # Integration with the Open-Meteo Geocoding API
├── ui/
│   ├── components/
│   │   ├── Header.js
│   │   ├── SearchBar.js
│   │   └── Controls.js
│   ├── Home.js
│   ├── Search.js
│   ├── Page.js
│   └── icons.js
├── style/
│   ├── theme.css
│   ├── home.css
│   ├── header.css
│   └── card.css
├── utils/
│   └── preferences.js
├── router.js
├── index.html
└── index.js
```

## Getting Started

Clone the repository:

```
git clone https://github.com/<username>/weathersearch.git
cd weathersearch
```

Install dependencies:

```
npm install
```

Create a `.env` file in the project root with your Visual Crossing Weather API key:

```
KEY=your_api_key_here
```

The key can be obtained for free at visualcrossing.com.

Start the project:

```
npm run start
```

## Future Improvements

- Automatic location detection via browser geolocation
- Display of the most searched locations on the home page
- Caching of searches and weather results
- Automated tests
- Internationalization (i18n) of the interface

## Live Demo

Link to the deployed version:

## Author

Rayssa Roberta R. Silva

LinkedIn: https://www.linkedin.com/in/rayssa-r-14936622a/

## Contributing

Suggestions, fixes, and improvements are welcome.

Feel free to:

- Fork the project and open a Pull Request
- Report issues through the Issues tab
- Reach out via LinkedIn

## License

This project is licensed under the MIT License.
