import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

interface OverviewData {
  overview: {
    income: number;
    monthlyBills: number;
    spending: number;
    remainingBalance: number;
    totalGoalsProgress: number;
    totalGoalsTarget: number;
  };
}

interface HomeScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/overview")
      .then((response) => {
        setOverviewData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching overview data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.info}>Loading...</Text>
      </View>
    );
  }

  if (!overviewData || !overviewData.overview) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.info}>Failed to load data</Text>
      </View>
    );
  }

  console.log(overviewData.overview, "herer line 59");

  const {
    income,
    monthlyBills,
    spending,
    remainingBalance,
    totalGoalsProgress,
    totalGoalsTarget,
  } = overviewData.overview;

  const progress =
    totalGoalsTarget > 0 ? totalGoalsProgress / totalGoalsTarget : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.welcome}>Hello, Yaseen!</Text>
      </View>

      <Text style={styles.title}>Account Overview</Text>
      <View style={styles.card}>
        <Text style={styles.info}>Monthly Income: £{income ?? 0}</Text>
        <Text style={styles.info}>Monthly Bills: £{monthlyBills ?? 0}</Text>
        <Text style={styles.info}>Spending: £{spending ?? 0}</Text>
        <Text style={styles.info}>
          Remaining Balance: £{remainingBalance ?? 0}
        </Text>
      </View>

      <Text style={styles.progressTitle}>Savings Goal Progress</Text>
      <ProgressBar
        progress={progress}
        color="#80FF00"
        style={styles.progressBar}
      />
      <Text style={styles.info}>
        Progress: £{totalGoalsProgress ?? 0} / £{totalGoalsTarget ?? 0}
      </Text>

      <Button
        title="Edit Budgets"
        onPress={() => navigation.navigate("Budgets")}
        color="#80FF00"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000F0C",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#80FF00",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#80FF00",
  },
  card: {
    backgroundColor: "#000F0C",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#80FF00",
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#80FF00",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
