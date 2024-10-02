import React from "react";
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

interface HomeScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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
        <Text style={styles.info}>Monthly Income: ££</Text>
        <Text style={styles.info}>Monthly Bills: ££</Text>
        <Text style={styles.info}>Savings Goal: ££</Text>
      </View>

      <Text style={styles.progressTitle}>Savings Goal Progress</Text>
      <ProgressBar progress={0.7} color="#80FF00" style={styles.progressBar} />

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
    color: "#80FF00",
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
});

export default HomeScreen;
