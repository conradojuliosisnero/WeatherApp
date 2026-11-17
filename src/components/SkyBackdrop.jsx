import { useEffect, useRef, useState } from "react";
import {
  toAtmosphereWeather,
  lensDropletsFor,
  skyToneFor,
  SKY_TRANSITION_MS,
} from "../utils";

/**
 * Cielo realista en WebGL (@takustaqu/atmosphere) detrás de la sección del cielo:
 * sol, luna con su fase, estrellas, nubes y rayos según la hora, el lugar y el clima.
 * Lo que cae (lluvia, nieve) lo dibuja WeatherEffects por encima, así que aquí va apagado;
 * las gotas sobre la "lente" sí son de atmosphere, porque deforman el cielo real.
 * Mientras carga, o si no hay WebGL, se ve el degradado pastel de siempre.
 */
export default function SkyBackdrop({ data, condition, onToneChange }) {
  const canvasRef = useRef(null);
  const skyRef = useRef(null);
  const latestRef = useRef(null);
  const toneRef = useRef(null);
  const [ready, setReady] = useState(false);

  const conditions = data && {
    time: new Date(data.dt * 1000),
    location: {
      latitude: data.coord?.lat ?? 0,
      longitude: data.coord?.lon ?? 0,
    },
    weather: toAtmosphereWeather(data, condition),
    // Gotas que se forman, resbalan y se secan sobre la "lente" mientras llueve
    lens: {
      droplets: lensDropletsFor(data, condition),
      flare: 0.35,
      vignette: false,
    },
  };

  // Cambio de ciudad o de medición: transición suave al nuevo cielo
  const key = data ? `${data.id}-${data.dt}` : null;
  useEffect(() => {
    latestRef.current = conditions;
    if (conditions) skyRef.current?.set(conditions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Crea el cielo una sola vez; el paquete se descarga después de pintar la página
  useEffect(() => {
    let cancelled = false;
    import("@takustaqu/atmosphere").then(({ Atmosphere }) => {
      if (cancelled || !canvasRef.current) return;
      // latestRef: si los datos llegaron mientras se descargaba el paquete
      skyRef.current = new Atmosphere(canvasRef.current, {
        ...latestRef.current,
        // mismo ritmo que las paletas de CSS y la lluvia/nieve
        animator: { tau: SKY_TRANSITION_MS / 3000 },
        // "balanced" dibuja las nubes al 75 % y en pantallas grandes se nota una
        // trama fina: calidad alta en escritorio, equilibrada en móvil (batería)
        quality: window.matchMedia("(min-width: 900px)").matches
          ? "high"
          : "balanced",
        fps: 30,
        adaptiveResolution: true,
        particles: { precipitation: false },
        // Colores vivos: sin filtro de color (el "faded" que había apagaba el
        // cielo), un polarizador que oscurece el azul y hace saltar las nubes, y
        // algo más de contraste
        filter: "none",
        tone: { contrast: 1.12 },
        polarizer: { strength: 0.6 },
        onReady: (ok) => !cancelled && setReady(ok),
        // Mide el brillo real del cielo dibujado (~10 veces/s): con cielo oscuro el
        // texto de arriba pasa a claro, aunque la paleta del momento diga otra cosa
        lightProbe: true,
        onLight: (light) => {
          const lum = light.frame?.average.luminance;
          if (lum == null || cancelled) return;
          const next = skyToneFor(lum, toneRef.current);
          if (next !== toneRef.current) {
            toneRef.current = next;
            onToneChange?.(next);
          }
        },
      });
    });
    return () => {
      cancelled = true;
      skyRef.current?.dispose();
      skyRef.current = null;
    };
    // Solo al montar (onToneChange es un setState estable): los cambios de ciudad
    // van por sky.set() en el efecto de arriba
  }, [onToneChange]);

  return (
    <canvas
      ref={canvasRef}
      className="sky-backdrop"
      data-ready={ready}
      aria-hidden="true"
    />
  );
}
