// Variáveis e seleção de elementos
const apiKey = "406a0be922a5a2e5b5beb6dc3633fe4d";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?"

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const whatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionsContainer = document.querySelector("#suggestions");
const suggestionsButton = document.querySelectorAll("#suggestions button");

// Loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
};

// Funções
const getWeatherData = async(city) => {
    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();

    return data;
};

// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");

    suggestionsContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
    hideInformation();

    const data = await getWeatherData(city);

    if(data.cod === "404") {
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    whatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText =`${data.main.humidity}%`;
    windElement.innerText =`${data.wind.speed}km/h`;

    // Change background image
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", async (e) => {
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

// Suggestions
suggestionsButton.forEach((btn) => {
    btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");

    showWeatherData(city);
    });
});
