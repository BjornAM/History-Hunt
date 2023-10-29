import axios from "axios";
import Config from "react-native-config";

API_KEY = Config.env.API_KEY;

const authenticate = async (mode, email, password) => {
  const resp = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  return resp.data.idToken;
};

export const signupUser = (email, password) => {
  return authenticate("signUp", email, password);
};

export const signinUser = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};
