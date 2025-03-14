"use client"
import { useContext, createContext, useEffect, useState } from 'react'
const WeatherContext = createContext()


export function WeatherProvider({ children }) {
    const getCoorFromLS = () => {
        if (typeof window !== "undefined") {  // ✅ Ensures it runs only in the browser
            const coor = localStorage.getItem("coor");
            if (coor) {
                return JSON.parse(coor);
            }
        }
        return { lat: 51.5074, lon: 0.1278 };  // Default coordinates if no data is found
    };

    const [data, setData] = useState(null)
    const [imgPath, setImgPath] = useState("")
    const [loading, setLoading] = useState(true);
    const [coor, setCoor] = useState(getCoorFromLS())

    // Background Image selestion 
    const setPath = (data) => {
        const sunrise = data.weather.sys.sunrise + data.weather.timezone;
        const sunset = data.weather.sys.sunset + data.weather.timezone;
        const currentTime = data.weather.dt + data.weather.timezone;
        const condition = data.weather.weather[0].main.toLowerCase();
        const Time = currentTime > sunrise && currentTime < sunset ? "day" : "night";

        const getImagePath = (timeOfDay) => {
            if (condition.includes("rain")) return "/rain.jpg";
            if (condition.includes("clear")) return `/clear_${timeOfDay}.jpg`;
            if (condition.includes("thunderstorm")) return "/thunderstorm.jpg";
            if (condition.includes("drizzle")) return "/drizzle.jpg";
            if (condition.includes("snow")) return "/snow.jpg";
            if (condition.includes("cloud")) return `/cloud_${timeOfDay}.jpg`;
            return `/${timeOfDay}.jpg`;
        };

        setImgPath(getImagePath(Time));
    };
    // Fetch Weather from API  Function
    const fetchWeather = async (lat, lon) => {
        try {
            const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
            const result = await res.json();
            setData(result);
            setPath(result);

        } catch (error) {
            console.error("Error fetching weather data:", error);
            // Handle Error And Show To User 
        } finally {
            setLoading(false);
        }
    }
    

    useEffect(() => {
        const storedCoor = getCoorFromLS();
        if (storedCoor.lat && storedCoor.lon) {
            setCoor(storedCoor);
        } else {
            fetchWeather(coor.lat, coor.lon);
        }
    }, []);

    useEffect(() => {
        if (coor.lat && coor.lon) {
            fetchWeather(coor.lat, coor.lon);
        }
    }, [coor]);

    return (
        <WeatherContext.Provider value={{ data, imgPath, loading, setCoor, setLoading }}>
            {children}
        </WeatherContext.Provider>
    )
}
export function useWeather() {
    return useContext(WeatherContext)
}
