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
export const SCALES = ["C", "F", "K"];

export const convertTemp = (celsius, scale = "C") => {
  if (scale === "F") return (celsius * 9) / 5 + 32;
  if (scale === "K") return celsius + 273.15;
  return celsius;
};

export const scaleSymbol = (scale) => (scale === "K" ? "K" : `°${scale}`);

export { getSky, formatLocal, toAtmosphereWeather, effectsSceneFor, screenWind } from "./sky.js";
