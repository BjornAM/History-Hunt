import { useState, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import ImagePicker from "../camera/ImagePicker.js";
import LocationPicker from "./LocationPicker.js";
import Place from "../../models/place.js";
import Button2 from "../ui/Button2.js";

const PlaceForm = ({ addPlaceHandler }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  const imageHandler = (uri) => {
    setImage(uri);
  };

  const locationHandler = useCallback((locationInfo) => {
    setLocation(locationInfo);
  }, []);

  const savePlace = () => {
    const place = new Place(title, image, location);
    console.log(place);
    addPlaceHandler(place);
    setTitle("");
    setImage();
    setLocation();
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={setTitle} value={title} />
        <ImagePicker imageHandler={imageHandler} />
        <LocationPicker locationHandler={locationHandler} />
        <Button2 pressHandler={savePlace}>Save</Button2>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 5,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: "white",
    fontSize: 16,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});

export default PlaceForm;
