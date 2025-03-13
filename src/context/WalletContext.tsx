"use client";
// src/contexts/WalletContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface WalletProps {
  address: string;
  type: string;
}

export interface WalletContextProps {
  wallet: WalletProps | null;
  isConnected: boolean;
  provider: ethers.providers.Web3Provider | null;
  networkId: number | null;
  connectMetaMask: () => Promise<
    | {
        success: boolean;
        address?: undefined;
        error?: undefined;
      }
    | {
        success: boolean;
        address: any;
        error?: undefined;
      }
    | {
        success: boolean;
        error: unknown;
        address?: undefined;
      }
  >;
  disconnectWallet: () => Promise<
    | {
        success: boolean;
        error?: undefined;
      }
    | {
        success: boolean;
        error: unknown;
      }
  >;
  connectWalletConnect: () => Promise<
    | {
        success: boolean;
        address: string;
        error?: undefined;
      }
    | {
        success: boolean;
        error: unknown;
        address?: undefined;
      }
  >;
}

const WalletContext = createContext({} as WalletContextProps);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<WalletProps | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [networkId, setNetworkId] = useState<number | null>(null);
  const { user } = useAuth();
  const { showNotification } = useNotification();

  // Verificar se há carteira conectada no localStorage
  useEffect(() => {
    const checkSavedWallet = async () => {
      try {
        const savedWalletType = localStorage.getItem("walletType");
        const savedWalletAddress = localStorage.getItem("walletAddress");

        if (savedWalletType && savedWalletAddress) {
          setWallet({
            type: savedWalletType,
            address: savedWalletAddress,
          });
          setIsConnected(true);

          // Em produção, aqui você reconectaria ao provider
        }
      } catch (error) {
        console.error("Erro ao carregar carteira salva:", error);
      }
    };

    checkSavedWallet();
  }, []);

  // Função para conectar com MetaMask
  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        showNotification(
          "error",
          "MetaMask não encontrado. Por favor, instale a extensão."
        );
        return { success: false };
      }

      // Solicitar contas
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        throw new Error("Nenhuma conta encontrada");
      }

      const address = accounts[0];

      // Configurar provider
      const web3Provider: ethers.providers.Web3Provider =
        new ethers.providers.Web3Provider(window.ethereum);

      setProvider(web3Provider);

      // Obter ID da rede
      const network = await web3Provider.getNetwork();

      setNetworkId(network.chainId);

      // Salvar carteira
      const walletInfo = {
        type: "metamask",
        address: address,
        networkId: network.chainId,
      };

      setWallet(walletInfo);
      setIsConnected(true);

      // Salvar no localStorage
      localStorage.setItem("walletType", "metamask");
      localStorage.setItem("walletAddress", address);

      showNotification("success", "Carteira conectada com sucesso!");

      return { success: true, address };
    } catch (error) {
      console.error("Erro ao conectar com MetaMask:", error);
      showNotification("error", "Falha ao conectar carteira: ");
      return { success: false, error };
    }
  };

  // Função para conectar com WalletConnect
  const connectWalletConnect = async () => {
    try {
      // Inicializar WalletConnect
      // const wcProvider = new WalletConnectProvider({
      //   infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      // });
      // const wcProvider = "";

      // // Habilitar conexão
      // await wcProvider.enable();

      // // Configurar provider
      // const web3Provider = new ethers.providers.Web3Provider(wcProvider);
      // setProvider(web3Provider);

      // // Obter contas
      // const accounts = await web3Provider.listAccounts();

      // if (accounts.length === 0) {
      //   throw new Error("Nenhuma conta encontrada");
      // }

      // const address = accounts[0];

      // // Obter ID da rede
      // const network = await web3Provider.getNetwork();
      // setNetworkId(network.chainId);

      // Salvar carteira
      const walletInfo = {
        type: "walletconnect",
        address: "",
        networkId: 0,
      };

      setWallet(walletInfo);
      setIsConnected(true);

      // Salvar no localStorage
      localStorage.setItem("walletType", "walletconnect");
      localStorage.setItem("walletAddress", "");

      showNotification("success", "Carteira conectada com sucesso!");

      return { success: true, address: "" };
    } catch (error) {
      console.error("Erro ao conectar com WalletConnect:", error);
      showNotification("error", "Falha ao conectar carteira");
      return { success: false, error };
    }
  };

  // Função para desconectar carteira
  const disconnectWallet = async () => {
    try {
      if (wallet?.type === "walletconnect" && provider) {
        // Desconectar WalletConnect
        // await provider.disconnect();
      }

      // Limpar estado
      setWallet(null);
      setIsConnected(false);
      setProvider(null);
      setNetworkId(null);

      // Remover do localStorage
      localStorage.removeItem("walletType");
      localStorage.removeItem("walletAddress");

      showNotification("info", "Carteira desconectada");

      return { success: true };
    } catch (error) {
      console.error("Erro ao desconectar carteira:", error);
      showNotification("error", "Falha ao desconectar carteira: ");
      return { success: false, error };
    }
  };

  // Vincular endereço da carteira ao usuário autenticado
  useEffect(() => {
    const linkWalletToUser = async () => {
      if (user && wallet && user.walletAddress !== wallet.address) {
        // Em produção, aqui você atualizaria o endereço no Firestore
        console.log("Vinculando carteira ao usuário:", wallet.address);
      }
    };

    if (isConnected && user) {
      linkWalletToUser();
    }
  }, [user, wallet, isConnected]);

  const value = {
    wallet,
    isConnected,
    provider,
    networkId,
    connectMetaMask,
    connectWalletConnect,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
