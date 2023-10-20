import './App.css';
import WeatherCard from './components/CardWeather/CardWeather';
import FetchingWeather from './fetching-data/fetching.weather';

function App() {
  return (
    <div className="app">
      <main className='contend__app'>
      <FetchingWeather/>
      </main>
    </div>
  );
}

export default App;
