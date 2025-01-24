import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import "./button.css";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link";
  size?: "sm" | "md" | "lg";
  outline?: boolean;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loader?: ReactNode;
  className?: string;
  children: ReactNode;
  [key: string]: any; // Allow other props like `onClick`
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "md",
  outline = false,
  block = false,
  disabled = false,
  loading = false,
  loader = null,
  className = "",
  children,
  ...props
}) => {
  const baseClass = "btn";
  const variantClass = outline ? `btn-outline-${variant}` : `btn-${variant}`;
  const sizeClass = size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : "";
  const blockClass = block ? "btn-block" : "";
  const disabledClass = disabled || loading ? "disabled" : "";
  const combinedClass =
    `${baseClass} ${variantClass} ${sizeClass} ${blockClass} ${disabledClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={combinedClass}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="btn-loader">{loader || <DefaultLoader />}</span>
      ) : (
        children
      )}
    </button>
  );
};

const DefaultLoader: React.FC = () => (
  <span className="default-loader" aria-label="Loading..."></span>
);

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "link",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  outline: PropTypes.bool,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  loader: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
