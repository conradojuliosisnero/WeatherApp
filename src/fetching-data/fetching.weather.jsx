import { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import WeatherCard from "../components/CardWeather/CardWeather";
import "./fetch.css";
import Search from "../components/Search/Search";
import Error from "../components/Error/Error";
import FooterApp from "../components/FooterApp/FooterApp";
import TittleApp from "../components/TittleApp/TittleApp";

function FetchingWeather() {
	// Estado para almacenar los datos climáticos
	const [weatherData, setWeatherData] = useState(null);

	// Estado para controlar la carga
	const [loading, setLoading] = useState(true);

	// Estado para almacenar la ciudad de búsqueda
	const [searchCity, setSearchCity] = useState("london");

	// Estado para manejar errores
	const [error, setError] = useState(null);

	// Función para actualizar la ciudad de búsqueda
	const updateCity = (city) => {
		setSearchCity(city);
	};

	// Efecto que se dispara cuando searchCity cambia
	useEffect(() => {
		fetchWeather();
	}, [searchCity]);

	// Función para buscar datos climáticos desde una API
	const fetchWeather = async () => {
		const apiKey = "f312c78012cdaf9d869d5e6577f7c274";
		const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;

		try {
			const result = await fetch(urlApi);

			if (result.ok) {
				// Si la solicitud es exitosa, actualiza los datos climáticos
				const data = await result.json();
				setWeatherData(data);
				console.log(data);
				// Desactiva la carga y limpia cualquier error previo
				setLoading(false);
				setError(null);
			} else {
				console.error("Failed to fetch weather data");

				// En caso de error en la solicitud, establece un mensaje de error
				setError("Failed to fetch weather data");

				// Desactiva la carga
				setLoading(false);
			}
		} catch (error) {
			console.log(error);

			// En caso de error en la gestión de la solicitud, establece un mensaje de error
			setError("An error occurred while fetching weather data");

			// Desactiva la carga
			setLoading(false);
		}
	};

	return (
		<div>
			<TittleApp/>
			<div>
				<div className="contend__search">
					{/* Componente de búsqueda que actualiza la ciudad */}
					<Search onSearch={updateCity} />
				</div>
				<div className="card__weather--contend">
					{/* Renderizado condicional para mostrar diferentes componentes */}
					{loading ? (
						// Muestra el componente de carga mientras se obtienen los datos
						<Loading />
					) : error ? (
						// Muestra el componente de error en caso de error
						<Error message={error} />
					) : (
						// Muestra el componente WeatherCard con los datos climáticos
						<WeatherCard
							temp={Math.round(weatherData.main.temp)}
							city={weatherData.name}
							icon={weatherData.weather[0].icon}
							description={weatherData.weather[0].description}
							tempMax={weatherData.main.temp_max}
							tempMin={weatherData.main.temp_min}
						/>
					)}
				</div>
			</div>
			<FooterApp/>
		</div>
	);
}

export default FetchingWeather;
