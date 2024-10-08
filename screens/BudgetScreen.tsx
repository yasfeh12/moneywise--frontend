import React, { useState, useEffect, useContext } from "react";
import Essential from "../budgetPages/Essential";
import NonEssential from "../budgetPages/NonEssential";
import RecurringTransactions from "../budgetPages/RecurringTransactions";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ProgressBar } from "react-native-paper";
import axios from "axios";
import ToggleTheme from "../components/ToggleTheme";
import { ThemeContext } from "../utils/ThemeContext";
import apiClient from "../utils/API";

const BudgetScreen: React.FC = () => {
  const [expense, setExpense] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("Food");
  const [isEssential, setIsEssential] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0.4);
  const [recurringTransaction, setRecurringTransaction] =
    useState<boolean>(false);
  const [isCredit, setIsCredit] = useState<boolean>(false);
  const [essentialPageVisible, setEssentialPageVisible] =
    useState<boolean>(false);
  const [transactionsPageVisible, setTransactionsPageVisible] =
    useState<boolean>(false);
  const [nonEssentialPageVisible, setNonEssentialPageVisible] =
    useState<boolean>(false);
  const [budgetData, setBudgetaData] = useState<object>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const [submitCounter, setSubmitCounter] = useState(0);
  const { theme, setTheme } = useContext(ThemeContext);

  const styles = createStyles(theme);

  const getBudget = () => {
    return apiClient.get("/budget").then((response) => {
      return response.data;
    });
  };

  const getCategories = () => {
    return apiClient.get("/categories").then((response) => {
      return response.data;
    });
  };

  const postTransaction = (newTransaction) => {
    return apiClient.post(`/ledger`, newTransaction).then((response) => {
      return response.data;
    });
  };

  const postRecurringTransaction = (newTransaction) => {
    return apiClient
      .post(`/recurring_transactions`, newTransaction)
      .then((response) => {
        return response.data;
      });
  };
  useEffect(() => {
    setIsLoading(true);
    Promise.all([getBudget(), getCategories()])
      .then(([budget, categories]) => {
        setIsLoading(false);
        setCategories(categories.categories);
        setBudgetaData(budget);
      })
      .catch(() => {});
  }, [submitCounter]);

  const resetInputState = () => {
    setSubmitCounter(submitCounter + 1);
    setName("");
    setExpense("");
    setCategory("select");
    setIsEssential(false);
    setRecurringTransaction(false);
    setIsCredit(false);
  };

  const handleAddExpense = () => {
    const newTransaction = {
      name,
      amount: expense,
      essential: isEssential,
      is_credit: isCredit,
      category_id: category,
    };
    if (recurringTransaction) {
      console.log("here");
      postRecurringTransaction(newTransaction).then(() => {
        resetInputState();
      });
    } else {
      postTransaction(newTransaction).then(() => {
        resetInputState();
      });
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const essentialTotal = budgetData.transactions.essential.reduce(
    (acc, transaction) => {
      acc += +transaction.amount;
      return acc;
    },
    0
  );

  const nonEssentialTotal = budgetData.transactions.nonEssential.reduce(
    (acc, transaction) => {
      acc += +transaction.amount;
      return acc;
    },
    0
  );

  const transactionsTotal = budgetData.recurringTransactions.reduce(
    (acc, transaction) => {
      if (!transaction.is_credit) {
        acc += +transaction.amount;
      }
      return acc;
    },
    0
  );

  const totalExpenses = essentialTotal + nonEssentialTotal;

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Total Expenses £{totalExpenses}</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Essential Expenses total £{essentialTotal}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setEssentialPageVisible(true);
              }}
            >
              <Text style={styles.buttonText}>VIEW TRANSACTIONS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Non-Essential Expenses total £{nonEssentialTotal}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setNonEssentialPageVisible(true);
              }}
            >
              <Text style={styles.buttonText}>VIEW TRANSACTIONS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Recurring Expenses total £{transactionsTotal}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setTransactionsPageVisible(true);
              }}
            >
              <Text style={styles.buttonText}>VIEW TRANSACTIONS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <TextInput
              placeholder="Enter Expense"
              placeholderTextColor="white"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Enter Price £££"
              placeholderTextColor="white"
              style={styles.input}
              keyboardType="numeric"
              value={expense}
              onChangeText={setExpense}
            />
            <Picker
              selectedValue={category.name}
              style={styles.picker}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              {categories.map((category) => (
                <Picker.Item
                  key={category.category_id}
                  label={category.name}
                  value={category.category_id}
                />
              ))}
            </Picker>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Essential Expense {}</Text>
              <Switch
                value={isEssential}
                onValueChange={setIsEssential}
                trackColor={{ false: "#767577", true: "white" }}
                thumbColor={isEssential ? "white" : "#f4f3f4"}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Recurring Transaction</Text>
              <Switch
                value={recurringTransaction}
                onValueChange={setRecurringTransaction}
                trackColor={{ false: "#767577", true: "white" }}
                thumbColor={recurringTransaction ? "white" : "#f4f3f4"}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Credit ?</Text>
              <Switch
                value={isCredit}
                onValueChange={setIsCredit}
                trackColor={{ false: "#767577", true: "white" }}
                thumbColor={isEssential ? "white" : "#f4f3f4"}
              />
            </View>
            <Button
              title="Add Expense"
              onPress={handleAddExpense}
              color="#00C293"
            />
          </View>
          <Essential
            essentialPageVisible={essentialPageVisible}
            setEssentialPageVisible={setEssentialPageVisible}
            essentialTransactions={budgetData.transactions.essential}
          />
          <NonEssential
            nonEssentialPageVisible={nonEssentialPageVisible}
            setNonEssentialPageVisible={setNonEssentialPageVisible}
            nonEssentialTransactions={budgetData.transactions.nonEssential}
          />
          <RecurringTransactions
            transactionsPageVisible={transactionsPageVisible}
            setTransactionsPageVisible={setTransactionsPageVisible}
            transactions={budgetData.recurringTransactions}
          />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ToggleTheme />
        </View>
        </View>
        {/* Footer */}
      </ScrollView>
    </>
  );
};

const createStyles = (theme: string) => {
  return theme === "light"
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
          marginBottom: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 5,
          borderColor: "white",
          borderWidth: 4,
        },
        cardTitle: {
          fontSize: 20,
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
          color: "black",
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
        cardTitle: {
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

export default BudgetScreen;
