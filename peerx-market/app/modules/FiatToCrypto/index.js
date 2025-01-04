import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const fiatGatewayAPI = "YOUR_API_ENDPOINT_HERE"; // Replace with your fiat gateway API endpoint

function FiatToCryptoApp() {
  const [amount, setAmount] = useState("");
  const [cryptoReceived, setCryptoReceived] = useState("");
  const [status, setStatus] = useState("");

  const handleDeposit = async () => {
    try {
      const response = await axios.post(fiatGatewayAPI, {
        fiatAmount: amount,
        currency: "USD", // Default fiat currency
        targetCrypto: "PXNM", // Default target crypto
      });
      setCryptoReceived(response.data.cryptoAmount);
      setStatus("Conversion successful!");
    } catch (err) {
      console.error("Fiat deposit failed:", err);
      setStatus("Conversion failed. Check console for details.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Deposit Fiat and Convert to PXNM</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount in USD"
        keyboardType="numeric"
        onChangeText={(value) => setAmount(value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleDeposit}>
        <Text style={styles.buttonText}>Deposit and Convert</Text>
      </TouchableOpacity>
      {cryptoReceived && <Text>Received: {cryptoReceived} PXNM</Text>}
      <Text>Status: {status}</Text>
    </View>
  );
}

export default function App() {
  return <FiatToCryptoApp />;
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