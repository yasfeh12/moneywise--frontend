import React, { useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import BudgetScreen from './screens/BudgetScreen';
import ReportScreen from './screens/ReportScreen';
import SavingsScreen from './screens/SavingsScreen';
import StockScreen from './screens/StockScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import { Ionicons } from 'react-native-vector-icons';
import { ThemeProvider } from './utils/ThemeContext';
import { FavoritesProvider } from './screens/FavoritesContext';
import apiClient from './utils/API';

export const AuthContext = React.createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LogoutButton = ({ navigation }) => {
  const {
    authContext: { signOut },
  } = useContext(AuthContext);

  const handleLogout = () => {
    signOut();
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: () => navigation.replace('Moneywise'),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={16} color="#FFFFFF" />
      <Text style={styles.logoutButtonText}>Log Out</Text>
    </TouchableOpacity>
  );
};

function MainTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Budgets') {
            iconName = 'wallet-outline';
          } else if (route.name === 'Reports') {
            iconName = 'stats-chart-outline';
          } else if (route.name === 'Savings') {
            iconName = 'cash-outline';
          } else if (route.name === 'Stocks') {
            iconName = 'trending-up-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#80FF00',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => <LogoutButton navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name="Budgets"
        component={BudgetScreen}
        options={{
          headerRight: () => <LogoutButton navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportScreen}
        options={{
          headerRight: () => <LogoutButton navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name="Savings"
        component={SavingsScreen}
        options={{
          headerRight: () => <LogoutButton navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name="Stocks"
        component={StockScreen}
        options={{
          headerRight: () => <LogoutButton navigation={navigation} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          const tokenInfo = jwtDecode(action.token);
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            user: {
              username: tokenInfo.username,
              userId: tokenInfo.userId,
            },
          };
        case 'SIGN_IN':
          const tokenInfo2 = jwtDecode(action.token);
          console.log(tokenInfo2);
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            user: {
              username: tokenInfo2.username,
              userId: tokenInfo2.userId,
            },
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // userToken = await SecureStore.getItemAsync('userToken');
        const storageKey = Object.keys(localStorage).find((key) =>
          key.includes('userToken')
        );
        userToken = localStorage.getItem(storageKey);

        if (userToken) {
          apiClient.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${userToken}`;
            return config;
          });

          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        }
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({ username, password }) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        apiClient
          .post('/users/auth', {
            username,
            password,
          })
          .then((response) => {
            try {
              // await SecureStore.setItemAsync(
              //   'userToken',
              //   response.data.user.access_token
              // );
              localStorage.setItem(
                `${
                  jwtDecode(response.data.user.access_token).userId
                }_userToken`,
                response.data.user.access_token
              );
            } catch (e) {
              console.log(e);
            }

            apiClient.interceptors.request.use((config) => {
              config.headers.Authorization = `Bearer ${response.data.user.access_token}`;
              return config;
            });

            dispatch({
              type: 'SIGN_IN',
              token: response.data.user.access_token,
            });
          });
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
      },
      signOut: () => {
        const storageKey = Object.keys(localStorage).find((key) =>
          key.includes('userToken')
        );
        localStorage.removeItem(storageKey);
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = '';
          return config;
        });
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async ({ username, password }) => {
        // In a production app, we need to send user data to server and get a token
        const response = await apiClient.post('/users', {
          username,
          password,
        });
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${response.data.user.access_token}`;
          return config;
        });

        dispatch({ type: 'SIGN_IN', token: response.data.user.access_token });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ authContext, user: state.user }}>
      <ThemeProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              {state.userToken == null ? (
                <Stack.Screen name="Moneywise" component={UserProfileScreen} />
              ) : (
                <Stack.Screen
                  name="Main"
                  component={MainTabs}
                  options={{
                    headerShown: false,
                  }}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </FavoritesProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#FF6347',
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 5,
  },
});
