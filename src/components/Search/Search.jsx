import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input, Button } from "../UI";
import { validationUtils } from "../../utils";
import toast from "react-hot-toast";
import "./search.css";

/**
 * Componente de búsqueda refactorizado
 * Aplica principios SOLID y utiliza componentes UI reutilizables
 */
function Search({ onSearch, initialCity = "" }) {
  const [searchCity, setSearchCity] = useState(initialCity);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación usando utilidades
    if (!validationUtils.isValidCityName(searchCity)) {
      toast.error("Por favor ingresa un nombre de ciudad válido");
      return;
    }

    setIsLoading(true);

    try {
      // Llamar a la función de búsqueda
      await onSearch(searchCity.trim());
    } catch (error) {
      toast.error("Error al buscar la ciudad");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchCity(e.target.value);
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search__form">
        <div className="search__container">
          <Input
            type="text"
            placeholder="Buscar ciudad..."
            value={searchCity}
            onChange={handleInputChange}
            leftIcon={<SearchIcon />}
            variant="search"
            size="medium"
            disabled={isLoading}
            className="search__input"
          />

          <Button
            type="submit"
            variant="primary"
            size="medium"
            loading={isLoading}
            disabled={!searchCity.trim()}
            className="search__button"
          >
            Buscar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Search;
