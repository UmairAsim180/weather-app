import React from 'react'
const airQuality = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
import { Progress } from "@/components/ui/progress"

function convertToHHMM(Timestamp, timezoneOffset) {
    const date = new Date((Timestamp + timezoneOffset) * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}
const CurrentWeather = ({ data }) => {
    return (
        <section className="p-4 backdrop-blur-sm shadow-sm rounded-md">

            <div className="md:grid md:grid-cols-3 flex flex-col justify-center items-center gap-2">
                {/* Weather Icon  */}
                <div>
                    <img src={`https://openweathermap.org/img/wn/${data.weather.weather[0].icon}@2x.png`} alt="Weather Condition" />
                </div>
                {/* Current Weather  */}
                <div className="flex flex-col gap-2">
                    <p className="text-5xl font-medium flex justify-start">
                        {data.weather.main.temp}
                        <span className="text-sm"> &deg; C</span>
                    </p>
                    <p>
                        <span className="font-semibold">Feels Like:</span> {data.weather.main.feels_like}&deg;
                    </p>
                    <p className="capitalize">{data.weather.weather[0].description}</p>
                    <p>
                        <span className="font-semibold">Wind:</span> {data.weather.wind.speed} kph {data.weather.wind.deg}
                    </p>
                    <p>
                        {data.weather.name}, {data.weather.sys.country}
                    </p>
                </div>
                {/* Weather Detail  */}
                <div className="flex flex-col p-2 gap-2">
                    <div className='flex flex-col gap-2'>
                        <h2 className="font-semibold">Air Quality</h2>
                        <p>{airQuality[(data.pollution.list[0].main.aqi) - 1]}</p>
                        <Progress value={(data.pollution.list[0].main.aqi / 5) * 100} />
                    </div>
                    <div className="w-[90%] m-auto h-[1px] bg-slate-400 my-3"></div>
                    <div className="grid grid-cols-3 gap-2">
                        <div><h3 className="">Sunrise</h3><p className="font-semibold">{convertToHHMM(data.weather.sys.sunrise , data.weather.timezone)}</p></div>
                        <div><h3 className="">Sunset</h3><p className="font-semibold">{convertToHHMM(data.weather.sys.sunset , data.weather.timezone)}</p></div>
                        <div><h3 className="">Humidity</h3><p className="font-semibold">{data.weather.main.humidity} %</p></div>
                    </div>
                    <div className="w-[90%] m-auto h-[1px] bg-slate-400 my-3"></div>
                    <div className="grid grid-cols-3 gap-2">
                        <div><h3>Cloud Cover</h3><p className="font-semibold">{data.weather.clouds.all} %</p></div>
                        {
                            data.weather.rain ? <div><h3>Precipitition</h3><p className="font-semibold">{data.weather.rain["3h"]} mm/h</p></div> : <div><h3>Precipitition</h3><p className="font-semibold">0 mm/h</p></div>
                        }
                        <div><h3>Visibility</h3><p className="font-semibold">{data.weather.visibility / 1000} Km</p></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CurrentWeather
