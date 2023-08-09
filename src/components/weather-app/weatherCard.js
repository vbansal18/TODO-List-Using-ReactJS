import React, { useState, useEffect } from "react";

const WeatherCard = ({ tempInfo }) => {
  const [weatherState, setWeatherState] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const {
    temp,
    humidity,
    pressure,
    weatherMood,
    name,
    speed,
    country,
    sunset,
  } = tempInfo;

  setInterval(() => {
    setCurrentTime(new Date().toLocaleString());
  }, 1000);
  
  useEffect(() => {
    if (weatherMood) {
      switch (weatherMood) {
        case "Clouds":
          setWeatherState("day-cloudy");
          break;
        case "Haze":
          setWeatherState("fog");
          break;
        case "Clear":
          setWeatherState("day-sunny");
          break;
        case "Mist":
          setWeatherState("dust");
          break;
        case "Rain":
          setWeatherState("day-rain");
          break;
        default:
          setWeatherState("day-sunny");
          break;
      }
    }
  }, [weatherMood]);

  // converting the seconds into time
  let sec = sunset;
  let date = new Date(sec * 1000);
  let initialZero = ((date.getMinutes() / 10) < 1) ? "0" : "";
  let timeStr = `${date.getHours()}:${initialZero}${date.getMinutes()}`;

  return (
    <>
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi wi-${weatherState}`}></i>
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <span>{temp}&deg;</span><span>c</span>
          </div>
          <div className="description">
            <div className="weatherCondition">{weatherMood}</div>
            <div className="place">
              {name}, {country}
            </div>
          </div>
        </div>
        <div className="date">{currentTime}</div>

        {/* our 4 column section */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
                {timeStr} <br />
                Sunset
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {humidity} % <br />
                Humidity
              </p>
            </div>
          </div>

          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
                Pressure <br />
                {pressure} Pa
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                Speed <br />
                {speed} mps
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default WeatherCard;
