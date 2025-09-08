/**
 * Utilidades para determinar tipos de clima basados en temperatura y condiciones
 */

/**
 * Determina el tipo de clima considerando tanto las condiciones como la temperatura
 * @param {string} iconCode - Código de icono del clima (ej: "01d", "10n")
 * @param {string} description - Descripción del clima
 * @param {number} temperature - Temperatura actual
 * @param {string} temperatureScale - Escala de temperatura ('C', 'F', 'K')
 * @returns {string} Tipo de clima para aplicar estilos
 */
export const getWeatherTypeByTemperature = (
  iconCode,
  description,
  temperature,
  temperatureScale = "C"
) => {
  const weatherDesc = description.toLowerCase();

  // Convertir temperatura a Celsius para consistencia
  let tempCelsius = temperature;
  if (temperatureScale === "F") {
    tempCelsius = ((temperature - 32) * 5) / 9;
  } else if (temperatureScale === "K") {
    tempCelsius = temperature - 273.15;
  }

  // Definir rangos de temperatura
  const isHot = tempCelsius >= 28; // 28°C o más = caliente
  const isWarm = tempCelsius >= 20; // 20-27°C = cálido
  const isCool = tempCelsius >= 10; // 10-19°C = fresco
  const isCold = tempCelsius < 10; // menos de 10°C = frío

  // Lógica combinada de clima y temperatura
  if (iconCode.includes("01")) {
    // clear sky - soleado
    if (isHot) return "sunny-hot";
    if (isWarm) return "sunny-warm";
    if (isCool) return "sunny-cool";
    return "sunny-cold";
  }

  if (
    iconCode.includes("02") ||
    iconCode.includes("03") ||
    iconCode.includes("04")
  ) {
    // clouds
    if (isHot) return "cloudy-hot";
    if (isWarm) return "cloudy-warm";
    if (isCool) return "cloudy-cool";
    return "cloudy-cold";
  }

  if (
    iconCode.includes("09") ||
    iconCode.includes("10") ||
    weatherDesc.includes("rain")
  ) {
    return "rain"; // lluvia siempre fría
  }

  if (iconCode.includes("11") || weatherDesc.includes("thunder")) {
    return "thunderstorm"; // tormenta
  }

  if (iconCode.includes("13") || weatherDesc.includes("snow")) {
    return "snow"; // nieve
  }

  if (
    iconCode.includes("50") ||
    weatherDesc.includes("mist") ||
    weatherDesc.includes("fog")
  ) {
    return "mist"; // niebla
  }

  // Default basado en temperatura
  if (isHot) return "sunny-hot";
  if (isWarm) return "sunny-warm";
  return "clear";
};

/**
 * Obtiene el gradiente de fondo apropiado para la aplicación
 * @param {string} weatherType - Tipo de clima obtenido de getWeatherTypeByTemperature
 * @returns {string} Clase CSS para el gradiente de fondo
 */
export const getAppBackgroundClass = (weatherType) => {
  const backgroundMap = {
    "sunny-hot": "app-bg-sunny-hot",
    "sunny-warm": "app-bg-sunny-warm",
    "sunny-cool": "app-bg-sunny-cool",
    "sunny-cold": "app-bg-sunny-cold",
    "cloudy-hot": "app-bg-cloudy-hot",
    "cloudy-warm": "app-bg-cloudy-warm",
    "cloudy-cool": "app-bg-cloudy-cool",
    "cloudy-cold": "app-bg-cloudy-cold",
    rain: "app-bg-rain",
    thunderstorm: "app-bg-thunderstorm",
    snow: "app-bg-snow",
    mist: "app-bg-mist",
    clear: "app-bg-clear",
  };

  return backgroundMap[weatherType] || "app-bg-default";
};
