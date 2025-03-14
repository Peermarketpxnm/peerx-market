"use client";

// src/pages/index.js
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { getFeaturedProducts } from "@/services/api";
import ProductCard from "@/components/marketplace/ProductCard";
import Button from "@/components/common/Button";
import { useTheme } from "@/context/ThemeContext";

export interface Products {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  rating: string;
  reviewCount: number;
}

export default function Home() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [featuredProducts, setFeaturedProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts(6);
        console.log({ products });
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Erro ao carregar produtos em destaque:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <Layout>
      <Head>
        <title>PeerX Market | Marketplace Descentralizado</title>
        <meta
          name="description"
          content="Compre e venda online usando criptomoedas no PeerX Market. Marketplace descentralizado com PXNM, USDC e DAI."
        />
      </Head>

      {/* Hero Section */}
      <div
        className={`w-full py-16 px-4 ${
          isDarkMode ? "bg-gray-800" : "bg-blue-50"
        }`}
      >
        <div className="container mx-auto text-center">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Marketplace Descentralizado
            <br />
            para Compras e Vendas
          </h1>
          <p
            className={`text-xl mb-8 max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Use PXNM, USDC ou DAI para comprar e vender produtos com segurança,
            privacidade e facilidade.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => router.push("/marketplace")}
              className="py-3 px-8 bg-primary text-white rounded-lg font-medium text-lg"
            >
              Explorar Marketplace
            </Button>
            <Button
              onClick={() => router.push("/wallet")}
              className={`py-3 px-8 rounded-lg font-medium text-lg ${
                isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Conectar Carteira
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto py-16 px-4">
        <h2
          className={`text-3xl font-bold mb-8 text-center ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Produtos em Destaque
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              Carregando produtos...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => {
              console.log({ product, index });
              return (
                <ProductCard
                  key={`${index}`}
                  product={product}
                  onClick={() => router.push(`/product/${product.id}`)}
                />
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            onClick={() => router.push("/marketplace")}
            className={`py-3 px-8 rounded-lg font-medium ${
              isDarkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Ver Todos os Produtos
          </Button>
        </div>
      </div>

      {/* How It Works */}
      <div
        className={`w-full py-16 px-4 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto">
          <h2
            className={`text-3xl font-bold mb-12 text-center ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Como Funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-primary shadow"
                }`}
              >
                1
              </div>
              <h3
                className={`text-xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Conecte sua Carteira
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Conecte sua carteira Web3 como MetaMask, Trust Wallet ou
                Phantom.
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-primary shadow"
                }`}
              >
                2
              </div>
              <h3
                className={`text-xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Explore Produtos
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Navegue pelo marketplace e encontre produtos que deseja comprar.
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-primary shadow"
                }`}
              >
                3
              </div>
              <h3
                className={`text-xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Compre com Cripto
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Pague com PXNM, USDC ou DAI usando contratos inteligentes
                seguros.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto py-16 px-4 text-center">
        <h2
          className={`text-3xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Pronto para começar?
        </h2>
        <p
          className={`text-xl mb-8 max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Junte-se a milhares de usuários que já estão comprando e vendendo com
          cripto.
        </p>
        <Button
          onClick={() => router.push("/marketplace/create")}
          className="py-3 px-8 bg-primary text-white rounded-lg font-medium text-lg"
        >
          Criar meu primeiro anúncio
        </Button>
      </div>
    </Layout>
  );
}
