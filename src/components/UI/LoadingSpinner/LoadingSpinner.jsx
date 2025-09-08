import { Loader2 } from "lucide-react";
import "./LoadingSpinner.css";

/**
 * Componente de carga reutilizable
 * Aplica el principio de Responsabilidad Única (SRP)
 */
const LoadingSpinner = ({
  size = "medium",
  text = "Cargando...",
  variant = "primary",
}) => {
  const sizeClasses = {
    small: "loading-spinner--small",
    medium: "loading-spinner--medium",
    large: "loading-spinner--large",
  };

  const variantClasses = {
    primary: "loading-spinner--primary",
    secondary: "loading-spinner--secondary",
    white: "loading-spinner--white",
  };

  return (
    <div
      className={`loading-spinner ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      <Loader2 className="loading-spinner__icon" />
      {text && <p className="loading-spinner__text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
