import { useState } from "react";
import "./search.css";

function Search({ onSearch }) {
	const [searchCity, setSearchCity] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		const cleanedCity = cleanAndNormalizeCityName(searchCity);
		onSearch(cleanedCity);
		console.log(cleanedCity);
	};

	const cleanAndNormalizeCityName = (cityName) => {
		// Elimina caracteres especiales y convierte a minúsculas
		return cityName.replace(/[^a-zA-Z ]/g, "").toLowerCase();
	};

	return (
		<div className="search">
			<form onSubmit={onSubmit}>
				<input
					placeholder="Search..."
					type="text"
					required
					value={searchCity}
					onChange={(e) => setSearchCity(e.target.value)}
				/>
				<button type="submit">Search</button>
			</form>
		</div>
	);
}

export default Search;
