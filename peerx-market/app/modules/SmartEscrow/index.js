import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ethers } from "ethers";

const escrowContractAddress = "YOUR_ESCROW_CONTRACT_ADDRESS_HERE"; // Replace with deployed contract address
const escrowABI = [/* ABI from SmartEscrow.sol */];

function EscrowApp() {
  const [amount, setAmount] = useState("");
  const [seller, setSeller] = useState("");
  const [status, setStatus] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(escrowContractAddress, escrowABI, signer);

  const createEscrow = async () => {
    try {
      const tx = await contract.createEscrow(seller, {
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      setStatus("Escrow created successfully!");
    } catch (err) {
      console.error("Failed to create escrow:", err);
      setStatus("Escrow creation failed. Check console for details.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Escrow</Text>
      <TextInput
        style={styles.input}
        placeholder="Seller Address"
        onChangeText={(value) => setSeller(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount (ETH)"
        keyboardType="numeric"
        onChangeText={(value) => setAmount(value)}
      />
      <TouchableOpacity style={styles.button} onPress={createEscrow}>
        <Text style={styles.buttonText}>Create Escrow</Text>
      </TouchableOpacity>
      <Text>Status: {status}</Text>
    </View>
  );
}

export default function App() {
  return <EscrowApp />;
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