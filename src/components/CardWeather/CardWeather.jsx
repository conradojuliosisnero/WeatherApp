import { useState } from "react";
import "./cardweather.css";

function WeatherCard() {

	//se define el estado de la temperatura y unidad de medida 
	const [temperatureScale, setTemperatureScale] = useState("Celsius");
	const [temperatureValue, setTemperatureValue] = useState(23);

	//funcion para manejar el cambio de estado
	const toggleTemperatureScale = () => {
		if (temperatureScale === "Celsius") {
			// Convertir a Fahrenheit si está en Celsius
			setTemperatureValue((temperatureValue * 9) / 5 + 32);
			setTemperatureScale("Fahrenheit");
		} else {
			// Convertir a Celsius si está en Fahrenheit
			setTemperatureValue(((temperatureValue - 32) * 5) / 9);
			setTemperatureScale("Celsius");
		}
	};

	return (
		<div className="card">
			<div className="container">
				<div className="cloud front">
					<span className="left-front"></span>
					<span className="right-front"></span>
				</div>
				<span className="sun sunshine"></span>
				<span className="sun"></span>
				<div className="cloud back">
					<span className="left-back"></span>
					<span className="right-back"></span>
				</div>
			</div>

			<div className="card-header">
				<span>
					Messadine, Susah
					<br />
					Tunisia
				</span>
				<span>March 13</span>
			</div>
			{/* { hacemos uso del objeto Math para redondear el valor de la unidad } */}
			<span className="temp">{Math.round(temperatureValue)}°</span>

			<div className="temp-scale">
				{/* cambiamos de celsius a Fahrenheit  */}
				<span onClick={toggleTemperatureScale}>{temperatureScale}</span>
			</div>
		</div>
	);
}

export default WeatherCard;
