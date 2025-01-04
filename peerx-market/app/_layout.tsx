import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  StatusBar,
  StatusBarStyle,
} from "react-native";
import i18n from "../constants/i18n"; // Certifique-se de incluir as traduções necessárias
import AsyncStorage from "@react-native-async-storage/async-storage";
import {} from "@reown/walletkit";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { User, User2 } from "lucide";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("0");
  const [isConnected, setIsConnected] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [language, setLanguage] = useState("en");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("appLanguage");

      if (savedLanguage) {
        setLanguage(savedLanguage);
        i18n.locale = savedLanguage;
      }
    };

    loadLanguage();
  }, []);

  // Save language preference to AsyncStorage
  const changeLanguage = async (lang: string) => {
    setLanguage(lang);
    i18n.locale = lang;
    await AsyncStorage.setItem("appLanguage", lang);
  };

  const addProduct = () => {
    if (!newProduct.name.trim()) {
      alert(i18n.t("invalidProductName"));
      return;
    }

    const price = parseFloat(newProduct.price);
    if (isNaN(price) || price <= 0) {
      alert(i18n.t("invalidProductPrice"));
      return;
    }

    setProducts([
      ...products,
      { ...newProduct, price: price.toFixed(2), id: Date.now().toString() },
    ]);
    setNewProduct({ name: "", price: "" });
  };

  // Filter products by name
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle="dark-content"
          showHideTransition="slide"
        />

        <View style={styles.header}>
          <Text style={styles.title}>PEERX MARKET</Text>

          {/* <User2 /> */}
        </View>

        {!isConnected ? (
          <View style={styles.card}>
            <Button
              title={i18n.t("connect")}
              onPress={() => console.log("connect")}
            />
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.text}>
              {i18n.t("balance")}: {balance}
            </Text>
            <Button
              title={i18n.t("disconnect")}
              onPress={() => console.log("disconect")}
            />
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.label}>{i18n.t("marketplace")}</Text>
          <TextInput
            placeholder={i18n.t("productName")}
            style={styles.input}
            value={newProduct.name}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, name: text })
            }
          />
          <TextInput
            placeholder={i18n.t("productPrice")}
            style={styles.input}
            value={newProduct.price}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, price: text })
            }
            keyboardType="numeric"
          />
          <Button title={i18n.t("addProduct")} onPress={addProduct} />
        </View>

        {/* <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <View style={styles.card}>
                <TextInput
                  placeholder={i18n.t("searchPlaceholder")}
                  style={styles.input}
                  value={filter}
                  onChangeText={setFilter}
                />
              </View>
              <Text>{item.name}</Text>
              <Text>{item.price} PXNM</Text>
            </View>
          )}
        /> */}

        <View style={styles.card}>
          <Text style={styles.label}>{i18n.t("changeLanguage")}</Text>
          <View style={styles.languageButtons}>
            <Button title="English" onPress={() => changeLanguage("en")} />
            <Button title="Português" onPress={() => changeLanguage("pt")} />
            <Button title="Français" onPress={() => changeLanguage("fr")} />
            <Button title="Español" onPress={() => changeLanguage("es")} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ECF0F1",
    paddingHorizontal: 10,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    minHeight: 50,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 20,
  },
  productCard: {
    backgroundColor: "#eaeaea",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  languageButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default App;
