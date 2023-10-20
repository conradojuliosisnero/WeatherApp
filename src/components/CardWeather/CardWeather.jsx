import { useState } from "react";
import "./cardweather.css";

function WeatherCard({ temp, description, city, icon, tempMax, tempMin }) {
	const [temperatureScale, setTemperatureScale] = useState("K");
	const [temperatureValue, setTemperatureValue] = useState(temp);
	const [temperatureValueMax, setTemperatureValueMax] = useState(tempMax);
	const [temperatureValueMin, setTemperatureValueMin] = useState(tempMin);

	const toggleTemperatureScale = () => {
		if (temperatureScale === "K") {
			// Convertir a Celsius si está en Kelvin
			const celsiusValue = temp - 273.15;
			const celsiusValueMax = tempMax - 273.15;
			const celsiusValueMin = tempMin - 273.15;

			setTemperatureValue(celsiusValue);
			setTemperatureValueMax(celsiusValueMax);
			setTemperatureValueMin(celsiusValueMin);

			setTemperatureScale("C");
		} else if (temperatureScale === "C") {
			// Convertir a Fahrenheit si está en Celsius
			const fahrenheitValue = (temp * 9) / 5 + 32;
			const fahrenheitValueMax = (tempMax * 9) / 5 + 32;
			const fahrenheitValueMin = (tempMin * 9) / 5 + 32;

			setTemperatureValue(fahrenheitValue);
			setTemperatureValueMax(fahrenheitValueMax);
			setTemperatureValueMin(fahrenheitValueMin);

			setTemperatureScale("F");
		} else {
			// Convertir a Kelvin si está en Fahrenheit
			const kelvinValue = ((temp - 32) * 5) / 9 + 273.15;
			const kelvinValueMax = ((tempMax - 32) * 5) / 9 + 273.15;
			const kelvinValueMin = ((tempMin - 32) * 5) / 9 + 273.15;

			setTemperatureValue(temp);
			setTemperatureValueMax(kelvinValueMax);
			setTemperatureValueMin(kelvinValueMin);

			setTemperatureScale("K");
		}
	};

	return (
		<div className="cardContainer">
			<div className="card">
				<p className="city">{city}</p>
				<p className="weather">PARTLY CLOUDY</p>
				<img className="icon__weather" src={`https://openweathermap.org/img/wn/${icon}.png`} alt="icon" />
				<div className="description">{description}</div>
				<p className="temp">
					{Math.round(temperatureValue)}
					<span className="metrict" onClick={toggleTemperatureScale}>
						{temperatureScale}°
					</span>
				</p>
				<div className="minmaxContainer">
					<div className="min">
						<p className="minHeading">Min</p>
						<p className="minTemp">{Math.round(temperatureValueMin)}°</p>
					</div>
					<div className="max">
						<p className="maxHeading">Max</p>
						<p className="maxTemp">{Math.round(temperatureValueMax)}°</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WeatherCard;
