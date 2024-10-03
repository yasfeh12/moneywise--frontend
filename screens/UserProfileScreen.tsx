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
  ScrollView,
  Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

const { width } = Dimensions.get("window");

interface UserProfileScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  navigation,
}) => {
  const [signUpModalVisible, setSignUpModalVisible] = useState<boolean>(false);
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [resetEmail, setResetEmail] = useState<string>("");

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

  const handlePasswordReset = () => {
    if (resetEmail === "") {
      Alert.alert("Error", "Please enter your email or username.");
    } else {
      setForgotPasswordModalVisible(false);
      Alert.alert("Success", "Password reset instructions sent to your email.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://onix-systems.com/_next/image?url=https%3A%2F%2Fadmin.onix-systems.com%2Fuploads%2Fa9d64_g1e_W_Ah1_Cx_Ft_W_Cv_Qs06_RO_Ieku_Ze_271df36298.jpg&w=1920&q=100",
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>Money-wise</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Log In"
          onPress={() => setLoginModalVisible(true)}
          color="#80FF00"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Sign Up"
          onPress={() => setSignUpModalVisible(true)}
          color="#80FF00"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Forgot Password"
          onPress={() => setForgotPasswordModalVisible(true)}
          color="red"
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={forgotPasswordModalVisible}
        onRequestClose={() => setForgotPasswordModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Forgot Password</Text>
              <TextInput
                placeholder="Enter email or username"
                placeholderTextColor="white"
                style={styles.input}
                value={resetEmail}
                onChangeText={setResetEmail}
              />
              <Button
                title="Submit"
                onPress={handlePasswordReset}
                color="#80FF00"
              />
              <View style={styles.cancelButtonContainer}>
                <Button
                  title="Cancel"
                  onPress={() => setForgotPasswordModalVisible(false)}
                  color="#FF0000"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={signUpModalVisible}
        onRequestClose={() => setSignUpModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Sign Up</Text>
              <TextInput
                placeholder="Username"
                placeholderTextColor="white"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="white"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                placeholder="Monthly Income"
                placeholderTextColor="white"
                style={styles.input}
                value={monthlyIncome}
                onChangeText={setMonthlyIncome}
              />
              <Button
                title="Submit"
                onPress={handleSignUpSubmit}
                color="#80FF00"
              />
              <View style={styles.cancelButtonContainer}>
                <Button
                  title="Cancel"
                  onPress={() => setSignUpModalVisible(false)}
                  color="#FF0000"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={loginModalVisible}
        onRequestClose={() => setLoginModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Log In</Text>
              <TextInput
                placeholder="Username"
                placeholderTextColor="white"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="white"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Button
                title="Submit"
                onPress={handleLoginSubmit}
                color="#80FF00"
              />
              <View style={styles.cancelButtonContainer}>
                <Button
                  title="Cancel"
                  onPress={() => setLoginModalVisible(false)}
                  color="#FF0000"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000F0C",
    padding: 10,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: width * 0.9,
    height: width * 0.45,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "#80FF00",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "90%",
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#000F0C",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    borderColor: "#80FF00",
    borderWidth: 2,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: "#80FF00",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#80FF00",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: "#80FF00",
    width: "100%",
    backgroundColor: "#000F0C",
  },
  cancelButtonContainer: {
    marginTop: 10,
  },
});

export default UserProfileScreen;
