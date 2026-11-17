import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { GET } from "./route.js";
import { GET as forecastGET } from "../forecast/route.js";

let called;
beforeEach(() => {
  called = null;
  process.env.OWM_API_KEY = "KEY";
  globalThis.fetch = async (url) => {
    called = new URL(url);
    return new Response('{"name":"Lima"}', { status: 200 });
  };
});

const get = (q) => GET(new Request(`https://x/api/weather?q=${encodeURIComponent(q)}`));

test("pasa la ciudad intacta y agrega la key solo hacia OpenWeatherMap", async () => {
  const res = await get(" Saint-Lô & Co #2 ");
  assert.equal(res.status, 200);
  assert.equal(called.searchParams.get("q"), "Saint-Lô & Co #2");
  assert.equal(called.searchParams.get("appid"), "KEY");
  assert.ok(!(await res.text()).includes("KEY"));
  // "private": la CDN no debe guardar una ciudad y servirla para otra búsqueda
  assert.equal(res.headers.get("cache-control"), "private, max-age=300");
});

test("rechaza ciudades vacías o demasiado largas sin llamar a la API", async () => {
  assert.equal((await get("  ")).status, 400);
  assert.equal((await get("a".repeat(51))).status, 400);
  assert.equal(called, null);
});

test("responde 500 si falta la API key", async () => {
  delete process.env.OWM_API_KEY;
  assert.equal((await get("Lima")).status, 500);
  assert.equal(called, null);
});

test("/api/forecast usa el pronóstico de OpenWeatherMap con las mismas protecciones", async () => {
  const res = await forecastGET(new Request("https://x/api/forecast?q=Lima"));
  assert.equal(res.status, 200);
  assert.equal(called.pathname, "/data/2.5/forecast");
  assert.equal(called.searchParams.get("appid"), "KEY");
  assert.equal((await forecastGET(new Request("https://x/api/forecast?q=%20"))).status, 400);
});
