import { Picker } from "@react-native-picker/picker";

import React, { useState, useEffect } from "react";
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
  const [game, setGame] = useState({
    score: 0,
    api: null,
  });
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://marcconrad.com/uob/tomato/api.php");
      const data = await response.json();
      setGame({ ...game, api: data });
      setSeconds(60);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [game.score]);

  const increaseScore = () => {
    setGame((prevState) => ({
      ...prevState,
      score: prevState.score + 1,
    }));
  };

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
        style={{ height: "100%", alignItems: "center" }}
      >
        <View
          style={{
            //flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 30,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Score : {game.score && game.score}
          </Text>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginLeft: 30 }}>
            Timer : {seconds}s
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Remaining Lives : ❤️❤️❤️
          </Text>
        </View>

        <Image
          source={{
            uri: game.api && game.api.question ? game.api.question : null,
          }}
          style={{ width: 340, height: 180, marginTop: 20 }}
        />

        <Text
          style={{
            color: "#00c900",
            fontWeight: "bold",
            marginTop: 20,
            fontSize: 18,
          }}
        >
          Its Correct ✅
        </Text>
        <Text
          style={{
            color: "#ef4444",
            fontWeight: "bold",
            marginTop: 20,
            fontSize: 18,
          }}
        >
          The Correct Answer is {game.api && game.api.solution}
        </Text>

        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            marginTop: 20,
            fontSize: 18,
          }}
        >
          Select the Answer
        </Text>
        {/* <Picker
          style={{
            backgroundColor: "#EDEDED",
            borderRadius: 9000,
            borderBottomWidth: 10,
            borderBottomColor: "#5f5f5f",
          }}
          selectedValue={value}
          onValueChange={(itemValue) => setValue(itemValue)}
          itemStyle={{ height: 135 }}
        >
          {data}
        </Picker> */}

        <ThemedButton
          onPress={() => {
            increaseScore();
            //navigation.navigate("");
          }}
          style={{ marginTop: 40 }}
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
            Submit
          </Text>
        </ThemedButton>
      </LinearGradient>
    </ScrollView>
  );
}
