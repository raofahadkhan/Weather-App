"use client";
import { useState } from "react";

export default function page() {
  const [weatherData, setWeatherData] = useState<any>();
  const [city, setCity] = useState("");
  const url = `https://api.weatherapi.com/v1/current.json?key=25175e31b7074cfc895204529222906&q=${city}`;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const data = await fetch(url);
      const result = await data.json();
      setWeatherData(result);
      console.log("data on first load ", data);
    } catch (err: any) {
      console.log("🚀 ~ file: WeatherPage.tsx:27 ~ err:", err);
    }
  };
  return (
    <div>
      <div className=" w-3/12 mx-auto my-8">
        <form onSubmit={handleSubmit}>
          <input
            className="bg-gray-900 rounded-full text-white placeholder-gray-500 text-center opacity-80 text-2xl outline-none h-12 w-full mx-auto "
            placeholder="Enter the city name here"
            type="text"
            onChange={(e) => setCity(e.target.value)}
          />
        </form>
      </div>

      {weatherData && (
        <div className="w-5/12 shadow-slate-50 backdrop-filter border border-gray-600 py-6 mx-auto rounded-xl">
          <div className="flex flex-col w-fit mx-auto gap-y-6 items-center justify-center mb-4">
            <div className="flex gap-4 text-white font-bold">
              <h2 className="text-3xl">{weatherData?.current?.temp_c}°C</h2>
            </div>
            <h3 className="text-xl font-semibold text-white">
              {weatherData?.location?.name}
            </h3>
          </div>
          {/* card */}
          <div className="flex items-center justify-center gap-10 text-white">
            <ul>
              <li> Feels like {weatherData?.current?.feelslike_c}°C</li>
              {/* <li>Temp Max 26.65°C</li>
            <li>Temp Min 26.16°C</li> */}
              <li>Humidity {weatherData?.current?.humidity}%</li>
              <li>Cloud {weatherData?.current?.cloud}%</li>
              <li>Visibility {weatherData?.current?.vis_km} kilometers</li>
            </ul>
            <ul>
              <li>Pressure {weatherData?.current?.pressure_mb} hPa</li>
              <li>Wind Speed {weatherData?.current?.wind_kph} kph</li>
              <li>Wind Deg {weatherData?.current?.wind_degree}°</li>
              <li>Wind Gust {weatherData?.current?.gust_kph} kph</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
