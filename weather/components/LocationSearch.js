import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Locate } from "lucide-react";
import { useEffect, useState } from "react";
import { useWeather } from "@/app/context/WeatherContext"

export function LocationSearch() {
    const { setCoor } = useWeather()
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY_OPEN_WEATHER_MAP;

    const fetchWeather = async () => {
        try {
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`)
            const data = await res.json()
            console.log(data)
            setResults(data)
            setOpen(true)

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
    // Use Location To show Current Location Weather For first time 
    useEffect(() => {
        handleLocate()
    }, [])


    const handleClick = (result) => {
        console.log(result)
        setCoor({ lat: result.lat, lon: result.lon })
        setResults([])
        setQuery("")
        setOpen(false)
    }
    const handleLocate = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCoor({ lat: position.coords.latitude, lon: position.coords.longitude })
        })
    }
    return (
        <>

            {/* ------ */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="flex items-center justify-center p-4 gap-2">
                        <Input placeholder="Search Location" value={query} onChange={(e) => setQuery(e.target.value)} />
                        <Button onClick={fetchWeather} >
                            <Search size="24" />
                        </Button>
                        <Button onClick={handleLocate}>
                            <Locate size="24" />
                        </Button>
                    </div>
                </PopoverTrigger>
                {results.length > 0 && (
                    <PopoverContent className="w-full p-2 border-none outline-none">
                        <ul className="w-[80vw] transition-all duration-300 ease-in-out">
                            {results.map((result, index) => (
                                <li key={index} onClick={() => handleClick(result)} className="p-2 border-b border-slate-700 cursor-pointer hover:scale-105">
                                    <p>{result.name}, {result.country}</p>
                                </li>
                            ))}
                        </ul>
                    </PopoverContent>
                )}
            </Popover>

        </>
    )
}