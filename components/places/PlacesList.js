import { FlatList, View, Text, StyleSheet } from "react-native";
import PlaceItem from "../places/PlaceItem.js";

const PlacesList = ({ places }) => {
  if (!places || places < 1) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 18,
  },
});

export default PlacesList;
