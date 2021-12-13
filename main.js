let button = document.querySelector(".buttons");
let searchResults = document.querySelector(".search-results");
searchResults.style.display = "none";

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
  searchResults.style.display = "block";
  const input = document.querySelector(".search-lookup");
  const description = document.querySelector(".city-result");
  const temperature = document.querySelector(".temp");

  const location = document.querySelector("city");
  const windGusts = document.querySelector(".wind-gusts");
  const forecast = document.querySelector(".forecast");
  const tempMin = document.querySelector(".temp-min");
  const tempMax = document.querySelector(".temp-max");
  const humidity = document.querySelector(".humidity");

  description.innerHTML = `Search results for: ${input.value}`;
  temperature.innerHTML = `${Math.floor(data.main.temp)} &#x2109`;
  // ask ryan if he sees city state zip location.innerHTML
  windGusts.innerHTML = `Wind Gusts: ${Math.floor(data.wind.gust)} mph`;
  forecast.innerHTML = `Forecast: ${data.weather[0].description}`;
  tempMin.innerHTML = `Temp Min: ${Math.floor(data.main.temp_min)} &#x2109`;
  tempMax.innerHTML = `Temp Max: ${Math.floor(data.main.temp_max)} &#x2109`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
};
