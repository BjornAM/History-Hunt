import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, Button } from "react-native";
import { AuthContext } from "../store/AuthContext";

import Trophys from "../components/MyIcons";
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

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={require("../images/bjorn.jpg")}
          style={styles.profileImage}
        />
        {/* https://i.postimg.cc/wTrknr04/bjorn.jpg */}
        <Text>Björn</Text>
      </View>
      <Text style={styles.text}>Active Hunts:</Text>
      <Pressable>
        <Text>Bygga funktion för Hunts som andra bjuder in till</Text>
        <Text>Hunt 2</Text>
        <Text>Hunt 3</Text>
      </Pressable>
      <Text style={styles.text}>Planned Hunts</Text>
      <Pressable onPress={() => console.log("Pressed")}>
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
        {/* Bygga funktion för att trophys ska bli ifyllda när Hunts är avklarade. "trophy-filled" */}
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
