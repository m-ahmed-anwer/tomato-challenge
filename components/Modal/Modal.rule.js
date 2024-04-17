import { View, Text, Modal, SafeAreaView, Platform } from "react-native";
import React from "react";
import { ThemedButton } from "react-native-really-awesome-button";

export default function RuleModal({
  ruleModalVisible,
  setRuleModalVisible,
  ruleButtonPress,
}) {
  return (
    <Modal
      transparent={true}
      visible={ruleModalVisible}
      onRequestClose={() => {
        setRuleModalVisible(!ruleModalVisible);
      }}
    >
      <SafeAreaView
        style={{
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
            height: "auto",
            backgroundColor: "white",
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 20,
            marginTop: 20,
            padding: 20,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 23,
              fontWeight: "600",
              color: "#102C57",
              marginBottom: 15,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Rules
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "#102C57",
              marginBottom: 10,
            }}
          >
            🍅 Find the Numbers: Your goal is to identify these hidden numbers
            within the tomatoes. You have 1 minute for each equation on easy
            mode, 45 seconds on medium mode, and 30 seconds on hard mode.
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "#102C57",
              marginBottom: 10,
            }}
          >
            🍅🔍 The Challenge: Can you find the hidden numbers within the time
            limit? Hone your math skills and enjoy the Tomato Mystery Challenge
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "#102C57",
              marginBottom: 10,
            }}
          >
            💔 Losing Hearts: Lose all hearts, and the challenge ends. Maintain
            accuracy and speed to keep your hearts.
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "#102C57",
              marginBottom: 10,
            }}
          >
            🏆 Leaderboard: Complete challenges to earn a spot on the
            leaderboard. Compete with others and showcase your tomato-solving
            skills.
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "#102C57",
              marginBottom: 10,
            }}
          >
            🚪 Logout: You can logout anytime by selecting "Logout" from the
            profile using navigation menu.
          </Text>
        </View>
        <ThemedButton
          onPress={ruleButtonPress}
          style={{
            marginTop: 30,
            marginLeft: "auto",
            marginRight: "auto",
          }}
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
            START GAME
          </Text>
        </ThemedButton>
      </SafeAreaView>
    </Modal>
  );
}
