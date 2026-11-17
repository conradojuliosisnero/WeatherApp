import { test } from "node:test";
import assert from "node:assert/strict";
import { stepDrops, stillDrops } from "./drops.js";

// Aleatorio con semilla: los tests dan siempre lo mismo
const seeded = (seed = 1) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const W = 400;
const H = 800;
const run = (drops, seconds, opts) => {
  for (let t = 0; t < seconds; t += 1 / 60) drops = stepDrops(drops, 1 / 60, { width: W, height: H, ...opts });
  return drops;
};

test("con lluvia aparecen gotas, y más cuanto más llueve", () => {
  const poca = run([], 2, { amount: 0.3, rand: seeded(1) }).length;
  const mucha = run([], 2, { amount: 1, rand: seeded(1) }).length;
  assert.ok(poca > 0);
  assert.ok(mucha > poca);
});

test("una gota grande resbala hacia abajo y una pequeña se queda pegada", () => {
  const grande = { x: 100, y: 100, r: 9, vy: 0, vx: 0, stick: 0, trail: 0 };
  const pequeña = { x: 300, y: 100, r: 2, vy: 0, vx: 0, stick: 0, trail: 0 };
  // amount mínimo para que no se sequen, y sin gotas nuevas que se crucen
  const out = stepDrops(stepDrops([grande, pequeña], 0.3, { amount: 0.002, width: W, height: H, rand: () => 0.9 }), 0.3, {
    amount: 0.002,
    width: W,
    height: H,
    rand: () => 0.9,
  });
  const g = out.find((d) => Math.abs(d.x - 100) < 20 && d.r > 5);
  const p = out.find((d) => d.x === 300);
  assert.ok(g.y > 120, `la grande bajó (y=${g.y})`);
  assert.equal(p.y, 100);
});

test("al resbalar deja un rastro de gotitas y pierde agua", () => {
  const d = { x: 200, y: 50, r: 9, vy: 300, vx: 0, stick: 0, trail: 0 };
  const out = run([d], 0.5, { amount: 0.002, rand: seeded(7) });
  const rastro = out.filter((x) => x.r < 4);
  assert.ok(rastro.length >= 2, `rastro: ${rastro.length}`);
  const grande = out.find((x) => x.r >= 4);
  assert.ok(!grande || grande.r < 9);
});

test("dos gotas que se tocan se fusionan sin perder agua", () => {
  const a = { x: 100, y: 100, r: 6, vy: 100, vx: 0, stick: 0, trail: 0 };
  const b = { x: 100, y: 108, r: 4, vy: 0, vx: 0, stick: 99, trail: 0 };
  const out = stepDrops([a, b], 0.001, { amount: 0.002, width: W, height: H, rand: () => 0.9 });
  assert.equal(out.length, 1);
  assert.ok(Math.abs(out[0].r - Math.sqrt(36 + 16)) < 0.01);
});

test("cuando para de llover las gotas se secan y no salen nuevas", () => {
  const mojado = run([], 2, { amount: 1, rand: seeded(3) });
  assert.ok(mojado.length > 10);
  assert.equal(run(mojado, 12, { amount: 0, rand: seeded(3) }).length, 0);
});

test("reducir movimiento: gotas quietas, más con más lluvia", () => {
  const pocas = stillDrops({ amount: 0.4, width: W, height: H, rand: seeded(2) });
  const muchas = stillDrops({ amount: 1, width: W, height: H, rand: seeded(2) });
  assert.ok(muchas.length > pocas.length);
  assert.ok(muchas.every((d) => d.stick === 99));
});
