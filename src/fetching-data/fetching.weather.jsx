import { useEffect, useState } from "react";

function FetchingWeather() {
	const [weatherData, setWeatherData] = useState(null);
	// const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchWeather();
	}, []);

	const fetchWeather = async () => {
		const apiKey = "f312c78012cdaf9d869d5e6577f7c274";
		const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`;
		try {
			const result = await fetch(urlApi);
			if (result.ok) {
				const data = await result.json();
				console.log(data)
				setWeatherData(data)
			} else {
				console.error("Failed to fetch weather data");
			}
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	};

	return (
		<div className="">
			<div className="">
				<h1>Weather data in London</h1>
				{weatherData ? (
					<div>{weatherData.main.temp}</div>
				) : <h3>Loading...</h3>}
			</div>
		</div>
	);
}

export default FetchingWeather;
