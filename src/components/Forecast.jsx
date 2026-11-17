import { AnimateIcon } from "@animate-ui/react/icons";
import { SlidingNumber } from "@animate-ui/react/primitives/texts/sliding-number";
import {
  convertTemp,
  conditionOf,
  formatLocal,
  dailyForecast,
  textUtils,
} from "../utils";
import { SKY_ICONS } from "./skyIcons";
import { Droplet } from "./icons/droplet";

/** Próximos días: cielo, máxima/mínima en la escala elegida y probabilidad de lluvia. */
export default function Forecast({ forecast, now, scale }) {
  const days = forecast ? dailyForecast(forecast, now) : [];
  if (days.length === 0) return null;

  const tz = forecast.city.timezone;
  const degree = scale !== "K" && "°";
  const temp = (c) => Math.round(convertTemp(c, scale));

  return (
    <section className="forecast" aria-labelledby="forecast-title">
      <h2 id="forecast-title" className="forecast__title js-reading">
        Próximos días
      </h2>
      <ol className="forecast__days">
        {days.map((d) => {
          const Icon = SKY_ICONS[conditionOf(d.icon)][0];
          const weekday = textUtils.capitalize(
            formatLocal(d.dt, tz, { weekday: "short" }).replace(".", ""),
          );
          const longDay = formatLocal(d.dt, tz, {
            weekday: "long",
            day: "numeric",
          });
          return (
            <AnimateIcon key={d.dt} animateOnHover animateOnTap asChild>
              <li
                className="forecast__day js-reading"
                aria-label={`${longDay}: ${d.description}, máxima ${temp(d.max)}, mínima ${temp(d.min)}${
                  d.pop >= 20 ? `, ${d.pop} % de probabilidad de lluvia` : ""
                }`}
              >
                <span className="forecast__weekday" aria-hidden="true">
                  {weekday}
                </span>
                <Icon size={30} animateOnView aria-hidden="true" />
                <span className="forecast__temps" aria-hidden="true">
                  <strong>
                    <SlidingNumber number={temp(d.max)} />
                    {degree}
                  </strong>
                  <span>
                    <SlidingNumber number={temp(d.min)} />
                    {degree}
                  </span>
                </span>
                {/* el hueco se reserva siempre, para que las tarjetas queden alineadas */}
                <span
                  className="forecast__pop"
                  aria-hidden="true"
                  data-show={d.pop >= 20}
                >
                  <Droplet size={12} />
                  {d.pop} %
                </span>
              </li>
            </AnimateIcon>
          );
        })}
      </ol>
    </section>
  );
}
