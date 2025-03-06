
"use client"
import CurrentWeather from "@/components/CurrentWeather";
import { HourlyForecast } from "@/components/HourlyForecast"
import { DailyForecast } from "@/components/dailyForecast"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useWeather } from "@/app/context/WeatherContext";  // import the useWeather hook from the context file
import { LocationSearch } from "@/components/LocationSearch";

export default function Home() {
  const { data, loading } = useWeather();

  return (
    <>
      {loading && <div className="space-y-4">
        <Skeleton className="w-full h-[40vh] bg-slate-900" />
        <div className="space-y-4">
          <Skeleton className="w-1/2 h-[10vh] bg-slate-900" />
          <Skeleton className="w-2/3 h-[20vh] bg-slate-900" />
        </div>
      </div>
      }


      {data && <main className="backdrop-blur-0 bg-black bg-opacity-50">
        {/* <input className="translate-x-1/2 bg-transparent border-2 rounded-md w-96" type="text" /> */}
<LocationSearch/>
        <CurrentWeather data={data} />
        <HourlyForecast forecast={data.forecast.list.slice(0, 8)} />
        <DailyForecast forecastday={data.forecast.list}/>
      </main>}
     

    </>
  );

}
