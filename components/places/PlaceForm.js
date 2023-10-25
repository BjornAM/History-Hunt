import { Text, View, TextInput, ScrollView, StyleSheet } from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = () => {
  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
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
