"use client";

import { useRef, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { MotionConfig } from "motion/react";
import { AnimateIcon } from "@animate-ui/react/icons";
import { SlidingNumber } from "@animate-ui/react/primitives/texts/sliding-number";
import { ShimmeringText } from "@animate-ui/react/primitives/texts/shimmering";
import {
  RippleButton,
  RippleButtonRipples,
} from "@animate-ui/react/primitives/buttons/ripple";
import { useWeather } from "../hooks/useWeather";
import { useSkyIntro } from "../hooks/useSkyIntro";
import {
  SCALES,
  convertTemp,
  scaleSymbol,
  textUtils,
  SKY_TRANSITION_MS,
  lensDropletsFor,
  screenWind,
  getSky,
  formatLocal,
} from "../utils";
import SearchBar from "./SearchBar";
import SunArc from "./SunArc";
import SkyBackdrop from "./SkyBackdrop";
import WeatherEffects from "./WeatherEffects";
import LensDrops from "./LensDrops";
import Readings from "./Readings";
import Forecast from "./Forecast";
import { SKY_ICONS } from "./skyIcons";
import { CloudSun } from "./icons/cloud-sun";
import { Sunrise } from "./icons/sunrise";
import { Sunset } from "./icons/sunset";
import { RefreshCw } from "./icons/refresh-cw";
import { Heart } from "./icons/heart";
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
  const {
    weatherData: data,
    forecast,
    loading,
    error,
    updateCity,
    handleReload,
  } = useWeather("Cartagena");
  const [scale, setScale] = useState("C");
  // Brillo del cielo WebGL: null hasta que lo mide (se usa la paleta)
  const [skyTone, setSkyTone] = useState(null);

  const sky = data
    ? getSky(data)
    : { condition: "clear", isNight: false, phase: "day", progress: 0.5 };
  const temp = data ? Math.round(convertTemp(data.main.temp, scale)) : null;
  // La entrada animada solo al cambiar de ciudad; las recargas de la misma
  // ciudad (cada 10 min) actualizan el cielo y los números sin repetirla
  const introKey = data ? data.id : null;
  const SkyIcon = SKY_ICONS[sky.condition][sky.isNight ? 1 : 0];
  const degree = scale !== "K" && "°";

  useSkyIntro(rootRef, introKey, {
    progress: sky.progress,
  });

  // El color de la barra del navegador sigue al cielo
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    const color = getComputedStyle(rootRef.current).getPropertyValue("--p-top");
    if (meta && color) meta.setAttribute("content", color.trim());
  }, [sky.condition, sky.phase]);

  const nextScale = SCALES[(SCALES.indexOf(scale) + 1) % SCALES.length];

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={rootRef}
        className="app"
        data-condition={sky.condition}
        data-time={sky.phase}
        data-sky-tone={skyTone ?? undefined}
        style={{ "--sync": `${SKY_TRANSITION_MS}ms` }}
        aria-busy={loading}
      >
        <LensDrops
          amount={data ? lensDropletsFor(data, sky.condition) : 0}
          wind={data ? screenWind(data).x : 0}
        />
        <WeatherEffects
          data={data}
          condition={sky.condition}
          darkSky={skyTone ? skyTone === "dark" : sky.phase === "night"}
        />
        <Toaster
          position="bottom-center"
          toastOptions={{ className: "toast", duration: 4000 }}
        />

        <header className="topbar">
          <AnimateIcon animateOnHover asChild>
            <p className="wordmark">
              <CloudSun size={22} aria-hidden="true" />
              Clima
            </p>
          </AnimateIcon>
          <SearchBar onSearch={updateCity} busy={loading} />
        </header>

        <main>
          <section className="sky" aria-label="Clima actual">
            <SkyBackdrop
              data={data}
              condition={sky.condition}
              onToneChange={setSkyTone}
            />
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
                    ,{" "}
                    {formatLocal(data.dt, data.timezone, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    en {countryName(data.sys.country)}
                  </p>
                  <AnimateIcon animateOnHover animateOnTap asChild>
                    <p className="place__sky js-meta">
                      <SkyIcon
                        key={introKey}
                        size={28}
                        animateOnView
                        aria-hidden="true"
                      />
                      {textUtils.capitalize(data.weather[0].description)}
                    </p>
                  </AnimateIcon>
                  <p className="place__range js-meta">
                    <span>
                      Máx{" "}
                      <SlidingNumber
                        number={Math.round(
                          convertTemp(data.main.temp_max, scale),
                        )}
                      />
                      {degree}
                    </span>
                    <span>
                      Mín{" "}
                      <SlidingNumber
                        number={Math.round(
                          convertTemp(data.main.temp_min, scale),
                        )}
                      />
                      {degree}
                    </span>
                  </p>
                </div>

                <SunArc progress={sky.progress} isNight={sky.isNight} />

                <div className="temp js-temp-wrap">
                  <SlidingNumber
                    key={introKey}
                    className="temp__value"
                    number={temp}
                  />
                  <RippleButton
                    type="button"
                    className="temp__unit"
                    onClick={() => setScale(nextScale)}
                    aria-label={`Temperatura en ${SCALE_NAMES[scale]}. Cambiar a ${SCALE_NAMES[nextScale]}`}
                    hoverScale={1.08}
                  >
                    {scaleSymbol(scale)}
                    <RippleButtonRipples color="var(--ink)" />
                  </RippleButton>
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
                    <AnimateIcon animateOnHover animateOnTap asChild>
                      <RippleButton
                        type="button"
                        className="retry"
                        onClick={handleReload}
                        hoverScale={1.04}
                      >
                        <RefreshCw size={18} aria-hidden="true" />
                        Reintentar
                        <RippleButtonRipples color="var(--sky-top)" />
                      </RippleButton>
                    </AnimateIcon>
                  </>
                ) : (
                  <p className="place__sky">
                    <ShimmeringText
                      text="Mirando el cielo de Cartagena…"
                      color="color-mix(in oklab, var(--ink) 55%, transparent)"
                      shimmeringColor="var(--ink)"
                    />
                  </p>
                )}
              </div>
            )}
          </section>

          <section className="ground">
            {data && (
              <>
                <p className="sun-times js-meta">
                  <span>
                    <Sunrise
                      size={18}
                      animateOnView
                      animateOnHover
                      aria-hidden="true"
                    />
                    Amanecer{" "}
                    <strong>
                      {formatLocal(data.sys.sunrise, data.timezone, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </strong>
                  </span>
                  <span>
                    <Sunset
                      size={18}
                      animateOnView
                      animateOnHover
                      aria-hidden="true"
                    />
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
                <Forecast forecast={forecast} now={data.dt} scale={scale} />
              </>
            )}

            <footer className="footer">
              <p>
                Datos de{" "}
                <a
                  href="https://openweathermap.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenWeatherMap
                </a>
              </p>
              <AnimateIcon animateOnHover asChild>
                <p>
                  Hecho con{" "}
                  <Heart size={14} animation="fill" aria-label="amor" /> por{" "}
                  <a
                    href="https://github.com/conradojuliosisnero"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ConradoJulio
                  </a>
                </p>
              </AnimateIcon>
            </footer>
          </section>
        </main>
      </div>
    </MotionConfig>
  );
}
