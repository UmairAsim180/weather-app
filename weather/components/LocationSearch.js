import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Locate } from "lucide-react";
import { useEffect, useState } from "react";
import { useWeather } from "@/app/context/WeatherContext"

export function LocationSearch(params) {
    const { setCoor } = useWeather()
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const fetchWeather = async () => {
        try {
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=b23a043981d2bf1ecab973d85d3b8e0b`)
            const data = await res.json()
            console.log(data)
            setResults(data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.length > 2)
                fetchWeather()

        }, 500);
        return () => clearTimeout(delayDebounce)
    }, [query])

    const handleClick = (result) => {
        console.log(result)
        setCoor({ lat: result.lat, lon: result.lon })
        setResults([])
        setQuery("")
    }
    const handleLocate = ()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            setCoor({lat:position.coords.latitude, lon:position.coords.longitude})
        })
    }
    return (
        <>
            <div className="relative flex items-center justify-center p-4 gap-2">
                <Input placeholder="Search Location" value={query} onChange={(e) => setQuery(e.target.value)} />
                <Button onClick={fetchWeather} >
                    <Search size="24" />
                </Button>
                <Button onClick={handleLocate}>
                    <Locate size="24" />
                </Button>
                {
                results.length > 0 && <ul className="absolute top-14 left-0 w-full bg-slate-900 transition-all duration-300 ease-in-out">
                    {
                        results.map((result, index) => (
                            <li key={index} onClick={() => handleClick(result)} className="p-2 border-b border-slate-700">
                                <p>{result.name}, {result.country}</p>
                            </li>
                        ))
                    }
                </ul>
            }
            </div>

           
        </>
    )
}