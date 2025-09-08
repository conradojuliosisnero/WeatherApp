import { Heart, Github, Linkedin } from "lucide-react";
import "./footerapp.css";

/**
 * Componente de pie de página de la aplicación
 * Aplica el principio de Responsabilidad Única (SRP)
 */
const FooterApp = ({
  author = "ConradoJulio",
  year = new Date().getFullYear(),
  githubUrl = "https://github.com/conradojuliosisnero",
  weatherApiUrl = "https://openweathermap.org/api",
}) => {
  return (
    <footer className="footer-app">
      <div className="footer-app__container">
        <div className="footer-app__content">
          <p className="footer-app__text">
            Hecho con <Heart className="footer-app__heart" /> por {author}
          </p>
          <p className="footer-app__year">© {year}</p>
        </div>

        <div className="footer-app__links">
          <a
            href={weatherApiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-app__link"
          >
            Weather API
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-app__link footer-app__link--github"
          >
            <Github className="footer-app__icon" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterApp;
