import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [gameName, setGameName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [activeHunts, setActiveHunts] = useState([]);
  const [completedHunts, setCompletedHunts] = useState([]);
  const [update, setUpdate] = useState(false);
  const isAuthenticated = !!token;
  const authenticate = async (token) => {
    setToken(token);
    AsyncStorage.setItem("appToken", JSON.stringify(token));
    const gameName = await AsyncStorage.getItem("gameName");
    setGameName(gameName);
  };

  const logout = () => {
    setToken(null);
    AsyncStorage.removeItem("appToken");
  };

  const value = {
    token,
    isAuthenticated,
    authenticate,
    logout,
    gameName,
    setGameName,
    userEmail,
    setUserEmail,
    activeHunts,
    setActiveHunts,
    completedHunts,
    setCompletedHunts,
    update,
    setUpdate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
