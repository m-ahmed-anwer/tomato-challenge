import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext({
  user: null,
  setUser: () => null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkToken = async () => {
      try {
        let token = await AsyncStorage.getItem("token");
        if (token) {
          token = token.replace(/['"]+/g, "");
          const response = await fetch(
            `http://localhost:3000/users/verifyToken/${token}`
          );
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
