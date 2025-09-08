import { useState, useEffect } from "react";
import Weather from "./components/Weather/Weather.jsx";
import { getAppBackgroundClass } from "./utils";
import "./App.css";

/**
 * Componente principal de la aplicación
 * Refactorizado para seguir principios SOLID y manejar fondos dinámicos
 */
function App() {
  const [currentWeatherType, setCurrentWeatherType] = useState("clear");

  // Función para manejar cambios de clima
  const handleWeatherChange = (weatherType) => {
    setCurrentWeatherType(weatherType);
  };

  // Efecto para aplicar la clase de fondo al body
  useEffect(() => {
    const backgroundClass = getAppBackgroundClass(currentWeatherType);

    // Remover clases anteriores de fondo
    document.body.classList.forEach((className) => {
      if (className.startsWith("app-bg-")) {
        document.body.classList.remove(className);
      }
    });

    // Aplicar nueva clase de fondo
    document.body.classList.add(backgroundClass);

    // Cleanup al desmontar
    return () => {
      document.body.classList.forEach((className) => {
        if (className.startsWith("app-bg-")) {
          document.body.classList.remove(className);
        }
      });
    };
  }, [currentWeatherType]);

  return (
    <div className="app">
      <Weather onWeatherChange={handleWeatherChange} />
    </div>
  );
}

export default App;
