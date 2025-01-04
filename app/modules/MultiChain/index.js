import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { ethers } from "ethers";

const supportedChains = {
  1: { name: "Ethereum Mainnet", symbol: "ETH" },
  56: { name: "Binance Smart Chain", symbol: "BNB" },
  137: { name: "Polygon Mainnet", symbol: "MATIC" },
};

function MultiChainApp() {
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState("0");
  const [selectedChain, setSelectedChain] = useState(1); // Default to Ethereum Mainnet
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await ethereumProvider.getNetwork();
      setChainId(network.chainId);
      setProvider(ethereumProvider);
    };
    initProvider();
  }, []);

  const switchChain = async (chainId) => {
    if (!window.ethereum) {
      alert("MetaMask is required to switch networks.");
      return;
    }
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await ethereumProvider.getNetwork();
      setChainId(network.chainId);
      setProvider(ethereumProvider);
    } catch (error) {
      console.error("Failed to switch chain:", error);
    }
  };

  const fetchBalance = async () => {
    if (!provider) return;
    const signer = provider.getSigner();
    const balance = await signer.getBalance();
    setBalance(ethers.utils.formatEther(balance));
  };

  useEffect(() => {
    if (provider) fetchBalance();
  }, [provider]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Multi-Chain Support</Text>
      <Text>Current Chain: {supportedChains[chainId]?.name || "Unknown"}</Text>
      <Text>Balance: {balance} {supportedChains[chainId]?.symbol || ""}</Text>
      <FlatList
        data={Object.keys(supportedChains)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => switchChain(parseInt(item))}
          >
            <Text style={styles.buttonText}>
              Switch to {supportedChains[item].name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default function App() {
  return <MultiChainApp />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});