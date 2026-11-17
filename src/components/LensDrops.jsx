import { useEffect, useRef } from "react";
import { stepDrops, stillDrops, SKY_TRANSITION_MS } from "../utils";

const SPRITE_R = 48; // radio del sprite de la gota, en px del sprite

/**
 * Una gota de agua dibujada una vez: cuerpo translúcido, borde más oscuro (lo que
 * el agua refracta), reflejo de luz arriba a la izquierda y cáustica abajo.
 */
function makeSprite() {
  const size = SPRITE_R * 2 + 8;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  const cx = size / 2;
  const cy = size / 2;

  // sombra suave debajo, desplazada
  g.fillStyle = "rgba(10, 14, 30, 0.16)";
  g.beginPath();
  g.ellipse(
    cx + 2,
    cy + 4,
    SPRITE_R * 0.96,
    SPRITE_R * 0.96,
    0,
    0,
    Math.PI * 2,
  );
  g.fill();

  // cuerpo: claro en el centro, borde oscuro como el de una lente
  const body = g.createRadialGradient(
    cx - SPRITE_R * 0.2,
    cy - SPRITE_R * 0.25,
    SPRITE_R * 0.1,
    cx,
    cy,
    SPRITE_R,
  );
  body.addColorStop(0, "rgba(255, 255, 255, 0.16)");
  body.addColorStop(0.65, "rgba(220, 230, 250, 0.10)");
  body.addColorStop(0.9, "rgba(30, 40, 70, 0.22)");
  body.addColorStop(1, "rgba(20, 28, 55, 0.34)");
  g.fillStyle = body;
  g.beginPath();
  g.arc(cx, cy, SPRITE_R, 0, Math.PI * 2);
  g.fill();

  // cáustica: media luna de luz en la parte de abajo
  const caustic = g.createRadialGradient(
    cx,
    cy + SPRITE_R * 0.55,
    0,
    cx,
    cy + SPRITE_R * 0.55,
    SPRITE_R * 0.55,
  );
  caustic.addColorStop(0, "rgba(255, 255, 255, 0.30)");
  caustic.addColorStop(1, "rgba(255, 255, 255, 0)");
  g.fillStyle = caustic;
  g.beginPath();
  g.ellipse(
    cx,
    cy + SPRITE_R * 0.55,
    SPRITE_R * 0.6,
    SPRITE_R * 0.32,
    0,
    0,
    Math.PI * 2,
  );
  g.fill();

  // reflejo de luz
  g.fillStyle = "rgba(255, 255, 255, 0.75)";
  g.beginPath();
  g.ellipse(
    cx - SPRITE_R * 0.32,
    cy - SPRITE_R * 0.38,
    SPRITE_R * 0.2,
    SPRITE_R * 0.13,
    -0.6,
    0,
    Math.PI * 2,
  );
  g.fill();

  return c;
}

/**
 * Gotas que se forman, resbalan, dejan rastro y se secan sobre toda la pantalla,
 * como en la lente de una cámara bajo la lluvia. amount 0..1 (0 = se secan).
 */
export default function LensDrops({ amount, wind = 0 }) {
  const canvasRef = useRef(null);
  const targetRef = useRef({ amount, wind });

  useEffect(() => {
    targetRef.current = { amount, wind };
  }, [amount, wind]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const sprite = makeSprite();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let drops = [];
    let current = 0; // lluvia actual, que sigue a la objetivo al ritmo del cielo
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let stillFor = null; // lluvia con la que se calcularon las gotas quietas

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const d of drops) {
        // al resbalar se estira hacia abajo, como una gota de verdad
        const stretch = 1 + Math.min(d.vy / 500, 0.45);
        const w = d.r * 2;
        const h = w * stretch;
        ctx.drawImage(sprite, d.x - d.r, d.y - h + d.r, w, h);
      }
    };

    const tick = (now) => {
      // tiempo real, en subpasos de 0.05 s: en un equipo lento la lluvia no va a
      // cámara lenta (máximo 0.5 s, por si la pestaña estuvo en segundo plano)
      let dt = Math.min(0.5, (now - last) / 1000 || 0);
      last = now;
      const { amount: target, wind: w } = targetRef.current;
      while (dt > 0) {
        const step = Math.min(0.05, dt);
        dt -= step;
        // misma exponencial que el cielo WebGL (tau = duración / 3)
        current +=
          (target - current) *
          (1 - Math.exp(-step / (SKY_TRANSITION_MS / 3000)));
        drops = stepDrops(drops, step, {
          amount: current,
          width,
          height,
          wind: w,
        });
      }
      draw();
      // sin lluvia y ya secas: se para el bucle hasta que vuelva a llover
      frame = drops.length || target > 0.001 ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduce.matches) {
        // reducir movimiento: gotas quietas según la lluvia, sin animación
        stillFor = targetRef.current.amount;
        drops = stillDrops({ amount: stillFor, width, height });
        draw();
        return;
      }
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    resize();
    start();
    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", start);
    // Vuelve a arrancar cuando cambie la lluvia: si el bucle se paró por falta de
    // lluvia, o con "reducir movimiento" (gotas quietas recalculadas)
    const wake = setInterval(() => {
      const target = targetRef.current.amount;
      if (reduce.matches ? target !== stillFor : !frame && target > 0.001)
        start();
    }, 500);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(wake);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} className="lens-drops" aria-hidden="true" />;
}
