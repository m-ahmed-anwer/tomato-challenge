import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Game from "../screens/Game";
import Leaderboard from "../screens/Leaderboard";
import Profile from "../screens/Profile";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={({ route }) => ({
          title: "Login",
          tabBarVisible: false, 
          headerStyle: { backgroundColor: "#102C57" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon.Button
              name="arrow-left"
              size={25}
              style={{ paddingLeft: 20 }}
              backgroundColor="#102C57"
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
          tabBarVisible: false, 
          headerStyle: { backgroundColor: "#102C57", borderBottomWidth: 0 }, 
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon.Button
              name="arrow-left"
              size={25}
              backgroundColor="#102C57"
              style={{ paddingLeft: 20 }}
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
      initialRouteName="Tomato Mystery Chllenge"
      activeColor="#000"
      inactiveColor="#676D75"
      barStyle={{ backgroundColor: "#102C57" }}
      labeled={true}
      tabBarColor="#1111"
      tabBarOptions={{
        activeTintColor: "#ffff", 
        inactiveTintColor: "#ffff", 
      }}
    >
      <Tab.Screen
        name="Tomato Mystery Chllenge"
        component={Game}
        options={{
          headerShown: true,
          headerBackgroundColor: "#00d2ff",
          headerStyle: { backgroundColor: "#F8F0E5" },
          headerTitleStyle: { fontWeight: "bold", fontSize: 23 },
          tabBarLabel: "Game",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="gamepad" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Leader Board"
        component={Leaderboard}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Icon name="trophy" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => ({
          tabBarLabel: "Profile",
          title: "Profile",
          tabBarVisible: false, 
          headerStyle: { backgroundColor: "#E0DDAA" },
          headerTintColor: "black",
          headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
          headerBackTitleVisible: false,

          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={30} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export { AppTab, AuthStack };
