import { useState } from "react";
import "./search.css";
import svgSearch from '../../../public/search-svgrepo-com.png'

function Search({ onSearch }) {
  // Estado local para almacenar el valor de la ciudad de búsqueda.
  const [searchCity, setSearchCity] = useState("");

  // Función que se ejecuta al enviar el formulario.
  const onSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario.

    // Limpia y normaliza el nombre de la ciudad ingresada.
    const cleanedCity = cleanAndNormalizeCityName(searchCity);
    console.log(cleanedCity);
    // Llama a la función "onSearch" con el nombre de la ciudad limpio.
    onSearch(cleanedCity);

    // Imprime el nombre de la ciudad limpio en la consola.
    console.log(cleanedCity);
  };

  // Limpia y normaliza el nombre de la ciudad.
  const cleanAndNormalizeCityName = (cityName) => {
    // Elimina caracteres especiales y convierte a minúsculas.

    const city = cityName.toLowerCase();
    console.log("funcion", city);
    return city;
  };

  return (
    <div className="search">
      <form onSubmit={onSubmit}>
        <div className="search__box">
          {/* Campo de entrada de texto para la búsqueda. */}
          <div className="search__input__box">
            <input
              placeholder="Cartagena"
              type="text"
              className="search__input"
              required
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>
          {/* Botón para iniciar la búsqueda. */}
          <div className="search__button__box">
            <button type="submit" className="search__button">
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
