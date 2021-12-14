let button = document.querySelector(".buttons");
let searchResults = document.querySelector(".search-results");
// searchResults.style.display = "none";

/* let myFunc = () => {
  const input = document.querySelector(".search-lookup");
  const description = document.querySelector(".city-result");

  description.innerHTML = `Search results for: ${input.value}`;
}; */

const handleSearch = () => {
  const searchBar = document.querySelector(".search-lookup");

  let results;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=351fbd2da00ad4e776ef440fb201a922&units=imperial`
  )
    .then((res) => res.json())
    .then((data) => {
      results = data;
      updateValues(results);
    });
};

button.addEventListener("click", handleSearch);

const updateValues = (data) => {
  console.log(data);

  const input = document.querySelector(".search-lookup");
  const description = document.querySelector(".city-result");
  const temperature = document.querySelector(".temp");
  const hiddenTab = document.querySelector(".search-results");

  const location = document.querySelector(".city");
  const windGusts = document.querySelector(".wind-gusts");
  const forecast = document.querySelector(".forecast");
  const tempMin = document.querySelector(".temp-min");
  const tempMax = document.querySelector(".temp-max");
  const humidity = document.querySelector(".humidity");

  description.innerHTML = `Search results for: ${input.value}`;
  temperature.innerHTML = `${Math.floor(data.main.temp)} &#x2109`;
  location.innerHTML = `${data.name}, ${data.sys.country}`;
  windGusts.innerHTML = `Wind Gusts: ${Math.floor(data.wind.gust)} mph`;
  forecast.innerHTML = `Forecast: ${data.weather[0].description}`;
  tempMin.innerHTML = `Temp Min: ${Math.floor(data.main.temp_min)} &#x2109`;
  tempMax.innerHTML = `Temp Max: ${Math.floor(data.main.temp_max)} &#x2109`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

  //temp number changing color based range
  if (data.main.temp >= 80) {
    temperature.classList.remove(temperature.classList[1]);
    temperature.classList.add("red");
  } else if (data.main.temp >= 64) {
    temperature.classList.remove(temperature.classList[1]);
    temperature.classList.add("orange");
  } else if (data.main.temp >= 33) {
    temperature.classList.remove(temperature.classList[1]);
    temperature.classList.add("light-blue");
  } else {
    temperature.classList.remove(temperature.classList[1]);
    temperature.classList.add("blue");
  }

  // hiding the search tab
  if (hiddenTab.classList.length > 1) {
    hiddenTab.classList.remove("none");
  }

  // changing icon based on forecast
  // data.weather[0].id weather ID
  // data.weather[0].icon[2] day or night (d or n)
  //  <img src="./screenshots/rainy.png" alt="cloudy day" class="forecast-image">

  const img = document.querySelector(".forecast-image");

  console.log(data.weather[0].id);
  console.log(data.weather[0].icon[2]);

  //200-232 Thunderstorm
  if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
    img.src = "./screenshots/thunderstorm.png";
  }

  //300-321 Drizzle
  if (data.weather[0].id >= 300 && data.weather[0].id <= 321) {
    img.src = "./screenshots/drizzle.png";
  }

  //500-531 Rain
  if (
    data.weather[0].id >= 500 &&
    data.weather[0].id <= 531 &&
    data.weather[0].icon[2] === "d"
  ) {
    img.src = "./screenshots/rainy-d.png";
  } else if (
    data.weather[0].id >= 500 &&
    data.weather[0].id <= 531 &&
    data.weather[0].icon[2] === "n"
  ) {
    img.src = "./screenshots/rainy-n.png";
  }

  //600-622 Snow
  if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
    img.src = "./screenshots/snowfall.png";
  }

  //800 Clear
  if (data.weather[0].id === 800 && data.weather[0].icon[2] === "d") {
    img.src = "./screenshots/clear-d.png";
  } else if (data.weather[0].id === 800 && data.weather[0].icon[2] === "n") {
    img.src = "./screenshots/clear-n.png";
  }

  //801-804 Cloudy
  if (
    data.weather[0].id >= 801 &&
    data.weather[0].id <= 804 &&
    data.weather[0].icon[2] === "d"
  ) {
    img.src = "./screenshots/cloudy-d.png";
  } else if (
    data.weather[0].id >= 801 &&
    data.weather[0].id <= 804 &&
    data.weather[0].icon[2] === "n"
  ) {
    img.src = "./screenshots/cloudy-n.png";
  }

  // real hot and cold
  if (data.main.temp >= 100) {
    img.src = "./screenshots/hot.png";
  } else if (data.main.temp <= 0) {
    img.src = "./screenshots/freezing.png";
  }
};
