// src/services/api.js
// Serviço simulado para o MVP

// Obter detalhes de um produto
export const getProductById = async (id) => {
  // Em produção, aqui você faria uma chamada HTTP para a API
  // Simular atraso de resposta da rede
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Dados simulados
  return {
    id,
    title: "Headphones Premium Wireless",
    description:
      "Fones de ouvido premium com tecnologia de cancelamento de ruído e bateria de longa duração. Conectividade Bluetooth 5.0, alcance de 10 metros e qualidade de áudio excepcional.",
    price: 80,
    currency: "USDC",
    category: "Eletrônicos",
    condition: "Novo",
    images: [
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/500?text=Image+2",
      "https://via.placeholder.com/500?text=Image+3",
    ],
    seller: {
      id: "seller123",
      username: "TechGear",
      walletAddress: "0x1a2b3c4d5e6f7g8h9i0j",
      rating: 4.9,
    },
    shippingOptions: [
      { name: "Padrão (3-5 dias)", price: 5 },
      { name: "Expresso (1-2 dias)", price: 15 },
      { name: "Retirada", price: 0 },
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  };
};

// Obter produtos similares
export const getSimilarProducts = async (category, limit = 3) => {
  // Em produção, aqui você faria uma chamada HTTP para a API
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Dados simulados
  return [
    {
      id: "prod001",
      title: "Fones de Ouvido Wireless",
      price: 45,
      currency: "PXNM",
      image: "https://via.placeholder.com/200",
      rating: 4.5,
      reviewCount: 18,
    },
    {
      id: "prod002",
      title: "Headset Gamer",
      price: 65,
      currency: "USDC",
      image: "https://via.placeholder.com/200",
      rating: 4.7,
      reviewCount: 32,
    },
    {
      id: "prod003",
      title: "Monitores de Estúdio",
      price: 120,
      currency: "DAI",
      image: "https://via.placeholder.com/200",
      rating: 4.9,
      reviewCount: 12,
    },
  ];
};

// Obter listagens do marketplace
export const getMarketplaceListings = async (
  filters = {},
  page = 1,
  limit = 10
) => {
  // Em produção, aqui você faria uma chamada HTTP para a API
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Dados simulados
  const products = Array(limit).fill(
    (i) => ({
      id: `prod${i + 100}`,
      title: `Produto ${i + 1}`,
      description: "Descrição breve do produto...",
      price: Math.floor(Math.random() * 300) + 50,
      currency: ["PXNM", "USDC", "DAI"][Math.floor(Math.random() * 3)],
      category: ["Eletrônicos", "Roupas", "Casa", "Colecionáveis"][
        Math.floor(Math.random() * 4)
      ],
      image: "https://via.placeholder.com/200",
      seller: {
        id: `seller${i + 100}`,
        username: `Vendedor${i + 1}`,
        rating: (Math.random() * 2 + 3).toFixed(1),
      },
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ),
    }),
    1,
    10
  );

  return {
    products,
    pagination: {
      page,
      limit,
      total: 100,
      totalPages: 10,
    },
  };
};

// Obter saldo de criptomoedas
export const getTokenBalances = async (address: string) => {
  console.log({ address });
  // Em produção, aqui você obteria o saldo real da blockchain
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Dados simulados
  return {
    pxnm: 256.83,
    usdc: 1023.5,
    dai: 850.05,
    totalUSD: 4285.65,
  };
};

// Obter produtos em destaque
export const getFeaturedProducts = async (limit = 6) => {
  // Em produção, aqui você faria uma chamada HTTP para a API
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Dados simulados
  return Array(limit).fill(
    (i) => ({
      id: `featured${i + 100}`,
      title: `Produto Destaque ${i + 1}`,
      price: Math.floor(Math.random() * 300) + 50,
      currency: ["PXNM", "USDC", "DAI"][Math.floor(Math.random() * 3)],
      image: "https://via.placeholder.com/300x200",
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      reviewCount: Math.floor(Math.random() * 50) + 5,
    }),
    1,
    10
  );
};
