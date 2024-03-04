import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React, { useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const navigation = useNavigation();
  const { setUser, user } = useContext(AuthContext);

  const logOut = () => {
    const clearToken = async () => {
      try {
        await AsyncStorage.removeItem("token");
        setUser(null);
      } catch (error) {
        console.error("Failed to clear token:", error);
      }
    };
    clearToken();
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.topBackgroung}>
      <Text style={styles.profileText}> Profile</Text>
      <View style={styles.background}>
        <View>
          <View style={styles.profile}>
            <Image
              source={require("../assets/tomato.png")}
              style={styles.img}
            />
          </View>
          {user === "temp" ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#102C57",
                flexDirection: "row",
                height: 50,
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 30,
                marginLeft: 30,
                marginRight: 30,
                borderRadius: 20,
                marginTop: 100,
              }}
              onPress={() => {
                setUser(null);
              }}
            >
              <Text style={styles.text}>Log In to an Account</Text>
              <Icon name="log-in" style={styles.iconInner} />
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.bottom}>
                <View style={styles.direction}>
                  <Text style={styles.txt1}> Name</Text>
                  <Text style={styles.txt2}>{user && user.name}</Text>
                </View>
                <View style={styles.direction}>
                  <Text style={styles.txt1}>E-mail</Text>
                  <Text style={styles.txt2}>{user && user.email}</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 30,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Text
                  style={{ fontSize: 22, fontWeight: "bold", color: "#014070" }}
                >
                  Highest Score : {user && user.score}
                </Text>
              </View>
              <View style={styles.container2}>
                <TouchableOpacity
                  style={styles.box}
                  onPress={() => {
                    logOut();
                  }}
                >
                  <Text style={styles.text}>Log Out</Text>
                  <Icon name="log-out" style={styles.iconInner} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  topBackgroung: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    height: 200,
    backgroundColor: "#102C57",
    borderBottomEndRadius: hp(9),
    borderBottomStartRadius: hp(10),
  },
  profileText: {
    fontSize: 30,
    fontWeight: "900",
    color: "white",

    marginLeft: "auto",
    marginRight: "auto",
  },
  iconInner: {
    fontSize: 25,
    color: "white",
  },
  icon: {
    fontSize: 28,
    width: 32,
  },
  text: {
    fontSize: 20,
    fontWeight: "900",
    color: "white",
    letterSpacing: 0.1,
  },
  profile: {
    alignItems: "center",
    marginTop: 20,
  },
  img: {
    height: 130,
    width: 130,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "grey",
  },
  name: {
    fontSize: 21,
    marginTop: 4,
    color: "#404070",
  },
  username: {
    fontSize: 15,
    marginTop: 4,
    color: "#5f5f5f",
  },
  container2: {
    marginTop: 70,
    marginLeft: "auto",
    marginRight: "auto",
    width: "60%",
    backgroundColor: "red",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  box: {
    flexDirection: "row",
    height: hp(6),
    borderBottomColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: hp(2),
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
    marginTop: 30,
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
