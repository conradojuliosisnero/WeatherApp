import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import WeatherCard from "../CardWeather/CardWeather";
import Search from "../Search/Search";
import Error from "../Error/Error";
import FooterApp from "../FooterApp/FooterApp";
import TittleApp from "../TittleApp/TittleApp";
import "./weather.css";

function FetchingWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState("Cartagena");
  const [error, setError] = useState(null);

  const updateCity = (city) => {
    setSearchCity(city);
  };

  const handelReload = () => {
    setLoading(true);
    setError(null);
    setReload(!reload);
    setSearchCity("cartagena");
  };

  useEffect(() => {
    const FetchWeather = async () => {
      const APIKEY = import.meta.env.VITE_API_KEY;
      const urlApi = `${
        import.meta.env.VITE_API_URL
      }?q=${searchCity}&appid=${APIKEY}`;

      try {
        const result = await fetch(urlApi);
        if (result.ok) {
          const data = await result.json();
          setWeatherData(data);
          setLoading(false);
          setError(null);
        } else {
          setError("Failed to fetch weather data");
          setLoading(false);
        }
      } catch (error) {
        setError("An error occurred while fetching weather data");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    FetchWeather();
  }, [searchCity, reload]);


  return (
    <div>
      <TittleApp />
      <div>
        <div className="contend__search">
          {/* Componente de búsqueda que actualiza la ciudad */}
          <Search onSearch={updateCity} initialCity={searchCity} />
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
              country={weatherData.sys.country}
            />
          )}
          {error && (
            <button className="reload__btn" onClick={handelReload}>
              Reload
            </button>
          )}
        </div>
      </div>
      <FooterApp />
    </div>
  );
}

export default FetchingWeather;
