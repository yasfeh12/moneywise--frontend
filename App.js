import React from "react";
import { Button, Alert } from "react-native";
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
        onPress: () => navigation.replace("Moneywise"), // this might need changing but i cant test alerts as am on windows os.
      },
    ],
    { cancelable: true }
  );
};

function MainTabs({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <Button
              onPress={() => handleLogout(navigation)}
              title="Log Out"
              color="#ff0000"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Budgets"
        component={BudgetScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => handleLogout(navigation)}
              title="Log Out"
              color="#ff0000"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => handleLogout(navigation)}
              title="Log Out"
              color="#ff0000"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Savings"
        component={SavingsScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => handleLogout(navigation)}
              title="Log Out"
              color="#ff0000"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stocks"
        component={StockScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => handleLogout(navigation)}
              title="Log Out"
              color="#ff0000"
            />
          ),
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
