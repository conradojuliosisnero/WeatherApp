/**
 * Interfaz para el servicio del clima
 * Aplica el principio de Inversión de Dependencias (DIP)
 */
export class WeatherServiceInterface {
  async getWeatherByCity(city) {
    throw new Error("Method getWeatherByCity must be implemented");
  }
}

/**
 * Implementación concreta del servicio del clima
 * Utiliza OpenWeatherMap API
 */
export class OpenWeatherMapService extends WeatherServiceInterface {
  constructor() {
    super();
    this.apiKey = import.meta.env.VITE_API_KEY;
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

  async getWeatherByCity(city) {
    if (!this.apiKey) {
      throw new Error("API Key no configurada");
    }

    if (!city?.trim()) {
      throw new Error("El nombre de la ciudad es requerido");
    }

    const url = `${this.baseUrl}?q=${city.trim()}&appid=${
      this.apiKey
    }&units=metric&lang=es`;

    const response = await fetch(url);

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(
            "Ciudad no encontrada. Verifica el nombre e intenta nuevamente."
          );
        case 401:
          throw new Error("Error de autenticación con la API del clima.");
        case 429:
          throw new Error(
            "Demasiadas solicitudes. Intenta nuevamente en unos minutos."
          );
        default:
          throw new Error(`Error del servidor: ${response.status}`);
      }
    }

    return await response.json();
  }
}

// Factory para crear instancias del servicio
export const createWeatherService = () => {
  return new OpenWeatherMapService();
};
