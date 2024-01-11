import { View, Text, StyleSheet, Image } from "react-native";
import { createLocationUrl, getReadableAddress } from "../../util/location.js";

import Button from "../ui/Button";

const StartHunter = ({ startGame, firstLocation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: createLocationUrl(firstLocation) }}
      />

      <Text style={styles.title}>Start the game by clicking the button</Text>
      <Button onPress={startGame}>Start</Button>
    </View>
  );
};

export default StartHunter;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
  },
});
