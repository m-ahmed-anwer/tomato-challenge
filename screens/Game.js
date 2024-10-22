import { Picker } from "@react-native-picker/picker";
import React, { useState, useRef, useContext, useEffect } from "react";
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
import RuleModal from "../components/Modal/Modal.rule";
import ScoreModal from "../components/Modal/Modal.score";
import { AuthContext } from "../context/AuthContext";
import { Level } from "../classes/Level";

///Get the instance of the classes
const level = new Level();

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
  const [timer, setTimer] = useState(level.getTimerDuration());
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const { user, setUser } = useContext(AuthContext);

  // Starts the game timer.
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true); // Set isRunning to true before starting the interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear any existing interval
      }
      setTimer(level.getTimerDuration());
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            checkAnswer();
            clearInterval(intervalRef.current);
            setIsRunning(false); // Set isRunning to false when the timer reaches 0
            return prevTimer;
          }
        });
      }, 1000);
    }
  };

  // Stops the game timer.
  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  //  Resets the game timer, score, and lives.
  const resetTimer = () => {
    setTimer(level.getTimerDuration());
    level.reset();
    stopTimer();
  };

  // Updates the user's score in the database
  const updateDB = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/updateScore/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score: level.getScore() }),
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

  //Handles the rule button press to start the game.
  const ruleButtonPress = () => {
    resetTimer();
    setRulesCheck(false);
    setInitial(false);
    fetchData();
    setRuleModalVisible(false); // Change to false to close the modal
  };

  useEffect(() => {
    startTimer();
  }, [game]);

  //Fetches a new game question from the API.
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://marcconrad.com/uob/tomato/api.php");
      const data = await response.json();
      console.log(data.solution);
      setGame(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Eror :(", error);
    }
  };

  // Checks the user's answer and updates the game state accordingly.
  const checkAnswer = () => {
    stopTimer();

    if (parseInt(game.solution) === parseInt(value)) {
      setCorrect(true);
      level.increaseScore();
      setCheckValue(null);
    } else {
      setCheckValue(game.solution);
      level.decreaseLives();
      setCorrect(false);
    }
    if (level.lives === 0) {
      setModalVisible(true);
      return;
    }

    fetchData();
    setInitial(true);
  };

  //Handles the modal button press to close the modal and update the game state.
  const modalButtonPress = () => {
    setTimeout(() => {
      if (user !== "temp" && level.getScore() > user.score) {
        updateDB(level.getScore());
      }
      resetTimer();
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
    <SafeAreaView
      style={{
        backgroundColor:
          level.level === 2
            ? "#bddebd"
            : level.level === 3
            ? "#f5a2ab"
            : "#F8F0E5",
      }}
    >
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
            score={level.score}
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
                  colors={
                    level.level === 1
                      ? ["#F8F0E5", "#F8Faf5", "#e8F0E5"]
                      : level.level === 2
                      ? ["#bddebd", "#bddeaf", "#bddecd"]
                      : level.level === 3
                      ? ["#f5a2ab", "#f5a2ab", "#f3dce4"]
                      : []
                  }
                  style={{ height: "100%", alignItems: "center" }}
                >
                  <View
                    style={{
                      marginTop: 5,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                      }}
                    >
                      Level :{" "}
                      {level.level === 1
                        ? "Easy"
                        : level.level === 2
                        ? "Medium"
                        : "Hard"}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginLeft: 30,
                      }}
                    >
                      Score : {level.score}
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
                      marginTop: 15,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      Remaining Lives :{"❤️".repeat(level.lives)}
                    </Text>
                  </View>
                  {isLoading ? (
                    <ActivityIndicator
                      size="large"
                      color="#102C57"
                      style={{ marginVertical: 80 }}
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
                            marginTop: 10,
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
                            marginTop: 10,
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
                      marginVertical: 13,
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
                    style={{ marginTop: 20 }}
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
