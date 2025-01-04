import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ethers } from "ethers";

const subscriptionContractAddress = "YOUR_SUBSCRIPTION_CONTRACT_ADDRESS_HERE"; // Replace with deployed contract address
const subscriptionABI = [/* ABI from PremiumSubscription.sol */];

function SubscriptionApp() {
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(subscriptionContractAddress, subscriptionABI, signer);

  const purchaseSubscription = async () => {
    try {
      const tx = await contract.purchaseSubscription(parseInt(duration));
      await tx.wait();
      setStatus("Subscription purchased successfully!");
    } catch (err) {
      console.error("Failed to purchase subscription:", err);
      setStatus("Subscription purchase failed. Check console for details.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Purchase Premium Subscription</Text>
      <TextInput
        style={styles.input}
        placeholder="Duration (in months)"
        keyboardType="numeric"
        onChangeText={(value) => setDuration(value)}
      />
      <TouchableOpacity style={styles.button} onPress={purchaseSubscription}>
        <Text style={styles.buttonText}>Purchase</Text>
      </TouchableOpacity>
      <Text>Status: {status}</Text>
    </View>
  );
}

export default function App() {
  return <SubscriptionApp />;
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