// src/components/dashboard/ActivityList.jsx
import React from "react";
import { useRouter } from "next/navigation";

export interface Activity {
  id: string;
  type: string;
  title: string;
  timestamp: Date;
  amount: number;
  currency: string;
  transactionId?: string;
  listingId?: string;
}

export interface ActivityListProps {
  activities: Activity[];
  isDarkMode: boolean;
}

const ActivityList = ({ activities, isDarkMode }: ActivityListProps) => {
  const router = useRouter();

  // Função para formatar data relativa (ex: "2 dias atrás")
  const formatRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const date = new Date(timestamp);

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "agora mesmo";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d atrás`;

    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} meses atrás`;
  };

  // Obter ícone com base no tipo de atividade
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return "🛒";
      case "sale":
        return "💰";
      case "listing":
        return "📦";
      case "favorite":
        return "❤️";
      default:
        return "📝";
    }
  };

  // Navegar para detalhes da atividade
  const navigateToActivity = (activity: Activity) => {
    if (activity.transactionId) {
      router.push(`/transaction/${activity.transactionId}`);
    } else if (activity.listingId) {
      router.push(`/product/${activity.listingId}`);
    }
  };

  if (activities.length === 0) {
    return (
      <div
        className={`p-4 text-center rounded-lg ${
          isDarkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
        }`}
      >
        Nenhuma atividade recente.
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg overflow-hidden ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          onClick={() => navigateToActivity(activity)}
          className={`p-4 flex items-center cursor-pointer ${
            isDarkMode
              ? index < activities.length - 1
                ? "border-b border-gray-700"
                : ""
              : index < activities.length - 1
              ? "border-b border-gray-200"
              : ""
          } ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <span className="text-lg">{getActivityIcon(activity.type)}</span>
          </div>

          <div className="ml-4 flex-grow">
            <p className={isDarkMode ? "text-white" : "text-gray-800"}>
              {activity.title}
            </p>
            <div className="flex justify-between">
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {formatRelativeTime(activity.timestamp)}
              </span>
              <span
                className={`font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {activity.amount} {activity.currency}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
