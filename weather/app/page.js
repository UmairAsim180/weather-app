
import { Progress } from "@/components/ui/progress"
import { HourlyForecast } from "@/components/HourlyForecast"
import { DailyForecast} from "@/components/dailyForecast"


export default async function Home() {
  // Todo  Add Icons Both, 
  // -------------------------------------------------------Work needed 
  const city = "Lahore"; // Change to your city
  const apiKey = process.env.API_KEY; // Use .env for security
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=14&aqi=yes&alerts=yes`;

  const res = await fetch(url, { cache: "no-store" }); // Disable caching for fresh data
  if (!res.ok) throw new Error("Failed to fetch weather data");

  const data = await res.json();
  const today = data.forecast.forecastday[0]
  const forecast = data.forecast
  return (
    <main>
      <section className="bg-gradient-to-tl from-sky-800  to-sky-950 rounded-lg p-4">
        <div className="md:grid md:grid-cols-3 flex flex-col justify-center items-center gap-2">
          {/* Weather Icon  */}
          <div>
            <img src={data.current.condition.icon.replace("64x64", "128x128")} alt="" />
          </div>
          {/* Current Weather  */}
          <div className="flex flex-col gap-2">
            <p className="text-5xl font-medium flex justify-start">
              {data.current.temp_c}
              <span className="text-sm"> &deg; C</span>
            </p>
            <p>
              <span className="font-semibold">Feels Like:</span> {data.current.feelslike_c}&deg;
            </p>
            <p className="capitalize">{data.current.condition.text}</p>
            <p>
              <span className="font-semibold">Wind:</span> {data.current.wind_kph} kph {data.current.wind_dir}
            </p>
          </div>
          {/* Weather Detail  */}
          <div className="flex flex-col p-2 gap-2">
            <div>
              <h2 className="font-semibold">Air Quality</h2>
              <p>{data.current.air_quality["us-epa-index"]}</p>
              <Progress value={(data.current.air_quality["us-epa-index"] / 6) * 100} />
            </div>
            <div className="w-[90%] m-auto h-[1px] bg-slate-400 my-3"></div>
            <div className="grid grid-cols-3">
              <div><h3 className="">Sunrise</h3><p className="font-semibold">{today.astro.sunrise}</p></div>
              <div><h3 className="">Sunset</h3><p className="font-semibold">{today.astro.sunset}</p></div>
              <div><h3 className="">Humidity</h3><p className="font-semibold">{today.day.avghumidity} %</p></div>
            </div>
            <div className="w-[90%] m-auto h-[1px] bg-slate-400 my-3"></div>
            <div className="grid grid-cols-3">
              <div><h3>Precipitition (mm)</h3><p className="font-semibold">{today.day.totalprecip_mm}</p></div>
              <div><h3>Rain Chance (%)</h3><p className="font-semibold">{today.day.daily_chance_of_rain}</p></div>
              <div><h3>Visibility</h3><p className="font-semibold">{today.day.avgvis_km}</p></div>
            </div>
          </div>
        </div>
      </section>
      {/* ---- */}
      <HourlyForecast today={today}/>
      {/* ------- */}
      <DailyForecast forecastday={forecast.forecastday}/>
      
    </main>
  );
}
