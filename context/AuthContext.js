import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    // Perform your authentication logic here, for example, using an API call
    // If authentication is successful, set the userToken in AsyncStorage
    await AsyncStorage.setItem("userToken", "yourAuthTokenHere");
    setUserToken("yourAuthTokenHere");
    setIsLoading(false);
  };

  const signout = async () => {
    setIsLoading(true);
    // Remove the userToken from AsyncStorage
    await AsyncStorage.removeItem("userToken");
    setUserToken(null);
    setIsLoading(false);
  };

  const isLoggedIn = () => {
    return !!userToken;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        login,
        signout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
