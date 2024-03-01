import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { ThemedButton } from "react-native-really-awesome-button";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <LinearGradient
        colors={["#00d2ff", "#0aa2ff", "#55d2ff"]}
        style={{ height: "100%", alignItems: "center" }}
      >
        <Image
          source={require("../assets/tomato.png")}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
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
              color: "#00d4fb",
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
              color: "#00d4fb",
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
          />
        </View>
        <ThemedButton
          onPress={() => {
            setTimeout(() => {
              navigation.navigate("Signup");
            }, 50);
          }}
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
            LOGIN
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
          Don't have an account?{" "}
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={{
              color: "blue",
            }}
          >
            Sign Up
          </Text>
        </Text>
      </LinearGradient>
    </ScrollView>
  );
}
