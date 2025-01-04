import { Core } from "@walletconnect/core";
import { WalletKit } from "@reown/walletkit";
import React from "react";

const core = new Core({
  projectId: process.env.PROJECT_ID,
});

export const walletKit = React.useMemo(async () => {
  return await WalletKit.init({
    core,
    metadata: {
      name: "Demo React Native Wallet",
      description: "Demo RN Wallet to interface with Dapps",
      url: "www.walletconnect.com",
      icons: ["https://your_wallet_icon.png"],
      redirect: {
        native: "yourwalletscheme://",
      },
    },
  });
}, []);
