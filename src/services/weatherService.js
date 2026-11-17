const ERRORS = {
  400: "Escribe un nombre de ciudad válido.",
  401: "La API key de OpenWeatherMap no es válida.",
  404: "Ciudad no encontrada. Verifica el nombre e intenta nuevamente.",
  429: "Demasiadas solicitudes. Intenta nuevamente en unos minutos.",
  500: "El servicio del clima no está configurado.",
};

/** Pide a nuestras rutas /api/*, que guardan la API key. */
async function getFromApi(path, city) {
  const response = await fetch(`/api/${path}?q=${encodeURIComponent(city.trim())}`);
  if (!response.ok) {
    throw new Error(ERRORS[response.status] ?? `Error del servidor: ${response.status}`);
  }
  return response.json();
}

/** Clima actual. */
export const getWeatherByCity = (city) => getFromApi("weather", city);

/** Pronóstico de 5 días en tramos de 3 horas. */
export const getForecastByCity = (city) => getFromApi("forecast", city);
