import './footerapp.css'

function FooterApp() {

    const urlProm = 'https://openweathermap.org/api'

  return (
    <footer>
        <span className='footer__link'><a href={urlProm}>@WeatherApi</a></span>
    </footer>
  )
}

export default FooterApp
