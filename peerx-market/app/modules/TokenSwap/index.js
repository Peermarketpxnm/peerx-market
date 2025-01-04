import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ethers } from "ethers";

const swapContractAddress = "YOUR_SWAP_CONTRACT_ADDRESS_HERE"; // Replace with deployed contract address
const swapABI = [/* ABI from TokenSwap.sol */];

function TokenSwapApp() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(swapContractAddress, swapABI, signer);

  const handleSwap = async () => {
    try {
      const amountIn = ethers.utils.parseEther(amount);
      const tx = await contract.swapPXNMForETH(amountIn, 0, await signer.getAddress());
      await tx.wait();
      setStatus("Swap successful!");
    } catch (err) {
      console.error("Swap failed:", err);
      setStatus("Swap failed. Check console for details.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PXNM to ETH Swap</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount of PXNM"
        keyboardType="numeric"
        onChangeText={(value) => setAmount(value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSwap}>
        <Text style={styles.buttonText}>Swap Now</Text>
      </TouchableOpacity>
      <Text>Status: {status}</Text>
    </View>
  );
}

export default function App() {
  return <TokenSwapApp />;
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
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});