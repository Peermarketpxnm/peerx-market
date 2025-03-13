// src/components/common/Spinner.jsx
import React from "react";

export interface Spinner {
  size?: string;
  color?: string;
  className?: string;
}

// Tamanhos
const sizes = {
  small: "h-4 w-4",
  medium: "h-8 w-8",
  large: "h-12 w-12",
};

// Cores
const colors = {
  primary: "border-primary",
  white: "border-white",
  gray: "border-gray-500",
};

const Spinner = ({
  size = "medium",
  color = "primary",
  className = "",
}: Spinner) => {
  const sizeName = Object.values(sizes).find((it) => it === size) ?? "medium";
  const colorName =
    Object.values(colors).find((it) => it === color) ?? "primary";

  return (
    <div className={`${className}`}>
      <div
        className={`${sizeName} rounded-full border-t-2 border-b-2 ${colorName} animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
