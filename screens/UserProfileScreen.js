import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";

const UserProfileScreen = ({ navigation }) => {
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");

  const handleSignUpSubmit = () => {
    if (username === "" || password === "" || monthlyIncome === "") {
      Alert.alert("Error", "Please fill in all fields.");
    } else {
      setSignUpModalVisible(false);
      navigation.replace("Main");
    }
  };

  const handleLoginSubmit = () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Please fill in both fields.");
    } else {
      setLoginModalVisible(false);
      navigation.replace("Main");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: "https://onix-systems.com/_next/image?url=https%3A%2F%2Fadmin.onix-systems.com%2Fuploads%2Fa9d64_g1e_W_Ah1_Cx_Ft_W_Cv_Qs06_RO_Ieku_Ze_271df36298.jpg&w=1920&q=100",
          }}
          style={{ width: 1420, height: 710 }}
        />
      </View>
      <Text style={styles.title}>Money-wise</Text>
      <Button title="Sign Up" onPress={() => setSignUpModalVisible(true)} />
      <Button title="Log In" onPress={() => setLoginModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={signUpModalVisible}
        onRequestClose={() => setSignUpModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>Sign Up</Text>
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              placeholder="Monthly Income"
              style={styles.input}
              value={monthlyIncome}
              onChangeText={setMonthlyIncome}
            />
            <Button title="Submit" onPress={handleSignUpSubmit} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={loginModalVisible}
        onRequestClose={() => setLoginModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>Log In</Text>
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button title="Submit" onPress={handleLoginSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "100%",
  },
});

export default UserProfileScreen;
