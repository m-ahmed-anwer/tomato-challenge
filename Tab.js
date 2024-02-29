import { BlurView } from "expo-blur";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/Entypo";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Game from "./screens/Game";
import Leaderboard from "./screens/Leaderboard";
import Profile from "./screens/Profile";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AuthTab = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          title: "Tomato Mystery Challenge",
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 26,
            fontFamily: "sans-serif",
            color: "#2e2e2e",
          },
          headerBackTitleVisible: false,
          headerStyle: {
            borderBottomWidth: 0,
          },
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={({ route }) => ({
          title: "Login",
          tabBarVisible: false, // Hide the bottom navigation bar
          headerStyle: { backgroundColor: "#00d4fb" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon.Button
              name="arrow-left"
              size={25}
              backgroundColor="#00d4fb"
              onPress={() => navigation.navigate("Landing")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={({ route }) => ({
          title: "Sign Up",
          tabBarVisible: false, // Hide the bottom navigation bar
          headerStyle: { backgroundColor: "#00d4fb" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon.Button
              name="arrow-left"
              size={25}
              backgroundColor="#00d4fb"
              onPress={() => navigation.navigate("Landing")}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const AppTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#676D75"
      barStyle={{ backgroundColor: "#102C57" }}
    >
      <Tab.Screen
        name="Tomato Mystery Chllenge"
        component={Game}
        options={{
          headerShown: true,
          headerBackgroundColor: "#00d2ff",
          headerStyle: { backgroundColor: "#F8F0E5" },
          headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
          tabBarLabel: "Game",
          tabBarIcon: ({ color, size }) => (
            <Icons name="game-controller" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Leader Board"
        component={Leaderboard}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Icon name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => ({
          tabBarLabel: "Profile",
          title: "Profile",
          tabBarVisible: false, // Hide the bottom navigation bar
          headerStyle: { backgroundColor: "#E0DDAA" },
          headerTintColor: "black",
          headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
          headerBackTitleVisible: false,

          tabBarIcon: ({ color, size }) => (
            <Icon name="user-alt" size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export { AppTab, AuthTab };
