import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
  Switch,
} from "react-native";
import { ProgressBar } from "react-native-paper";

const BudgetScreen = () => {
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("Food");
  const [isEssential, setIsEssential] = useState(false);
  const [progress, setProgress] = useState(0.4);

  const categories = [
    "Food",
    "Clothes",
    "Childcare",
    "Animal Care",
    "Transportation",
    "Entertainment",
    "Health",
    "Utilities",
    "Housing",
    "Groceries",
    "Other",
  ];

  const handleAddExpense = () => {
    console.log({
      expense,
      category,
      isEssential: isEssential ? "Essential" : "Non-Essential",
    });
    setExpense("");
    setCategory("Food");
    setIsEssential(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Essential Expenses</Text>
        <ProgressBar progress={progress} color="#80FF00" />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Non-Essential Expenses</Text>
        <ProgressBar progress={progress} color="orange" />
      </View>
      <TextInput
        placeholder="Enter price £££"
        placeholderTextColor="#80FF00"
        style={styles.input}
        keyboardType="numeric"
        value={expense}
        onChangeText={setExpense}
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Essential Expense</Text>
        <View style={styles.switchWrapper}>
          <Switch
            value={isEssential}
            onValueChange={setIsEssential}
            trackColor={{ false: "#767577", true: "#80FF00" }}
            thumbColor={isEssential ? "#80FF00" : "#f4f3f4"}
            style={styles.switch}
          />
        </View>
      </View>
      <Button title="Add Expense" onPress={handleAddExpense} color="#80FF00" />{" "}
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
    marginBottom: 10,
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
  picker: {
    height: 50,
    marginBottom: 20,
    color: "#80FF00",
    backgroundColor: "#000F0C",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    color: "#80FF00",
  },
  switchWrapper: {
    transform: [{ scale: 1.5 }],
  },
});

export default BudgetScreen;
