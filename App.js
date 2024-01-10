import { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CreateHuntScreen from "./screens/CreateHuntScreen";
import PicHuntScreen from "./screens/PicHuntScreen";
import AddHuntScreen from "./screens/AddHuntScreen";
import AddPlaceScreen from "./screens/AddPlaceScreen";
import ActiveHuntsScreen from "./screens/ActiveHuntsScreen";
import PlannedHuntsScreen from "./screens/PlannedHuntsScreen";
import HuntResultsScreen from "./screens/HuntResultsScreen";
import MapScreen from "./screens/MapScreen";
import GameScreen from "./screens/GameScreen";

import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import IconButton from "./components/ui/IconButton";
import AntDesignButton from "./components/ui/AntDesignButton";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#3489eb" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#cae6e1" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#3489eb" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#cae6e1" },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Stack.Screen name="Create Hunt" component={CreateHuntScreen} />
      <Stack.Screen name="Plan the Hunt" component={PicHuntScreen} />
      <Stack.Screen name="Planned Hunts" component={PlannedHuntsScreen} />
      <Stack.Screen name="Add Hunt" component={AddHuntScreen} />
      <Stack.Screen name="Add Place" component={AddPlaceScreen} />
      <Stack.Screen name="Active Hunts" component={ActiveHuntsScreen} />
      <Stack.Screen name="Hunt Game" component={GameScreen} />

      <Stack.Screen
        name="Hunt Results"
        component={HuntResultsScreen}
        options={({ navigation }) => ({
          headerRight: ({ tintColor }) => (
            <AntDesignButton
              icon="plus"
              size={24}
              color={tintColor}
              pressHandler={() => navigation.navigate("Add Place")}
            />
          ),
        })}
      />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("appToken");
      if (token) {
        authCtx.authenticate(token);
      }
    };
    fetchToken();
  }, [authCtx]);

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
