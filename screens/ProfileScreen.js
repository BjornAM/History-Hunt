import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, Button } from "react-native";
import { AuthContext } from "../store/AuthContext";

import Trophys from "../components/ui/TrophyIcon";
import IconButton from "../components/ui/IconButton";

const ProfileScreen = ({ navigation }) => {
  const [message, setMessage] = useState(null);

  const authCtx = useContext(AuthContext);
  const { gameName, activeHunts } = authCtx;

  editProfilePicHandler = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../images/bjorn.jpg")}
          style={styles.profileImage}
        />
        <IconButton icon={"pencil"} size={12} onPress={editProfilePicHandler} />

        <Text style={styles.gameName}>{gameName}</Text>
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
  profileContainer: {
    marginBottom: 50,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  gameName: {
    fontSize: 15,
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
