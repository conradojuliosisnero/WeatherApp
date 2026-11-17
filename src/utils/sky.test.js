import { test } from "node:test";
import assert from "node:assert/strict";
import { getSky } from "./sky.js";

const sunrise = 1_000_000;
const sunset = sunrise + 12 * 3600;
const data = { weather: [{ icon: "01d" }], sys: { sunrise, sunset } };
const at = (offsetMin, base) => getSky(data, base + offsetMin * 60);

test("el momento del día sigue al amanecer y al atardecer de la ciudad", () => {
  assert.equal(at(-60, sunrise).phase, "night");
  assert.equal(at(-30, sunrise).phase, "dawn");
  assert.equal(at(45, sunrise).phase, "dawn");
  assert.equal(at(6 * 60, sunrise).phase, "day");
  assert.equal(at(-45, sunset).phase, "dusk");
  assert.equal(at(30, sunset).phase, "dusk");
  assert.equal(at(60, sunset).phase, "night");
});

test("el amanecer antes de salir el sol sigue mostrando la luna", () => {
  const sky = at(-30, sunrise);
  assert.equal(sky.isNight, true);
  assert.equal(sky.phase, "dawn");
});

test("a mediodía el sol va por la mitad del arco", () => {
  const sky = at(6 * 60, sunrise);
  assert.equal(sky.isNight, false);
  assert.equal(sky.progress, 0.5);
});

test("sin amanecer/atardecer usa el icono para decidir día o noche", () => {
  assert.equal(getSky({ weather: [{ icon: "10n" }], sys: {} }).phase, "night");
  assert.equal(
    getSky({ weather: [{ icon: "10d" }], sys: {} }).condition,
    "rain",
  );
});

import {
  toAtmosphereWeather,
  effectsSceneFor,
  screenWind,
  skyToneFor,
  lensDropletsFor,
  horizonOf,
} from "./sky.js";

const owm = (icon, extra = {}) => ({
  weather: [{ icon }],
  clouds: { all: 75 },
  wind: { speed: 5, deg: 270 },
  visibility: 8000,
  ...extra,
});

test("el cielo de atmosphere recibe las unidades que espera", () => {
  const w = toAtmosphereWeather(owm("10d", { rain: { "1h": 3.2 } }), "rain");
  assert.deepEqual(w, {
    cloudCover: 0.75,
    precipitation: 3.2,
    precipitationType: "rain",
    windSpeed: 5,
    thunder: 0,
    visibility: 8,
  });
  // Nieve sin dato de mm/h: valor típico y tipo nieve
  const s = toAtmosphereWeather(owm("13d"), "snow");
  assert.equal(s.precipitationType, "snow");
  assert.equal(s.precipitation, 1.5);
  assert.equal(toAtmosphereWeather(owm("11d"), "storm").thunder, 0.8);
});

test("cada clima elige su escena de efectos", () => {
  assert.equal(effectsSceneFor(owm("01d"), "clear"), null);
  assert.equal(effectsSceneFor(owm("04d"), "clouds"), null);
  assert.equal(effectsSceneFor(owm("09d"), "rain"), "drizzle");
  assert.equal(
    effectsSceneFor(owm("10d", { rain: { "1h": 6 } }), "rain"),
    "rainstorm",
  );
  assert.equal(effectsSceneFor(owm("11d"), "storm"), "thunderstorm");
  assert.equal(
    effectsSceneFor(owm("13d", { wind: { speed: 3 } }), "snow"),
    "snowfall",
  );
  assert.equal(
    effectsSceneFor(owm("13d", { wind: { speed: 14 } }), "snow"),
    "blizzard",
  );
  assert.equal(effectsSceneFor(owm("50d"), "mist"), "mist");
});

test("el viento del oeste empuja hacia la derecha", () => {
  assert.ok(screenWind({ wind: { speed: 8, deg: 270 } }).x > 0);
  assert.ok(screenWind({ wind: { speed: 8, deg: 90 } }).x < 0);
  assert.equal(screenWind({}).x, 0);
});

test("el tono del cielo no parpadea cerca del umbral (histéresis)", () => {
  assert.equal(skyToneFor(0.1), "dark");
  assert.equal(skyToneFor(0.6), "light");
  // un destello de rayo (0.32) sobre cielo oscuro no cambia el tono
  assert.equal(skyToneFor(0.32, "dark"), "dark");
  assert.equal(skyToneFor(0.28, "light"), "light");
  // sin tono previo, decide por la mitad
  assert.equal(skyToneFor(0.29), "dark");
  assert.equal(skyToneFor(0.31), "light");
});

test("gotas en la lente solo con lluvia, más cuanto más llueve", () => {
  assert.equal(lensDropletsFor(owm("01d"), "clear"), 0);
  assert.equal(lensDropletsFor(owm("13d"), "snow"), 0);
  assert.equal(lensDropletsFor(owm("09d"), "rain"), 0.4);
  assert.equal(lensDropletsFor(owm("10d", { rain: { "1h": 6 } }), "rain"), 0.8);
  assert.equal(lensDropletsFor(owm("11d"), "storm"), 1);
});

test("el horizonte real sale de la franja inferior de lo que dibuja el cielo", () => {
  const cell = (v, lum) => ({ srgb: [v, v, v], luminance: lum });
  // 2 columnas × 3 filas: arriba oscuro, abajo claro
  const grid = {
    cols: 2,
    rows: 3,
    cells: [cell(0.1, 0.01), cell(0.1, 0.01), cell(0.5, 0.2), cell(0.5, 0.2), cell(0.9, 0.8), cell(0.7, 0.6)],
  };
  const h = horizonOf(grid);
  assert.deepEqual(h.rgb, [204, 204, 204]); // media de la última fila (0.9 y 0.7)
  assert.ok(Math.abs(h.luminance - 0.45) < 1e-9); // media de las dos últimas filas
  assert.equal(horizonOf(null), null);
  assert.equal(horizonOf({ cols: 2, rows: 1, cells: [cell(1, 1), cell(1, 1)] }), null);
});
