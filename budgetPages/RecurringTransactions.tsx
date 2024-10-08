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
              <Text style={styles.cardText}> Price: £{item.amount}</Text>{" "}
              <Text style={styles.cardText}> Category: {item.category}</Text>{" "}
              {/* <Button title="Delete" onPress={() => deleteGoal(item.goal_id)} /> */}
              {/* {error.goalId && error.goalId === item.goal_id && (<Text>{error.msg}</Text>)} */}
            </View>
          )}
        />
        <Button
          title="back To Budget"
          color="#00C293"
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
    backgroundColor: "grey",
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
    padding: 10,
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
    fontSize: 24,
    fontWeight: "600",
    color: "#9EADAD",
    marginBottom: 10,
    textAlign: "center",
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
