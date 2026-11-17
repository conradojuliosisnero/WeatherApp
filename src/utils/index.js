/**
 * Utilidades de la app del clima
 */

export const textUtils = {
  capitalize: (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  },
};

export const validationUtils = {
  isValidCityName: (cityName) => {
    if (!cityName || typeof cityName !== "string") return false;
    const trimmed = cityName.trim();
    return trimmed.length > 0 && trimmed.length <= 50;
  },
};

/**
 * Conversión de temperatura desde Celsius (la API responde con units=metric)
 */
/**
 * Duración común de todos los cambios de cielo (paletas, cielo WebGL, lluvia/nieve,
 * color del texto). El cielo WebGL sigue al nuevo estado con una exponencial de
 * constante tau = duración / 3 (llega al 95 %); en CSS se usa la curva
 * cubic-bezier(0.2, 0.6, 0.4, 0.9), ajustada a esa exponencial (error < 0.5 %).
 */
export const SKY_TRANSITION_MS = 2400;

export const SCALES = ["C", "F", "K"];

export const convertTemp = (celsius, scale = "C") => {
  if (scale === "F") return (celsius * 9) / 5 + 32;
  if (scale === "K") return celsius + 273.15;
  return celsius;
};

export const scaleSymbol = (scale) => (scale === "K" ? "K" : `°${scale}`);

export { stepDrops, stillDrops } from "./drops.js";
export { dailyForecast } from "./forecast.js";
export {
  getSky,
  conditionOf,
  formatLocal,
  toAtmosphereWeather,
  effectsSceneFor,
  screenWind,
  skyToneFor,
  lensDropletsFor,
  horizonOf,
} from "./sky.js";
