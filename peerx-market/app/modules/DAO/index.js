import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { ethers } from "ethers";

const daoContractAddress = "YOUR_DAO_CONTRACT_ADDRESS_HERE"; // Replace with deployed contract address
const daoABI = [/* ABI from PeerXDAO.sol */];

function DAOApp() {
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState("");
  const [status, setStatus] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(daoContractAddress, daoABI, signer);

  const fetchProposals = async () => {
    try {
      const proposalCount = await contract.proposalCount();
      const loadedProposals = [];
      for (let i = 1; i <= proposalCount; i++) {
        const proposal = await contract.proposals(i);
        loadedProposals.push({
          id: i,
          description: proposal.description,
          votesFor: proposal.votesFor.toString(),
          votesAgainst: proposal.votesAgainst.toString(),
          executed: proposal.executed,
        });
      }
      setProposals(loadedProposals);
    } catch (err) {
      console.error("Failed to fetch proposals:", err);
    }
  };

  const createProposal = async () => {
    try {
      const tx = await contract.createProposal(newProposal);
      await tx.wait();
      fetchProposals();
      setStatus("Proposal created successfully!");
    } catch (err) {
      console.error("Failed to create proposal:", err);
      setStatus("Failed to create proposal. Check console for details.");
    }
  };

  const voteOnProposal = async (id, support) => {
    try {
      const tx = await contract.vote(id, support);
      await tx.wait();
      fetchProposals();
      setStatus("Vote submitted successfully!");
    } catch (err) {
      console.error("Failed to vote:", err);
      setStatus("Failed to vote. Check console for details.");
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PeerXMarket DAO</Text>
      <TextInput
        style={styles.input}
        placeholder="New Proposal Description"
        onChangeText={(value) => setNewProposal(value)}
      />
      <TouchableOpacity style={styles.button} onPress={createProposal}>
        <Text style={styles.buttonText}>Create Proposal</Text>
      </TouchableOpacity>
      <FlatList
        data={proposals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.proposal}>
            <Text>Description: {item.description}</Text>
            <Text>Votes For: {item.votesFor}</Text>
            <Text>Votes Against: {item.votesAgainst}</Text>
            <Text>Status: {item.executed ? "Executed" : "Pending"}</Text>
            {!item.executed && (
              <View style={styles.voteButtons}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => voteOnProposal(item.id, true)}
                >
                  <Text style={styles.buttonText}>Vote For</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => voteOnProposal(item.id, false)}
                >
                  <Text style={styles.buttonText}>Vote Against</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
      <Text>Status: {status}</Text>
    </View>
  );
}

export default function App() {
  return <DAOApp />;
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
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  proposal: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  voteButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});