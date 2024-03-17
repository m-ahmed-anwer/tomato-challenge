import { View, Text, Modal, SafeAreaView, Platform, Image } from "react-native";
import React from "react";
import { ThemedButton } from "react-native-really-awesome-button";

export default function ScoreModal({
  modalVisible,
  setModalVisible,
  score,
  modalButtonPress,
}) {
  return (
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
            source={require("../../assets/images/ribbon.png")}
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
            Your Final Score is {score}
          </Text>
          <ThemedButton
            onPress={modalButtonPress}
            style={{
              marginTop: 50,
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
              Restart Game
            </Text>
          </ThemedButton>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
