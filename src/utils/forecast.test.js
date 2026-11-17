import { test } from "node:test";
import assert from "node:assert/strict";
import { dailyForecast } from "./forecast.js";

const H = 3600;
const TZ = -5 * H; // Cartagena
// "ahora": lunes 16 a las 12:00 locales
const NOW = Date.UTC(2026, 10, 16, 17) / 1000;
const MON = Date.UTC(2026, 10, 16, 5) / 1000; // lunes 00:00 locales

/** 8 tramos por día durante n días desde el lunes, con lo que devuelva fn(día, tramo) */
const fake = (n, fn) => ({
  city: { timezone: TZ },
  list: Array.from({ length: n * 8 }, (_, i) => {
    const day = Math.floor(i / 8);
    const slot = i % 8;
    const { icon = "01d", min = 20, max = 30, pop = 0, description = "x" } = fn(day, slot) ?? {};
    return { dt: MON + i * 3 * H, main: { temp_min: min, temp_max: max }, weather: [{ icon, description }], pop };
  }),
});

test("un resumen por día, sin hoy y como máximo 5 días", () => {
  const days = dailyForecast(fake(7, () => ({})), NOW);
  assert.equal(days.length, 5);
  // el primer día es el martes: su mediodía local
  assert.equal(new Date((days[0].dt + TZ) * 1000).getUTCHours(), 12);
  assert.equal(new Date((days[0].dt + TZ) * 1000).getUTCDate(), 17);
});

test("máxima y mínima del día, y la probabilidad de lluvia más alta", () => {
  const [tue] = dailyForecast(
    fake(3, (d, s) => (d === 1 ? { min: 18 + s, max: 24 + s, pop: s === 5 ? 0.7 : 0.1 } : {})),
    NOW
  );
  assert.equal(tue.min, 18);
  assert.equal(tue.max, 31);
  assert.equal(tue.pop, 70);
});

test("el icono es el cielo más repetido de día; en empate, el más llamativo", () => {
  // martes: de día (tramos 3-6 = 9, 12, 15, 18 h) dos de lluvia y dos de sol
  const [tue] = dailyForecast(
    fake(3, (d, s) => (d === 1 && (s === 3 || s === 4) ? { icon: "10d", description: "lluvia" } : {})),
    NOW
  );
  assert.equal(tue.icon, "10d");
  assert.equal(tue.description, "lluvia");
});

test("descarta un último día con menos de 12 h de datos", () => {
  const data = fake(3, () => ({}));
  data.list = data.list.slice(0, 8 * 2 + 3); // miércoles con solo 3 tramos
  assert.equal(dailyForecast(data, NOW).length, 1);
});

test("sin datos devuelve una lista vacía", () => {
  assert.deepEqual(dailyForecast(undefined, NOW), []);
});
