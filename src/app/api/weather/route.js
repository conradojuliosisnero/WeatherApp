// Proxy a OpenWeatherMap: la API key vive solo en el servidor (variable OWM_API_KEY).
export async function GET(request) {
  const city = new URL(request.url).searchParams.get("q")?.trim();
  if (!city || city.length > 50) {
    return Response.json({ message: "Ciudad inválida" }, { status: 400 });
  }

  const key = process.env.OWM_API_KEY;
  if (!key) {
    return Response.json({ message: "API key no configurada" }, { status: 500 });
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.search = new URLSearchParams({ q: city, appid: key, units: "metric", lang: "es" });
  const res = await fetch(url, { cache: "no-store" });

  return new Response(res.body, {
    status: res.status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      // Reduce llamadas repetidas a la API (el plan gratis limita por minuto)
      ...(res.ok && { "cache-control": "public, max-age=300" }),
    },
  });
}
