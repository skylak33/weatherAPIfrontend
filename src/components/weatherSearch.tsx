import { useState } from "react";
import CitySearch from "./citySearch";
import WeatherCard from "./weatherCard";
import { fetchWeather } from "../api/weatherAPI";
import WeatherWeekCard from "./weatherWeekCard";
const conditionToImage: Record<string, string> = {
    "Clear": "/public/background/clear2.png",
    "Cloudy": "/public/background/cloudy.png",
    "Partially cloudy": "/public/background/cloudy.png",
    "Rain, Overcast": "/public/background/rainy.png",
    "Rain, Partially cloudy": "/public/background/rainy.png",
};

const WeatherSearch = () => {
  const [cityInput, setCityInput] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const backgroundImage =
    data && data.conditions && conditionToImage[data.conditions[0]]
      ? conditionToImage[data.conditions[0]]
      : "Земля.gif";


  const handleFetchWeather = () => {
    setLoading(true);
    setError(null);
    setData(null);

    fetchWeather(cityInput)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleFetchWeather();
    }
  };

  const isGif = backgroundImage.endsWith(".gif");


  return (
    <>
      {/* Фоновое изображение */}
        {isGif ? (
        <img
            src={backgroundImage}
            alt="background"
            style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100px", // нужный размер
            height: "1  00px",
            zIndex: -100,
            objectFit: "contain",
            pointerEvents: "none",
            }}
        />
        ) : (
        <img
            src={backgroundImage}
            alt="background"
            style={{
            position: "fixed",
            right: 0,
            bottom: 0,
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            zIndex: -100,
            objectFit: "cover",
            pointerEvents: "none",
            }}
        />
        )}
      <CitySearch
        cityInput={cityInput}
        onCityChange={(e) => setCityInput(e.target.value)}
        onKeyPress={handleKeyPress}
        onSearch={handleFetchWeather}
        loading={loading}
      />
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {!loading && data && (
        <>
            <WeatherCard data={data} />
            <WeatherWeekCard
            city={data.city}
            dates={data.datetime}
            temps={data.temp}
            feelsLike={data.feelslike}
            windSpeeds={data.windspeed}
            conditions={data.conditions}
            />
        </>
        )}
    </>
  );
};

export default WeatherSearch;