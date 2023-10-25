import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, Button } from "react-native";
import { AuthContext } from "../store/AuthContext";

import Trophys from "../components/ui/TrophyIcon";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [message, setMessage] = useState(null);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(
        "https://historyhunt-ac39f-default-rtdb.europe-west1.firebasedatabase.app/test.json?auth=" +
          authCtx.token
      )
      .then((resp) => {
        setMessage(resp.data);
      });
  }, []);

  const navigation = useNavigation();
  const handleCreateHuntPress = () => {
    navigation.navigate("Create Hunt");
  };
  const handleActiveHuntsPress = () => {
    navigation.navigate("Active Hunts");
  };

  const handlePlannedHuntsPress = () => {
    navigation.navigate("Planned Hunts");
  };

  const handleAllPlacesPress = () => {
    navigation.navigate("All Places");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={require("../images/bjorn.jpg")}
          style={styles.profileImage}
        />

        <Text>Björn</Text>
        <Button
          style={styles.button}
          title="All Places"
          onPress={() => handleAllPlacesPress()}
        />
      </View>
      <Pressable onPress={() => handleActiveHuntsPress()}>
        <Text style={styles.text}>Active Hunts:</Text>
        <Text>Bygga funktion för Hunts som andra bjuder in till</Text>
        <Text>Hunt 2</Text>
        <Text>Hunt 3</Text>
      </Pressable>

      <Pressable onPress={() => handlePlannedHuntsPress()}>
        <Text style={styles.text}>Planned Hunts:</Text>
        <Text>Här ska byggas funktion för egengjorda Hunts att synas</Text>
        <Text>Hunt B</Text>
        <Text>Hunt C</Text>
      </Pressable>
      <Button
        style={styles.button}
        title="Create Hunt"
        onPress={() => handleCreateHuntPress()}
      />
      <View style={styles.medalsContainer}>
        <Text style={styles.text}>Medals:</Text>
        <Trophys />
        {/* Bygga funktion för att trophys ska bli ifyllda när Hunts är avklarade. "trophy-filled" Ionicons har både tomma och ifyllda ikoner*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  profileImageContainer: {
    marginBottom: 50,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  medalsContainer: {
    marginTop: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  button: {
    margin: 10,
  },
});

export default ProfileScreen;
