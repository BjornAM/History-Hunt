import { View, Image, Pressable, Text, StyleSheet } from "react-native";
import { createLocationUrl } from "../../util/location";

const PlaceItem = ({ place, pressHandler }) => {
  // console.log("place item", place);
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={pressHandler}
    >
      <View>
        <Image style={styles.image} source={{ uri: place.imageUri }} />
        <Image
          style={styles.preview}
          source={{ uri: createLocationUrl(place.location) }}
        />
        <View style={styles.info}>
          {/* <Text>{createLocationUrl(place.location)}</Text> */}
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place.address}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  preview: {
    width: "100%",
    height: 175,
    backgroundColor: "#3489eb",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
});

export default PlaceItem;
