import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ethers } from "ethers";

const nftContractAddress = "YOUR_NFT_CONTRACT_ADDRESS_HERE"; // Replace with deployed contract address
const nftABI = [/* ABI from PeerXNFT.sol */];

function NFTApp() {
  const [metadataURI, setMetadataURI] = useState("");
  const [status, setStatus] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftContractAddress, nftABI, signer);

  const mintNFT = async () => {
    try {
      const tx = await contract.mintNFT(await signer.getAddress(), metadataURI);
      await tx.wait();
      setStatus("NFT minted successfully!");
    } catch (err) {
      console.error("NFT minting failed:", err);
      setStatus("NFT minting failed. Check console for details.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mint Your NFT</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Metadata URI"
        onChangeText={(value) => setMetadataURI(value)}
      />
      <TouchableOpacity style={styles.button} onPress={mintNFT}>
        <Text style={styles.buttonText}>Mint NFT</Text>
      </TouchableOpacity>
      <Text>Status: {status}</Text>
    </View>
  );
}

export default function App() {
  return <NFTApp />;
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