import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { ThemedButton } from "react-native-really-awesome-button";
import { LinearGradient } from "expo-linear-gradient";

export default function Signup() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!name) {
      Alert.alert("Name Required", "Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!password) {
      Alert.alert("Password Required", "Please enter your password.");
      return;
    }
    setIsLoading(true);
    try {
      const emailCheckResponse = await fetch(
        `http://localhost:3000/users/emailcheck/${email}`
      );
      if (!emailCheckResponse.ok) {
        throw new Error("Email check failed");
      }
      const emailCheckData = await emailCheckResponse.json();

      if (emailCheckData.exists) {
        setIsLoading(false);
        Alert.alert("Error", "Email already exists");
        return;
      }

      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      Alert.alert(
        `Hello ${name}`,
        "Account created successfully, Login to your account"
      );
      console.log("User created:", data);
      navigation.navigate("Login");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error creating user:", error.message);
    }
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
            style={{ height: "100%", alignItems: "center" }}
          >
            <Image
              source={require("../assets/tomato2.png")}
              style={{
                width: 200,
                height: 200,
                marginVertical: 50,
                borderRadius: 9999,
              }}
            />
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 40,
                borderRadius: 9999,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon
                name="user-alt"
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
                placeholder="Name"
                keyboardType="default"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 40,
                borderRadius: 9999,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 40,
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
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 40,
                borderRadius: 9999,
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
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <ThemedButton
              onPress={handleSignup}
              style={{ marginTop: 40 }}
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
                SIGN UP
              </Text>
            </ThemedButton>

            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                marginTop: 30,
                fontSize: 16,
              }}
            >
              Already have an account?{" "}
              <Text
                onPress={() => navigation.navigate("Login")}
                style={{
                  color: "#6798ff",
                }}
              >
                Login
              </Text>
            </Text>
          </LinearGradient>
        </ScrollView>
      )}
    </>
  );
}
