import React, { useState, useEffect } from "react";
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

const api = axios.create({
  baseURL: "http://localhost:9090/api",
  timeout: 1000,
});
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

  const getBudget = () => {
    return api.get("/budget").then((response) => {
      return response.data;
    });
  };

  const getCategories = () => {
    return api.get("/categories").then((response) => {
      return response.data;
    });
  };

  const postTransaction = (newTransaction) => {
    return api.post(`/ledger`, newTransaction).then((response) => {
      return response.data;
    });
  };

  const postRecurringTransaction = (newTransaction) => {
    return api
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
            <Button
              color="#80FF00"
              title="view transactions"
              onPress={() => {
                setEssentialPageVisible(true);
              }}
            />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Non-Essential Expense total £{nonEssentialTotal}
            </Text>
            <Button
              color="#80FF00"
              title="View transactions"
              onPress={() => {
                setNonEssentialPageVisible(true);
              }}
            />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Recurring Expenses total £{transactionsTotal}
            </Text>
            <Button
              color="#80FF00"
              title="View transactions"
              onPress={() => {
                setTransactionsPageVisible(true);
              }}
            />
          </View>
          <View style={styles.card}>
            <TextInput
              placeholder="Enter name"
              placeholderTextColor="white"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Enter price £££"
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
                trackColor={{ false: "#767577", true: "#80FF00" }}
                thumbColor={isEssential ? "#80FF00" : "#f4f3f4"}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Recurring Transaction</Text>
              <Switch
                value={recurringTransaction}
                onValueChange={setRecurringTransaction}
                trackColor={{ false: "#767577", true: "#80FF00" }}
                thumbColor={recurringTransaction ? "#80FF00" : "#f4f3f4"}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Credit ?</Text>
              <Switch
                value={isCredit}
                onValueChange={setIsCredit}
                trackColor={{ false: "#767577", true: "#80FF00" }}
                thumbColor={isEssential ? "#80FF00" : "#f4f3f4"}
              />
            </View>
            <Button
              title="Add Expense"
              onPress={handleAddExpense}
              color="#80FF00"
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
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  bar: {
    margin: 0,
    padding: 0,
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
    color: "white",
    backgroundColor: "#000F0C",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    color: "white",
  },
  button: {
    marginBottom: 10,
  },
});

export default BudgetScreen;
