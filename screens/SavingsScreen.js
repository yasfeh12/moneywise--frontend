import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";

const SavingsScreen = () => {
  const [goal, setGoal] = useState("");
  const [progress, setProgress] = useState(0.5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Savings Goals</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Holiday Savings</Text>
        <ProgressBar progress={progress} color="#80FF00" />
        <Button title="Delete" onPress={() => {}} color="#80FF00" />
      </View>
      <View style={styles.addButtonContainer}>
        <Button title="Add Goal" onPress={() => {}} color="#80FF00" />
      </View>
      <TextInput
        placeholder="Add Saving Goal"
        placeholderTextColor="#80FF00"
        style={styles.input}
        value={goal}
        onChangeText={setGoal}
      />
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
  cardTitle: {
    fontSize: 18,
    color: "#80FF00",
  },
  input: {
    height: 40,
    borderColor: "#80FF00",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#80FF00",
    backgroundColor: "#000F0C",
  },
  addButtonContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default SavingsScreen;
