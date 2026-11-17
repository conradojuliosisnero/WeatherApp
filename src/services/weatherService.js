const ERRORS = {
  400: "Escribe un nombre de ciudad válido.",
  404: "Ciudad no encontrada. Verifica el nombre e intenta nuevamente.",
  429: "Demasiadas solicitudes. Intenta nuevamente en unos minutos.",
};

/** Pide el clima a nuestra función de Netlify, que guarda la API key. */
export async function getWeatherByCity(city) {
  const response = await fetch(
    `/.netlify/functions/weather?q=${encodeURIComponent(city.trim())}`
  );
  if (!response.ok) {
    throw new Error(ERRORS[response.status] ?? `Error del servidor: ${response.status}`);
  }
  return response.json();
}
