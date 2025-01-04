import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { ethers } from "ethers";

const gamificationContractAddress = "YOUR_GAMIFICATION_CONTRACT_ADDRESS_HERE"; // Replace with deployed contract address
const gamificationABI = [/* ABI from Gamification.sol */];

function GamificationApp() {
  const [achievements, setAchievements] = useState([]);
  const [points, setPoints] = useState("0");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(gamificationContractAddress, gamificationABI, signer);

  const fetchAchievements = async () => {
    try {
      const userAddress = await signer.getAddress();
      const userAchievements = await contract.getAchievements(userAddress);
      setAchievements(userAchievements);
      const userPoints = await contract.getPoints(userAddress);
      setPoints(userPoints.toString());
    } catch (err) {
      console.error("Failed to fetch achievements:", err);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const simulateUnlockAchievement = async () => {
    try {
      const tx = await contract.unlockAchievement(
        await signer.getAddress(),
        "Top Seller",
        "Awarded for completing 10 sales.",
        100
      );
      await tx.wait();
      fetchAchievements();
    } catch (err) {
      console.error("Failed to unlock achievement:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gamification and Rewards</Text>
      <Text>Total Points: {points}</Text>
      <FlatList
        data={achievements}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.achievement}>
            <Text>Name: {item.name}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Reward: {item.reward} Points</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={simulateUnlockAchievement}>
        <Text style={styles.buttonText}>Simulate Unlock Achievement</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return <GamificationApp />;
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
  achievement: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});