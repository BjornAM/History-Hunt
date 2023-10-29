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
import LocationPickerMap from "./LocationPickerMap.js";
import Place from "../../models/place.js";
import Button2 from "../ui/Button2.js";

const PlaceForm = ({ addPlaceHandler }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  const titleHandler = (text) => {
    setTitle(text);
  };

  const imageHandler = (uri) => {
    setImage(uri);
  };

  const locationHandler = useCallback((locationInfo) => {
    try {
      setLocation(locationInfo);
    } catch (error) {
      console.error("Error setting location:", error);
    }
  }, []);

  const submitHandler = () => {
    console.log("Title:", title);
    console.log("Image:", image);
    console.log("Location:", location);

    const place = new Place(title, image, location);
    addPlaceHandler(place);
    setTitle("");
    setImage(null);
    setLocation(null);
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={titleHandler}
          value={title}
        />

        <ImagePicker imageHandler={imageHandler} />
        <LocationPickerMap locationHandler={locationHandler} />
        <Button2 pressHandler={submitHandler}>Save</Button2>
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
