import React from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


const HourlyForecast = ({forecast}) => {
  return (
    <section className="bg-gradient-to-tl from-sky-800 to-sky-950 rounded-lg p-4 my-2 w-full">
      <h2 className="text-white">Hourly Forecast</h2>
      {/* Hourly Forecast Container  */}
      <ScrollArea className="flex gap-2 w-[90%] mx-auto overflow-x-auto">
        <div className="flex gap-2 my-3">
          {forecast.map((hr, index) => (
            <div key={index} className="flex flex-col justify-center items-center bg-emerald-600 rounded-lg p-2 w-[5rem]">
              <h3 className="font-semibold">{new Date(hr.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h3>
              <img src={`https://openweathermap.org/img/wn/${hr.weather[0].icon}.png`} alt="Weather Icon" />
              <p className="font-semibold">{hr.main.temp} &deg;</p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}

export { HourlyForecast }
