import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native";
import { getCurrentPositionAsync } from "expo-location";

import OutlinedButton from "../ui/OutlinedButton";
import SmLoadingOverlay from "../ui/LoadingOverlay";
import { createLocationUrl, getReadableAddress } from "../../util/location";
import { useNavigation, useRoute } from "@react-navigation/native";

const LocationPicker = ({ locationHandler }) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  // console.log("rad 14 pickedLocation:", pickedLocation); //1a undefined 2a {"lat": undefined, "lng": undefined}

  useEffect(() => {
    if (route.params && route.params.latitude && route.params.longitude) {
      setPickedLocation({
        lat: route.params.latitude,
        lng: route.params.longitude,
      });
      console.log("rad 22 pickedLocation:", pickedLocation);
    }
  }, [route]);

  useEffect(() => {
    const getAddressOfLocation = async () => {
      if (pickedLocation) {
        const address = await getReadableAddress(pickedLocation);
        locationHandler({ ...pickedLocation, address });
      }
      console.log("rad 32 pickedLocation:", pickedLocation);
    };
    getAddressOfLocation();
  }, [pickedLocation, locationHandler]);

  const getLocation = async () => {
    setLoading(true);
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    // console.log("rad 43 pickedLocation:", pickedLocation); // Loggas i loop efter ett tag
    // console.log("rad 44 location:", location); // Loggas i loop efter ett tag
    setLoading(false);
  };

  // console.log("getlocation:", getLocation()); // funktionen loggas inte först sen loopar följande: {"_h": 0, "_i": 0, "_j": null, "_k": null}

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let previewContent = <Text>No picked location yet.</Text>;

  if (pickedLocation) {
    previewContent = (
      <Image
        style={styles.mapPreview}
        source={{ uri: createLocationUrl(pickedLocation) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.preview}>{previewContent}</View>
      {/* <Text>{JSON.stringify(loading)}</Text> */}
      <View style={styles.buttonsContainer}>
        <OutlinedButton icon="location" pressHandler={getLocation}>
          Locate user
          {loading && (
            <SmLoadingOverlay
              active={loading}
              message="Locating user..."
            ></SmLoadingOverlay>
          )}
        </OutlinedButton>
        <OutlinedButton icon="map" pressHandler={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    width: "100%",
    height: 175,
    backgroundColor: "#3489eb",
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
  mapPreview: {
    width: "85%",
    height: "85%",
  },
});

export default LocationPicker;
