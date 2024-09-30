import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, ScrollView } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory-native";
//dummy stock data
const sampleStockData = [
  { name: "Apple (AAPL)", price: 150, data: [{ x: 1, y: 130 }, { x: 2, y: 140 }, { x: 3, y: 150 }] },
  { name: "Microsoft (MSFT)", price: 250, data: [{ x: 1, y: 230 }, { x: 2, y: 240 }, { x: 3, y: 250 }] },
  { name: "Amazon (AMZN)", price: 3300, data: [{ x: 1, y: 3200 }, { x: 2, y: 3250 }, { x: 3, y: 3300 }] },
  { name: "Google (GOOGL)", price: 2800, data: [{ x: 1, y: 2700 }, { x: 2, y: 2750 }, { x: 3, y: 2800 }] },
  { name: "Facebook (META)", price: 350, data: [{ x: 1, y: 320 }, { x: 2, y: 330 }, { x: 3, y: 350 }] },
  { name: "Tesla (TSLA)", price: 1000, data: [{ x: 1, y: 900 }, { x: 2, y: 950 }, { x: 3, y: 1000 }] },
  { name: "Berkshire Hathaway (BRK.A)", price: 420000, data: [{ x: 1, y: 410000 }, { x: 2, y: 415000 }, { x: 3, y: 420000 }] },
  { name: "NVIDIA (NVDA)", price: 650, data: [{ x: 1, y: 600 }, { x: 2, y: 625 }, { x: 3, y: 650 }] },
  { name: "Visa (V)", price: 230, data: [{ x: 1, y: 220 }, { x: 2, y: 225 }, { x: 3, y: 230 }] },
  { name: "Johnson & Johnson (JNJ)", price: 170, data: [{ x: 1, y: 160 }, { x: 2, y: 165 }, { x: 3, y: 170 }] }
];

const StockScreen = () => {
  const [favoriteStocks, setFavoriteStocks] = useState([]);

  const addToFavorites = (stock) => {
    if (!favoriteStocks.includes(stock)) {
      setFavoriteStocks([...favoriteStocks, stock]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Top 10 Companies' Stocks</Text>

      {/* List of top stocks */}
      <FlatList
        data={sampleStockData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>Price: £{item.price}</Text>
            <Button title="Add to Favorites" onPress={() => addToFavorites(item)} />

            {/* Chart for individual stock */}
            <VictoryChart>
              <VictoryLine data={item.data} />
              <VictoryAxis dependentAxis />
              <VictoryAxis />
            </VictoryChart>
          </View>
        )}
      />

      <Text style={styles.subtitle}>Favorite Stocks</Text>
      {/* List of favorite stocks */}
      {favoriteStocks.length === 0 ? (
        <Text>No favorite stocks yet.</Text>
      ) : (
        favoriteStocks.map((stock) => (
          <Text key={stock.name}>{stock.name}</Text>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  subtitle: { fontSize: 20, marginTop: 20 },
  card: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default StockScreen;
