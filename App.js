import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import BudgetScreen from "./screens/BudgetScreen";
import ReportScreen from "./screens/ReportScreen";
import SavingsScreen from "./screens/SavingsScreen";
import StockScreen from "./screens/StockScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import { Ionicons } from "react-native-vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const handleLogout = (navigation) => {
  Alert.alert(
    "Log Out",
    "Are you sure you want to log out?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        onPress: () => navigation.replace("Moneywise"),
      },
    ],
    { cancelable: true }
  );
};

const LogoutButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() => handleLogout(navigation)}
    >
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

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Budgets") {
            iconName = "wallet-outline";
          } else if (route.name === "Reports") {
            iconName = "stats-chart-outline";
          } else if (route.name === "Savings") {
            iconName = "cash-outline";
          } else if (route.name === "Stocks") {
            iconName = "trending-up-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#80FF00",
        tabBarInactiveTintColor: "gray",
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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Moneywise" component={UserProfileScreen} />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#FF6347",
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 5,
  },
});
