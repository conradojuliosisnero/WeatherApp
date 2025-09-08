import { Toaster } from "react-hot-toast";
import { useWeather } from "../../hooks/useWeather";
import { LoadingSpinner, ErrorMessage } from "../UI";
import WeatherCard from "../CardWeather/CardWeather";
import Search from "../Search/Search";
import FooterApp from "../FooterApp/FooterApp";
import TitleApp from "../TittleApp/TittleApp";
import { getWeatherTypeByTemperature } from "../../utils";
import { useEffect } from "react";
import "./weather.css";

/**
 * Componente principal de clima refactorizado
 * Aplica principios SOLID y arquitectura limpia
 */
function Weather({ onWeatherChange }) {
  // Usar el hook personalizado para manejar la lógica del clima
  const { weatherData, loading, error, updateCity, handleReload } =
    useWeather("cartagena");

  // Efecto para notificar cambios de clima al componente padre
  useEffect(() => {
    if (weatherData && onWeatherChange) {
      const weatherType = getWeatherTypeByTemperature(
        weatherData.weather[0].icon,
        weatherData.weather[0].description,
        weatherData.main.temp,
        "C" // Asumimos que la API devuelve en Celsius
      );
      onWeatherChange(weatherType);
    }
  }, [weatherData, onWeatherChange]);

  return (
    <div className="weather-app">
      {/* Notificaciones de react-hot-toast */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(255, 255, 255, 0.95)",
            color: "#374151",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            fontWeight: "500",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <div className="weather-app__container">
        {/* Header minimalista con título */}
        <header className="weather-app__header">
          <TitleApp />
        </header>

        {/* Layout principal para desktop: izquierda a derecha */}
        <main className="weather-app__main">
          {/* Sidebar izquierdo: Buscador */}
          <aside className="weather-app__sidebar">
            <div className="weather-app__search-card">
              <h2 className="search-card__title">Buscar Ubicación</h2>
              <Search onSearch={updateCity} />
            </div>
          </aside>

          {/* Contenido principal: Card del clima */}
          <section className="weather-app__content">
            <div className="weather-content__wrapper">
              {loading ? (
                <LoadingSpinner
                  size="large"
                  text="Obteniendo datos del clima..."
                  variant="white"
                />
              ) : error ? (
                <ErrorMessage
                  message={error}
                  onRetry={handleReload}
                  variant="error"
                />
              ) : weatherData ? (
                <WeatherCard
                  temp={weatherData.main.temp}
                  city={weatherData.name}
                  icon={weatherData.weather[0].icon}
                  description={weatherData.weather[0].description}
                  tempMax={weatherData.main.temp_max}
                  tempMin={weatherData.main.temp_min}
                  country={weatherData.sys.country}
                  humidity={weatherData.main.humidity}
                />
              ) : null}
            </div>
          </section>
        </main>

        {/* Footer compacto */}
        <footer className="weather-app__footer">
          <FooterApp />
        </footer>
      </div>
    </div>
  );
}

export default Weather;
