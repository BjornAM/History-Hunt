import { FlatList, View, Text, StyleSheet } from "react-native";

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
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 18,
  },
});

export default PlacesList;
