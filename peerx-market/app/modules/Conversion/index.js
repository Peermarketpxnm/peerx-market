import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ethers } from "ethers";
import { Token, Fetcher, Route, Trade, TradeType, TokenAmount } from "@uniswap/sdk";

const PXNM_ADDRESS = "YOUR_PXNM_CONTRACT_ADDRESS_HERE"; // PXNM Token Contract Address
const DEX_ROUTER_ADDRESS = "YOUR_DEX_ROUTER_ADDRESS_HERE"; // Uniswap Router Address

function ConversionApp() {
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const handleConversion = async () => {
    const token = new Token(1, PXNM_ADDRESS, 18); // Replace with chainId for your token
    const pair = await Fetcher.fetchPairData(token, WETH[token.chainId], provider);
    const route = new Route([pair], WETH[token.chainId]);
    const trade = new Trade(route, new TokenAmount(WETH[token.chainId], ethers.utils.parseEther(cryptoAmount)), TradeType.EXACT_INPUT);

    setConvertedAmount(trade.outputAmount.toSignificant(6)); // Conversion result
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Convert Crypto to PXNM</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount in ETH"
        keyboardType="numeric"
        onChangeText={(value) => setCryptoAmount(value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleConversion}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>
      {convertedAmount && <Text>Converted Amount: {convertedAmount} PXNM</Text>}
    </View>
  );
}

export default function App() {
  return <ConversionApp />;
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
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});