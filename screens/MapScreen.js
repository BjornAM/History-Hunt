import { useState, useLayoutEffect, useCallback } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/ui/IconButton";

const MapScreen = ({ navigation }) => {
  const [pickedLocation, setPickedLocation] = useState();

  const savePickedLocation = useCallback(() => {
    console.log("save button pressed");
    if (!pickedLocation) {
      Alert.alert(
        "No location selected",
        "You have to pick a location in order to save"
      );
      return;
    }
    navigation.navigate("Add Place", pickedLocation);
  }, [navigation, pickedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          pressHandler={savePickedLocation}
        />
      ),
    });
  }, [navigation, savePickedLocation]);

  const pressHandler = (event) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setPickedLocation({ latitude, longitude });
  };

  const initialRegion = {
    latitude: 57.70887,
    longitude: 11.97456,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView
      style={styles.container}
      initialRegion={initialRegion}
      onPress={pressHandler}
    >
      {pickedLocation && <Marker coordinate={pickedLocation} />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
