const Apikey = "bf252502fc75731d20912f93bc35c60e"
const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const searchBox = document.querySelector("#inputCity")
const searchBtn = document.querySelector("#searchBtn")
const weatherIcon = document.querySelector("#weatherIcon")
const freq_islamabad = document.querySelector("#islBtn")
const freq_rome = document.querySelector("#rmeBtn")
const freq_tokyo = document.querySelector("#tkyBtn")
const freq_london = document.querySelector("#ldnBtn")
const freq_paris = document.querySelector("#parBtn")
const freq_moscow = document.querySelector("#mosBtn")
const freq_beijing = document.querySelector("#bjBtn")
const freq_istanbul = document.querySelector("#istBtn")
const freq_berlin = document.querySelector("#belBtn")

function secondsToTime(time){
    let Time = time;
    var date = new Date(Time * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
}

async function checkWeather(city) {
    const response = await fetch(ApiUrl + city + `&appid=${Apikey}`)

    if (response.status == 404 || response.status == 400) {
        document.querySelector("#errorMsg").style.display = "block"
        document.querySelector(".inputContainer").style.margin = "15px 0 0"
    }

    else {
        let data = await response.json()
        // console.log(data)

        document.querySelector("#weatherDesp").innerHTML = data.weather[0].description
        document.querySelector("#tempText").innerHTML = data.weather[0].main
        document.querySelector("#cityName").innerHTML = data.name
        document.querySelector("#countryName").innerHTML = data.sys.country
        document.querySelector("#temperature").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector("#feellike").innerHTML = Math.round(data.main.feels_like) + "°C"
        document.querySelector("#humidity").innerHTML = data.main.humidity + "%"
        document.querySelector("#pressure").innerHTML = data.main.pressure + "Ns"
        document.querySelector("#winds").innerHTML = data.wind.speed + " Km/hr"
        document.querySelector("#visibility").innerHTML = data.visibility / 1000 + "km"
        document.querySelector("#latitude").innerHTML = data.coord.lat
        document.querySelector("#longitude").innerHTML = data.coord.lon
        document.querySelector("#sunrise").innerHTML = secondsToTime(data.sys.sunrise)
        document.querySelector("#sunset").innerHTML = secondsToTime(data.sys.sunset)

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "../Icons/clouds.png"
            document.querySelector(".containerWrap").style.backgroundImage = "url(https://images.unsplash.com/photo-1529832393073-e362750f78b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNsb3Vkc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60)"
        }

        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "../Icons/clear.png"
            document.querySelector(".containerWrap").style.backgroundImage = "url(https://images.unsplash.com/photo-1525490829609-d166ddb58678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80)"
        }

        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "../Icons/drizzle.png"
            document.querySelector(".containerWrap").style.backgroundImage = "url(https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhaW5pbmclMjB3ZWF0aGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60)"
        }

        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "../Icons/rain.png"
            document.querySelector(".containerWrap").style.backgroundImage = "url(https://images.unsplash.com/photo-1678916014988-6eb046ddf9ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHJhaW5pbmclMjB3ZWF0aGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60)"
        }

        else if (data.weather[0].main == "Haze") {
            weatherIcon.src = "../Icons/mist.png"
            document.querySelector(".containerWrap").style.backgroundImage = "url(https://c0.wallpaperflare.com/preview/207/955/780/trees-covered-by-mist.jpg)"
        }

        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "../Icons/snow.png"
            document.querySelector(".containerWrap").style.backgroundImage = "url(https://images.unsplash.com/photo-1612864197149-686b29cb4bea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fFNub3dpbmclMjB3ZWF0aGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60)"
        }

        document.querySelector("#errorMsg").style.display = "none"
        document.querySelector(".inputContainer").style.margin = "15px 0"
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})
freq_islamabad.addEventListener("click", () => {
    checkWeather("islamabad")
    searchBox.value = ""
})
freq_rome.addEventListener("click", () => {
    checkWeather("rome")
    searchBox.value = ""
})
freq_tokyo.addEventListener("click", () => {
    checkWeather("tokyo")
    searchBox.value = ""
})
freq_london.addEventListener("click", () => {
    checkWeather("london")
    searchBox.value = ""
})
freq_paris.addEventListener("click", () => {
    checkWeather("paris")
    searchBox.value = ""
})
freq_moscow.addEventListener("click", () => {
    checkWeather("moscow")
    searchBox.value = ""
})
freq_beijing.addEventListener("click", () => {
    checkWeather("beijing")
    searchBox.value = ""
})
freq_istanbul.addEventListener("click", () => {
    checkWeather("istanbul")
    searchBox.value = ""
})
freq_berlin.addEventListener("click", () => {
    checkWeather("berlin")
    searchBox.value = ""
})