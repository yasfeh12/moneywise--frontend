import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const StockScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stocks</Text>

      <View style={styles.card}>
        <Text style={styles.stockTitle}>Apple (AAPL)</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{ data: [220, 210, 215, 230, 235] }],
          }}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: "#000F0C",
            backgroundGradientFrom: "#000F0C",
            backgroundGradientTo: "#000F0C",
            color: () => "#80FF00",
            labelColor: () => "#80FF00",
            strokeWidth: 2,
          }}
        />
        <Button title="Add to Favorites" onPress={() => {}} color="#80FF00" />{" "}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000F0C",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#80FF00",
    fontWeight: "bold",
  },
  card: {
    padding: 20,
    backgroundColor: "#000F0C",
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#80FF00",
    borderWidth: 2,
  },
  stockTitle: {
    fontSize: 18,
    color: "#80FF00",
    marginBottom: 10,
  },
});

export default StockScreen;
