import {
  Thermometer,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap,
} from "lucide-react";
import { useTemperatureConverter } from "../../hooks/useTemperatureConverter";
import {
  temperatureUtils,
  textUtils,
  getWeatherTypeByTemperature,
} from "../../utils";
import "./cardweather.css";

/**
 * Componente WeatherCard refactorizado con diseño moderno
 * Aplica principios SOLID y utiliza hooks personalizados
 */
function WeatherCard({
  temp,
  description,
  city,
  icon,
  tempMax,
  tempMin,
  country,
  humidity,
}) {
  // Usando el hook personalizado para la conversión de temperatura
  const {
    temperatureScale,
    temperatureValue,
    temperatureValueMax,
    temperatureValueMin,
    toggleTemperatureScale,
  } = useTemperatureConverter(temp, tempMax, tempMin);

  // Formatear descripción del clima
  const formattedDescription = textUtils.capitalize(description);

  // Función para obtener el icono apropiado según el clima
  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      "01d": Sun, // clear sky day
      "01n": Sun, // clear sky night
      "02d": Cloud, // few clouds day
      "02n": Cloud, // few clouds night
      "03d": Cloud, // scattered clouds
      "03n": Cloud,
      "04d": Cloud, // broken clouds
      "04n": Cloud,
      "09d": CloudRain, // shower rain
      "09n": CloudRain,
      "10d": CloudRain, // rain
      "10n": CloudRain,
      "11d": Zap, // thunderstorm
      "11n": Zap,
      "13d": CloudSnow, // snow
      "13n": CloudSnow,
      "50d": Cloud, // mist
      "50n": Cloud,
    };
    return iconMap[iconCode] || Sun;
  };

  // Usar la utilidad compartida para obtener el tipo de clima
  const weatherType = getWeatherTypeByTemperature(
    icon,
    description,
    temperatureValue,
    temperatureScale
  );

  // Debug para verificar la lógica
  console.log("🌡️ Debug Weather Card:", {
    temperature: temperatureValue,
    temperatureScale,
    icon,
    description,
    weatherType,
  });
  const WeatherIcon = getWeatherIcon(icon);

  // Obtener fecha y hora actual
  const now = new Date();
  const time = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now
    .toLocaleDateString("es-ES", {
      weekday: "short",
      month: "2-digit",
      day: "2-digit",
    })
    .toUpperCase();

  return (
    <div className="card" data-weather={weatherType}>
      <section className="info-section">
        <div className="background-design">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>

        <div className="left-side">
          <div className="weather">
            <div>
              <WeatherIcon size={32} />
            </div>
            <div>{formattedDescription}</div>
          </div>
          <div className="temperature">
            {Math.round(temperatureValue)}°
            <button
              className="temp-scale-btn"
              onClick={toggleTemperatureScale}
              title={`Cambiar a ${
                temperatureScale === "C"
                  ? "Fahrenheit"
                  : temperatureScale === "F"
                  ? "Kelvin"
                  : "Celsius"
              }`}
            >
              {temperatureScale}
            </button>
          </div>
          <div className="range">
            {Math.round(temperatureValueMax)}°/{Math.round(temperatureValueMin)}
            °
          </div>
        </div>

        <div className="right-side">
          <div>
            <div className="hour">{time}</div>
            <div className="date">{date}</div>
          </div>
          <div className="city">{city}</div>
        </div>
      </section>

      <section className="days-section">
        <button>
          <span className="day">HUM</span>
          <span className="icon-weather-day">{humidity}%</span>
        </button>
        <button onClick={toggleTemperatureScale}>
          <span className="day">ESCALA</span>
          <span className="icon-weather-day">
            <Thermometer size={16} />
          </span>
        </button>
        <button>
          <span className="day">PAÍS</span>
          <span className="icon-weather-day">{country}</span>
        </button>
      </section>
    </div>
  );
}

export default WeatherCard;
