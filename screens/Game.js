import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedButton } from "react-native-really-awesome-button";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Singleton Pattern
class Score {
  constructor() {
    if (!Score.instance) {
      this.score = 0;
      Score.instance = this;
    }
  }
  increaseScore() {
    this.score++;
  }
  getScore() {
    return this.score;
  }
  setScore(score) {
    this.score = score;
  }
}

//Design Pattern
class Heart {
  constructor() {
    if (!Heart.instance) {
      this.lives = 3;
      Heart.instance = this;
    }
  }
  decreaseLives() {
    this.lives--;
  }
  setLives() {
    this.lives = 3;
  }
}

const score = new Score();
const heart = new Heart();

export default function Game() {
  const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [value, setValue] = useState(1);
  const [game, setGame] = useState({
    api: null,
  });
  const [seconds, setSeconds] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkValue, setCheckValue] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initial, setInitial] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds < 0) {
          clearInterval(interval); // Stop the timer when it reaches 0
          return 0; // Set timer to 0
        } else {
          return seconds - 1; // Decrement timer by 1 second
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setInitial(false);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://marcconrad.com/uob/tomato/api.php");
      const data = await response.json();
      setGame({ ...game, api: data });
      setSeconds(60);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  const checkAnswer = () => {
    if (parseInt(game.api.solution) === parseInt(value)) {
      setSeconds(60);
      setCorrect(true);
      score.increaseScore();
    } else {
      setCheckValue(game.api.solution);
      heart.decreaseLives();
      setCorrect(false);
    }
    if (heart.lives === 0) {
      setInitial(false);
      setModalVisible(true);
      return;
    }

    setInitial(true);
    fetchData();
  };

  const data = number.map((item) => (
    <Picker.Item key={item} label={item.toString()} value={item} />
  ));

  return (
    <SafeAreaView style={{ backgroundColor: "#F8F0E5" }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "#F8F0E5",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "900",
              marginBottom: 10,
              marginTop: Platform.OS === "ios" ? 10 : 40,
              color: "#102C57",
              marginBottom: 10,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Tomato Mystery Challenge
          </Text>
          <View
            style={{
              height: 500,
              backgroundColor: "white",
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 50,
              marginTop: 60,
            }}
          >
            <Image
              source={require("../assets/ribbon.png")}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 30,
              }}
            />

            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
                color: "#102C57",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 30,
              }}
            >
              Congratulations
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#102C57",
                marginTop: 30,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Your Final Score is {score.score}
            </Text>
            <ThemedButton
              onPress={() => {
                setTimeout(() => {
                  score.setScore(0);
                  heart.setLives();
                  fetchData();
                  setModalVisible(!modalVisible);
                }, 50);
              }}
              style={{ marginTop: 50, marginLeft: "auto", marginRight: "auto" }}
              name="bruce"
              type="secondary"
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Restart Game
              </Text>
            </ThemedButton>
          </View>
        </SafeAreaView>
      </Modal>

      {!modalVisible && (
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "900",
              color: "#102C57",
              marginBottom: 10,
              marginTop: Platform.OS === "ios" ? 10 : 40,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Tomato Mystery Challenge
          </Text>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, height: "100%" }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <LinearGradient
              colors={["#F8F0E5", "#F8Faf5", "#e8F0E5"]}
              style={{ height: "100%", alignItems: "center" }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ fontSize: 22, fontWeight: "bold", marginLeft: 30 }}
                >
                  Score : {score.score}
                </Text>
                <Text
                  style={{ fontSize: 22, fontWeight: "bold", marginRight: 30 }}
                >
                  Timer : {seconds}s
                </Text>
              </View>
              <View
                style={{
                  marginTop: 25,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Remaining Lives :{"❤️".repeat(heart.lives)}
                </Text>
              </View>
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#102C57"
                  style={{ marginVertical: 82 }}
                />
              ) : (
                <Image
                  source={{
                    uri:
                      game.api && game.api.question ? game.api.question : null,
                  }}
                  style={{ width: 340, height: 180, marginTop: 20 }}
                />
              )}
              {initial && (
                <>
                  {correct && (
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
                  )}

                  {!correct && (
                    <Text
                      style={{
                        color: "#ef4444",
                        fontWeight: "bold",
                        marginTop: 20,
                        fontSize: 18,
                      }}
                    >
                      The Correct Answer is {checkValue}
                    </Text>
                  )}
                </>
              )}

              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginVertical: 15,

                  fontSize: 18,
                }}
              >
                Select the Answer
              </Text>

              <Picker
                style={{
                  backgroundColor: "#eFeFeF",
                  width: "80%",
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: "#5f5f5f",
                }}
                selectedValue={value}
                onValueChange={(itemValue) => {
                  setValue(itemValue);
                }}
                itemStyle={{ height: 120 }}
              >
                {data}
              </Picker>

              <ThemedButton
                onPress={() => {
                  checkAnswer();
                  // setModalVisible(true);
                  //increaseScore();
                  //navigation.navigate("");
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
                  Submit
                </Text>
              </ThemedButton>
            </LinearGradient>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
