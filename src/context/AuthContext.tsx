"use client";
// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ethers } from "ethers";

export interface MockProps {
  id: string;
  email: string | null;
  walletAddress: string;
  username: null | string;
  favorites: string[];
  createdAt: string | Date;
}

export interface AuthContextProps {
  user: MockProps | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithWallet: (
    address: string,
    signature: string,
    message: string
  ) => Promise<{
    success: boolean;
  }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MockProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Verificar estado de autenticação ao iniciar
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Buscar dados adicionais do usuário no Firestore
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();

            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              walletAddress: userData?.walletAddress || null,
              username: userData?.username || null,
              favorites: userData?.favorites || [],
              createdAt: "",
              ...userData,
            });
          }

          setIsAuthenticated(true);
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Função para login com carteira
  const loginWithWallet = async (
    address: string,
    signature: string,
    message: string
  ) => {
    try {
      setLoading(true);

      // Verificar a assinatura
      const signerAddress = ethers.utils.verifyMessage(message, signature);

      if (signerAddress.toLowerCase() !== address.toLowerCase()) {
        throw new Error("Assinatura inválida");
      }

      // Para o MVP, vamos simular o login bem-sucedido
      // Em produção, aqui você faria uma chamada para backend
      // para autenticar e obter um token JWT

      // Simular usuário autenticado
      const mockUser: MockProps = {
        id: "wallet_" + address.slice(2, 10),
        walletAddress: address,
        username: null,
        favorites: [],
        createdAt: new Date(),
        email: "",
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      setLoading(false);

      return { success: true };
    } catch (error) {
      setLoading(false);
      console.error("Erro no login com carteira:", error);
      throw error;
    }
  };

  // Função para logout
  const logout = async () => {
    try {
      setLoading(true);

      // Para o MVP, apenas limpar o estado
      // Em produção, fazer logout do Firebase Auth
      // await auth.signOut();

      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);

      // Redirecionar para a página inicial
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.error("Erro no logout:", error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    loginWithWallet,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
