import React from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


const DailyForecast = ({ forecastday }) => {
  const getDailyForecast = (forecastList) => {
    const dailyData = {};
    forecastList.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]; // Extract date (YYYY-MM-DD)
      if (!dailyData[date] && item.dt_txt.includes("12:00:00")) {
        dailyData[date] = item; // Store only one entry per day (noon)
      }
    });
    return Object.values(dailyData);
    
  };
  const dailyForecast = getDailyForecast(forecastday);

  return (
    <section className="bg-gradient-to-tl from-sky-800 to-sky-950 rounded-lg p-4 my-2 w-full">
      <h2 className="text-white">Daily Forecast</h2>
      <ScrollArea className="flex gap-2 w-[90%] mx-auto overflow-x-auto">
        <div className="flex flex-col gap-2 my-3">
          {dailyForecast.map((day, index) => (
            <div key={index} className="md:grid  grid-cols-2 gap-2 w-full bg-emerald-600 rounded-lg p-3">

              <div className='flex flex-col justify-center items-center gap-2'>
                <h3 className="font-semibold">{day.date}</h3>
                <img className='w-24' src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather icon" />
                <p className="font-semibold">{`${day.main.temp_max} / ${day.main.temp_min}`}&deg;</p>
              </div>
              <div>
                <p className='capitalize font-bold text-2xl'>{day.weather[0].description}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h3>Humidity</h3>
                    <p className="font-semibold">{day.main.humidity} %</p>
                  </div>
                  <div>
                    <h3>Wind</h3>
                    <p className="font-semibold">{day.wind.speed} kph</p>
                  </div>
                  <div>
                    <h3>Rain Chance (%)</h3>
                    <p className="font-semibold">{(day.pop) * 100}</p>
                  </div>
                  <div>
                    <h3>Precipitation (mm)</h3>{
                      day.rain ? <p className="font-semibold">{day.rain["3h"]}</p> : <p className="font-semibold">0</p>
                    }
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
