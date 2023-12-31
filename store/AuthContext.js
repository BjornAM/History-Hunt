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
  const [activeHunts, setActiveHunts] = useState([]);
  const isAuthenticated = !!token;
  const authenticate = (token) => {
    setToken(token);
    AsyncStorage.setItem("appToken", token);
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
    activeHunts,
    setActiveHunts,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
