import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { AppTab, AuthTab } from "../Tab";
import { AuthContext } from "../context/AuthContext";

export default function AppNav() {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user === null ? <AuthTab /> : <AppTab />}
    </NavigationContainer>
  );
}
