import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { AuthStack, AppTab } from "../routes/Routes";

function AppNav() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user === null ? <AuthStack /> : <AppTab />}
    </NavigationContainer>
  );
}

export default AppNav;
