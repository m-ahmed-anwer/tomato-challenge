import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/AuthContext";
import AppNav from "./Authentication/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
