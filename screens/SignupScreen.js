import { useContext, useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import * as http from "../util/http";
import { AuthContext } from "../store/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const authenticationHandler = async ({ email, password, username }) => {
    setIsAuthenticating(true);

    try {
      const data = await http.signupUser(email, password, username);
      const token = data.idToken;

      authCtx.authenticate(token);
      authCtx.setGameName(data.username);

      await AsyncStorage.setItem("gameName", username);
    } catch (error) {
      console.log(error);
      alert("Wrong credentials");
    }
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={authenticationHandler} />;
};

export default SignupScreen;
