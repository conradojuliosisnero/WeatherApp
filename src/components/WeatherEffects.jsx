import {
  WeatherCanvas,
  Rain,
  Snow,
  Fog,
  Lightning,
  presets,
} from "react-weather-effects";
import { effectsSceneFor, screenWind } from "../utils";

const FADE = 1200;

/**
 * Lluvia, nieve, niebla y rayos a pantalla completa (react-weather-effects), encima
 * de todo y sin capturar clics. Los efectos quedan montados a intensidad 0 para que
 * al cambiar de clima se desvanezcan en vez de cortarse.
 */
export default function WeatherEffects({ data, condition, isNight }) {
  const name = data ? effectsSceneFor(data, condition) : null;
  const scene = name ? presets[name] : {};
  // Sobre el fondo pastel claro de día, la lluvia clara no se vería
  const rainColor = isNight
    ? "rgba(225, 230, 255, 0.55)"
    : "rgba(70, 86, 128, 0.42)";
  const snowColor = isNight
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
