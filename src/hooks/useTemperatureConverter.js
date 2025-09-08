import { useState } from "react";

/**
 * Hook para manejar la conversión de temperaturas
 * Aplica el principio de Responsabilidad Única (SRP)
 */
export const useTemperatureConverter = (
  initialTemp,
  initialTempMax,
  initialTempMin
) => {
  const [temperatureScale, setTemperatureScale] = useState("C");
  const [temperatureValue, setTemperatureValue] = useState(initialTemp);
  const [temperatureValueMax, setTemperatureValueMax] =
    useState(initialTempMax);
  const [temperatureValueMin, setTemperatureValueMin] =
    useState(initialTempMin);

  // Funciones de conversión de temperatura
  const kelvinToCelsius = (kelvin) => kelvin - 273.15;
  const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
  const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
  const celsiusToKelvin = (celsius) => celsius + 273.15;

  const toggleTemperatureScale = () => {
    if (temperatureScale === "C") {
      // Convertir a Fahrenheit
      const fahrenheitValue = celsiusToFahrenheit(initialTemp);
      const fahrenheitValueMax = celsiusToFahrenheit(initialTempMax);
      const fahrenheitValueMin = celsiusToFahrenheit(initialTempMin);

      setTemperatureValue(fahrenheitValue);
      setTemperatureValueMax(fahrenheitValueMax);
      setTemperatureValueMin(fahrenheitValueMin);
      setTemperatureScale("F");
    } else if (temperatureScale === "F") {
      // Convertir a Kelvin
      const celsiusTemp = fahrenheitToCelsius(temperatureValue);
      const kelvinValue = celsiusToKelvin(celsiusTemp);
      const kelvinValueMax = celsiusToKelvin(
        fahrenheitToCelsius(temperatureValueMax)
      );
      const kelvinValueMin = celsiusToKelvin(
        fahrenheitToCelsius(temperatureValueMin)
      );

      setTemperatureValue(kelvinValue);
      setTemperatureValueMax(kelvinValueMax);
      setTemperatureValueMin(kelvinValueMin);
      setTemperatureScale("K");
    } else {
      // Convertir a Celsius
      const celsiusValue = kelvinToCelsius(temperatureValue);
      const celsiusValueMax = kelvinToCelsius(temperatureValueMax);
      const celsiusValueMin = kelvinToCelsius(temperatureValueMin);

      setTemperatureValue(celsiusValue);
      setTemperatureValueMax(celsiusValueMax);
      setTemperatureValueMin(celsiusValueMin);
      setTemperatureScale("C");
    }
  };

  return {
    temperatureScale,
    temperatureValue,
    temperatureValueMax,
    temperatureValueMin,
    toggleTemperatureScale,
  };
};
