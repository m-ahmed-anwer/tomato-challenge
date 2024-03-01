import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { AuthContext } from "./AuthContext";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { AppTab, AuthTab } from "../Tab";

export default function AppNav() {
  //   const { isLoading, userToken } = useContext(AuthContext);
  const userToken = null;
  const isLoading = true;

  if (isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>;
  }
  return (
    <NavigationContainer>
      {userToken === null ? <AuthTab /> : <AppTab />}
    </NavigationContainer>
  );
}
