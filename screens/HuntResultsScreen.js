import { useEffect, useState, useContext } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import PlacesList from "../components/places/PlacesList";
import Button from "../components/ui/Button";
import { addNewData, storeHunt } from "../util/database";

import { AuthContext } from "../store/AuthContext";

const HuntResultsScreen = ({ navigation, route }) => {
  const [places, setPlaces] = useState([]);
  const [huntTitle, setHuntTitle] = useState("");

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const place = route.params?.place;
    if (place) {
      setPlaces((prev) => [...prev, place]);
    }
  }, [route]);

  const saveHunt = () => {
    console.log("Save Hunt button clicked");

    const placesWithoutImageUri = places.map((place) => {
      const { imageUri, ...placesWithoutImageUri } = place;
      return placesWithoutImageUri;
    });
    console.log("Places without image URI:", placesWithoutImageUri);

    const postData = { title: huntTitle, places: placesWithoutImageUri };
    console.log("Post data:", postData);

    storeHunt("hunts", authCtx.postData);
    setPlaces([]);
    setHuntTitle("");

    authCtx.setUpdate(!authCtx.update);

    navigation.navigate("Profile");
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Hunt Title"
        onChangeText={setHuntTitle}
      />
      <PlacesList styles={styles.placesList} places={places} />
      {/* <Text>{JSON.stringify(places)}</Text> */}
      <Button style={styles.saveHuntButton} onPress={saveHunt}>
        Save Hunt
      </Button>
    </View>
  );
};

export default HuntResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  input: {
    fontSize: 16,
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    opacity: 0.8,
  },
  placesList: {
    alignContent: "center",
    alignItems: "center",
  },
  saveHuntButton: {
    paddingBottom: 10,
  },
});
