// src/components/layout/Layout.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";
// import { useAuth } from "../../context/AuthContext";
import { useWallet } from "../../context/WalletContext";
import { useNotification } from "../../context/NotificationContext";
import NotificationToast from "../common/NotificationToast";

const Layout = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  // const { isAuthenticated, user, logout } = useAuth();
  const { isConnected, wallet, disconnectWallet } = useWallet();
  const { notifications } = useNotification();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Fechar menus ao navegar
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-b`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="text-primary font-bold text-2xl">PeerX</span>
              <span
                className={`font-medium text-xl ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Market
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/marketplace">
              <span
                className={`cursor-pointer ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Marketplace
              </span>
            </Link>
            <Link href="/marketplace/create">
              <span
                className={`cursor-pointer ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Vender
              </span>
            </Link>
            <Link href="/about">
              <span
                className={`cursor-pointer ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sobre
              </span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-400"
                  : "bg-gray-100 text-gray-600"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            {/* Wallet Button */}
            {isConnected ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`py-2 px-4 rounded-lg flex items-center ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <span className="font-medium truncate max-w-[120px]">
                    {wallet?.address.slice(0, 6)}...{wallet?.address.slice(-4)}
                  </span>
                  <span className="ml-2">▼</span>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } ring-1 ring-black ring-opacity-5`}
                  >
                    <Link href="/dashboard">
                      <span
                        className={`block px-4 py-2 text-sm cursor-pointer ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Dashboard
                      </span>
                    </Link>
                    <Link href="/account/purchases">
                      <span
                        className={`block px-4 py-2 text-sm cursor-pointer ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Minhas Compras
                      </span>
                    </Link>
                    <Link href="/account/sales">
                      <span
                        className={`block px-4 py-2 text-sm cursor-pointer ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Minhas Vendas
                      </span>
                    </Link>
                    <Link href="/account/profile">
                      <span
                        className={`block px-4 py-2 text-sm cursor-pointer ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Perfil
                      </span>
                    </Link>
                    <button
                      onClick={disconnectWallet}
                      className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${
                        isDarkMode
                          ? "text-red-400 hover:bg-gray-700"
                          : "text-red-600 hover:bg-gray-100"
                      }`}
                    >
                      Desconectar Carteira
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/wallet">
                <button className="py-2 px-4 bg-primary text-white rounded-lg font-medium">
                  Conectar Carteira
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/marketplace">
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isDarkMode
                      ? "text-white hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Marketplace
                </span>
              </Link>
              <Link href="/marketplace/create">
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isDarkMode
                      ? "text-white hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Vender
                </span>
              </Link>
              <Link href="/about">
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isDarkMode
                      ? "text-white hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Sobre
                </span>
              </Link>
              {isConnected && (
                <>
                  <Link href="/dashboard">
                    <span
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isDarkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Dashboard
                    </span>
                  </Link>
                  <Link href="/account/profile">
                    <span
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isDarkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Meu Perfil
                    </span>
                  </Link>
                  <button
                    onClick={disconnectWallet}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      isDarkMode
                        ? "text-red-400 hover:bg-gray-700"
                        : "text-red-600 hover:bg-gray-100"
                    }`}
                  >
                    Desconectar Carteira
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer
        className={`${
          isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">PeerX Market</h3>
              <p className="text-sm">
                Marketplace descentralizado para compras e vendas com
                criptomoedas.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/marketplace">
                    <span className="text-sm cursor-pointer hover:underline">
                      Marketplace
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace/create">
                    <span className="text-sm cursor-pointer hover:underline">
                      Vender
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <span className="text-sm cursor-pointer hover:underline">
                      Sobre
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq">
                    <span className="text-sm cursor-pointer hover:underline">
                      FAQ
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="text-sm cursor-pointer hover:underline">
                      Contato
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms">
                    <span className="text-sm cursor-pointer hover:underline">
                      Termos de Uso
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Moedas Aceitas</h3>
              <div className="flex space-x-2">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  PXNM
                </span>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  USDC
                </span>
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  DAI
                </span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} PeerX Market. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Notifications */}
      <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;
