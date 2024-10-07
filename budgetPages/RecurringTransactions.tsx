import { View, Text, Modal, Button, FlatList, StyleSheet } from "react-native";

const RecurringTransactions = ({
  transactionsPageVisible,
  setTransactionsPageVisible,
  transactions,
}) => {
  console.log(transactions);
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={transactionsPageVisible}
      // onRequestClose={() => setEssentialPageVisible(false)}
    >
      <View style={styles.container}>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.transaction_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}> {item.name}</Text>{" "}
              <Text style={styles.cardText}> Target: £{item.amount}</Text>{" "}
              <Text style={styles.cardText}> Target: £{item.category}</Text>{" "}
              {/* <Button title="Delete" onPress={() => deleteGoal(item.goal_id)} /> */}
              {/* {error.goalId && error.goalId === item.goal_id && (<Text>{error.msg}</Text>)} */}
            </View>
          )}
        />
        <Button
          title="backToBudget"
          color="#80FF00"
          onPress={() => {
            setTransactionsPageVisible(false);
          }}
        />
      </View>
    </Modal>
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
  },
});

export default RecurringTransactions;
