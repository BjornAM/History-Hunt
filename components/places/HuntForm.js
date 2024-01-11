import { useState, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import LocationPickerHunt from "./LocationPickerHunt";
import { addNewData } from "../../util/database.js";
import Button2 from "../ui/Button2.js";

const HuntForm = ({
  addPlaceHandler,
  huntLengthInput,
  huntNameInput,
  navigation,
}) => {
  const [location, setLocation] = useState();
  const [pickedLocation, setPickedLocation] = useState(null);

  const locationHandler = useCallback((locationInfo) => {
    try {
      setLocation(locationInfo);
    } catch (error) {
      console.error("Error setting location:", error);
    }
  }, []);

  const saveHuntHandler = async () => {
    const dataToSave = {
      huntLength: huntLengthInput,
      huntName: huntNameInput,
      location: pickedLocation,
    };
    addNewData(location, dataToSave, authCtx.userEmail);
    navigation.navigate("Planned Hunts", {
      dataToPass: dataToSave,
    });
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Hunt Length:</Text>
        <TextInput style={styles.textValue}>{huntLengthInput}</TextInput>

        <Text style={styles.label}>Hunt Name:</Text>
        <TextInput style={styles.textValue}>{huntNameInput}</TextInput>
        <LocationPickerHunt locationHandler={locationHandler} />
        <Button2 pressHandler={saveHuntHandler}>Save Hunt</Button2>
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
});

export default HuntForm;
