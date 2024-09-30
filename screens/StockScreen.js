import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const StockScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stocks</Text>

      <View style={styles.card}>
        <Text>Apple (AAPL)</Text>
        <Button title="Add to Favorites" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  card: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default StockScreen;
