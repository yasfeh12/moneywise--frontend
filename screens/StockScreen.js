import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

const stockData = [
  {
    name: "Apple (AAPL)",
    data: [220, 210, 215, 230, 235],
  },
  {
    name: "Microsoft (MSFT)",
    data: [320, 310, 315, 330, 335],
  },
  {
    name: "Amazon (AMZN)",
    data: [190, 195, 200, 210, 215],
  },
  {
    name: "Google (GOOGL)",
    data: [145, 150, 155, 160, 165],
  },
  {
    name: "Facebook (META)",
    data: [250, 240, 245, 260, 265],
  },
  {
    name: "Tesla (TSLA)",
    data: [710, 700, 715, 720, 725],
  },
  {
    name: "Berkshire Hathaway (BRK.A)",
    data: [410, 400, 415, 430, 435],
  },
  {
    name: "Visa (V)",
    data: [220, 230, 235, 240, 245],
  },
  {
    name: "Johnson & Johnson (JNJ)",
    data: [160, 165, 170, 180, 185],
  },
  {
    name: "Walmart (WMT)",
    data: [130, 135, 140, 145, 150],
  },
];

const StockScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Stocks</Text>
      {stockData.map((stock, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.stockTitle}>{stock.name}</Text>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May"],
              datasets: [{ data: stock.data }],
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
          <Button title="Add to Favorites" onPress={() => {}} color="#80FF00" />
        </View>
      ))}
    </ScrollView>
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
