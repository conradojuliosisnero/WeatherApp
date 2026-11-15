/**
 * Traduce la respuesta de OpenWeatherMap a "un cielo":
 * condición, si es de noche en la ciudad y dónde va el sol (o la luna) en su arco.
 */

const CONDITION_BY_ICON = {
  "01": "clear",
  "02": "clouds",
  "03": "clouds",
  "04": "clouds",
  "09": "rain",
  "10": "rain",
  "11": "storm",
  "13": "snow",
  "50": "mist",
};

const DAY = 86400;
const clamp01 = (n) => Math.min(1, Math.max(0, n));

/**
 * @param {object} data respuesta de /data/2.5/weather
 * @param {number} [nowSec] segundos unix (por defecto: ahora)
 * @returns {{ condition: string, isNight: boolean, progress: number }}
 */
export const getSky = (data, nowSec = Date.now() / 1000) => {
  const icon = data?.weather?.[0]?.icon ?? "01d";
  const condition = CONDITION_BY_ICON[icon.slice(0, 2)] ?? "clear";
  const { sunrise, sunset } = data?.sys ?? {};

  if (!sunrise || !sunset) {
    return { condition, isNight: icon.endsWith("n"), progress: 0.5 };
  }

  const isNight = nowSec < sunrise || nowSec > sunset;
  let progress;

  if (!isNight) {
    progress = (nowSec - sunrise) / (sunset - sunrise);
  } else if (nowSec > sunset) {
    progress = (nowSec - sunset) / (sunrise + DAY - sunset);
  } else {
    const prevSunset = sunset - DAY;
    progress = (nowSec - prevSunset) / (sunrise - prevSunset);
  }

  return { condition, isNight, progress: clamp01(progress) };
};

/**
 * Formatea una hora unix en la zona horaria de la ciudad.
 * @param {number} unixSec
 * @param {number} tzOffsetSec desplazamiento que da la API (data.timezone)
 * @param {Intl.DateTimeFormatOptions} options
 */
export const formatLocal = (unixSec, tzOffsetSec, options) =>
  new Date((unixSec + tzOffsetSec) * 1000).toLocaleString("es-ES", {
    ...options,
    timeZone: "UTC",
  });
