"use client";
// src/components/common/Modal.jsx
import React, { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  maxWidth?: string;
}

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  maxWidth = "max-w-md",
}: ModalProps) => {
  const { isDarkMode } = useTheme();

  // Impedir rolagem do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fechar modal com tecla ESC
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Parar propagação de cliques dentro do modal

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

      <div
        className={`relative ${maxWidth} w-full transform overflow-hidden rounded-lg transition-all`}
      >
        <div
          className={`${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } rounded-lg shadow-xl`}
        >
          {/* Cabeçalho */}
          {title && (
            <div
              className={`px-6 py-4 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3 className="text-lg font-medium">{title}</h3>
            </div>
          )}

          {/* Conteúdo */}
          <div className="px-6 py-4">{children}</div>

          {/* Botão de fechar */}
          <button
            className={`absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none`}
            onClick={onClose}
            aria-label="Fechar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
