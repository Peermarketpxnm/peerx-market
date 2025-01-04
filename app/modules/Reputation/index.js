import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { ethers } from "ethers";

const reputationContractAddress = "YOUR_REPUTATION_CONTRACT_ADDRESS_HERE"; // Replace with deployed contract address
const reputationABI = [/* ABI from ReputationSystem.sol */];

function ReputationApp() {
  const [reviews, setReviews] = useState([]);
  const [productId, setProductId] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(reputationContractAddress, reputationABI, signer);

  const fetchReviews = async (id) => {
    const fetchedReviews = await contract.getReviews(id);
    setReviews(fetchedReviews.map((r) => ({ rating: r.rating, comment: r.comment, reviewer: r.reviewer })));
  };

  const handleReviewSubmit = async () => {
    const tx = await contract.submitReview(productId, signer.getAddress(), parseInt(rating), comment);
    await tx.wait();
    fetchReviews(productId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reputation and Reviews</Text>
      <TextInput
        style={styles.input}
        placeholder="Product ID"
        keyboardType="numeric"
        onChangeText={(value) => setProductId(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating (1-5)"
        keyboardType="numeric"
        onChangeText={(value) => setRating(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Comment"
        onChangeText={(value) => setComment(value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleReviewSubmit}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.review}>
            <Text>Rating: {item.rating}</Text>
            <Text>Comment: {item.comment}</Text>
            <Text>Reviewer: {item.reviewer}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default function App() {
  return <ReputationApp />;
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
  review: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});