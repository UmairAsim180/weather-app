export async function GET(request) {
    const API_KEY = process.env.API_KEY_OPEN_WEATHER_MAP;
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
        return new Response(JSON.stringify({ error: "Query is required" }), { status: 400 });
    }

    try {
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
        const data = await res.json();
        console.log(data);
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch weather location" }), { status: 500 });
    }
}
