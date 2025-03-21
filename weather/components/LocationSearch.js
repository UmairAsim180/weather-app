import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Search, Locate } from "lucide-react";
import { useEffect, useState } from "react";
import { useWeather } from "@/app/context/WeatherContext";
import { AlertDes } from "@/components/Alert";

export function LocationSearch() {
    const { setCoor, setLoading } = useWeather();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    // Fetch location from a Next.js API route (keeps API key hidden)
    const fetchWeatherLocation = async () => {
        try {
            const res = await fetch(`/api/weather-location?q=${query}`);
            const data = await res.json();
            console.log(data)
            setResults(data);
            setOpen(true);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    const saveCoorToLS = (lat, lon) => {
        localStorage.setItem("coor", JSON.stringify({ lat, lon }));
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.length > 2) fetchWeatherLocation();
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleClick = (result) => {
        console.log(result);
        setCoor({ lat: result.lat, lon: result.lon });
        setLoading(true);
        setResults([]);
        setQuery("");
        setOpen(false);
    };

    const getGpsLocation = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (position.coords.latitude && position.coords.longitude) {
                    setCoor({ lat: position.coords.latitude, lon: position.coords.longitude });
                    saveCoorToLS(position.coords.latitude, position.coords.longitude);
                    console.log("Found location");
                }
                setLoading(false);
            },
            (error) => {
                console.error("GPS error:", error.message);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
                setLoading(false);
            }
        );
    };

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="flex items-center justify-center p-4 gap-2">
                        <Input
                            placeholder="Search Location"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button disabled={query.length < 3} onClick={fetchWeatherLocation}>
                            <Search size="24" />
                        </Button>
                        <Button onClick={getGpsLocation}>
                            <Locate size="24" />
                        </Button>
                    </div>
                </PopoverTrigger>
                {results.length > 0 && (
                    <PopoverContent className="w-full p-2 border-none outline-none">
                        <ul className="w-[80vw] transition-all duration-300 ease-in-out">
                            {results.map((result, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleClick(result)}
                                    className="p-2 border-b border-slate-700 cursor-pointer hover:scale-105"
                                >
                                    <p>{result.name}, {result.country}</p>
                                </li>
                            ))}
                        </ul>
                    </PopoverContent>
                )}
            </Popover>
            {showAlert && <AlertDes title="Error" description="Error getting location. Make sure location is turned on." />}
        </>
    );
}
