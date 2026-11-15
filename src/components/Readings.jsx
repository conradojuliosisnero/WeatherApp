import { ArrowUp } from "lucide-react";
import { convertTemp, scaleSymbol } from "../utils";

const COMPASS = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
const compass = (deg) => COMPASS[Math.round(deg / 45) % 8];

export default function Readings({ data, scale }) {
  const { main, wind, visibility, clouds } = data;
  const windKmh = Math.round((wind?.speed ?? 0) * 3.6);
  const windDeg = wind?.deg ?? 0;

  return (
    <dl className="readings">
      <div className="reading js-reading">
        <dt>Sensación térmica</dt>
        <dd>
          {Math.round(convertTemp(main.feels_like, scale))}
          <small>{scaleSymbol(scale)}</small>
        </dd>
      </div>

      <div className="reading js-reading">
        <dt>Humedad</dt>
        <dd>
          {main.humidity}
          <small>%</small>
        </dd>
        <div className="meter" aria-hidden="true">
          <span style={{ width: `${main.humidity}%` }} />
        </div>
      </div>

      <div className="reading js-reading">
        <dt>Viento</dt>
        <dd>
          {windKmh}
          <small>km/h</small>
        </dd>
        <p className="reading__note">
          <ArrowUp
            size={14}
            aria-hidden="true"
            style={{ transform: `rotate(${windDeg + 180}deg)` }}
          />
          Desde el {compass(windDeg)}
        </p>
      </div>

      <div className="reading js-reading">
        <dt>Nubosidad</dt>
        <dd>
          {clouds?.all ?? 0}
          <small>%</small>
        </dd>
      </div>

      <div className="reading js-reading">
        <dt>Visibilidad</dt>
        <dd>
          {visibility != null ? Math.round(visibility / 100) / 10 : "—"}
          <small>km</small>
        </dd>
      </div>

      <div className="reading js-reading">
        <dt>Presión</dt>
        <dd>
          {main.pressure}
          <small>hPa</small>
        </dd>
      </div>
    </dl>
  );
}
