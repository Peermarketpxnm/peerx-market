"use client";
// src/contexts/NotificationContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export interface Notification {
  id: number;
  type: string;
  message: string;
  duration: number;
  createdAt?: number;
}

export interface NotificatioProps {
  notifications: Notification[];
  showNotification: (
    type: "success" | "error" | "info" | "warning",
    message: string,
    duration?: number
  ) => number;
  hideNotification: (id: number) => void;
}

const NotificationContext = createContext({} as NotificatioProps);

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationId, setNotificationId] = useState(1);

  const showNotification = useCallback(
    (type: string, message: string, duration = 5000) => {
      const id = notificationId;

      const newNotification = {
        id,
        type, // 'success', 'error', 'info', 'warning'
        message,
        duration,
        createdAt: Date.now(),
      };

      setNotifications((prev) => [...prev, newNotification]);
      setNotificationId(id + 1);

      return id;
    },
    [notificationId]
  );

  const hideNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  // Auto-hide notifications after their duration
  useEffect(() => {
    const timers = notifications
      .map((notification) => {
        if (notification.duration > 0) {
          return setTimeout(() => {
            hideNotification(notification.id);
          }, notification.duration);
        }
        return null;
      })
      .filter(Boolean);

    return () => {
      timers.forEach((timer) => clearTimeout(timer as unknown as number));
    };
  }, [notifications, hideNotification]);

  const value = {
    notifications,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
