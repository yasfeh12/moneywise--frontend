import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Overview</Text>
      <Text style={styles.info}>your monthly income is: ££</Text>
      <Text style={styles.info}>your regular monthly bills are: ££</Text>
      <Text style={styles.info}>youre total savings goal is: ££</Text>

      <Button
        title="Edit Budgets"
        onPress={() => navigation.navigate("Budgets")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
