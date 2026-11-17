// Proxy a OpenWeatherMap compartido por /api/weather y /api/forecast:
// la API key vive solo en el servidor (variable OWM_API_KEY).
export async function proxyOwm(request, endpoint) {
  const city = new URL(request.url).searchParams.get("q")?.trim();
  if (!city || city.length > 50) {
    return Response.json({ message: "Ciudad inválida" }, { status: 400 });
  }

  const key = process.env.OWM_API_KEY;
  if (!key) {
    return Response.json({ message: "API key no configurada" }, { status: 500 });
  }

  const url = new URL(`https://api.openweathermap.org/data/2.5/${endpoint}`);
  url.search = new URLSearchParams({ q: city, appid: key, units: "metric", lang: "es" });
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) console.error(`OpenWeatherMap (${endpoint}) respondió ${res.status} para "${city}"`);

  return new Response(res.body, {
    status: res.status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      // Solo caché del navegador: la CDN de Netlify ignora ?q= en su clave y
      // devolvía la misma ciudad para cualquier búsqueda.
      ...(res.ok && { "cache-control": "private, max-age=300" }),
    },
  });
}
