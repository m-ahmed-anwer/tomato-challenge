import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect, useRef } from "react";
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
import Rule from "../components/Modal.rule";
import RuleModal from "../components/Modal.rule";
import ScoreModal from "../components/Modal.score";

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
  const [rulesCheck, setRulesCheck] = useState(true);
  const [ruleModalVisible, setRuleModalVisible] = useState(true);
  const [value, setValue] = useState(1);
  const [game, setGame] = useState({
    api: null,
  });
  const [seconds, setSeconds] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkValue, setCheckValue] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initial, setInitial] = useState(false);
  const [timerActive, setTimerActive] = useState(false); 

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerActive && seconds > 0) {
        setSeconds(seconds - 1);
      } else if (timerActive && seconds === 0) {
        heart.decreaseLives();
        setSeconds(10); // Reset the timer to 10 seconds
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, timerActive]);

  const reduceSeconds = () => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
  };

  const ruleButtonPress = () => {
    setTimeout(() => {
      setRuleModalVisible(!ruleModalVisible);
      setRulesCheck(false);
      setInitial(false);
      fetchData();
      setTimerActive(true); // Start the timer when the rule button is pressed
      reduceSeconds(); // Call reduceSeconds to reduce seconds when the rule button is pressed
    }, 50);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://marcconrad.com/uob/tomato/api.php");
      const data = await response.json();
      setGame({ ...game, api: data });
      setSeconds(10);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (heart.lives === 0) {
      setModalVisible(true);
      return;
    } else {
      fetchData();
    }
  }, [heart.lives]);

  const checkAnswer = () => {
    if (parseInt(game.api.solution) === parseInt(value)) {
      setCorrect(true);
      score.increaseScore();
      setCheckValue(null);
    } else {
      setCheckValue(game.api.solution);
      heart.decreaseLives();
      setCorrect(false);
    }
    if (heart.lives === 0) {
      setModalVisible(true);
      setSeconds(0);
      return;
    }
    setInitial(true);
    fetchData();
  };

  const modalButtonPress = () => {
    setTimeout(() => {
      score.setScore(0);
      heart.setLives();
      fetchData();
      setInitial(false);
      setModalVisible(!modalVisible);
    }, 50);
  };

  const data = number.map((item) => (
    <Picker.Item key={item} label={item.toString()} value={item} />
  ));

  return (
    <SafeAreaView style={{ backgroundColor: "#F8F0E5" }}>
      {rulesCheck ? (
        <View style={{ height: "100%" }}>
          <RuleModal
            ruleModalVisible={ruleModalVisible}
            setRuleModalVisible={setRuleModalVisible}
            ruleButtonPress={ruleButtonPress}
          />
        </View>
      ) : (
        <>
          <ScoreModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            modalButtonPress={modalButtonPress}
            score={score.score}
          />

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
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginLeft: 30,
                      }}
                    >
                      Score : {score.score}
                    </Text>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginRight: 30,
                      }}
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
                          game.api && game.api.question
                            ? game.api.question
                            : null,
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
        </>
      )}
    </SafeAreaView>
  );
}
