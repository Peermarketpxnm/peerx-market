"use client";
// src/pages/wallet.js

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import WalletConnection from "@/components/wallet/WalletConnect";
import { useTheme } from "@/context/ThemeContext";
import { useWallet } from "@/context/WalletContext";
import { useNotification } from "@/context/NotificationContext";
import { getTokenBalances } from "@/services/api";
import Spinner from "@/components/common/Spinner";

export interface Balance {
  pxnm: number;
  usdc: number;
  dai: number;
  totalUSD: number;
}

export default function WalletPage() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { isConnected, wallet } = useWallet();
  const { showNotification } = useNotification();

  const [balances, setBalances] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar saldos se conectado
  useEffect(() => {
    if (isConnected && wallet?.address) {
      const loadBalances = async () => {
        try {
          setLoading(true);
          const data = await getTokenBalances(wallet?.address);
          setBalances(data);
        } catch (error) {
          console.error("Erro ao carregar saldos:", error);
          showNotification("error", "Falha ao carregar saldos da carteira");
        } finally {
          setLoading(false);
        }
      };

      loadBalances();
    } else {
      setLoading(false);
    }
  }, [isConnected, wallet, showNotification]);

  return (
    <Layout>
      <Head>
        <title>Carteira | PeerX Market</title>
        <meta
          name="description"
          content="Conecte sua carteira e gerencie seus ativos no PeerX Market."
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1
          className={`text-3xl font-bold mb-8 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Carteira
        </h1>

        {isConnected ? (
          <div
            className={`rounded-lg p-6 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow`}
          >
            <div className="mb-6">
              <h2
                className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Carteira Conectada
              </h2>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Endereço
                    </p>
                    <p
                      className={`font-mono break-all ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {wallet?.address}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Tipo
                    </p>
                    <p
                      className={`capitalize ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {wallet?.type}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2
                className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Saldos
              </h2>

              {loading ? (
                <div className="flex justify-center py-8">
                  <Spinner
                    size="large"
                    color={isDarkMode ? "white" : "primary"}
                  />
                </div>
              ) : balances ? (
                <div>
                  <div
                    className={`p-4 rounded-lg mb-4 ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Saldo Total
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      $
                      {balances?.totalUSD.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p
                          className={`font-semibold ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          PXNM
                        </p>
                      </div>
                      <p
                        className={`text-xl ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {balances?.pxnm.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p
                          className={`font-semibold ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          USDC
                        </p>
                      </div>
                      <p
                        className={`text-xl ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {balances?.usdc.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p
                          className={`font-semibold ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          DAI
                        </p>
                      </div>
                      <p
                        className={`text-xl ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {balances.dai.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-500"
                  } text-center`}
                >
                  Não foi possível carregar os saldos.
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2
                className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Ações
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => router.push("/marketplace")}
                  className={`p-4 rounded-lg flex items-center justify-center ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  <span className="mr-2">🛒</span>
                  <span>Ir para o Marketplace</span>
                </button>

                <button
                  onClick={() => router.push("/marketplace/create")}
                  className={`p-4 rounded-lg flex items-center justify-center ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  <span className="mr-2">📦</span>
                  <span>Vender um Item</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <WalletConnection />
        )}
      </div>
    </Layout>
  );
}
