import { ThemedButton } from "react-native-really-awesome-button";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Landing() {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);

  return (
    <View style={{ backgroundColor: "#fcfcfd" }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "900",
          marginBottom: 10,
          marginTop: Platform.OS === "ios" ? 90 : 50,
          color: "#102C57",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Tomato Mystery Challenge
      </Text>
      <View style={styles.top}>
        <Image
          source={require("../assets/images/mystery.png")}
          style={{ width: 270, height: 230, marginTop: 40, borderRadius: 25 }}
        />
      </View>

      <View style={styles.container}>
        <ThemedButton
          onPress={() => {
            setTimeout(() => {
              navigation.navigate("Login");
            }, 50);
          }}
          style={{ marginTop: 65 }}
          name="bruce"
          type="anchor"
        >
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            LOGIN
          </Text>
        </ThemedButton>
        <ThemedButton
          onPress={() => {
            setTimeout(() => {
              navigation.navigate("Signup");
            }, 50);
          }}
          style={{ marginTop: 25 }}
          name="bruce"
          type="anchor"
        >
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            SIGN UP
          </Text>
        </ThemedButton>

        <ThemedButton
          onPress={() => {
            setTimeout(() => {
              setUser("temp");
            }, 60);
          }}
          style={{ marginTop: 25 }}
          name="bruce"
          type="secondary"
        >
          <Text
            style={{
              color: "black",
              fontSize: 19,
              fontWeight: "bold",
            }}
          >
            PLAY AS GUEST
          </Text>
        </ThemedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title1: {
    fontSize: 50,
    fontWeight: "600",
  },
  title2: {
    fontSize: 40,
    fontWeight: "500",
  },
  title3: {
    marginLeft: -30,
    fontSize: 40,
    transform: [{ rotate: "-90deg" }],
    fontWeight: "600",
  },

  container: {
    marginVertical: 100,
    borderTopEndRadius: hp(10),
    borderTopStartRadius: hp(10),
    height: "80%",
    backgroundColor: "#102C57",
    alignItems: "center",
  },
  bgBtn1: {
    marginTop: 40,
    backgroundColor: "#495371",
    borderRadius: 100,
    width: "50%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  btn1: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  bgBtn2: {
    marginTop: 40,
    borderColor: "#495371",
    borderWidth: 3,
    borderRadius: 100,
    width: "50%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  btn2: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
});
