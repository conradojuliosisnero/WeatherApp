import { AnimateIcon } from "@animate-ui/react/icons";
import { SlidingNumber } from "@animate-ui/react/primitives/texts/sliding-number";
import { convertTemp, scaleSymbol } from "../utils";
import { ArrowUp } from "./icons/arrow-up";
import { Thermometer } from "./icons/thermometer";
import { Droplet } from "./icons/droplet";
import { Fan } from "./icons/fan";
import { CloudSun } from "./icons/cloud-sun";
import { Eye } from "./icons/eye";
import { Gauge } from "./icons/gauge";

const COMPASS = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
const compass = (deg) => COMPASS[Math.round(deg / 45) % 8];

// Cada lectura anima su icono al pasar el cursor (o tocarla) y al entrar en pantalla
function Reading({ icon: Icon, label, children }) {
  return (
    <AnimateIcon animateOnHover animateOnTap asChild>
      <div className="reading js-reading">
        <dt>
          <Icon size={18} animateOnView aria-hidden="true" />
          {label}
        </dt>
        {children}
      </div>
    </AnimateIcon>
  );
}

const Value = ({ number, unit, decimals = 0 }) => (
  <dd>
    <SlidingNumber number={number} decimalPlaces={decimals} decimalSeparator="," />
    <small>{unit}</small>
  </dd>
);

export default function Readings({ data, scale }) {
  const { main, wind, visibility, clouds } = data;
  const windKmh = Math.round((wind?.speed ?? 0) * 3.6);
  const windDeg = wind?.deg ?? 0;
  const visibilityKm = visibility != null ? Math.round(visibility / 100) / 10 : null;

  return (
    <dl className="readings">
      <Reading icon={Thermometer} label="Sensación térmica">
        <Value number={Math.round(convertTemp(main.feels_like, scale))} unit={scaleSymbol(scale)} />
      </Reading>

      <Reading icon={Droplet} label="Humedad">
        <Value number={main.humidity} unit="%" />
        <div className="meter" aria-hidden="true">
          <span style={{ width: `${main.humidity}%` }} />
        </div>
      </Reading>

      <Reading icon={Fan} label="Viento">
        <Value number={windKmh} unit="km/h" />
        <p className="reading__note">
          <span className="wind-arrow" style={{ transform: `rotate(${windDeg + 180}deg)` }}>
            <ArrowUp size={14} animation="pointing" aria-hidden="true" />
          </span>
          Desde el {compass(windDeg)}
        </p>
      </Reading>

      <Reading icon={CloudSun} label="Nubosidad">
        <Value number={clouds?.all ?? 0} unit="%" />
      </Reading>

      <Reading icon={Eye} label="Visibilidad">
        {visibilityKm != null ? (
          <Value number={visibilityKm} decimals={Number.isInteger(visibilityKm) ? 0 : 1} unit="km" />
        ) : (
          <dd>
            —<small>km</small>
          </dd>
        )}
      </Reading>

      <Reading icon={Gauge} label="Presión">
        <Value number={main.pressure} unit="hPa" />
      </Reading>
    </dl>
  );
}
