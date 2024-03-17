import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { AuthStack, AppTab } from "../routes/Routes";

function AppNav() {
  const { user } = useContext(AuthContext);

  // const [isLoading, setIsLoading] = useState(false);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="small" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      {user === null ? <AuthStack /> : <AppTab />}
    </NavigationContainer>
  );
}

export default AppNav;
