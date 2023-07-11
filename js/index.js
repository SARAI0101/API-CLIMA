let weather = {
    apiKey: "175629f08c122affded676402c3f4d53",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="
          +city 
          +"&units=metric&lang=es&appid=" 
          +this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No se encontró información del clima");
            throw new Error("No se encontró información del clima");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { lat, lon } = data.coord;
      const cityElement = document.querySelector(".city");
      cityElement.innerHTML = "El clima en <span class='city-name'>" + name + "</span>";
      document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText ="Humedad: " + humidity + "%";
      document.querySelector(".wind").innerText ="Velocidad del viento: " + speed + " km/h";
      document.querySelector(".latitude").innerText = "Latitud: " + lat;
      document.querySelector(".longitude").innerText = "Longitud: " + lon;
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });

    weather.fetchWeather("Texas");