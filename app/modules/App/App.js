// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from "react-native";
// import WalletConnectProvider, { useWalletConnect } from "@walletconnect/react-native-dapp";
// import { ethers } from "ethers";

// const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
// const contractABI = [/* ABI from PeerXMarket.sol */];

// function MainApp() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "" });
//   const connector = useWalletConnect();

//   const provider = new ethers.providers.Web3Provider(connector);
//   const signer = provider.getSigner();
//   const contract = new ethers.Contract(contractAddress, contractABI, signer);

//   const fetchProducts = async () => {
//     const count = await contract.productCount();
//     const items = [];
//     for (let i = 1; i <= count; i++) {
//       const product = await contract.products(i);
//       items.push(product);
//     }
//     setProducts(items);
//   };

//   const handleListProduct = async () => {
//     const { name, description, price } = newProduct;
//     const tx = await contract.listProduct(name, description, ethers.utils.parseEther(price));
//     await tx.wait();
//     fetchProducts();
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Welcome to PeerXMarket</Text>
//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.product}>
//             <Text>{item.name}</Text>
//             <Text>{item.description}</Text>
//             <Text>{ethers.utils.formatEther(item.price)} ETH</Text>
//             {!item.sold && (
//               <TouchableOpacity onPress={() => contract.buyProduct(item.id)}>
//                 <Text>Buy</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         )}
//       />
//       <TextInput placeholder="Name" onChangeText={(text) => setNewProduct({ ...newProduct, name: text })} />
//       <TextInput placeholder="Description" onChangeText={(text) => setNewProduct({ ...newProduct, description: text })} />
//       <TextInput placeholder="Price (ETH)" onChangeText={(text) => setNewProduct({ ...newProduct, price: text })} />
//       <TouchableOpacity onPress={handleListProduct} style={styles.button}>
//         <Text style={styles.buttonText}>List Product</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <WalletConnectProvider
//       bridge="https://bridge.walletconnect.org"
//       clientMeta={{
//         description: "Connect with PeerXMarket",
//         url: "https://peerxmarket.com",
//         icons: ["https://peerxmarket.com/icon.png"],
//         name: "PeerXMarket",
//       }}
//     >
//       <MainApp />
//     </WalletConnectProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   product: {
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

export default function App() {
  return "App Peerx Market";
}
