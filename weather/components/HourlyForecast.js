import React from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


const HourlyForecast = ({today}) => {
  return (
    <section className="bg-gradient-to-tl from-sky-800 to-sky-950 rounded-lg p-4 my-2 w-full">
      <h2 className="text-white">Hourly Forecast</h2>
      {/* Hourly Forecast Container  */}
      <ScrollArea className="flex gap-2 w-[90%] mx-auto overflow-x-auto">
        <div className="flex gap-2 my-3">
          {today.hour.map((hr, index) => (
            <div key={index} className="flex flex-col justify-center items-center bg-emerald-600 rounded-lg p-2 w-[5rem]">
              <h3 className="font-semibold">{new Date(hr.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h3><img src={hr.condition.icon} alt={hr.condition.text} />
              <p className="font-semibold">{hr.temp_c}&deg;</p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}

export { HourlyForecast }
