import { useState } from "react";
import "./search.css";

function Search({onSearch}) {
	// Creamos una variable llamada searchCity para almacenar la ciudad de búsqueda
	const [searchCity, setSearchCity] = useState("");

	const onSubmit = (e) => {
		// Prevenimos que la página se refresque cuando presionamos el botón "
		e.preventDefault();
		onSearch(searchCity);
		console.log(searchCity);
	};

	return (
		<div className="search">
			<form onSubmit={onSubmit}>
				{/* Creamos un formulario para englobar el campo de búsqueda y el botón */}
				<input
					placeholder="Search..."
					type="text"
					required // Requerimos que el campo de búsqueda no esté vacío
					value={searchCity} // Mostramos el valor actual de la ciudad de búsqueda en el campo
					onChange={(e) => setSearchCity(e.target.value)} // Actualizamos el valor de searchCity cuando el usuario escribe en el campo
				/>
				<button type="submit">Search</button>
				{/* Un botón para enviar el formulario al hacer clic en "Search" */}
			</form>
		</div>
	);
}

export default Search;
