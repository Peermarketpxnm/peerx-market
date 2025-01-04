import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ethers } from "ethers";

const secureContractAddress = "YOUR_SECURE_CONTRACT_ADDRESS_HERE"; // Replace with deployed contract address
const secureABI = [/* ABI from SecureActions.sol */];

function SecurityApp() {
  const [actionHash, setActionHash] = useState("");
  const [signature, setSignature] = useState("");
  const [status, setStatus] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(secureContractAddress, secureABI, signer);

  const signAction = async () => {
    try {
      const signedMessage = await signer.signMessage(ethers.utils.arrayify(actionHash));
      setSignature(signedMessage);
      setStatus("Action signed successfully!");
    } catch (err) {
      setStatus("Failed to sign action.");
    }
  };

  const authorizeAction = async () => {
    try {
      const tx = await contract.authorizeAction(actionHash, signature);
      await tx.wait();
      setStatus("Action authorized successfully!");
    } catch (err) {
      setStatus("Failed to authorize action.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Digital Signatures and Security</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Action Hash"
        onChangeText={(value) => setActionHash(value)}
      />
      <TouchableOpacity style={styles.button} onPress={signAction}>
        <Text style={styles.buttonText}>Sign Action</Text>
      </TouchableOpacity>
      <Text>Signature: {signature}</Text>
      <TouchableOpacity style={styles.button} onPress={authorizeAction}>
        <Text style={styles.buttonText}>Authorize Action</Text>
      </TouchableOpacity>
      <Text>Status: {status}</Text>
    </View>
  );
}

export default function App() {
  return <SecurityApp />;
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
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});