import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const NextDay = () => {
  const { lat, lon } = useParams();
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

  const seeNextDay = () => {
    if (nextDays) {
      return nextDays.list.slice(2).map((item, index) => (
        <Row className="d-flex justify-content-between mt-4" key={index}>
          <Col> {item.dt_txt}</Col>
          <Col>
            Temperatura max/min{item.main.temp_max}/{item.main.temp_min}
          </Col>
          <Col>è previsto: {item.weather[0].description}</Col>
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
      <h4>Previsioni dei prossimi giorni</h4>
      {seeNextDay()}
    </div>
  );
};

export default NextDay;
