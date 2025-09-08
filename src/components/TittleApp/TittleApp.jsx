import { Cloud } from "lucide-react";
import "./tittleapp.css";

/**
 * Componente de título de la aplicación
 * Aplica el principio de Responsabilidad Única (SRP)
 */
const TitleApp = ({
  title = "Clima App",
  subtitle = "Consulta el clima en tiempo real",
}) => {
  return (
    <header className="title-app">
      <div className="title-app__container">
        <div className="title-app__icon">
          <Cloud className="title-app__cloud-icon" />
        </div>
        <div className="title-app__content">
          <h1 className="title-app__title">{title}</h1>
          <p className="title-app__subtitle">{subtitle}</p>
        </div>
      </div>
    </header>
  );
};

export default TitleApp;
