import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <View style={styles.topBackgroung}>
      <View style={styles.background}>
        <View>
          <View style={styles.profile}>
            <Image
              source={require("../assets/tomato.png")}
              style={styles.img}
            />
          </View>

          <View style={styles.bottom}>
            <View style={styles.direction}>
              <Text style={styles.txt1}> Name</Text>
              <Text style={styles.txt2}>Ahmed Anwer</Text>
            </View>
            <View style={styles.direction}>
              <Text style={styles.txt1}>E-mail</Text>
              <Text style={styles.txt2}>ahmedanwer0094@gmail.com</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  topBackgroung: {
    height: hp(20),
    backgroundColor: "#EEEDDE",
    borderBottomEndRadius: hp(9),
    borderBottomStartRadius: hp(10),
  },
  background: {
    backgroundColor: "#E0DDAA",
    height: hp(15),
    borderBottomEndRadius: hp(25),
    borderBottomStartRadius: hp(25),
  },

  icon: {
    fontSize: 28,
    width: 32,
  },
  profile: {
    alignItems: "center",
  },
  img: {
    height: hp(16),
    width: hp(16),
    borderRadius: hp(10),
    borderWidth: 3,
    borderColor: "grey",
  },
  name: {
    fontSize: 21,
    marginTop: 4,
    color: "#404070",
    fontFamily: "Futura",
  },
  username: {
    fontSize: 15,
    marginTop: 4,
    color: "#5f5f5f",
  },
  direction: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 1,
    paddingBottom: hp(3),
    alignItems: "center",
    marginHorizontal: hp(2),
    justifyContent: "space-between",
  },
  editText: {
    fontSize: 13,
    alignSelf: "flex-end",
    marginHorizontal: hp(3),
    color: "#404070",
    marginVertical: hp(2),
  },
  edit: {
    fontSize: 18,
  },
  bottom: {
    marginTop: 80,
  },
  txt1: {
    fontSize: 18,
    marginHorizontal: 7,
    color: "#404070",
  },
  txt2: {
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 7,
    color: "#5f5f5f",
    alignSelf: "flex-end",
  },
});
