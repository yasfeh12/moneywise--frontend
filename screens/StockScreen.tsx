import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import ToggleTheme from "../components/ToggleTheme";
import { ThemeContext } from "../utils/ThemeContext";
import { useFavorites } from "./FavoritesContext";

const companies = [
  "AAPL",
  "MSFT",
  "AMZN",
  "GOOGL",
  "META",
  "TSLA",
  "BRK.A",
  "V",
  "JNJ",
  "WMT",
];

function buildQueryURLCurrent(symbol: string) {
  const apiKey = "cmv4ch1r01qog1iu9gogcmv4ch1r01qog1iu9gp0";
  const encodedSymbol = encodeURIComponent(symbol);
  const queryURL = `https://finnhub.io/api/v1/quote?symbol=${encodedSymbol}&token=${apiKey}`;
  return queryURL;
}

const StockScreen = () => {
  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme, setTheme } = useContext(ThemeContext);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const styles = createStyles(theme);

  const fetchStockData = async () => {
    try {
      const stockDataPromises = companies.map(async (symbol) => {
        const queryURL = buildQueryURLCurrent(symbol);
        const response = await axios.get(queryURL);
        return {
          symbol,
          data: [
            response.data.o,
            response.data.h,
            response.data.l,
            response.data.c,
          ],
        };
      });

      const results = await Promise.all(stockDataPromises);
      setStockData(results);
      setLoading(false);
    } catch (err) {
      setError("Failed to load stock data");
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#80FF00" />
        <Text style={styles.loadingText}>Loading stock data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Stocks</Text>
      {stockData.map((stock, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.stockTitle}>{stock.symbol}</Text>
          <LineChart
            data={{
              labels: ["Open", "High", "Low", "Close"],
              datasets: [{ data: stock.data }],
            }}
            width={300}
            height={200}
            chartConfig={{
              backgroundColor: "grey",
              backgroundGradientFrom: "grey",
              backgroundGradientTo: "grey",
              color: () => "#80FF00",
              labelColor: () => "#80FF00",
              strokeWidth: 2,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (favorites.includes(stock.symbol)) {
                removeFavorite(stock.symbol);
              } else {
                addFavorite(stock.symbol);
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {favorites.includes(stock.symbol)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      {/* Footer */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ToggleTheme />
      </View>
    </ScrollView>
  );
};

const createStyles = (theme: string) => {
  return theme === "light"
    ? StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,

          backgroundColor: "#00C293",
          //TEAl
        },
        title: {
          fontSize: 24,
          marginBottom: 20,
          color: "white",
          fontWeight: "bold",
        },
        loadingContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        loadingText: {
          marginTop: 10,
          fontSize: 18,
          color: "white",
        },
        errorContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        errorText: {
          fontSize: 18,
          color: "#FF0000",
        },
        card: {
          padding: 20,
          backgroundColor: "grey",
          marginBottom: 20,
          borderRadius: 10,
          borderColor: "white",
          borderWidth: 4,
        },
        stockTitle: {
          fontSize: 18,
          color: "white",
          marginBottom: 10,
        },
        button: {
          marginTop: 20,
          backgroundColor: "black",
          paddingVertical: 15,
          borderRadius: 50,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 6,
        },
        buttonText: { fontSize: 18, fontWeight: "600", color: "white" },
      })
    : StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,

          backgroundColor: "grey",
        },
        title: {
          fontSize: 24,
          marginBottom: 20,
          color: "#80FF00",
          fontWeight: "bold",
        },
        loadingContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        loadingText: {
          marginTop: 10,
          fontSize: 18,
          color: "#80FF00",
        },
        errorContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        errorText: {
          fontSize: 18,
          color: "#FF0000",
        },
        card: {
          padding: 20,
          backgroundColor: "black",
          marginBottom: 20,
          borderRadius: 10,
          borderColor: "#00C293",
          borderWidth: 4,
        },
        stockTitle: {
          fontSize: 18,
          color: "#80FF00",
          marginBottom: 10,
        },
        button: {
          marginTop: 20,
          backgroundColor: "white",
          paddingVertical: 15,
          borderRadius: 50,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 6,
        },
        buttonText: { fontSize: 18, fontWeight: "600", color: "black" },
      });
};

export default StockScreen;
