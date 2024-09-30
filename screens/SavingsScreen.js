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
        <Text>Holiday Savings</Text>
        <ProgressBar progress={progress} color="blue" />
        <Button title="Delete" onPress={() => {}} />
      </View>

      <TextInput
        placeholder="Add Saving Goal"
        style={styles.input}
        value={goal}
        onChangeText={setGoal}
      />
      <Button title="Add Goal" onPress={() => {}} />
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default SavingsScreen;
