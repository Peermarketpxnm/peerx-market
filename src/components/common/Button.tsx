// src/components/common/Button.jsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const Button = ({
  children,
  disabled = false,
  icon = null,
  onClick,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {/* <div className="flex items-center justify-center"> */}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {/* </div> */}
    </button>
  );
};

export default Button;
