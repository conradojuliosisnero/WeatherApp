import { useState } from "react"; // Importamos el hook useState de React para manejar el estado
import "./cardweather.css"; // Importamos un archivo de estilos CSS

// Definimos un componente React llamado WeatherCard que acepta varias propiedades relacionadas con el clima
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
  const [temperatureScale, setTemperatureScale] = useState("K");
  const [temperatureValue, setTemperatureValue] = useState(temp);
  const [temperatureValueMax, setTemperatureValueMax] = useState(tempMax);
  const [temperatureValueMin, setTemperatureValueMin] = useState(tempMin);

  const toggleTemperatureScale = () => {
    if (temperatureScale === "K") {
      // Convertir a Celsius si la escala actual es Kelvin
      const celsiusValue = temp - 273.15;
      const celsiusValueMax = tempMax - 273.15;
      const celsiusValueMin = tempMin - 273.15;

      setTemperatureValue(celsiusValue);
      setTemperatureValueMax(celsiusValueMax);
      setTemperatureValueMin(celsiusValueMin);

      setTemperatureScale("C");
    } else if (temperatureScale === "C") {
      // Convertir a Fahrenheit si la escala actual es Celsius
      const fahrenheitValue = (temp * 9) / 5 + 32;
      const fahrenheitValueMax = (tempMax * 9) / 5 + 32;
      const fahrenheitValueMin = (tempMin * 9) / 5 + 32;

      setTemperatureValue(fahrenheitValue);
      setTemperatureValueMax(fahrenheitValueMax);
      setTemperatureValueMin(fahrenheitValueMin);

      setTemperatureScale("F");
    } else {
      // Convertir a Kelvin si la escala actual es Fahrenheit
      const kelvinValue = ((temp - 32) * 5) / 9 + 273.15;
      const kelvinValueMax = ((tempMax - 32) * 5) / 9 + 273.15;
      const kelvinValueMin = ((tempMin - 32) * 5) / 9 + 273.15;

      setTemperatureValue(temp);
      setTemperatureValueMax(kelvinValueMax);
      setTemperatureValueMin(kelvinValueMin);

      setTemperatureScale("K");
    }
  };

  // Estructura de la tarjeta de clima
  return (
    <div className="cardContainer">
      <div className="card">
        <p className="city">
          {city} - {country}
        </p>{" "}
        {/* // Muestra la ciudad y el país */}
        <img
          className="icon__weather"
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt="icon"
        />{" "}
        {/* // Muestra el ícono del clima */}
        <div className="description">{description}</div>
        {/* // Muestra la descripción del clima */}
        <p className="temp">
          {Math.round(temperatureValue)}
          {/* // Muestra la temperatura actual redondeada */}
          <span className="metrict" onClick={toggleTemperatureScale}>
            {temperatureScale}°
            {/* // Muestra la escala de temperatura actual */}
          </span>
        </p>
        <div className="minmaxContainer">
          <div className="min">
            <p className="minHeading">Min</p>
            <p className="minTemp">{Math.round(temperatureValueMin)}°</p>
            {/* Muestra la temperatura mínima redondeada */}
          </div>
          <div className="max">
            <p className="maxHeading">Max</p>
            <p className="maxTemp">{Math.round(temperatureValueMax)}°</p>
            {/* Muestra la temperatura máxima redondeada */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard; // Exportamos el componente para su uso en otras partes de la aplicación
