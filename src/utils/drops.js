/**
 * Simulación de gotas sobre una lente: se forman, se quedan pegadas un momento,
 * resbalan con la gravedad (más rápido cuanto más grandes), dejan un rastro de
 * gotitas, se fusionan al tocarse y se secan cuando para de llover.
 * Sin DOM: unidades en píxeles CSS y segundos, para poder probarla.
 */

const GRAVITY = 520; // px/s² para una gota de radio SLIDE_R
const SLIDE_R = 5.5; // por debajo de este radio la gota no resbala
const MAX_V = 420; // px/s
const DRY_RATE = 0.9; // px de radio por segundo al secarse
const AREA_PER_DROP = 42000; // px² por gota nueva/s con amount = 1
const MAX_DROPS = 160;

const area = (r) => r * r;

/** Una gota nueva en un punto al azar: muchas pequeñas, pocas grandes. */
const spawn = (w, h, rand) => ({
  x: rand() * w,
  y: rand() * h,
  r: 1.6 + rand() ** 3 * 9,
  vy: 0,
  vx: 0,
  stick: 0.4 + rand() * 2.5, // segundos pegada antes de poder resbalar
  trail: 0, // px recorridos desde la última gotita del rastro
});

/**
 * Avanza la simulación dt segundos.
 * @param {object[]} drops gotas actuales (no se modifica: devuelve un array nuevo)
 * @param {number} dt segundos
 * @param {{ amount: number, width: number, height: number, wind?: number, rand?: () => number }} opts
 *   amount 0..1 cuánta lluvia; wind empuja de lado (relativo, ~-3..3)
 */
export function stepDrops(
  drops,
  dt,
  { amount, width, height, wind = 0, rand = Math.random },
) {
  const next = [];

  for (const d0 of drops) {
    const d = { ...d0 };

    if (amount <= 0.001) {
      // Sin lluvia: se secan y no resbalan
      d.r -= DRY_RATE * dt;
      if (d.r > 0.8) next.push(d);
      continue;
    }

    d.stick -= dt;
    if (d.r >= SLIDE_R && d.stick <= 0) {
      d.vy = Math.min(MAX_V, d.vy + GRAVITY * (d.r / SLIDE_R) * dt);
      // zigzag: el cristal no es liso, la gota se tuerce y a veces frena
      if (rand() < dt * 3) d.vx = (rand() - 0.5) * 60 + wind * 25;
      if (rand() < dt * 0.8) d.vy *= 0.25;
      const dy = d.vy * dt;
      d.y += dy;
      d.x += d.vx * dt;
      d.trail += dy;
      // rastro: gotitas pequeñas cada 14–34 px; la gota pierde un poco de agua
      if (d.trail > 14 + rand() * 20) {
        d.trail = 0;
        const r = d.r * (0.22 + rand() * 0.16);
        // detrás de la gota y fuera del alcance de la fusión, o se la volvería a tragar
        next.push({
          x: d.x + (rand() - 0.5) * 2,
          y: d.y - d.r * 1.6,
          r,
          vy: 0,
          vx: 0,
          stick: 99,
          trail: 0,
        });
        d.r = Math.sqrt(Math.max(0, area(d.r) - area(r)));
      }
    } else {
      // pegada: se evapora muy despacio
      d.r -= 0.04 * dt;
    }

    if (d.y - d.r < height && d.r > 0.8) next.push(d);
  }

  // Fusión: una gota que resbala absorbe a las que toca (conserva el agua)
  for (let i = 0; i < next.length; i++) {
    const a = next[i];
    if (!a || a.vy <= 0) continue;
    for (let j = 0; j < next.length; j++) {
      const b = next[j];
      if (i === j || !b) continue;
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < (a.r + b.r) * 0.9) {
        a.r = Math.sqrt(area(a.r) + area(b.r));
        next[j] = null;
      }
    }
  }

  const alive = next.filter(Boolean);

  // Gotas nuevas según la lluvia y el tamaño de la pantalla
  if (amount > 0.001) {
    const expected = ((amount * width * height) / AREA_PER_DROP) * dt;
    let n = Math.floor(expected) + (rand() < expected % 1 ? 1 : 0);
    while (n-- > 0 && alive.length < MAX_DROPS * amount + 10)
      alive.push(spawn(width, height, rand));
  }

  return alive;
}

/** Un conjunto quieto de gotas, para "reducir movimiento". */
export function stillDrops({ amount, width, height, rand = Math.random }) {
  const n = Math.round(((amount * width * height) / AREA_PER_DROP) * 6);
  return Array.from({ length: Math.min(n, MAX_DROPS) }, () => ({
    ...spawn(width, height, rand),
    stick: 99,
  }));
}
