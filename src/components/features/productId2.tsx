"use client";
// pages/product/[id].js
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Head from "next/head";
// import { useWeb3React } from "@web3-react/core";
// import { ethers } from "ethers";

// Components
import Layout from "@/components/layout/Layout";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
// import ReviewCard from "@/components/ReviewCard";
// import SimilarProducts from "@/components/SimilarProducts";
import Modal from "@/components/common/Modal";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

// API Services
import { getProductById } from "@/services/api";
// import { initiateTransaction } from "@/services/transactions";
// import { toggleFavorite } from "@/services/user";

// Smart Contract ABIs
// import { PXNMTokenABI, USDCTokenABI, DAITokenABI } from "@/contracts/abis";

// Utils
import { formatCurrency, shortenAddress, timeSince } from "@/utils/formatting";
// import { TOKEN_ADDRESSES } from "@/utils/constants";

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
  createdAt: Date;
}

export interface Seller {
  id: string;
  username: string;
  walletAddress: string;
  rating: number;
  reviews?: [];
}

export interface ShippingOption {
  name: string;
  price: number;
}

const ProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  // const { account, isActive } = useWeb3React();
  const { isDarkMode } = useTheme();
  const { user, isAuthenticated, loginWithWallet } = useAuth();
  const { showNotification } = useNotification();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("PXNM");
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState({
    PXNM: { rate: 1, symbol: "PXNM" },
    USDC: { rate: 0, symbol: "USDC" },
    DAI: { rate: 0, symbol: "DAI" },
  });
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [similarProducts] = useState([]);

  // Fetch product details
  const fetchProduct = useCallback(async () => {
    try {
      if (!id) return;

      setLoading(true);
      const data = await getProductById(id);

      setProduct(data);

      // Check if product is in user's favorites
      if (isAuthenticated && user) {
        setIsFavorite(user.favorites?.includes(id as string));
      }

      // Set initial currency to product's currency
      setSelectedCurrency(data.currency);

      // Fetch similar products
      // const similar = await getFeaturedProducts(data.category, 4, id);
      // setSimilarProducts(similar);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      showNotification("error", "Failed to load product details");
      setLoading(false);
    }
  }, [id, isAuthenticated, user, showNotification]);

  // Fetch currency conversion rates
  const fetchCurrencyRates = useCallback(async () => {
    try {
      // In a real app, these would come from an API or an oracle
      // For demo purposes, we're using fixed rates
      setCurrencies({
        PXNM: { rate: 1, symbol: "PXNM" },
        USDC: { rate: 0.1, symbol: "USDC" },
        DAI: { rate: 0.1, symbol: "DAI" },
      });
    } catch (error) {
      console.error("Error fetching currency rates:", error);
    }
  }, []);

  // Calculate converted price
  useEffect(() => {
    if (product && currencies) {
      const productCurrency = product.currency;
      const productPrice = product.price;

      // Convert from product currency to selected currency
      const originalToBase = productPrice / currencies[productCurrency].rate;
      const baseToTarget = originalToBase * currencies[selectedCurrency].rate;

      setConvertedPrice(baseToTarget);
    }
  }, [product, selectedCurrency, currencies]);

  // Initial data fetch
  useEffect(() => {
    fetchProduct();
    fetchCurrencyRates();
  }, [fetchProduct, fetchCurrencyRates]);

  // Toggle favorite status
  const handleToggleFavorite = async () => {
    try {
      if (!isAuthenticated) {
        showNotification("info", "Please login to add items to favorites");
        return;
      }

      setIsFavorite(!isFavorite);
      // await toggleFavorite(id);

      showNotification(
        "success",
        isFavorite ? "Removed from favorites" : "Added to favorites"
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setIsFavorite(!isFavorite); // Revert optimistic update
      showNotification("error", "Failed to update favorites");
    }
  };

  // Handle buy now button click
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      showNotification("info", "Please login to purchase this item");
      loginWithWallet("", "", "");
      return;
    }

    // if (!isActive) {
    //   showNotification("info", "Please connect your wallet to make a purchase");
    //   return;
    // }

    setShowPurchaseModal(true);
  };

  // Handle quantity change
  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, parseInt(value) || 1);
    setQuantity(newQuantity);
  };

  // Handle currency selection
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  // Get the appropriate token contract based on selected currency
  // const getTokenContract = () => {
  //   let tokenAddress;
  //   let tokenABI;

  //   switch (selectedCurrency) {
  //     case "PXNM":
  //       tokenAddress = TOKEN_ADDRESSES.PXNM;
  //       tokenABI = PXNMTokenABI;
  //       break;
  //     case "USDC":
  //       tokenAddress = TOKEN_ADDRESSES.USDC;
  //       tokenABI = USDCTokenABI;
  //       break;
  //     case "DAI":
  //       tokenAddress = TOKEN_ADDRESSES.DAI;
  //       tokenABI = DAITokenABI;
  //       break;
  //     default:
  //       tokenAddress = TOKEN_ADDRESSES.PXNM;
  //       tokenABI = PXNMTokenABI;
  //   }

  //   const signer = library.getSigner();
  //   return new ethers.Contract(tokenAddress, tokenABI, signer);
  // };

  // Proceed with purchase
  // const handleProceedPurchase = async () => {
  //   try {
  //     setPurchaseStep(1);
  //     setTransactionStatus("approving");

  //     // Initialize transaction on backend
  //     const initResult = await initiateTransaction(
  //       id,
  //       account,
  //       selectedCurrency
  //     );

  //     // Get total amount (product price + platform fee)
  //     const totalAmount = ethers.utils.parseUnits(
  //       initResult.transaction.totalAmount.toString(),
  //       18 // Assuming 18 decimals for all tokens
  //     );

  //     // Get token contract
  //     const tokenContract = getTokenContract();

  //     // Approve escrow contract to spend tokens
  //     const approveTx = await tokenContract.approve(
  //       initResult.payment.escrowAddress,
  //       totalAmount
  //     );

  //     // Wait for approval transaction to be mined
  //     await approveTx.wait();

  //     setTransactionStatus("creating");

  //     // Call smart contract to create escrow
  //     const escrowTx = await initiateTransaction.createEscrow(
  //       initResult.transaction.id,
  //       initResult.payment.sellerAddress,
  //       initResult.payment.tokenAddress,
  //       totalAmount
  //     );

  //     // Wait for escrow transaction to be mined
  //     await escrowTx.wait();

  //     // Update transaction status on backend
  //     await initiateTransaction.confirmPayment(
  //       initResult.transaction.id,
  //       escrowTx.hash
  //     );

  //     setTransactionStatus("completed");
  //     setPurchaseStep(2);
  //   } catch (error) {
  //     console.error("Error processing purchase:", error);
  //     setTransactionStatus("failed");
  //     showNotification("error", "Transaction failed: " + error.message);
  //   }
  // };

  // Close purchase modal
  const handleClosePurchaseModal = () => {
    setShowPurchaseModal(false);

    // If transaction was completed, redirect to orders page
    if (transactionStatus === "completed") {
      router.push("/account/purchases");
    }

    // Reset state for next time
    setPurchaseStep(0);
    setTransactionStatus(null);
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="large" />
        </div>
      </Layout>
    );
  }

  // Error state
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => router.push("/marketplace")}>
              Back to Marketplace
            </Button>
          </div>
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

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div
              className={`relative w-full h-96 mb-4 rounded-lg overflow-hidden border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
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

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

            {/* Seller Info */}
            <div className="flex items-center mb-4">
              <span className="text-sm mr-1">Sold by:</span>
              <span
                className="text-sm font-medium cursor-pointer hover:underline"
                onClick={() => router.push(`/seller/${product.seller.id}`)}
              >
                {product.seller.username ||
                  shortenAddress(product.seller.walletAddress)}
              </span>
              <div className="flex items-center ml-2">
                <span className="text-sm">({product.seller.rating}/5)</span>
                <span className="text-yellow-500 ml-1">★</span>
              </div>
            </div>

            {/* Price */}
            <div
              className={`p-4 rounded-lg mb-6 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-70">Price:</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      {formatCurrency(convertedPrice || product.price)}
                    </span>
                    <span className="ml-2 text-lg">{selectedCurrency}</span>
                  </div>
                </div>

                {/* Currency Selector */}
                <div>
                  <p className="text-sm opacity-70 mb-1">Pay with:</p>
                  <div className="flex space-x-2">
                    {Object.keys(currencies).map((currency) => (
                      <button
                        key={currency}
                        onClick={() => handleCurrencyChange(currency)}
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

              {/* Quantity Selector */}
              <div className="mt-4">
                <p className="text-sm opacity-70 mb-1">Quantity:</p>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
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
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className={`w-12 h-8 text-center outline-none ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-r-md ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>

              <Button
                variant="secondary"
                size="large"
                onClick={handleToggleFavorite}
                icon={isFavorite ? "heart-filled" : "heart-outline"}
              >
                {isFavorite ? "Saved" : "Save"}
              </Button>
            </div>

            {/* Product Details */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Product Details</h2>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-70">Condition</p>
                    <p className="font-medium">{product.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Category</p>
                    <p className="font-medium">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Listed</p>
                    <p className="font-medium">
                      {timeSince(new Date(product.createdAt))} ago
                    </p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Item ID</p>
                    <p className="font-medium">
                      {(id as string).substring(0, 8)}...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Shipping</h2>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <ul className="space-y-2">
                  {product.shippingOptions.map((option, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{option.name}</span>
                      <span className="font-medium">
                        {option.price > 0
                          ? `${formatCurrency(option.price)} ${
                              product.currency
                            }`
                          : "Free"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Reviews */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Seller Reviews</h2>
          {
            // product.seller.reviews && product.seller.reviews.length > 0 ? (
            //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            //     {product.seller.reviews.slice(0, 4).map((review) => (
            //       <ReviewCard key={review.id} review={review} />
            //     ))}
            //   </div>
            // ) : (
            <p
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              This seller has no reviews yet.
            </p>

            // )
          }

          {product.seller.reviews && product.seller.reviews.length > 4 && (
            <div className="mt-4 text-center">
              <Button
                variant="primary"
                onClick={() =>
                  router.push(`/seller/${product.seller.id}/reviews`)
                }
              >
                View All Reviews
              </Button>
            </div>
          )}
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
            {/* <SimilarProducts products={similarProducts} /> */}
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      <Modal
        isOpen={showPurchaseModal}
        onClose={handleClosePurchaseModal}
        title={purchaseStep === 2 ? "Purchase Complete" : "Complete Purchase"}
      >
        {purchaseStep === 0 && (
          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span>Product:</span>
                  <span className="font-medium">{product.title}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Price:</span>
                  <span className="font-medium">
                    {formatCurrency(convertedPrice || product.price)}{" "}
                    {selectedCurrency}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Quantity:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Platform Fee (2.5%):</span>
                  <span className="font-medium">
                    {formatCurrency((convertedPrice || product.price) * 0.025)}{" "}
                    {selectedCurrency}
                  </span>
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">
                    {formatCurrency((convertedPrice || product.price) * 1.025)}{" "}
                    {selectedCurrency}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Payment Details</h3>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span>Payment Method:</span>
                  <span className="font-medium">{selectedCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Wallet:</span>
                  {/* <span className="font-medium">{shortenAddress(account)}</span> */}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="secondary" onClick={handleClosePurchaseModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  console.log("comprar");
                  // handleProceedPurchase
                }}
              >
                Confirm Purchase
              </Button>
            </div>
          </div>
        )}

        {purchaseStep === 1 && (
          <div className="py-8 text-center">
            <div className="mb-6">
              {transactionStatus === "approving" && (
                <>
                  <Spinner size="large" className="mb-4" />
                  <h3 className="font-semibold text-xl mb-2">
                    Approving Transaction
                  </h3>
                  <p>Please confirm the transaction in your wallet...</p>
                </>
              )}

              {transactionStatus === "creating" && (
                <>
                  <Spinner size="large" className="mb-4" />
                  <h3 className="font-semibold text-xl mb-2">
                    Creating Escrow
                  </h3>
                  <p>Please wait while we process your payment...</p>
                </>
              )}

              {transactionStatus === "failed" && (
                <>
                  <div className="text-5xl mb-4">❌</div>
                  <h3 className="font-semibold text-xl mb-2 text-red-500">
                    Transaction Failed
                  </h3>
                  <p>
                    There was an error processing your payment. Please try
                    again.
                  </p>
                  <Button
                    variant="primary"
                    className="mt-4"
                    onClick={handleClosePurchaseModal}
                  >
                    Close
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {purchaseStep === 2 && (
          <div className="py-8 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h3 className="font-semibold text-xl mb-2 text-green-500">
              Purchase Successful!
            </h3>
            <p className="mb-4">
              Your payment has been processed successfully.
            </p>
            <p>The seller has been notified and will ship your item soon.</p>
            <Button
              variant="primary"
              className="mt-6"
              onClick={() => router.push("/account/purchases")}
            >
              View My Purchases
            </Button>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default ProductPage;
