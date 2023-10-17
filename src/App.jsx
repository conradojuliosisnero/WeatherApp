import './App.css';
import WeatherCard from './components/CardWeather/CardWeather';

function App() {
  return (
    <div className="app">
      <header className="header">Weather App</header>
      <main className="content">
        <div className="cards">
			<WeatherCard/>
        </div>
      </main>
    </div>
  );
}

export default App;
