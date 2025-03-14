
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
      <LocationSearch />
      {!loading && !data && <p className="text-center text-gray-400">No weather data available.</p>}

      {loading && <div className="space-y-4">
        <Skeleton className="w-full h-[40vh] bg-slate-900" />
        <div className="space-y-4">
          <Skeleton className="w-1/2 h-[10vh] bg-slate-900" />
          <Skeleton className="w-2/3 h-[20vh] bg-slate-900" />
        </div>
      </div>
      }


      {data && <main>
        <CurrentWeather data={data} />
        <HourlyForecast forecast={data.forecast.list.slice(0, 8)} />
        <DailyForecast forecastday={data.forecast.list} />
      </main>}


    </>
  );

}
