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
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const response = await fetch(
            "http://localhost:3000/users/verifyToken/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTQ4ZWQ0MTM4ZDZiM2VmNGQ2MDdjNyIsImlhdCI6MTcwOTU0MTk1MCwiZXhwIjoxNzA5ODAxMTUwfQ.La1XJSFg1m7VrpoKT7KPijNcc6G6muZOb0Abh0zX7DE"
          );
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error checking token:", error);
        setIsLoading(false);
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
