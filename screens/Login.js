import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { ThemedButton } from "react-native-really-awesome-button";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const LoginData = {
  email: "",
  password: "",
};

export default function Login() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(LoginData);
  const { setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userData.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!userData.password) {
      Alert.alert("Password Required", "Please enter your password.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        setIsLoading(false);
        Alert.alert("Login failed", "No user Found :( ");
        return;
      }

      const data = await response.json();

      await AsyncStorage.setItem("token", JSON.stringify(data.token));
      setUser(data.user);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error :( ", error.message);
    }
    setUserData(LoginData);
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            justifyContent: "space-around",
            padding: 10,
          }}
        >
          <ActivityIndicator size="large" color="#102C57" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <LinearGradient
            colors={["#102C57", "#101C57", "#102f57"]}
            style={{ height: "100%" }}
          >
            <Image
              source={require("../assets/images/login.png")}
              style={{
                width: 200,
                height: 200,
                marginVertical: 50,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 40,
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icons
                name="email"
                style={{
                  color: "#102C57",
                  fontSize: 25,
                  marginLeft: 15,
                }}
              />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 3,
                  height: 48,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "black",
                  paddingLeft: 12,
                }}
                placeholder="Email"
                keyboardType="email-address"
                value={userData.email}
                onChangeText={(text) =>
                  setUserData({ ...userData, email: text })
                }
              />
            </View>
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 40,
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <Icon
                name="lock"
                style={{
                  color: "#102C57",
                  fontSize: 25,
                  marginLeft: 15,
                }}
              />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 3,
                  height: 48,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "black",
                  paddingLeft: 12,
                }}
                placeholder="Password"
                secureTextEntry
                value={userData.password}
                onChangeText={(text) =>
                  setUserData({ ...userData, password: text })
                }
              />
            </View>
            <ThemedButton
              onPress={handleLogin}
              style={{ marginTop: 40, marginLeft: "auto", marginRight: "auto" }}
              name="bruce"
              type="anchor"
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                LOGIN
              </Text>
            </ThemedButton>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                marginTop: 30,
                fontSize: 16,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Don't have an account?{" "}
              <Text
                onPress={() => navigation.navigate("Signup")}
                style={{
                  color: "#6798ff",
                }}
              >
                Sign Up
              </Text>
            </Text>
          </LinearGradient>
        </ScrollView>
      )}
    </>
  );
}
