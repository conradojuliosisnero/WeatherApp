import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { GET } from "./route.js";

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
