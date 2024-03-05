import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function LeaderboardUsers({ item, index }) {
  const { name, score } = item;

  let icon;

  switch (index) {
    case 0:
      icon = "🥇";
      break;
    case 1:
      icon = "🥈";
      break;
    case 2:
      icon = "🥉";
      break;
    default:
      icon = "";
  }

  return (
    <View style={styles.topBox}>
      <Text style={styles.title1}>
        <Text style={{ fontSize: 40 }}>{icon}</Text>
        {name}
      </Text>
      <Text style={styles.score1}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBox: {
    flex: 1,
    height: 80,
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: "white",
    flexDirection: "row",

    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5,
  },
  title1: {
    fontSize: 18,
    fontWeight: "700",
    color: "#232e56",
    marginLeft: "auto",
    marginRight: "auto",
  },
  score1: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
