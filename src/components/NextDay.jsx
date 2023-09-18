import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const NextDay = () => {
  const { lat, lon, city } = useParams();
  const WhetherNextDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=07efad871fc17bd4026253f2d9ba6465`;
  console.log(WhetherNextDay);

  const [nextDays, setNextDays] = useState(null);

  const getWhetherNextDay = async () => {
    try {
      const response = await fetch(WhetherNextDay);
      if (response.ok) {
        const data = await response.json();
        setNextDays(data);
        console.log("getWhetherNextDay", data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWhetherNextDay();
  }, [WhetherNextDay]);

  //   function imgTime() {
  //     if (item && item.weather[0].icon === "01d") {
  //       return (
  //         <img
  //           src="https://cc-prod.scene7.com/is/image/CCProdAuthor/sun-illustration_P3a_690x724?$pjpeg$&jpegSize=200&wid=690"
  //           alt="clear"
  //           width={"50px"}
  //         />
  //       );
  //     }
  //     return <p>nope</p>;
  //   }

  function getImageUrl(icon) {
    if (icon === "01d" || icon === "01n") {
      return "https://cc-prod.scene7.com/is/image/CCProdAuthor/sun-illustration_P3a_690x724?$pjpeg$&jpegSize=200&wid=690";
    } else if (icon === "03n" || icon === "02n" || icon === "02d") {
      return "https://w7.pngwing.com/pngs/958/1015/png-transparent-weather-map-computer-icons-weather-forecasting-cloudy-cloud-weather-forecasting-computer-wallpaper.png";
    } else if (icon === "03d" || icon === "04d" || icon === "04n") {
      return "https://www.educolor.it/immagine-01-nuvoloso-dm9953.jpg";
    } else if (icon === "10d" || icon === "10n") {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Weather_icon_-_heavy_rain.svg/1024px-Weather_icon_-_heavy_rain.svg.png";
    }
    return "URL predefinito se nessuna corrispondenza";
  }

  const seeNextDay = () => {
    if (nextDays) {
      return nextDays.list.slice(2).map((item, index) => (
        <Row className="d-flex justify-content-between mt-4 responsiveDay" key={index}>
          <Col> {item.dt_txt}</Col>
          <Col>
            Temperatura max/min{item.main.temp_max}/{item.main.temp_min}
          </Col>
          <Col>è previsto: {item.weather[0].description}</Col>
          <Col>
            <img src={getImageUrl(item.weather[0].icon)} alt="Immagine meteo" width={"50px"} />
          </Col>
        </Row>
      ));
    } else {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }
  };
  return (
    <div className="DayBg">
      <h4>
        Previsioni di <strong>{city}</strong> dei prossimi giorni
      </h4>
      <div className="d-flex my-4">
        <div className="card mx-2 justify-content-center p-2">
          <strong>{nextDays.list[0].dt_txt}</strong>
          <br />
          Temp min/max: {nextDays.list[0].main.temp_min}/{nextDays.list[0].main.temp_max}
          <br />
          Tempo: {nextDays.list[0].weather[0].description}
          <br />
          Vento: {nextDays.list[0].wind.speed} km/h
          <br />
          Umidità: {nextDays.list[0].main.humidity} %
        </div>
        <div className="card mx-2 justify-content-center p-2">
          <strong>{nextDays.list[8].dt_txt}</strong>
          <br />
          Temp min/max: {nextDays.list[8].main.temp_min}/{nextDays.list[8].main.temp_max}
          <br />
          Tempo: {nextDays.list[8].weather[0].description}
          <br />
          Vento: {nextDays.list[8].wind.speed} km/h
          <br />
          Umidità: {nextDays.list[8].main.humidity} %
        </div>
        <div className="card mx-2 justify-content-center p-2">
          <strong>{nextDays.list[16].dt_txt}</strong>
          <br />
          Temp min/max: {nextDays.list[16].main.temp_min}/{nextDays.list[16].main.temp_max}
          <br />
          Tempo: {nextDays.list[16].weather[0].description}
          <br />
          Vento: {nextDays.list[16].wind.speed} km/h
          <br />
          Umidità: {nextDays.list[16].main.humidity} %
        </div>
      </div>
      {seeNextDay()}
    </div>
  );
};

export default NextDay;
