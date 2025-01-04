import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

// Mock product data for demonstration
const mockProducts = [
  { id: 1, name: "Product A", category: "Electronics", price: 100, location: "New York" },
  { id: 2, name: "Product B", category: "Fashion", price: 50, location: "Los Angeles" },
  { id: 3, name: "Product C", category: "Books", price: 20, location: "Chicago" },
  { id: 4, name: "Product D", category: "Electronics", price: 200, location: "San Francisco" },
];

function SearchApp() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ category: "", minPrice: "", maxPrice: "", location: "" });

  useEffect(() => {
    handleFilter();
  }, [searchQuery, filters]);

  const handleFilter = () => {
    let result = products;

    // Search query
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter((product) => product.category === filters.category);
    }

    // Price range filter
    if (filters.minPrice) {
      result = result.filter((product) => product.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((product) => product.price <= parseFloat(filters.maxPrice));
    }

    // Location filter
    if (filters.location) {
      result = result.filter((product) => product.location === filters.location);
    }

    setFilteredProducts(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Marketplace Search and Filters</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Filter by category"
        onChangeText={(text) => setFilters((prev) => ({ ...prev, category: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Min Price"
        keyboardType="numeric"
        onChangeText={(text) => setFilters((prev) => ({ ...prev, minPrice: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Max Price"
        keyboardType="numeric"
        onChangeText={(text) => setFilters((prev) => ({ ...prev, maxPrice: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Filter by location"
        onChangeText={(text) => setFilters((prev) => ({ ...prev, location: text }))}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text>Name: {item.name}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Location: {item.location}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default function App() {
  return <SearchApp />;
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
    marginBottom: 10,
  },
  product: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});