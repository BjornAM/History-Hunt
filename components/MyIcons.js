import react from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default Trophys = () => {
  const trophyCount = 9;

  return (
    <View style={styles.trophyContainer}>
      {Array.from({ length: trophyCount }).map((_, index) => (
        <Ionicons key={index} style={styles.trophy} name="trophy-outline" />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  trophyContainer: {
    flexDirection: "row",
  },
  trophy: {
    fontSize: 30,
    marginHorizontal: 5,
  },
});
