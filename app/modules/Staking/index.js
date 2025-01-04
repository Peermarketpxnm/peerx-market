import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ethers } from "ethers";

const stakingContractAddress = "YOUR_STAKING_CONTRACT_ADDRESS_HERE"; // Replace with deployed contract address
const stakingABI = [/* ABI from StakingRewards.sol */];

function StakingApp() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [rewardBalance, setRewardBalance] = useState("0");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(stakingContractAddress, stakingABI, signer);

  const handleStake = async () => {
    const tx = await contract.stake(ethers.utils.parseEther(stakeAmount));
    await tx.wait();
    fetchRewards();
  };

  const handleClaim = async () => {
    const tx = await contract.claimReward();
    await tx.wait();
    fetchRewards();
  };

  const fetchRewards = async () => {
    const rewards = await contract.earned(await signer.getAddress());
    setRewardBalance(ethers.utils.formatEther(rewards));
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Staking and Rewards</Text>
      <TextInput
        style={styles.input}
        placeholder="Stake Amount (PXNM)"
        keyboardType="numeric"
        onChangeText={(value) => setStakeAmount(value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleStake}>
        <Text style={styles.buttonText}>Stake</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleClaim}>
        <Text style={styles.buttonText}>Claim Rewards</Text>
      </TouchableOpacity>
      <Text>Reward Balance: {rewardBalance} PXNM</Text>
    </View>
  );
}

export default function App() {
  return <StakingApp />;
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