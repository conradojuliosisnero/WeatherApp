import { AlertTriangle, RefreshCw } from "lucide-react";
import "./ErrorMessage.css";

/**
 * Componente de error reutilizable
 * Aplica el principio de Responsabilidad Única (SRP)
 */
const ErrorMessage = ({
  message = "Ha ocurrido un error",
  onRetry,
  showRetryButton = true,
  variant = "error",
}) => {
  const variantClasses = {
    error: "error-message--error",
    warning: "error-message--warning",
    info: "error-message--info",
  };

  return (
    <div className={`error-message ${variantClasses[variant]}`}>
      <div className="error-message__content">
        <AlertTriangle className="error-message__icon" />
        <div className="error-message__text">
          <h3 className="error-message__title">Oops!</h3>
          <p className="error-message__description">{message}</p>
        </div>
      </div>

      {showRetryButton && onRetry && (
        <button
          className="error-message__retry-btn"
          onClick={onRetry}
          type="button"
        >
          <RefreshCw className="error-message__retry-icon" />
          Intentar nuevamente
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
