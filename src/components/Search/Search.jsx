import { useState } from "react";
import "./search.css";

function Search({ onSearch }) {
	// Estado local para almacenar el valor de la ciudad de búsqueda.
	const [searchCity, setSearchCity] = useState("");

	// Función que se ejecuta al enviar el formulario.
	const onSubmit = (e) => {
		e.preventDefault(); // Evita la recarga de la página al enviar el formulario.

		// Limpia y normaliza el nombre de la ciudad ingresada.
		const cleanedCity = cleanAndNormalizeCityName(searchCity);

		// Llama a la función "onSearch" con el nombre de la ciudad limpio.
		onSearch(cleanedCity);

		// Imprime el nombre de la ciudad limpio en la consola.
		console.log(cleanedCity);
	};

	// Limpia y normaliza el nombre de la ciudad.
	const cleanAndNormalizeCityName = (cityName) => {
		// Elimina caracteres especiales y convierte a minúsculas.
		return cityName.replace(/[^a-zA-Z ]/g, "").toLowerCase();
	};

	return (
		<div className="search">
			<form onSubmit={onSubmit}>
				{/* Campo de entrada de texto para la búsqueda. */}
				<input
					placeholder="Search..."
					type="text"
					required
					value={searchCity}
					onChange={(e) => setSearchCity(e.target.value)}
				/>
				{/* Botón para iniciar la búsqueda. */}
				<button type="submit">Search</button>
			</form>
		</div>
	);
}

export default Search;
