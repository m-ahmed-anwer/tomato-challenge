import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        console.log(token);
        if (token) {
          // Perform automatic login using the token
          const response = await fetch(
            "http://localhost:3000/users/verifyToken",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setUser(data);
          } else {
            // Token is invalid or expired
            await AsyncStorage.removeItem("authToken");
            setUser(null);
          }
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
