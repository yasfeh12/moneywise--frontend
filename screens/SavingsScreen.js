import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import apiClient from "../utils/API";
import ToggleTheme from "../components/ToggleTheme";
import { ThemeContext } from "../utils/ThemeContext";
import { TouchableOpacity } from "react-native";
//import { TouchableOpacity } from "react-native";

const SavingsScreen = () => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [error, setError] = useState({ msg: "", goalId: null });
  const [amountSaved, setAmountSaved] = useState({});
  const { theme, setTheme } = useContext(ThemeContext);

  const styles = createStyles(theme);

  const getGoals = () => {
    return apiClient.get("/goals").then((response) => {
      return response.data;
    });
  };
  const postGoal = (newGoal) => {
    return apiClient.post("/goals", newGoal).then((response) => {
      return response.data;
    });
  };
  const patchGoal = (goal_id, updatedGoal) => {
    return apiClient
      .patch(`/goals/${goal_id}`, updatedGoal)
      .then((response) => {
        console.log("API response", response.data);
        return response.data.updatedGoal;
      });
  };
  const deletingGoal = (goal_id) => {
    return apiClient.delete(`/goals/${goal_id}`, goal_id).then(() => {
      console.log("item removed");
    });
  };
  useEffect(() => {
    getGoals()
      .then(({ goals }) => {
        console.log(goals);
        setSavingsGoals(goals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const addSavingsGoal = () => {
    if (goalName && targetAmount) {
      const newGoal = {
        name: goalName,
        target_amount: targetAmount,
        amount_saved: 0,
      };
      postGoal(newGoal)
        .then(() => {
          return getGoals();
        })
        .then(({ goals }) => {
          setSavingsGoals(goals);
          setGoalName("");
          setTargetAmount("");
        })
        .catch((err) => {
          console.log("failed to add a goal", err.message);
        });
    }
  };
  const updateSavingsProgress = (goal_id) => {
    const savedAmount = parseFloat(amountSaved[goal_id]) || 0;
    console.log(`Amount saved input for goal ${goal_id}:`, savedAmount);
    const goalToUpdate = savingsGoals.find((goal) => goal.goal_id === goal_id);
    if (!goalToUpdate) {
      console.log(`Goal with ID ${goal_id} not found.`);
      setError({ msg: "Goal not found", goalId: goal_id });
      return;
    }
    const currentSaved = goalToUpdate.amount_saved
      ? parseFloat(goalToUpdate.amount_saved)
      : 0; // Handle null as 0
    const target = parseFloat(goalToUpdate.target_amount) || 0;
    console.log(
      `Current goal info for goal ${goal_id} - Target: ${target}, Saved: ${currentSaved}`
    );
    const newSavedAmount = currentSaved + savedAmount;
    console.log(`New saved amount for goal ${goal_id}:`, newSavedAmount);
    if (newSavedAmount > target) {
      console.log(
        `New saved amount (${newSavedAmount}) exceeds target (${target}).`
      );
      setError({ msg: "Amount saved exceeds target", goalId: goal_id });
      return;
    }
    if (savedAmount > 0) {
      const updatedGoal = { inc_amount_saved: newSavedAmount };
      patchGoal(goal_id, updatedGoal)
        .then((updatedGoalData) => {
          const updatedSavedAmount = updatedGoalData.amount_saved
            ? parseFloat(updatedGoalData.amount_saved)
            : newSavedAmount;
          console.log(
            `Goal updated successfully for goal ${goal_id}. New amount saved: ${updatedSavedAmount}`
          );
          setSavingsGoals(
            savingsGoals.map((goal) =>
              goal.goal_id === goal_id
                ? { ...goal, amount_saved: updatedSavedAmount }
                : goal
            )
          );
          setAmountSaved({ ...amountSaved, [goal_id]: "" });
        })
        .catch((err) => {
          console.log("Failed to update goal:", err.message);
        });
    } else {
      console.log("Invalid saved amount. Must be greater than 0.");
      setError({
        msg: "Amount saved must be a positive number greater than 0",
        goalId: goal_id,
      });
    }
  };
  const handleAmountSavedChange = (goal_id, value) => {
    setAmountSaved({ ...amountSaved, [goal_id]: value });
  };
  const deleteGoal = (goal_id) => {
    deletingGoal(goal_id)
      .then(() => {
        setError({ msg: "", goalId: null });
        setSavingsGoals(
          savingsGoals.filter((goal) => goal.goal_id !== goal_id)
        );
      })
      .catch(() => {
        console.log("in catch");
        setError({ msg: "failed to delete", goalId: goal_id });
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
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
        <Button title="Add Goal" onPress={addSavingsGoal} color={"#00C293"} />
        </View>
        <FlatList
          data={savingsGoals}
          keyExtractor={(item) => item.goal_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>{" "}
              <Text style={styles.cardText}>Target: £{item.target_amount}</Text>{" "}
              <Text style={styles.cardText}>Saved: £{item.amount_saved}</Text>{" "}
              <TextInput
                placeholder="Amount Saved"
                placeholderTextColor="white"
                style={styles.input}
                value={amountSaved[item.goal_id] || ""}
                onChangeText={(value) =>
                  handleAmountSavedChange(item.goal_id, value)
                }
                keyboardType="numeric"
              />
              {/* <Button
                title="Update"
                onPress={() => updateSavingsProgress(item.goal_id)}
              /> */}
              <TouchableOpacity
              style={styles.button}
              onPress={() => updateSavingsProgress(item.goal_id)}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              {/* <Button title="Delete" onPress={() => deleteGoal(item.goal_id)} /> */}
              <TouchableOpacity
              style={styles.button}
              onPress={() => deleteGoal(item.goal_id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              {error.goalId && error.goalId === item.goal_id && (
                <Text>{error.msg}</Text>
              )}
              <View style={{marginTop: 20, height: 20, borderRadius: 5}}>
              <ProgressBar
                progress={
                  item.target_amount
                    ? item.amount_saved / item.target_amount
                    : 0
                }
                color="blue"
              />
              </View>
              <Text style={styles.cardText}>
                Progress:{" "}
                {item.target_amount
                  ? ((item.amount_saved / item.target_amount) * 100).toFixed(2)
                  : 0}
                %
              </Text>
            </View>
          )}
        />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 15 }}>
        <ToggleTheme />
      </View>
      </View>
      {/* Footer */}
    </>
  );
};

const createStyles = (theme) => {
  return theme === "light"
    // ? StyleSheet.create({
    //     container: {
    //       flex: 1,
    //       padding: 20,

    //       backgroundColor: "#00C293",
    //     },

    //     title: {
    //       fontSize: 24,
    //       marginBottom: 20,
    //       color: "#80FF00",
    //       fontWeight: "bold",
    //     },
    //     input: {
    //       height: 40,
    //       borderColor: "#80FF00",
    //       borderWidth: 1,
    //       paddingHorizontal: 10,
    //       marginBottom: 20,
    //       color: "#FFFFFF",
    //       backgroundColor: "#000F0C",
    //     },
    //     card: {
    //       padding: 20,
    //       backgroundColor: "#000F0C",
    //       marginBottom: 20,
    //       borderRadius: 10,
    //       borderColor: "#80FF00",
    //       borderWidth: 2,
    //     },
    //     cardText: {
    //       fontSize: 18,
    //       color: "#FFFFFF",
    //     },
    //     addButtonContainer: {
    //       marginTop: 20,
    //       marginBottom: 10,
    //     },
    //     progress: {
    //       marginBottom: 0,
    //       padding: 0,
    //     },
    //   })
    // : StyleSheet.create({
    //     container: {
    //       flex: 1,
    //       padding: 20,

    //       backgroundColor: "#000F0C",
    //     },

    //     title: {
    //       fontSize: 24,
    //       marginBottom: 20,
    //       color: "#80FF00",
    //       fontWeight: "bold",
    //     },
    //     input: {
    //       height: 40,
    //       borderColor: "#80FF00",
    //       borderWidth: 1,
    //       paddingHorizontal: 10,
    //       marginBottom: 20,
    //       color: "#FFFFFF",
    //       backgroundColor: "#000F0C",
    //     },
    //     card: {
    //       padding: 20,
    //       backgroundColor: "#000F0C",
    //       marginBottom: 20,
    //       borderRadius: 10,
    //       borderColor: "#80FF00",
    //       borderWidth: 2,
    //     },
    //     cardText: {
    //       fontSize: 18,
    //       color: "#FFFFFF",
    //     },
    //     addButtonContainer: {
    //       marginTop: 20,
    //       marginBottom: 10,
    //     },
    //     progress: {
    //       marginBottom: 0,
    //       padding: 0,
    //     },
    //   });

    ? StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,

        backgroundColor: "#00C293",
      },

      title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginBottom: 30,
      },
      card: {
        padding: 20,
        backgroundColor: "#636363",
        borderRadius: 15,
        margin: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
        borderColor: "white",
        borderWidth: 4,
      },
      cardText: {
        fontSize: 25,
        fontWeight: "600",
        color: "#00C293",
        marginBottom: 10,
        textAlign: "center",
      },
      input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        backgroundColor: "#535353",
        color: "white",
        marginBottom: 20,
      },
      picker: {
        height: 50,
        backgroundColor: "#535353",
        borderRadius: 12,
        marginBottom: 20,
        color: "white",
      },
      switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      },
      switchLabel: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
      },
      button: {
        marginTop: 20,
        backgroundColor: "white",
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#00C293",
      },
    })
  : StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,

        backgroundColor: "grey",
      },
      title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#9EADAD",
        textAlign: "center",
        marginBottom: 30,
      },
      card: {
        padding: 20,
        backgroundColor: "black",
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
        borderColor: "#00C293",
        borderWidth: 4,
      },
      cardText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#9EADAD",
        marginBottom: 10,
        textAlign: "center",
      },
      input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        backgroundColor: "#535353",
        color: "white",
        marginBottom: 20,
      },
      picker: {
        height: 50,
        backgroundColor: "#535353",
        borderRadius: 12,
        marginBottom: 20,
        color: "white",
      },
      switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      },
      switchLabel: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
      },
      button: {
        marginTop: 20,
        backgroundColor: "white",
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "black",
      },
    });
};
export default SavingsScreen;
