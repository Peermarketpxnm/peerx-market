// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../../context/ThemeContext";
// import { useAuth } from "../../context/AuthContext";
import { useWallet } from "../../context/WalletContext";
import BalanceCard from "./BalanceCard";
import ActivityList from "./ActivityList";
import ProductCard from "../marketplace/ProductCard";
import type { Activity } from "./ActivityList";

export interface Products {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
  reviewCount: number;
}

const Dashboard = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  // const { user, isAuthenticated } = useAuth();
  const { wallet, isConnected } = useWallet();

  const [balances, setBalances] = useState({
    pxnm: 0,
    usdc: 0,
    dai: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Products[]>([]);
  const [totalBalanceUSD, setTotalBalanceUSD] = useState(0);
  const [loading, setLoading] = useState(true);

  // Carregar dados do dashboard
  useEffect(() => {
    // Em produção, estes viriam de APIs reais
    // Dados simulados para o MVP
    if (isConnected) {
      setBalances({
        pxnm: 256.83,
        usdc: 1023.5,
        dai: 850.05,
      });
      setTotalBalanceUSD(4285.65);

      setActivities([
        {
          id: "1",
          type: "purchase",
          title: "Comprou Headphones",
          amount: 80,
          currency: "USDC",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        {
          id: "2",
          type: "sale",
          title: "Vendeu Teclado Mecânico",
          amount: 125,
          currency: "PXNM",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
      ]);

      setFeaturedProducts([
        {
          id: "101",
          title: "Teclado Mecânico",
          price: 125,
          currency: "PXNM",
          image: "/images/products/keyboard.jpg",
          rating: 4.8,
          reviewCount: 24,
        },
        {
          id: "102",
          title: "Headphones Premium",
          price: 80,
          currency: "USDC",
          image: "/images/products/headphones.jpg",
          rating: 4.5,
          reviewCount: 32,
        },
      ]);

      setLoading(false);
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="p-6 text-center">
        <h2
          className={`text-2xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Conecte sua carteira
        </h2>
        <p className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          Por favor, conecte sua carteira para acessar o dashboard
        </p>
        <button
          className="px-6 py-3 bg-primary text-white rounded-lg"
          onClick={() => router.push("/wallet")}
        >
          Conectar Carteira
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className={isDarkMode ? "text-white" : "text-gray-800"}>
          Carregando dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Olá,
          </h1>
          <p
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {wallet?.address}
          </p>
        </div>
        <button
          className={`p-3 rounded-full ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
          onClick={() => router.push("/account/settings")}
        >
          ⚙️
        </button>
      </div>

      {/* Card de Saldo */}
      <div
        className={`p-6 rounded-lg mb-6 ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        }`}
      >
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Saldo Total
        </p>
        <h2
          className={`text-3xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          ${totalBalanceUSD.toLocaleString()}
        </h2>
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg"
          onClick={() => router.push("/wallet")}
        >
          Detalhes
        </button>
      </div>

      {/* Tokens */}
      <h2
        className={`text-xl font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Seus Tokens
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <BalanceCard
          name="PXNM"
          balance={balances.pxnm}
          change={+3.2}
          isDarkMode={isDarkMode}
        />
        <BalanceCard
          name="USDC"
          balance={balances.usdc}
          change={+0.1}
          isDarkMode={isDarkMode}
        />
        <BalanceCard
          name="DAI"
          balance={balances.dai}
          change={-0.2}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          className={`p-6 rounded-lg flex flex-col items-center ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => router.push("/marketplace")}
        >
          <span className="text-2xl mb-2">🛒</span>
          <span className={isDarkMode ? "text-white" : "text-gray-800"}>
            Comprar
          </span>
        </button>

        <button
          className={`p-6 rounded-lg flex flex-col items-center ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => router.push("/marketplace/create")}
        >
          <span className="text-2xl mb-2">🏷️</span>
          <span className={isDarkMode ? "text-white" : "text-gray-800"}>
            Vender
          </span>
        </button>

        <button
          className={`p-6 rounded-lg flex flex-col items-center ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => router.push("/account/favorites")}
        >
          <span className="text-2xl mb-2">⭐</span>
          <span className={isDarkMode ? "text-white" : "text-gray-800"}>
            Favoritos
          </span>
        </button>
      </div>

      {/* Produtos em Destaque */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Produtos em Destaque
          </h2>
          <button
            className="text-primary"
            onClick={() => router.push("/marketplace")}
          >
            Ver Todos
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => router.push(`/product/${product.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Atividade Recente */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Atividade Recente
          </h2>
          <button
            className="text-primary"
            onClick={() => router.push("/account/activity")}
          >
            Ver Tudo
          </button>
        </div>

        <ActivityList activities={activities} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Dashboard;
