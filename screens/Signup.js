import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
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
        className="h-full items-center  "
      >
        <Image
          source={require("../assets/tomato2.png")}
          className="rounded-full"
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
        <View className=" bg-white mx-10 rounded-full flex-row items-center mt-10">
          <Icon
            name="user-alt"
            style={{
              color: "#00d3fa",
              fontSize: 25,
              marginLeft: 15,
            }}
          />
          <TextInput
            className="flex-1 ml-3 h-12 text-xl placeholder:text-black placeholder:font-bold placeholder:text-xl"
            placeholder="Name"
            keyboardType="default"
          />
        </View>
        <View className=" bg-white mx-10 rounded-full flex-row items-center mt-10 ">
          <Icons
            name="email"
            style={{
              color: "#00d3fa",
              fontSize: 25,
              marginLeft: 15,
            }}
          />
          <TextInput
            className="flex-1 ml-3 h-12 text-xl placeholder:text-black placeholder:font-bold placeholder:text-xl"
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>
        <View className=" bg-white mx-10 rounded-full flex-row items-center mt-10">
          <Icon
            name="lock"
            style={{
              color: "#00d3fa",
              fontSize: 25,
              marginLeft: 15,
            }}
          />
          <TextInput
            className="flex-1 ml-3 h-12 text-xl placeholder:text-black placeholder:font-bold placeholder:text-xl"
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
          className="mt-10"
          name="bruce"
          type="anchor"
        >
          <Text className="text-black text-2xl font-bold">SIGN UP</Text>
        </ThemedButton>

        <Text className="text-white font-bold mt-5 text-lg">
          Already have account?{" "}
          <Text
            onPress={() => navigation.navigate("Login")}
            className="text-red-500"
          >
            Login
          </Text>
        </Text>
      </LinearGradient>
    </ScrollView>
  );
}
