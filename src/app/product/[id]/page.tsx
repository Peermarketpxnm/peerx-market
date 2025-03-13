"use client";
// src/pages/product/[id].js
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Head from "next/head";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";
import { useNotification } from "@/context/NotificationContext";
import Layout from "@/components/layout/Layout";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
// import SimilarProducts from '@/components/marketplace/SimilarProducts';

// Serviço simulado para o MVP
import { getProductById, getSimilarProducts } from "@/services/api";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  condition: string;
  images: string[];
  seller: Seller;
  shippingOptions: ShippingOption[];
  createdAt: string;
}

export interface Seller {
  id: string;
  username: string;
  walletAddress: string;
  rating: number;
}

export interface ShippingOption {
  name: string;
  price: number;
}

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();

  const { id } = params;
  const { isDarkMode } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const { isConnected, wallet } = useWallet();
  const { showNotification } = useNotification();

  const [product, setProduct] = useState<Product | null>();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("PXNM");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState(0);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  // Carregar dados do produto
  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      try {
        setLoading(true);
        // Em produção, isto viria da API real
        const productData = (await getProductById(id)) as unknown as Product;
        setProduct(productData);
        setSelectedCurrency(productData.currency);

        // Verificar se está nos favoritos
        if (isAuthenticated && user) {
          setIsFavorite(user.favorites?.includes(id as string));
        }

        // Carregar produtos similares
        const similarItems = (await getSimilarProducts(
          productData.category,
          3
        )) as unknown as Product[];
        setSimilarProducts(similarItems);

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        showNotification("error", "Falha ao carregar detalhes do produto.");
        setLoading(false);
      }
    }

    loadProduct();
  }, [id, isAuthenticated, user, showNotification]);

  // Função para alternar favorito
  const handleToggleFavorite = async () => {
    try {
      if (!isAuthenticated) {
        showNotification(
          "info",
          "Por favor, faça login para adicionar aos favoritos"
        );
        return;
      }

      setIsFavorite(!isFavorite);
      // Em produção, isto chamaria a API real
      // await toggleFavorite(id);

      showNotification(
        "success",
        isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos"
      );
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
      setIsFavorite(!isFavorite); // Reverter atualização otimista
      showNotification("error", "Falha ao atualizar favoritos");
    }
  };

  // Função para comprar agora
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      showNotification("info", "Por favor, faça login para comprar este item");
      router.push("/login");
      return;
    }

    if (!isConnected) {
      showNotification(
        "info",
        "Por favor, conecte sua carteira para fazer uma compra"
      );
      router.push("/wallet");
      return;
    }

    setShowPurchaseModal(true);
  };

  // Função para processar a compra
  const handleProceedPurchase = async () => {
    try {
      setPurchaseStep(1);

      // Em produção, aqui seria a integração com a blockchain
      // Simulando para o MVP
      setTimeout(() => {
        setPurchaseStep(2); // Compra completa
      }, 2000);
    } catch (error) {
      console.error("Erro ao processar compra:", error);
      showNotification("error", "Erro na transação: ");
    }
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p>Carregando...</p>
        </div>
      </Layout>
    );
  }

  // Error state
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Button onClick={() => router.push("/marketplace")}>
            Voltar ao Marketplace
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{product.title} | PeerX Market</title>
        <meta
          name="description"
          content={product.description.substring(0, 160)}
        />
      </Head>

      <div
        className={`container mx-auto px-4 py-8 ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => router.push("/marketplace")}
          >
            Marketplace
          </span>
          <span className="mx-2">›</span>
          <span
            className="cursor-pointer hover:underline"
            onClick={() =>
              router.push(`/marketplace?category=${product.category}`)
            }
          >
            {product.category}
          </span>
          <span className="mx-2">›</span>
          <span className="truncate max-w-xs">{product.title}</span>
        </div>

        {/* Conteúdo principal do produto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Galeria de imagens */}
          <div>
            {/* Imagem principal */}
            <div
              className={`relative w-full h-96 mb-4 rounded-lg overflow-hidden border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              {product.images && product.images.length > 0 && (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-full h-20 rounded-md overflow-hidden cursor-pointer border ${
                      selectedImage === index
                        ? isDarkMode
                          ? "border-blue-500"
                          : "border-blue-600"
                        : isDarkMode
                        ? "border-gray-700"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informações do produto */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

            {/* Informação do vendedor */}
            <div className="flex items-center mb-4">
              <span className="text-sm mr-1">Vendido por:</span>
              <span
                className="text-sm font-medium cursor-pointer hover:underline"
                onClick={() => router.push(`/seller/${product.seller.id}`)}
              >
                {product.seller.username || product.seller.walletAddress}
              </span>
              <div className="flex items-center ml-2">
                <span className="text-sm">({product.seller.rating}/5)</span>
                <span className="text-yellow-500 ml-1">★</span>
              </div>
            </div>

            {/* Preço */}
            <div
              className={`p-4 rounded-lg mb-6 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-70">Preço:</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{product.price}</span>
                    <span className="ml-2 text-lg">{selectedCurrency}</span>
                  </div>
                </div>

                {/* Seletor de moeda */}
                <div>
                  <p className="text-sm opacity-70 mb-1">Pagar com:</p>
                  <div className="flex space-x-2">
                    {["PXNM", "USDC", "DAI"].map((currency) => (
                      <button
                        key={currency}
                        onClick={() => setSelectedCurrency(currency)}
                        className={`px-3 py-1 text-sm rounded-md ${
                          selectedCurrency === currency
                            ? isDarkMode
                              ? "bg-blue-600 text-white"
                              : "bg-blue-500 text-white"
                            : isDarkMode
                            ? "bg-gray-700 text-gray-200"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {currency}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantidade */}
              <div className="mt-4">
                <p className="text-sm opacity-70 mb-1">Quantidade:</p>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className={`w-8 h-8 flex items-center justify-center rounded-l-md ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className={`w-12 h-8 text-center outline-none ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-r-md ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex space-x-4 mb-6">
              <Button
                onClick={handleBuyNow}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-medium"
              >
                Comprar Agora
              </Button>

              <Button
                onClick={handleToggleFavorite}
                className={`py-3 px-6 rounded-lg font-medium ${
                  isDarkMode
                    ? isFavorite
                      ? "bg-gray-700 text-white"
                      : "bg-gray-800 text-white"
                    : isFavorite
                    ? "bg-gray-100 text-gray-800"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                {isFavorite ? "❤️ Salvo" : "♡ Salvar"}
              </Button>
            </div>

            {/* Detalhes do produto */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Detalhes do Produto
              </h2>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-70">Condição</p>
                    <p className="font-medium">{product.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Categoria</p>
                    <p className="font-medium">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Listado</p>
                    <p className="font-medium">2 dias atrás</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">ID do Item</p>
                    <p className="font-medium">
                      {(id as string).substring(0, 8)}...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Descrição</h2>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos Similares */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Produtos Similares</h2>
            {/* <SimilarProducts products={similarProducts} isDarkMode={isDarkMode} /> */}
          </div>
        )}
      </div>

      {/* Modal de Compra */}
      <Modal
        isOpen={showPurchaseModal}
        onClose={() => {
          setShowPurchaseModal(false);
          if (purchaseStep === 2) {
            router.push("/account/purchases");
          }
          setPurchaseStep(0);
        }}
        title={purchaseStep === 2 ? "Compra Concluída" : "Finalizar Compra"}
      >
        {purchaseStep === 0 && (
          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Resumo do Pedido</h3>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span>Produto:</span>
                  <span className="font-medium">{product.title}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Preço:</span>
                  <span className="font-medium">
                    {product.price} {selectedCurrency}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Quantidade:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxa da Plataforma (2.5%):</span>
                  <span className="font-medium">
                    {(product.price * 0.025).toFixed(2)} {selectedCurrency}
                  </span>
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">
                    {(product.price * 1.025).toFixed(2)} {selectedCurrency}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">
                Detalhes do Pagamento
              </h3>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span>Método de Pagamento:</span>
                  <span className="font-medium">{selectedCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carteira:</span>
                  <span className="font-medium">
                    {wallet?.address || "0x..."}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                onClick={() => setShowPurchaseModal(false)}
                className={`py-2 px-4 rounded ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleProceedPurchase}
                className="py-2 px-4 rounded bg-primary text-white"
              >
                Confirmar Compra
              </Button>
            </div>
          </div>
        )}

        {purchaseStep === 1 && (
          <div className="py-8 text-center">
            <div className="mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="font-semibold text-xl mb-2">
                Processando Transação
              </h3>
              <p>Por favor, confirme a transação em sua carteira...</p>
            </div>
          </div>
        )}

        {purchaseStep === 2 && (
          <div className="py-8 text-center">
            <div className="text-6xl mb-4 text-green-500">✓</div>
            <h3 className="font-semibold text-xl mb-2 text-green-500">
              Compra Realizada com Sucesso!
            </h3>
            <p className="mb-4">
              Seu pagamento foi processado e o vendedor foi notificado.
            </p>
            <p>Acompanhe o status do seu pedido na página de compras.</p>
            <Button
              onClick={() => router.push("/account/purchases")}
              className="mt-6 py-2 px-6 rounded bg-primary text-white"
            >
              Ver Minhas Compras
            </Button>
          </div>
        )}
      </Modal>
    </Layout>
  );
}
