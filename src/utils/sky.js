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
const MIN = 60;
// Ventanas de la "hora dorada" alrededor del amanecer y del atardecer
const DAWN = [-40 * MIN, 50 * MIN];
const DUSK = [-50 * MIN, 40 * MIN];
const clamp01 = (n) => Math.min(1, Math.max(0, n));

/**
 * @param {object} data respuesta de /data/2.5/weather
 * @param {number} [nowSec] segundos unix (por defecto: ahora)
 * @returns {{ condition: string, isNight: boolean, phase: "dawn" | "day" | "dusk" | "night", progress: number }}
 */
export const getSky = (data, nowSec = Date.now() / 1000) => {
  const icon = data?.weather?.[0]?.icon ?? "01d";
  const condition = CONDITION_BY_ICON[icon.slice(0, 2)] ?? "clear";
  const { sunrise, sunset } = data?.sys ?? {};

  if (!sunrise || !sunset) {
    const isNight = icon.endsWith("n");
    return { condition, isNight, phase: isNight ? "night" : "day", progress: 0.5 };
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

  const near = (t, [from, to]) => nowSec >= t + from && nowSec <= t + to;
  const phase = near(sunrise, DAWN)
    ? "dawn"
    : near(sunset, DUSK)
      ? "dusk"
      : isNight
        ? "night"
        : "day";

  return { condition, isNight, phase, progress: clamp01(progress) };
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

/** Precipitación en mm/h que da la API (lluvia o nieve de la última hora). */
const precipitationOf = (data) => data?.rain?.["1h"] ?? data?.snow?.["1h"] ?? 0;

/**
 * Traduce la respuesta de OpenWeatherMap al clima que dibuja @takustaqu/atmosphere
 * (unidades de observación: 0..1, mm/h, m/s, km).
 */
export const toAtmosphereWeather = (data, condition) => {
  // Sin dato de precipitación, un valor típico según la condición
  const fallback = { rain: 2, storm: 12, snow: 1.5 }[condition] ?? 0;
  return {
    cloudCover: (data?.clouds?.all ?? 0) / 100,
    precipitation: precipitationOf(data) || fallback,
    precipitationType: condition === "snow" ? "snow" : "rain",
    windSpeed: data?.wind?.speed ?? 2,
    thunder: condition === "storm" ? 0.8 : 0,
    visibility: (data?.visibility ?? 10000) / 1000,
  };
};

/**
 * Escena de react-weather-effects para la capa de lluvia/nieve/niebla/rayos.
 * Devuelve null cuando el cielo no tiene nada que caer (despejado o nubes).
 */
export const effectsSceneFor = (data, condition) => {
  const icon = data?.weather?.[0]?.icon ?? "";
  const mm = precipitationOf(data);
  const wind = data?.wind?.speed ?? 0;
  if (condition === "storm") return "thunderstorm";
  if (condition === "rain") return icon.startsWith("09") || (mm > 0 && mm < 2.5) ? "drizzle" : "rainstorm";
  if (condition === "snow") return mm > 2 || wind > 10 ? "blizzard" : "snowfall";
  if (condition === "mist") return "mist";
  return null;
};

/**
 * Viento en pantalla: la API da de dónde sopla (grados) y la velocidad (m/s).
 * Hacia la derecha = hacia el este; el valor es relativo (~0..3).
 */
export const screenWind = (data) => {
  const speed = data?.wind?.speed ?? 0;
  const to = (((data?.wind?.deg ?? 0) + 180) * Math.PI) / 180;
  return { x: Math.round(Math.sin(to) * Math.min(speed / 4, 3) * 100) / 100, y: 0 };
};
