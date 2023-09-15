import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import NextDay from "./NextDay";

const Whether = () => {
  const { lat, lon, city } = useParams();

  //FETCH TODAY
  const URLWhetherToday =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=07efad871fc17bd4026253f2d9ba6465";
  console.log(URLWhetherToday);

  const [w, setW] = useState(null);

  const getWhether = async () => {
    try {
      const response = await fetch(URLWhetherToday);
      if (response.ok) {
        const data = await response.json();
        setW(data);
        console.log(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH NEXT GIORNI

  useEffect(() => {
    getWhether();
  }, []);

  const sunrise = w ? w.sys.sunrise : "Loading...";
  const sunset = w ? w.sys.sunset : "Loading...";
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);
  const sunriseHours = sunriseDate.getHours();
  const sunriseMinutes = sunriseDate.getMinutes();
  const sunriseSeconds = sunriseDate.getSeconds();
  const sunsetHours = sunsetDate.getHours();
  const sunsetMinutes = sunsetDate.getMinutes();
  const sunsetSeconds = sunsetDate.getSeconds();

  const formattedSunriseTime = `${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}`;
  const formattedsunsetTime = `${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}`;

  const tempMax = w ? w.main.temp_max - (273.15).toFixed(2) : "Loading...";
  const tempMin = w ? w.main.temp_min - (273.15).toFixed(2) : "Loading...";
  const tempNow = w ? w.main.temp - (273.15).toFixed(2) : "Loading...";

  function imgTime() {
    if (w && w.weather[0].icon === "01d") {
      return (
        <img
          className="imageStyle"
          src="https://cc-prod.scene7.com/is/image/CCProdAuthor/sun-illustration_P3a_690x724?$pjpeg$&jpegSize=200&wid=690"
          alt="clear"
        />
      );
    } else {
      return (
        <img
          className="imageStyle"
          src="https://w7.pngwing.com/pngs/958/1015/png-transparent-weather-map-computer-icons-weather-forecasting-cloudy-cloud-weather-forecasting-computer-wallpaper.png"
          alt="clouds"
        />
      );
    }
  }

  // clear 01d
  // clear sky 01n
  // cloud 03n
  // overcast clouds 04n
  // overcast clouds 04d
  // clouds few clouds 02n
  // clouds 02d
  // scattered clouds 03d
  // overcast clouds 04d
  // rain 10d 10n

  const spinner = (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  console.log(w);
  return (
    <div>
      <Container>
        <Link to="/">
          <Button>Homepage</Button>{" "}
        </Link>
        {/* return giorno attuale */}
        <div className="LocationBg my-2 responsive">
          <div>
            <h1>
              Ecco il meteo di <strong>{city}</strong>
            </h1>
            <div className="d-flex">
              <div>Oggi è {w ? w.weather[0].main : spinner}</div>
              <div>Ci aspetta una giornata {w ? w.weather[0].description : spinner}</div>
            </div>
            <div>Il vento oggi ha una velocità di {w ? w.wind.speed : spinner} km/h</div>
            <p>L'alba è alle {formattedSunriseTime}</p>
            <p>Il tramonto è alle {formattedsunsetTime}</p>
            <p>Temperatura attuale: {tempNow}</p>
            <div>Umidità {w ? w.main.humidity : spinner} %</div>
            <p>
              temperatura max/min: {tempMax}/{tempMin}
            </p>
            <h2>
              Dati da: {w ? w.base : spinner}, {w ? w.name : spinner}
            </h2>
          </div>
          <div className=" responsiveDivWhether">{imgTime()}</div>
        </div>
        {/* return dei prossimi giorni */}
        <NextDay />
      </Container>
    </div>
  );
};
export default Whether;
