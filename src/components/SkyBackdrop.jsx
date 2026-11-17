import { useEffect, useRef, useState } from "react";
import { toAtmosphereWeather } from "../utils";

/**
 * Cielo realista en WebGL (@takustaqu/atmosphere) detrás de la sección del cielo:
 * sol, luna con su fase, estrellas, nubes y rayos según la hora, el lugar y el clima.
 * Lo que cae (lluvia, nieve) lo dibuja WeatherEffects por encima, así que aquí va apagado.
 * Mientras carga, o si no hay WebGL, se ve el degradado pastel de siempre.
 */
export default function SkyBackdrop({ data, condition, onToneChange }) {
  const canvasRef = useRef(null);
  const skyRef = useRef(null);
  const latestRef = useRef(null);
  const [ready, setReady] = useState(false);

  const conditions = data && {
    time: new Date(data.dt * 1000),
    location: {
      latitude: data.coord?.lat ?? 0,
      longitude: data.coord?.lon ?? 0,
    },
    weather: toAtmosphereWeather(data, condition),
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
        quality: "balanced",
        fps: 30,
        adaptiveResolution: true,
        lens: { droplets: false, flare: 0.35, vignette: false },
        particles: { precipitation: false },
        filter: { id: "faded", amount: 0.3 },
        onReady: (ok) => !cancelled && setReady(ok),
        // Mide el brillo real del cielo dibujado (~10 veces/s): con cielo oscuro el
        // texto de arriba pasa a claro, aunque la paleta del momento diga otra cosa
        lightProbe: true,
        onLight: (light) => {
          const lum = light.frame?.average.luminance;
          if (lum != null && !cancelled) onToneChange?.(lum < 0.3 ? "dark" : "light");
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
