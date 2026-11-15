import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { createWeatherService } from "../services/weatherService";
import { validationUtils } from "../utils";

const weatherService = createWeatherService();

/**
 * Hook para obtener el clima de una ciudad.
 * Si una búsqueda falla, se conservan los datos de la ciudad anterior.
 */
export const useWeather = (initialCity = "Cartagena") => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({ city: initialCity, n: 0 });

  const updateCity = useCallback((city) => {
    if (!validationUtils.isValidCityName(city)) {
      toast.error("Escribe el nombre de una ciudad");
      return;
    }
    // n fuerza una nueva petición aunque se repita la misma ciudad
    setQuery((q) => ({ city: city.trim(), n: q.n + 1 }));
  }, []);

  const handleReload = useCallback(() => {
    setQuery((q) => ({ city: q.city, n: q.n + 1 }));
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await weatherService.getWeatherByCity(query.city);
        if (!cancelled) setWeatherData(data);
      } catch (err) {
        if (cancelled) return;
        const message = err.message || "No se pudo obtener el clima";
        setError(message);
        toast.error(message, { id: "weather-error" });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { weatherData, loading, error, updateCity, handleReload };
};
