
"use client"
import CurrentWeather from "@/components/CurrentWeather";
import { HourlyForecast } from "@/components/HourlyForecast"
import { DailyForecast } from "@/components/dailyForecast"
import { useState, useEffect } from "react"
export default function Home() {

  const [data, setData] = useState(null);
  const [city, setCity] = useState("lahore")
  const [loading, setLoading] = useState(true);

  


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`/api/weather?city=${city}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [])
  console.log(data)

  return (
    <>
      {data && <main>
        <CurrentWeather data={data} />
        {/* ---- */}
        <HourlyForecast forecast={data.forecast.list.slice(0, 8)} />
        {/* ------- */}
        <DailyForecast forecastday={data.forecast.list}/>

      </main>}

    </>
  );

}
