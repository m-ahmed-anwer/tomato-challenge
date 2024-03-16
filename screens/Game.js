import { Picker } from "@react-native-picker/picker";
import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { ThemedButton } from "react-native-really-awesome-button";
import { LinearGradient } from "expo-linear-gradient";
import RuleModal from "../components/Modal.rule";
import ScoreModal from "../components/Modal.score";
import { AuthContext } from "../context/AuthContext";
import { Score } from "../classes/Score";
import { Heart } from "../classes/Heart";

///Get the instance of the classes
const score = new Score();
const heart = new Heart();

export default function Game() {
  const number = Array.from({ length: 10 }, (_, i) => i);

  const [rulesCheck, setRulesCheck] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [ruleModalVisible, setRuleModalVisible] = useState(true);
  const [value, setValue] = useState(1);
  const [game, setGame] = useState({});
  const [checkValue, setCheckValue] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initial, setInitial] = useState(false);
  const [timer, setTimer] = useState(11);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const { user, setUser } = useContext(AuthContext);

  /**
   * Starts the game timer.
   */
  const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            checkAnswer();
            return prevTimer;
          }
        });
      }, 1000);
      setIsRunning(true);
    }
  };

  /**
   * Stops the game timer.
   */
  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  /**
   * Resets the game timer, score, and lives.
   */
  const resetTimer = () => {
    setTimer(11);
    score.setScore(0);
    heart.setLives();
    stopTimer();
  };

  /**
   * Updates the user's score in the database.
   */

  const updateDB = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/updateScore/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score: score.getScore() }),
        }
      );
      if (!response.ok) {
        Alert.alert("Eror :(", "Score updating score");
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      Alert.alert("Eror :(", error);
    }
  };
  /**
   * Handles the rule button press to start the game.
   */
  const ruleButtonPress = () => {
    setTimeout(() => {
      setRuleModalVisible(!ruleModalVisible);
      setRulesCheck(false);
      setInitial(false);
      fetchData();
      heart.setLives();
    }, 50);
  };
  /**
   * Fetches a new game question from the API.
   */

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://marcconrad.com/uob/tomato/api.php");
      const data = await response.json();
      setGame(data);
      setTimer(11);
      startTimer();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Eror :(", error);
    }
  };
  /**
   * Checks the user's answer and updates the game state accordingly.
   */
  const checkAnswer = () => {
    console.log(game.solution);
    if (parseInt(game.solution) === parseInt(value)) {
      setCorrect(true);
      score.increaseScore();
      setCheckValue(null);
    } else {
      setCheckValue(game.solution);
      heart.decreaseLives();
      setCorrect(false);
    }
    if (heart.lives === 0) {
      setModalVisible(true);
      return;
    }
    fetchData();
    setInitial(true);
  };
  /**
   * Handles the modal button press to close the modal and update the game state.
   */

  const modalButtonPress = () => {
    setTimeout(() => {
      if (user !== "temp" && score.getScore() > user.score) {
        updateDB(score.getScore());
      }
      resetTimer();
      heart.setLives();
      fetchData();
      setInitial(false);
      setModalVisible(!modalVisible);
    }, 50);
  };

  // Generates Picker items for numbers 0-9 to select the answer
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
                      Timer : {timer}s
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
                      style={{ marginVertical: 90 }}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: game && game.question ? game.question : null,
                      }}
                      style={{ width: "90%", height: "25%", marginTop: 20 }}
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
