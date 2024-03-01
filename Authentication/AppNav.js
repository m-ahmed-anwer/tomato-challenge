import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { AppTab, AuthTab } from "../Tab";
import { AuthContext } from "../context/AuthContext";

export default function AppNav() {
  const { user } = useContext(AuthContext);

  const isLoading = true;

  if (isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>;
  }
  return (
    <NavigationContainer>
      {user === null ? <AuthTab /> : <AppTab />}
    </NavigationContainer>
  );
}
