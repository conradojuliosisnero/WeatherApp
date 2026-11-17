import {
  WeatherCanvas,
  Rain,
  Snow,
  Fog,
  Lightning,
  presets,
} from "react-weather-effects";
import { effectsSceneFor, screenWind, SKY_TRANSITION_MS as FADE } from "../utils";

/**
 * Lluvia, nieve, niebla y rayos a pantalla completa (react-weather-effects), encima
 * de todo y sin capturar clics. Los efectos quedan montados a intensidad 0 para que
 * al cambiar de clima se desvanezcan en vez de cortarse.
 */
export default function WeatherEffects({ data, condition, darkSky }) {
  const name = data ? effectsSceneFor(data, condition) : null;
  const scene = name ? presets[name] : {};
  // Lluvia clara sobre cielo oscuro y oscura sobre cielo claro, o no se vería
  const rainColor = darkSky
    ? "rgba(225, 230, 255, 0.55)"
    : "rgba(70, 86, 128, 0.42)";
  const snowColor = darkSky
    ? "rgba(255, 255, 255, 0.9)"
    : "rgba(255, 255, 255, 0.95)";

  return (
    <WeatherCanvas wind={data ? screenWind(data) : undefined} zIndex={4}>
      <Rain
        intensity={0}
        transitionDuration={FADE}
        {...scene.rain}
        color={rainColor}
      />
      <Snow
        intensity={0}
        transitionDuration={FADE}
        {...scene.snow}
        color={snowColor}
      />
      <Fog density={0} transitionDuration={FADE} {...scene.fog} />
      {scene.lightning && <Lightning {...scene.lightning} />}
    </WeatherCanvas>
  );
}
