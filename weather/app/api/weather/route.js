export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") || "alberta";
    const apiKey = process.env.API_KEY_OPEN_WEATHER_MAP;
  
    try {
      // Fetch Weather Data
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const weather = await weatherRes.json();
  
      // Fetch 5-Day Forecast (3-hour intervals)
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const forecast = await forecastRes.json();
  
      // Fetch Air Pollution Data
      const { coord } = weather;
      const pollutionRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`
      );
      const pollution = await pollutionRes.json();
  
      return Response.json({ weather, forecast, pollution });
    } catch (error) {
      return Response.json({ error: "Failed to fetch data" }, { status: 500 });
    }
  }
  