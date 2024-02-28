import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function LeaderboardUsers(props) {
  const { id, name, score } = props.item;
  let imageSource;

  switch (id) {
    case 1:
      imageSource = require("../assets/1.jpg");
      break;
    case 2:
      imageSource = require("../assets/2.jpg");
      break;
    case 3:
      imageSource = require("../assets/3.jpg");
      break;
    default:
      imageSource = null;
  }

  return (
    <View style={styles.topBox}>
      {imageSource ? (
        <View style={styles.secondBox}>
          <Image source={imageSource} style={styles.img} />
          <View style={[styles.secondBox, { marginLeft: "15%" }]}>
            <Text style={imageSource ? styles.title : styles.title1}>
              {name}
            </Text>
            <Text style={imageSource ? styles.score : styles.score1}>
              {score}
            </Text>
          </View>
        </View>
      ) : (
        <>
          <Text style={imageSource ? styles.title : styles.title1}>{name}</Text>
          <Text style={imageSource ? styles.score : styles.score1}>
            {score}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topBox: {
    flex: 1,
    height: 80,
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 30,
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
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#232e56",
    marginLeft: 20,
    marginRight: 20,
  },
  score1: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
    marginLeft: "auto",
    marginRight: "auto",
  },
  score: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
    marginLeft: 20,
    marginRight: 20,
  },
  secondBox: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: "auto",
    marginVertical: "auto",
    alignItems: "center",
  },
  img: {
    height: 50,
    width: 35,
    marginLeft: 20,
  },
  icon: {
    fontSize: 20,
    color: "#fb3958",
  },
  iconText: {
    fontSize: 15,
    color: "#232e56",
    marginTop: 5,
  },
});
