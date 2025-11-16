import React, { useState } from "react";

function Weather() {
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loding, setLoding] = useState(false)
  const apiKey ="b683fbc5e51de54075f37922acd05e52";
  const handleGetWeather = async () => {
    if (!city) {
      setError("please enter a city name");
      return;
    }
    try {
      setLoding(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setError("City not found");
        setWeather(null);
      }
    } catch (err) {
      console.log(err);
      setError("Error fetching data");
    }
    finally{
      setLoding(false)
    }
  };
  return (
    <div className="bg-slate-700 min-h-screen">
      <h1 className="text-3xl font-bold text-cyan-300 text-center pt-5">
        Weather Report
      </h1>
      <div className="flex items-center mt-8">
        <div>
          <textarea
            className="px-6 py-2 ml-8 mt-7 h-10 rounded-md"
            rows={1}
            placeholder="Type city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={handleGetWeather}
            className="bg-orange-500 py-2 px-2 mt-6 hover:bg-red-500 rounded-md ml-3"
          >
            Get Weather Report
          </button>
        </div>

        {loding&&(
          <p className="text-center text-yellow-300 mt-6 text-lg">Loading...</p>
        )}

        {!loding && weather && (
        <div className="text-center mt-8 bg-green-300 mx-auto p-6 rounded-xl w-80 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
          <p className="capitalize text-lg mb-2">
            {weather.weather[0].description}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="mx-auto"
          />
          <p className="text-3xl font-bold mb-2">{weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default Weather;
