import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { TouchableOpacity } from "react-native";

const api = axios.create({baseURL: "http://localhost:9090/api", timeout: 1000 })

const SavingsScreen = () => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [error, setError] = useState(false)


  const getGoals = () => {
  return api.get("/goals").then((response) => {
      return response.data
  })
}

//    const postGoals = (newGoal, goal_id) => {
//   return api.post(`/goals/${goal_id}`, newGoal).then((response)=>{
//       return response.data
//   })
// }
  const deletingGoal = (goal_id) => {
  return api.delete(`/goals/${goal_id}`, goal_id).then(()=>{
      console.log("item removed")
  })
}

useEffect(() => {
  getGoals()
    .then(({goals}) => {
      console.log(goals)
      setSavingsGoals(goals)
    })
    .catch((err) => {
      console.log(err)
    });
}, []);

  const addSavingsGoal = () => {
    if (goalName && targetAmount) {
      setSavingsGoals([
        ...savingsGoals,
        { id: Date.now(), name: goalName, target: targetAmount, progress: 0 },
      ]);
      setGoalName("");
      setTargetAmount("");
    }
  };

  const deleteGoal = (goal_id) => {
    deletingGoal(goal_id).then(()=>{
      setError(false)
      setSavingsGoals(savingsGoals.filter((goal) => goal.goal_id !== goal_id));

    }).catch(()=> {
      console.log("in catch")
      setError({msg: "failed to delete", goalId: goal_id})
    })
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Savings Goals</Text>

      <TextInput
        placeholder="Goal Name"
        placeholderTextColor="white"
        style={styles.input}
        value={goalName}
        onChangeText={setGoalName}
      />
      <TextInput
        placeholder="Target Amount"
        placeholderTextColor="white"
        style={styles.input}
        value={targetAmount}
        onChangeText={setTargetAmount}
        keyboardType="numeric"
      />
      <Button title="Add Goal" onPress={addSavingsGoal} />

      <FlatList
        data={savingsGoals}
        keyExtractor={(item) => item.goal_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
                <Text style={styles.cardText}>{item.name}</Text>{" "}
                <Text style={styles.cardText}>Target: £{item.target_amount}</Text>{" "}
                <Button title="Delete" onPress={() => deleteGoal(item.goal_id)} />
                  {error.goalId && error.goalId === item.goal_id && (<Text>{error.msg}</Text>)}
                <ProgressBar progress={item.amount_saved} color="blue"/>
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
  input: {
    height: 40,
    borderColor: "#80FF00",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#FFFFFF",
    backgroundColor: "#000F0C",
  },
  card: {
    padding: 20,
    backgroundColor: "#000F0C",
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#80FF00",
    borderWidth: 2,
  },
  cardText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  addButtonContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  progress: {
    marginBottom: 0,
    padding: 0,
  }
});

export default SavingsScreen;
