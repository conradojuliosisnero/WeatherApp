import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createWeatherService } from "../services/weatherService";
import { validationUtils } from "../utils";

/**
 * Hook personalizado para manejar la lógica del clima
 * Aplica el principio de Responsabilidad Única (SRP) del SOLID
 */
export const useWeather = (initialCity = "Cartagena") => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState(initialCity);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  // Instancia del servicio del clima (Inversión de Dependencias)
  const weatherService = createWeatherService();

  // Función para actualizar la ciudad
  const updateCity = (city) => {
    if (!validationUtils.isValidCityName(city)) {
      toast.error("Por favor ingresa un nombre de ciudad válido");
      return;
    }
    setSearchCity(city.trim());
  };

  // Función para recargar los datos
  const handleReload = () => {
    setLoading(true);
    setError(null);
    setReload((prev) => !prev);
    setSearchCity(initialCity);
    toast.loading("Recargando datos del clima...", { id: "reload" });
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (!searchCity) return;

      try {
        setLoading(true);
        setError(null);

        // Usar el servicio del clima
        const data = await weatherService.getWeatherByCity(searchCity);
        setWeatherData(data);
        toast.success(`Datos del clima cargados para ${data.name}`, {
          id: "reload",
        });
      } catch (error) {
        const errorMessage =
          error.message || "Error al obtener los datos del clima";
        setError(errorMessage);
        toast.error(errorMessage, { id: "reload" });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [searchCity, reload]);

  return {
    weatherData,
    loading,
    error,
    searchCity,
    updateCity,
    handleReload,
  };
};
