import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { LineChart } from "react-chartjs-2";

const analyticsAPI = "http://localhost:4000/analytics"; // Replace with your backend URL

function AnalyticsApp() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(analyticsAPI);
        setAnalytics(response.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <View style={styles.container}>
        <Text>Loading analytics...</Text>
      </View>
    );
  }

  const salesData = {
    labels: ["January", "February", "March", "April", "May"], // Example labels
    datasets: [
      {
        label: "Sales Volume (PXNM)",
        data: [200, 300, 500, 700, analytics.totalVolume], // Example data
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Platform Analytics</Text>
      <Text>Total Sales: {analytics.totalSales}</Text>
      <Text>Total Volume: {analytics.totalVolume} PXNM</Text>
      <Text>Active Users: {analytics.activeUsers}</Text>
      <LineChart data={salesData} />
    </View>
  );
}

export default function App() {
  return <AnalyticsApp />;
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
});