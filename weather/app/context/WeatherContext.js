"use client"
import { useContext, createContext, useEffect, useState } from 'react'
const WeatherContext = createContext()


export function WeatherProvider({ children }) {
    const [data, setData] = useState(null)
    const [imgPath, setImgPath] = useState()
    const [loading, setLoading] = useState(true);
    const [coor, setCoor] = useState({ lat: 31, lon: 74 })

    useEffect(() => {
        const setPath = (condition, time) => {
            if (condition.includes("rain"))
                setImgPath("/rain.jpg")
            else if (condition.includes("clear"))
                setImgPath(`/clear_${time}.jpg`)
            else if (condition.includes("thunderstorm"))
                setImgPath("/thunderstorm.jpg")
            else if (condition.includes("drizzle"))
                setImgPath("/drizzle.jpg")
            else if (condition.includes("snow"))
                setImgPath("/snow.jpg")
            else if (condition.includes("cloud"))
                setImgPath(`/cloud_${time}.jpg`)
        }

        const fetchWeather = async () => {
            try {
                const res = await fetch(`/api/weather?lat=${coor.lat}&lon=${coor.lon}`);
                const result = await res.json();
                setData(result);
                // show day img after sunrise and before sunset and night img after sunset and before sunrise
                const sunrise = result.weather.sys.sunrise + result.weather.timezone
                const sunset = result.weather.sys.sunset + result.weather.timezone
                const currentTime = result.weather.dt + result.weather.timezone
                if (currentTime > sunrise && currentTime < sunset) {
                    setImgPath("/day.jpg")
                    setPath(result.weather.weather[0].main.toLowerCase(), "day")
                }
                else {
                    setImgPath("/night.jpg")
                    setPath(result.weather.weather[0].main.toLowerCase(), "night")
                }
                console.log(result.weather.weather[0].main.toLowerCase())


            } catch (error) {
                console.error("Error fetching weather data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [coor])

    return (
        <WeatherContext.Provider value={{ data, imgPath, loading , setCoor }}>
            {children}
        </WeatherContext.Provider>
    )
}
export function useWeather() {
    return useContext(WeatherContext)
}
