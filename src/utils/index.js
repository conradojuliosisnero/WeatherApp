/**
 * Utilidades para formateo de temperatura
 */
export const temperatureUtils = {
  kelvinToCelsius: (kelvin) => kelvin - 273.15,
  celsiusToFahrenheit: (celsius) => (celsius * 9) / 5 + 32,
  fahrenheitToCelsius: (fahrenheit) => ((fahrenheit - 32) * 5) / 9,
  celsiusToKelvin: (celsius) => celsius + 273.15,

  formatTemperature: (temp, scale = "C") => {
    const rounded = Math.round(temp);
    return `${rounded}°${scale}`;
  },
};

/**
 * Utilidades para formateo de texto
 */
export const textUtils = {
  capitalize: (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  cleanCityName: (cityName) => {
    if (!cityName) return "";
    return cityName.toLowerCase().trim();
  },
};

/**
 * Utilidades para fondos de clima
 */
export {
  getWeatherTypeByTemperature,
  getAppBackgroundClass,
} from "./weatherBackground.js";

/**
 * Utilidades para validación
 */
export const validationUtils = {
  isValidCityName: (cityName) => {
    if (!cityName || typeof cityName !== "string") return false;
    const trimmed = cityName.trim();
    return trimmed.length > 0 && trimmed.length <= 50;
  },

  isValidTemperature: (temp) => {
    return typeof temp === "number" && !isNaN(temp) && temp > -273.15;
  },
};
