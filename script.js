const API_KEY = "bf252502fc75731d20912f93bc35c60e";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const API_URL_COORDS = "https://api.openweathermap.org/data/2.5/weather?units=metric&";

const searchBox = document.querySelector("#inputCity");
const searchBtn = document.querySelector("#searchBtn");
const weatherIcon = document.querySelector("#weatherIcon");

const cityButtons = [
    { id: "islBtn", city: "islamabad" },
    { id: "tkyBtn", city: "tokyo" },
    { id: "ldnBtn", city: "london" },
    { id: "parBtn", city: "paris" },
    { id: "mosBtn", city: "moscow" },
    { id: "bjBtn", city: "beijing" },
    { id: "istBtn", city: "istanbul" },
    { id: "belBtn", city: "berlin" },
];

const weatherBackgrounds = {
    Clouds: {
        icon: "./Images/clouds.png",
        bg: "url(https://images.unsplash.com/photo-1529832393073-e362750f78b3?auto=format&fit=crop&w=800&q=60)"
    },
    Clear: {
        icon: "./Images/clear.png",
        bg: "url(https://images.unsplash.com/photo-1525490829609-d166ddb58678?auto=format&fit=crop&w=869&q=80)"
    },
    Drizzle: {
        icon: "./Images/drizzle.png",
        bg: "url(https://images.unsplash.com/photo-1433863448220-78aaa064ff47?auto=format&fit=crop&w=800&q=60)"
    },
    Rain: {
        icon: "./Images/rain.png",
        bg: "url(https://images.unsplash.com/photo-1678916014988-6eb046ddf9ea?auto=format&fit=crop&w=800&q=60)"
    },
    Haze: {
        icon: "./Images/mist.png",
        bg: "url(https://c0.wallpaperflare.com/preview/207/955/780/trees-covered-by-mist.jpg)"
    },
    Snow: {
        icon: "./Images/snow.png",
        bg: "url(https://images.unsplash.com/photo-1612864197149-686b29cb4bea?auto=format&fit=crop&w=800&q=60)"
    }
};

// Convert seconds to HH:mm format
const secondsToTime = (time) => {
    const date = new Date(time * 1000);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
};

// Update UI with fetched data
const updateUI = (data) => {
    document.querySelector("#weatherDesp").textContent = data.weather[0].description;
    document.querySelector("#tempText").textContent = data.weather[0].main;
    document.querySelector("#cityName").textContent = data.name;
    document.querySelector("#countryName").textContent = data.sys.country;
    document.querySelector("#temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector("#feellike").textContent = `${Math.round(data.main.feels_like)}°C`;
    document.querySelector("#humidity").textContent = `${data.main.humidity}%`;
    document.querySelector("#pressure").textContent = `${data.main.pressure} Ns`;
    document.querySelector("#winds").textContent = `${data.wind.speed} Km/hr`;
    document.querySelector("#visibility").textContent = `${data.visibility / 1000} km`;
    document.querySelector("#latitude").textContent = data.coord.lat;
    document.querySelector("#longitude").textContent = data.coord.lon;
    document.querySelector("#sunrise").textContent = secondsToTime(data.sys.sunrise);
    document.querySelector("#sunset").textContent = secondsToTime(data.sys.sunset);

    // Update icon & background
    const condition = data.weather[0].main;
    if (weatherBackgrounds[condition]) {
        weatherIcon.src = weatherBackgrounds[condition].icon;
        document.querySelector(".containerWrap").style.backgroundImage = weatherBackgrounds[condition].bg;
    }

    document.querySelector("#errorMsg").style.display = "none";
    document.querySelector(".inputContainer").style.margin = "8px 0";
}

// Show error message
const showError = () => {
    document.querySelector("#errorMsg").style.display = "block";
    document.querySelector(".inputContainer").style.margin = "6px 0 2px";
}

// Fetch weather data
const checkWeather = async (city) => {
    try {
        const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);
        if (!response.ok) return showError();

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        showError();
    }
}

// Get city name from coordinates
const getCityName = async (lat, lon) => {
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    return data[0]?.name || "Unknown City";
}

// On load - get location
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const city = await getCityName(lat, lon);
                checkWeather(city);
            },
            () => checkWeather("Islamabad")
        );
    } else {
        checkWeather("Islamabad");
    }
};

// Search button
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim()) {
        checkWeather(searchBox.value.trim());
        searchBox.value = "";
    }
});

// Enter key support
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
});

// City quick buttons
cityButtons.forEach(({ id, city }) => {
    document.querySelector(`#${id}`).addEventListener("click", () => {
        checkWeather(city);
        searchBox.value = "";
    });
});