import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient({ url: "https://ipfs.infura.io:5001/api/v0" });

function DecentralizedStorageApp() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const handleUpload = async () => {
    try {
      // Simulate image upload (replace this with file picker in a real app)
      const imageData = "Sample Image Data"; // Replace with actual file data
      const imageResult = await client.add(imageData);
      const descriptionResult = await client.add(description);

      setIpfsHash(`Image CID: ${imageResult.path}, Description CID: ${descriptionResult.path}`);
    } catch (err) {
      console.error("IPFS upload failed:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Decentralized Storage with IPFS</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        onChangeText={(text) => setDescription(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload to IPFS</Text>
      </TouchableOpacity>
      {ipfsHash && <Text style={styles.hash}>IPFS Hash: {ipfsHash}</Text>}
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

export default function App() {
  return <DecentralizedStorageApp />;
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
  hash: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
});