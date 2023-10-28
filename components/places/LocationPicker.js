import { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import * as Location from "expo-location";

import OutlinedButton from "../../components/ui/OutlinedButton";
import LoadingOverlay from "../ui/LoadingOverlay";
import { createLocationUrl } from "../../util/location";
import { useNavigation } from "@react-navigation/native";

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState();
  const [permission, requestPermission] = Location.useForegroundPermissions();
  const navigation = useNavigation();

  if (!permission) {
    return (
      <View>
        <LoadingOverlay message={"checking for your local permission ..."} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show your location.</Text>
        <Button onPress={requestPermission} title="grant local permission" />
      </View>
    );
  }

  const getLocationHandler = async () => {
    const location = await Location.getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let previewContent = <Text>No picked location yet.</Text>;
  if (pickedLocation) {
    previewContent = (
      <Image
        style={styles.preview}
        source={{ uri: createLocationUrl(pickedLocation) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.preview}>{previewContent}</View>
      <View style={styles.buttonsContainer}>
        <OutlinedButton icon="location" pressHandler={getLocationHandler}>
          Locate user
        </OutlinedButton>
        <OutlinedButton icon="map" pressHandler={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    width: "100%",
    height: 175,
    backgroundColor: "beige",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 1,
  },
  // map: {
  //   width: "100%",
  //   height: "100%",
  // },
});

export default LocationPicker;
