const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const authenticate = async (mode, username, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      returnSecureToken: true,
    }),
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  const data = await response.json();
  return data;
};

export const signupUser = (email, password, username) => {
  return authenticate("signUp", username, email, password);
};

export const signinUser = (email, password) => {
  return authenticate("signInWithPassword", username, email, password);
};
