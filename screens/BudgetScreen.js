import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";

const BudgetScreen = () => {
  const [expense, setExpense] = useState("");
  const [progress, setProgress] = useState(0.4);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget</Text>

      <View style={styles.card}>
        <Text>Essential Expenses</Text>
        <ProgressBar progress={progress} color="green" />
      </View>

      <View style={styles.card}>
        <Text>Non-Essential Expenses</Text>
        <ProgressBar progress={progress} color="orange" />
      </View>

      <TextInput
        placeholder="Enter Expense"
        style={styles.input}
        value={expense}
        onChangeText={setExpense}
      />
      <Button title="Add Expense" onPress={() => {}} />
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

export default BudgetScreen;
