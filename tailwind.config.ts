// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Modo escuro baseado em classe
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4CAF50",
          dark: "#388E3C",
          light: "#A5D6A7",
          bg: "#E8F5E9",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      spacing: {
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 0 15px rgba(0, 0, 0, 0.05)",
        "card-dark": "0 0 15px rgba(255, 255, 255, 0.05)",
      },
    },
  },
  plugins: [heroui()],
};
