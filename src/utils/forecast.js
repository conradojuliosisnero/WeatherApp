/**
 * Convierte el pronóstico de OpenWeatherMap (tramos de 3 horas, 5 días) en un
 * resumen por día local de la ciudad, sin contar el día de hoy.
 */

const DAY = 86400;
// Si dos cielos empatan en un día, se muestra el más llamativo
const SEVERITY = ["01", "02", "03", "04", "50", "09", "10", "13", "11"];
const MIN_SLOTS = 4; // un día con menos de 12 h de datos daría máx/mín engañosas

/**
 * @param {{ list: object[], city: { timezone: number } }} forecast respuesta de /data/2.5/forecast
 * @param {number} [nowSec] segundos unix (por defecto: ahora)
 * @param {number} [days] máximo de días
 * @returns {{ dt: number, min: number, max: number, icon: string, description: string, pop: number }[]}
 *   dt es el mediodía local del día (para formatearlo con la zona de la ciudad)
 */
export function dailyForecast(forecast, nowSec = Date.now() / 1000, days = 5) {
  const tz = forecast?.city?.timezone ?? 0;
  const dayOf = (sec) => Math.floor((sec + tz) / DAY);
  const today = dayOf(nowSec);

  const groups = new Map();
  for (const slot of forecast?.list ?? []) {
    const day = dayOf(slot.dt);
    if (day <= today) continue;
    if (!groups.has(day)) groups.set(day, []);
    groups.get(day).push(slot);
  }

  return [...groups.entries()]
    .filter(([, slots]) => slots.length >= MIN_SLOTS)
    .slice(0, days)
    .map(([day, slots]) => {
      // el cielo del día: el más repetido entre las 9 y las 18 h locales
      const daytime = slots.filter((s) => {
        const hour = ((((s.dt + tz) % DAY) + DAY) % DAY) / 3600;
        return hour >= 9 && hour <= 18;
      });
      const counts = new Map();
      for (const s of daytime.length ? daytime : slots) {
        const code = s.weather[0].icon.slice(0, 2);
        counts.set(code, (counts.get(code) ?? 0) + 1);
      }
      const code = [...counts.entries()].sort(
        (a, b) =>
          b[1] - a[1] || SEVERITY.indexOf(b[0]) - SEVERITY.indexOf(a[0]),
      )[0][0];
      const sample = slots.find((s) => s.weather[0].icon.startsWith(code));

      return {
        dt: day * DAY + DAY / 2 - tz,
        min: Math.min(...slots.map((s) => s.main.temp_min)),
        max: Math.max(...slots.map((s) => s.main.temp_max)),
        icon: `${code}d`,
        description: sample.weather[0].description,
        pop: Math.round(Math.max(...slots.map((s) => s.pop ?? 0)) * 100),
      };
    });
}
