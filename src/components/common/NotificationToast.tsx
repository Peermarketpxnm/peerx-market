// src/components/common/NotificationToast.jsx
import React, { useEffect, useState } from "react";
import {
  Notification,
  useNotification,
} from "../../context/NotificationContext";

export interface NotificationToastProps {
  notification: Notification;
  isDarkMode: boolean;
}

const NotificationToast = ({
  notification,
  isDarkMode,
}: NotificationToastProps) => {
  const { hideNotification } = useNotification();
  const [progress, setProgress] = useState(100);

  // Configurar cor com base no tipo
  const getTypeStyles = () => {
    switch (notification.type) {
      case "success":
        return {
          bg: isDarkMode ? "bg-green-800" : "bg-green-100",
          text: isDarkMode ? "text-white" : "text-green-800",
          icon: "✓",
          iconBg: "bg-green-500",
        };
      case "error":
        return {
          bg: isDarkMode ? "bg-red-800" : "bg-red-100",
          text: isDarkMode ? "text-white" : "text-red-800",
          icon: "✕",
          iconBg: "bg-red-500",
        };
      case "warning":
        return {
          bg: isDarkMode ? "bg-yellow-800" : "bg-yellow-100",
          text: isDarkMode ? "text-white" : "text-yellow-800",
          icon: "⚠",
          iconBg: "bg-yellow-500",
        };
      case "info":
      default:
        return {
          bg: isDarkMode ? "bg-blue-800" : "bg-blue-100",
          text: isDarkMode ? "text-white" : "text-blue-800",
          icon: "ℹ",
          iconBg: "bg-blue-500",
        };
    }
  };

  const typeStyles = getTypeStyles();

  // Efeito para animação de progresso
  useEffect(() => {
    if (notification.duration && notification?.duration <= 0) return;

    const startTime = Date.now();
    const endTime = startTime + notification?.duration;

    const updateProgress = () => {
      const now = Date.now();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        setProgress(0);
        return;
      }

      const newProgress = (timeLeft / notification?.duration) * 100;
      setProgress(newProgress);

      requestAnimationFrame(updateProgress);
    };

    const animationId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [notification.duration]);

  return (
    <div
      className={`max-w-sm w-full shadow-lg rounded-lg overflow-hidden ${typeStyles.bg}`}
      role="alert"
    >
      <div className="flex items-center p-4">
        <div
          className={`flex-shrink-0 rounded-full p-2 ${typeStyles.iconBg} text-white`}
        >
          {typeStyles.icon}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${typeStyles.text}`}>
            {notification.message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={() => hideNotification(notification.id)}
            className={`inline-flex ${typeStyles.text} focus:outline-none focus:text-gray-500`}
          >
            <span className="sr-only">Fechar</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Barra de progresso */}
      {notification.duration > 0 && (
        <div className="bg-gray-700 bg-opacity-20 h-1">
          <div
            className={`h-full ${typeStyles.iconBg}`}
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationToast;
