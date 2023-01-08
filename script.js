// Variáveis e seleção de elementos

const apiKey = "379502c5fd84988be9bfe2bee0d7ef51";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const whatherIconElement = document.querySelector("#wheater-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Funções
const getWheaterData = async(city) => {
    const apiWheaterURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric$appid=${apiKey}&lang=pt_br';

    const res = await fetch(apiWheaterURL)
    const data = await res.json()

    return data;
}

const showWeatherData = async (city) => {
    const data = getWheaterData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    whatherIconElement.setAttribute("src", 'http://openwheatermap.org/img/wn/${data.weathe[0].icon}.png');
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText ='${data.main.humidity}%';
    windElement.innerText ='${data.main.speed}km/h';

    weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
});