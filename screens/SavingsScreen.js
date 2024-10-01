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
    backgroundColor: "#000F0C",
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#80FF00",
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: "#80FF00",
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
    color: "#80FF00",
    backgroundColor: "#000F0C",
  },
  addButtonContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default SavingsScreen;
