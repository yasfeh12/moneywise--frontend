import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native";
import { ProgressBar } from "react-native-paper";

const SavingsScreen = () => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savingsGoals, setSavingsGoals] = useState([]);

  const addSavingsGoal = () => {
    if (goalName && targetAmount) {
      setSavingsGoals([...savingsGoals, { id: Date.now(), name: goalName, target: targetAmount, progress: 0 }]);
      setGoalName("");
      setTargetAmount("");
    }
  };

  const deleteGoal = (id) => {
    setSavingsGoals(savingsGoals.filter(goal => goal.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Savings Goals</Text>

      {/* Add Saving Goal Form */}
      <TextInput
        placeholder="Goal Name"
        style={styles.input}
        value={goalName}
        onChangeText={setGoalName}
      />
      <TextInput
        placeholder="Target Amount"
        style={styles.input}
        value={targetAmount}
        onChangeText={setTargetAmount}
        keyboardType="numeric"
      />
      <Button title="Add Goal" onPress={addSavingsGoal} />

      {/* List of Saving Goals */}
      <FlatList
        data={savingsGoals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>Target: £{item.target}</Text>
            <ProgressBar progress={item.progress} color="blue" />
            <Button title="Delete" onPress={() => deleteGoal(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  card: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default SavingsScreen;
