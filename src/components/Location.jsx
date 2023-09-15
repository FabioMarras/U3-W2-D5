import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Whether from "./Whether";
import { Link } from "react-router-dom";

const Location = () => {
  const [locationData, setLocationData] = useState({
    lat: "",
    lon: "",
    name: "",
  });

  const [loc, setLoc] = useState("");

  const URL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" + loc + "&limit=1&appid=07efad871fc17bd4026253f2d9ba6465";
  console.log("URL", URL);

  const lat = locationData.lat.toString();
  const lon = locationData.lon.toString();

  const getLocation = async () => {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const Location = data[0];
          setLocationData({
            lat: Location.lat,
            lon: Location.lon,
            name: Location.name,
          });
          console.log(data);
        } else {
          alert("Mi dispiace, non abbiamo dati per la città che stai cercando!");
        }
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loc !== "") {
      getLocation();
    }
  }, [loc]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loc !== "") {
      getLocation();
    } else {
      alert("Please enter a location");
    }
  };

  return (
    <Container className="mt-3 text-center">
      <div className="LocationBg">
        <h2>Scropri il meteo di tutte le città del mondo</h2>
        <h1>Stai cercando: {locationData.name}</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            value={loc}
            placeholder="Search your location"
            onChange={(e) => setLoc(e.target.value)}
          />
        </Form>
        {/* <p>Country: {locationData.country}</p>
      <p>State: {locationData.state}</p> */}
        <Link to={`/${locationData.lat}/${locationData.lon}/${locationData.name}`}>
          <Button className="mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Location;
