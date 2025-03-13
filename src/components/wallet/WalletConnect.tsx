// src/components/wallet/WalletConnection.jsx
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";
import { useNotification } from "../../context/NotificationContext";
import Modal from "@/components/common/Modal";

export interface WalletConnectionProps {
  // isConnected: boolean;
  setIsConnected?: (value: boolean) => void;
  onSuccess?: (value: string) => void;
}

const WalletConnection = ({
  // isConnected,
  setIsConnected,
  onSuccess,
}: WalletConnectionProps) => {
  const { isDarkMode } = useTheme();
  const { showNotification } = useNotification();

  // Wallet states
  const [modalVisible, setModalVisible] = useState(false);
  const [walletType, setWalletType] = useState("");
  // const [walletAddress, setWalletAddress] = useState("");
  // const [connectionUri, setConnectionUri] = useState("");
  // const [connecting, setConnecting] = useState(false);
  // const [balances, setBalances] = useState({
  //   pxnm: 0,
  //   usdc: 0,
  //   dai: 0,
  // });

  // Função para inicializar o WalletConnect
  // const initWalletConnect = () => {
  //   // Implementação com a biblioteca WalletConnect
  //   // (incluída no código completo)
  //   return null; // Placeholder para o exemplo
  // };

  // Conectar carteira
  const connectWallet = async (type: string) => {
    setWalletType(type);
    // setConnecting(true);
    setModalVisible(true);

    // Na versão completa, aqui vai a lógica de conexão real
    // Simulando a conexão bem-sucedida após 2 segundos
    setTimeout(() => {
      const mockAddress = "0x3a8d...7e9b";
      handleConnectionSuccess(mockAddress);
    }, 2000);
  };

  // Função para tratar conexão bem-sucedida
  const handleConnectionSuccess = (address: string) => {
    // setWalletAddress(address);
    setIsConnected?.(true);
    setModalVisible(false);
    // setConnecting(false);

    // Em produção: registrar carteira, carregar saldos, etc.
    showNotification("success", "Carteira conectada com sucesso!");

    if (onSuccess) {
      onSuccess(address);
    }
  };

  return (
    <div
      className={`p-6 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <h2
        className={`text-2xl font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Conecte sua Carteira
      </h2>

      <p className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        Conecte sua carteira para começar a comprar e vender no PeerX Market.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Opções de carteira */}
        <button
          onClick={() => connectWallet("metamask")}
          className={`p-4 rounded-lg border flex flex-col items-center ${
            isDarkMode
              ? "border-gray-700 hover:bg-gray-700"
              : "border-gray-200 hover:bg-gray-50"
          }`}
        >
          <div className="w-16 h-16 mb-3 relative">
            <Image
              src="/images/wallets/metamask.png"
              alt="MetaMask"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span
            className={`font-medium ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            MetaMask
          </span>
        </button>

        {/* Adicione mais opções de carteira aqui */}
      </div>

      {/* Modal de QR Code */}
      <Modal
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
          // setConnecting(false);
        }}
        title="Conectar Carteira"
      >
        <div className="p-4 text-center">
          <p className="mb-4">Escaneie com o aplicativo da sua carteira</p>

          <div className="bg-white p-4 rounded-lg inline-block mb-4">
            {/* Aqui vai o componente QRCode */}
            <div className="w-64 h-64 bg-gray-200 flex items-center justify-center">
              {
                // connectionUri ?
                "QR Code"
                // "Gerando QR Code..."
              }
            </div>
          </div>

          <button
            className="text-primary flex items-center justify-center mx-auto mb-4"
            onClick={() => {
              /* Lógica para copiar URI */
            }}
          >
            <span>Copiar para área de transferência</span>
          </button>

          <p className="text-sm text-gray-500">
            Abra seu aplicativo {getWalletName(walletType)} e escaneie o código
            QR para conectar.
          </p>
        </div>
      </Modal>
    </div>
  );
};

// Funções auxiliares
const getWalletName = (type: string) => {
  switch (type) {
    case "metamask":
      return "MetaMask";
    case "trustwallet":
      return "Trust Wallet";
    case "phantom":
      return "Phantom";
    default:
      return "carteira";
  }
};

export default WalletConnection;
