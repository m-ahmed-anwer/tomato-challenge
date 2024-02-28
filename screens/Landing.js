import { ThemedButton } from "react-native-really-awesome-button";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
export default function Landing() {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "#fcfcfd" }}>
      <View style={styles.top}>
        <Image
          className="rounded-3xl"
          source={require("../assets/tomato3.png")}
          style={{ width: 300, height: 200, marginTop: 10 }}
        />
      </View>

      <View style={styles.firstCon}>
        <View style={styles.SecondCon}>
          <View style={styles.container}>
            <ThemedButton
              onPress={() => {
                setTimeout(() => {
                  navigation.navigate("Login");
                }, 50);
              }}
              className="mt-6 "
              name="bruce"
              type="anchor"
            >
              <Text
                style={{ fontFamily: "sans-serif" }}
                className="text-black text-2xl font-bold"
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
              className="mt-6 "
              name="bruce"
              type="anchor"
            >
              <Text
                style={{ fontFamily: "sans-serif" }}
                className="text-black text-2xl font-bold"
              >
                SIGN UP
              </Text>
            </ThemedButton>

            <ThemedButton
              onPress={() => {
                setTimeout(() => {
                  navigation.navigate("Login");
                }, 50);
              }}
              className="mt-6 "
              name="bruce"
              type="secondary"
            >
              <Text
                style={{ fontFamily: "sans-serif" }}
                className="text-black text-xl font-bold"
              >
                PLAY AS GUEST
              </Text>
            </ThemedButton>
          </View>
        </View>
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
    fontFamily: "Hiragino Sans",
  },
  title2: {
    fontSize: 40,
    fontWeight: "500",
    fontFamily: "Futura",
  },
  title3: {
    marginLeft: -30,
    fontSize: 40,
    transform: [{ rotate: "-90deg" }],
    fontWeight: "600",
    fontFamily: "Noteworthy",
  },
  firstCon: {
    height: "90%",
    backgroundColor: "#0aa2ff",
    borderTopEndRadius: hp(25),
    borderTopStartRadius: hp(25),
    marginTop: 10,
  },
  SecondCon: {
    marginTop: 70,
    height: "100%",
    backgroundColor: "#55d2ff",
    borderTopEndRadius: hp(20),
    borderTopStartRadius: hp(20),
  },
  container: {
    marginVertical: 65,

    borderTopEndRadius: hp(15),
    borderTopStartRadius: hp(15),
    height: "100%",
    backgroundColor: "#00d2ff",
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
