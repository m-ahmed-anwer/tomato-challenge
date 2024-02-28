import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { ThemedButton } from "react-native-really-awesome-button";
import { LinearGradient } from "expo-linear-gradient";

export default function Signup() {
  //const height = Dimensions.get("screen").height;

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
          source={require("../assets/tomato2.png")}
          style={{ width: 200, height: 200, marginTop: 20, borderRadius: 9999 }}
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
          <Icon
            name="user-alt"
            style={{
              color: "#00d3fa",
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
              color: "#00d3fa",
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
              color: "#00d3fa",
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
              navigation.navigate("Login");
            }, 50);
          }}
          style={{ marginTop: 40 }}
          name="bruce"
          type="anchor"
        >
          <Text
            style={{
              fontFamily: "sans-serif",
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
            fontSize: 18,
          }}
        >
          Already have account?{" "}
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: "blue",
            }}
          >
            Login
          </Text>
        </Text>
      </LinearGradient>
    </ScrollView>
  );
}
