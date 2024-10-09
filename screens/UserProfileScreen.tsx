import React, { useState, useContext } from 'react';
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
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthContext } from '../App';

const { width } = Dimensions.get('window');

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
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [resetEmail, setResetEmail] = useState<string>('');
  const {
    authContext: { signIn, signUp },
  } = useContext(AuthContext);

  const handleSignUpSubmit = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields.');
    } else {
      signUp({ username, password });
      setSignUpModalVisible(false);
      // navigation.replace('Main');
    }
  };

  const handleLoginSubmit = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields.');
    } else {
      signIn({ username, password });
      setLoginModalVisible(false);
      // navigation.replace('Main');
    }
  };

  const handlePasswordReset = () => {
    if (resetEmail === '') {
      Alert.alert('Error', 'Please enter your email or username.');
    } else {
      setForgotPasswordModalVisible(false);
      Alert.alert('Success', 'Password reset instructions sent to your email.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        MONEY <Text style={styles.title2}>WISE</Text>
      </Text>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://onix-systems.com/_next/image?url=https%3A%2F%2Fadmin.onix-systems.com%2Fuploads%2Fa9d64_g1e_W_Ah1_Cx_Ft_W_Cv_Qs06_RO_Ieku_Ze_271df36298.jpg&w=1920&q=100',
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLoginModalVisible(true)}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSignUpModalVisible(true)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setForgotPasswordModalVisible(true)}
        >
          <Text style={styles.buttonText}>Forgot Password</Text>
        </TouchableOpacity>
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
              <TouchableOpacity
                style={styles.button}
                onPress={handlePasswordReset}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <View style={styles.cancelButtonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setForgotPasswordModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
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
              <TouchableOpacity
                style={styles.button}
                onPress={handleSignUpSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <View style={styles.cancelButtonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setSignUpModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
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
              <TouchableOpacity
                style={styles.button}
                onPress={handleLoginSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <View style={styles.cancelButtonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setLoginModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: width * 0.9,
    height: width * 0.45,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 76,
    marginBottom: 20,
    color: '#00C293',
    fontWeight: '600',
  },
  title2: {
    fontSize: 76,
    marginBottom: 20,
    color: 'white',
    fontWeight: '600',
  },
  buttonContainer: {
    width: '90%',
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    borderColor: '#00C293',
    borderWidth: 4,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#00C293',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 3,
    borderBottomRightRadius: 25,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: 'white',
    width: '100%',
    backgroundColor: 'grey',
    fontSize: 16,
  },
  cancelButtonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#00C293',
    paddingVertical: 15,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    width: width * 0.5,
    alignSelf: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF2A03',
    paddingVertical: 15,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    width: width * 0.5,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 21,
    fontWeight: 600,
  },
});

export default UserProfileScreen;
