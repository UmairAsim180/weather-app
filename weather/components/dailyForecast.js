import React from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


const DailyForecast = ({ forecastday }) => {
  return (
    <section className="bg-gradient-to-tl from-sky-800 to-sky-950 rounded-lg p-4 my-2 w-full">
      <h2 className="text-white">Daily Forecast</h2>
      <ScrollArea className="flex gap-2 w-[90%] mx-auto overflow-x-auto">
        <div className="flex flex-col gap-2 my-3">
          {forecastday.map((day, index) => (
            <div key={index} className="md:grid  grid-cols-2 gap-2 w-full bg-emerald-600 rounded-lg p-3">

              <div className='flex flex-col justify-center items-center gap-2'>
                <h3 className="font-semibold">{day.date}</h3>
                <img className='w-16' src={day.day.condition.icon} alt={day.day.condition.text} />
                <p className="font-semibold">{`${day.day.maxtemp_c} / ${day.day.mintemp_c}`}&deg;</p>
              </div>
              <div>
                <p>{day.day.condition.text}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h3>Humidity</h3>
                    <p className="font-semibold">{day.day.avghumidity} %</p>
                  </div>
                  <div>
                    <h3>Wind</h3>
                    <p className="font-semibold">{day.day.maxwind_kph} kph</p>
                  </div>
                  <div>
                    <h3>Rain Chance (%)</h3>
                    <p className="font-semibold">{day.day.daily_chance_of_rain}</p>
                  </div>
                  <div>
                    <h3>Precipitation (mm)</h3>
                    <p className="font-semibold">{day.day.totalprecip_mm}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </section>
  )
}

export { DailyForecast }
