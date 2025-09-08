import "./Button.css";

/**
 * Componente Button reutilizable
 * Aplica el principio de Responsabilidad Única (SRP)
 */
const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const baseClass = "btn";
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const disabledClass = disabled || loading ? "btn--disabled" : "";
  const loadingClass = loading ? "btn--loading" : "";

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    disabledClass,
    loadingClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? <span className="btn__loading-spinner"></span> : children}
    </button>
  );
};

export default Button;
