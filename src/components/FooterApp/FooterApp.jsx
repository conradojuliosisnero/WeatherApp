import "./footerapp.css";

function FooterApp() {
  const urlProm = "https://openweathermap.org/api";
  const propm = "https://github.com/conradojuliosisnero";

  return (
    <footer>
      <span className="footer__link">
        <a href={urlProm}>@WeatherApi</a>
        <a className="name" href={propm}>@ConradoJulio</a>
      </span>
    </footer>
  );
}

export default FooterApp;
