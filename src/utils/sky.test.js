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
  assert.equal(getSky({ weather: [{ icon: "10d" }], sys: {} }).condition, "rain");
});
