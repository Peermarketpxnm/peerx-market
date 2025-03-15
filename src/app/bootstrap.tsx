"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { AuthProvider } from "@/context/AuthContext";
import { WalletProvider } from "@/context/WalletContext";

export default function Bootstrap({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HeroUIProvider>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <WalletProvider>{children}</WalletProvider>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
}
