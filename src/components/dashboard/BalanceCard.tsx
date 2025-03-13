// src/components/dashboard/BalanceCard.jsx
import React from "react";

const BalanceCard = ({ name, balance, change, isDarkMode }) => {
  // Determinar cor da mudança percentual
  const getChangeColor = () => {
    if (change > 0) return isDarkMode ? "text-green-400" : "text-green-500";
    if (change < 0) return isDarkMode ? "text-red-400" : "text-red-500";
    return isDarkMode ? "text-gray-400" : "text-gray-500";
  };

  // Formatar número com 2 casas decimais
  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div
      className={`p-4 rounded-lg ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow`}
    >
      <div className="flex justify-between mb-2">
        <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
          {name}
        </span>
        <span className={`${getChangeColor()}`}>
          {change > 0 ? "+" : ""}
          {change}%
        </span>
      </div>
      <div
        className={`text-xl font-bold ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {formatNumber(balance)}
      </div>
    </div>
  );
};

export default BalanceCard;
