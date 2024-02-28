// import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  //   const login = (email, password) => {
  //     setIsLoading(true);
  //     firebase
  //       .auth()
  //       .signInWithEmailAndPassword(email, password)
  //       .catch((error) => {
  //         alert(error.message);
  //       })
  //       .then(() => {
  //         setUserToken(firebase.auth().currentUser.uid);
  //         AsyncStorage.setItem("userToken", firebase.auth().currentUser.uid);
  //       });
  //     setIsLoading(false);
  //   };

  //   const signout = () => {
  //     setIsLoading(true);
  //     setUserToken(null);
  //     AsyncStorage.removeItem("userToken");
  //     setIsLoading(false);
  //   };

  //   const isLoggedIn = async () => {
  //     try {
  //       setIsLoading(true);
  //       let userToken = AsyncStorage.getItem("userToken");
  //       setUserToken(userToken);
  //       setIsLoading(false);
  //     } catch (e) {
  //       alert(e);
  //     }
  //   };

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
