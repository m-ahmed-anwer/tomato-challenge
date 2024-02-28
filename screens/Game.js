import { Picker } from "@react-native-picker/picker";

import React, { useState } from "react";
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

export default function Game() {
  const number = [0, 1, 2, 4, 5, 6, 7, 8, 9];
  const navigation = useNavigation();
  const [value, setValue] = useState(1);
  const [game, setGame] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch("https://marcconrad.com/uob/tomato/api.php");
      const data = await response.json();
      setGame(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  fetchData;

  const data = number.map((item) => (
    <Picker.Item key={item} label={item.toString()} value={item} />
  ));

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <LinearGradient
        colors={["#F8F0E5", "#F8F0f5", "#e8F0E5"]}
        className="h-full  items-center  "
      >
        <Image
          source={{ uri: game.question }}
          style={{ width: 340, height: 180, marginTop: 20 }}
        />

        <Text className="text-[#00c900] font-bold mt-5 text-lg">
          Its Correct ✅
        </Text>
        <Text className="text-red-500 font-bold mt-5 text-lg">
          The Correct Answer is {game.solution}
        </Text>

        <Text className="text-black font-bold mt-5 text-lg">
          Select the Answer
        </Text>
        <Picker
          style={{
            backgroundColor: "#EDEDED",
            borderRadius: 5,
            borderBottomWidth: 1,
            borderBottomColor: "#5f5f5f",
          }}
          selectedValue={value}
          onValueChange={(itemValue) => setValue(itemValue)}
          itemStyle={{ height: 135 }}
          height={200}
        >
          {data}
        </Picker>

        <ThemedButton
          onPress={() => {
            setTimeout(() => {
              navigation.navigate("Signup");
            }, 50);
          }}
          className="mt-10"
          name="bruce"
          type="anchor"
        >
          <Text
            style={{ fontFamily: "sans-serif" }}
            className="text-black text-2xl font-bold"
          >
            Submit
          </Text>
        </ThemedButton>
      </LinearGradient>
    </ScrollView>
  );
}
