import { useState, useCallback } from "react";
import { Text, View, TextInput, ScrollView, StyleSheet } from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button2 from "../ui/Button2.js";

const PlaceForm = () => {
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  const changeTitleHandler = (text) => {
    setTitle(text);
  };

  const imageHandler = (uri) => {
    setImage(uri);
  };

  const locationHandler = useCallback((coords) => {
    setLocation(coords);
  }, []);

  const submitHandler = () => {
    console.log(title, location);
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={title}
        />

        <ImagePicker imageHandler={imageHandler} />
        <LocationPicker locationHandler={locationHandler} />
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
