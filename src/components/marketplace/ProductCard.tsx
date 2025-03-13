// src/components/marketplace/ProductCard.jsx
import React from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const ProductCard = ({ product, onClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
      onClick={onClick}
    >
      {/* Imagem do produto */}
      <div className="relative h-48 w-full bg-gray-200">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div
            className={`h-full w-full flex items-center justify-center ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <span className="text-gray-500">Sem imagem</span>
          </div>
        )}
      </div>

      {/* Informações do produto */}
      <div className="p-4">
        <h3
          className={`font-bold text-lg mb-1 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {product.title}
        </h3>

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-baseline">
            <span
              className={`font-bold text-xl ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {product.price}
            </span>
            <span
              className={`ml-1 text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {product.currency}
            </span>
          </div>

          {product.rating && (
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {product.rating}
                {product.reviewCount && ` (${product.reviewCount})`}
              </span>
            </div>
          )}
        </div>

        {product.seller && (
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Vendido por:{" "}
            {product.seller.username || product.seller.walletAddress}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
