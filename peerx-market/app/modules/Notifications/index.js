import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your WebSocket server URL

function NotificationsApp() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for new product notifications
    socket.on("newProductNotification", (product) => {
      setNotifications((prev) => [...prev, `New Product: ${product.name}`]);
    });

    // Listen for order update notifications
    socket.on("orderUpdateNotification", (order) => {
      setNotifications((prev) => [...prev, `Order Update: ${order.status}`]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Real-Time Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.notification}>{item}</Text>}
      />
    </View>
  );
}

export default function App() {
  return <NotificationsApp />;
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
  notification: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});