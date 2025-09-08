import "./Input.css";

/**
 * Componente Input reutilizable
 * Aplica el principio de Responsabilidad Única (SRP)
 */
const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  errorMessage,
  size = "medium",
  variant = "default",
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  const baseClass = "input-wrapper";
  const sizeClass = `input-wrapper--${size}`;
  const variantClass = `input-wrapper--${variant}`;
  const errorClass = error ? "input-wrapper--error" : "";
  const disabledClass = disabled ? "input-wrapper--disabled" : "";

  const wrapperClasses = [
    baseClass,
    sizeClass,
    variantClass,
    errorClass,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      <div className="input-container">
        {leftIcon && (
          <div className="input-icon input-icon--left">{leftIcon}</div>
        )}

        <input
          type={type}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />

        {rightIcon && (
          <div className="input-icon input-icon--right">{rightIcon}</div>
        )}
      </div>

      {error && errorMessage && (
        <span className="input-error-message">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
