"use client";

import { useRef, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useWeather } from "../hooks/useWeather";
import { useSkyIntro } from "../hooks/useSkyIntro";
import {
  SCALES,
  convertTemp,
  scaleSymbol,
  textUtils,
  getSky,
  formatLocal,
} from "../utils";
import SearchBar from "./SearchBar";
import SunArc from "./SunArc";
import Readings from "./Readings";
import "./weather-app.css";

const SCALE_NAMES = { C: "Celsius", F: "Fahrenheit", K: "Kelvin" };
const regionNames = new Intl.DisplayNames(["es"], { type: "region" });
const countryName = (code) => {
  try {
    return regionNames.of(code);
  } catch {
    return code;
  }
};

export default function WeatherApp() {
  const rootRef = useRef(null);
  const { weatherData: data, loading, error, updateCity, handleReload } =
    useWeather("Cartagena");
  const [scale, setScale] = useState("C");

  const sky = data ? getSky(data) : { condition: "clear", isNight: false, progress: 0.5 };
  const temp = data ? Math.round(convertTemp(data.main.temp, scale)) : null;

  useSkyIntro(rootRef, data ? `${data.id}-${data.dt}` : null, {
    progress: sky.progress,
  });

  // El color de la barra del navegador sigue al cielo
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    const color = getComputedStyle(rootRef.current).getPropertyValue("--p-top");
    if (meta && color) meta.setAttribute("content", color.trim());
  }, [sky.condition, sky.isNight]);

  const nextScale = SCALES[(SCALES.indexOf(scale) + 1) % SCALES.length];

  return (
    <div
      ref={rootRef}
      className="app"
      data-condition={sky.condition}
      data-time={sky.isNight ? "night" : "day"}
      aria-busy={loading}
    >
      <Toaster
        position="bottom-center"
        toastOptions={{ className: "toast", duration: 4000 }}
      />

      <header className="topbar">
        <p className="wordmark">Clima</p>
        <SearchBar onSearch={updateCity} busy={loading} />
      </header>

      <main>
        <section className="sky" aria-label="Clima actual">
          {data ? (
            <>
              <div className="place">
                <h1 className="place__city" aria-label={data.name}>
                  {[...data.name].map((ch, i) => (
                    <span className="char-mask" key={i} aria-hidden="true">
                      <span className="js-char">{ch === " " ? " " : ch}</span>
                    </span>
                  ))}
                </h1>
                <p className="place__when js-meta">
                  {formatLocal(data.dt, data.timezone, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                  , {formatLocal(data.dt, data.timezone, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  en {countryName(data.sys.country)}
                </p>
                <p className="place__sky js-meta">
                  {textUtils.capitalize(data.weather[0].description)}
                </p>
                <p className="place__range js-meta">
                  <span>Máx {Math.round(convertTemp(data.main.temp_max, scale))}{scale !== "K" && "°"}</span>
                  <span>Mín {Math.round(convertTemp(data.main.temp_min, scale))}{scale !== "K" && "°"}</span>
                </p>
              </div>

              <SunArc progress={sky.progress} isNight={sky.isNight} />

              <div className="temp js-temp-wrap">
                <span className="temp__value js-temp" data-temp={temp}>
                  {temp}
                </span>
                <button
                  type="button"
                  className="temp__unit"
                  onClick={() => setScale(nextScale)}
                  aria-label={`Temperatura en ${SCALE_NAMES[scale]}. Cambiar a ${SCALE_NAMES[nextScale]}`}
                >
                  {scaleSymbol(scale)}
                </button>
              </div>
            </>
          ) : (
            <div className="place place--empty">
              {error ? (
                <>
                  <h1 className="place__city place__city--small">
                    No hay datos del clima
                  </h1>
                  <p className="place__sky">{error}</p>
                  <button type="button" className="retry" onClick={handleReload}>
                    Reintentar
                  </button>
                </>
              ) : (
                <p className="place__sky loading-text">Mirando el cielo de Cartagena…</p>
              )}
            </div>
          )}
        </section>

        <section className="ground">
          {data && (
            <>
              <div className="temp temp--reflection" aria-hidden="true">
                <span className="temp__value js-temp" data-temp={temp}>
                  {temp}
                </span>
                <span className="temp__unit">{scaleSymbol(scale)}</span>
              </div>

              <p className="sun-times js-meta">
                <span>
                  Amanecer{" "}
                  <strong>
                    {formatLocal(data.sys.sunrise, data.timezone, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </strong>
                </span>
                <span>
                  Atardecer{" "}
                  <strong>
                    {formatLocal(data.sys.sunset, data.timezone, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </strong>
                </span>
              </p>

              <Readings data={data} scale={scale} />
            </>
          )}

          <footer className="footer">
            <p>
              Datos de{" "}
              <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
                OpenWeatherMap
              </a>
            </p>
            <p>
              Hecho por{" "}
              <a
                href="https://github.com/conradojuliosisnero"
                target="_blank"
                rel="noopener noreferrer"
              >
                ConradoJulio
              </a>
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}
