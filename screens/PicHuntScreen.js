import { useState, useLayoutEffect, useCallback } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AntDesignButton from "../components/ui/AntDesignButton";

const PicHuntScreen = ({ navigation }) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [markers, setMarkers] = useState([]);
  const initialRegion = {
    latitude: 57.70887,
    longitude: 11.97456,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const firstMarker = markers[0];

  const savePickedLocation = useCallback(() => {
    if (!pickedLocation) {
      Alert.alert("No location selected!");
      return;
    }

    navigation.navigate("Add Hunt", pickedLocation);
  }, [navigation, pickedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <AntDesignButton
          icon="save"
          size={24}
          color={tintColor}
          pressHandler={savePickedLocation}
        />
      ),
    });
  }, [navigation, savePickedLocation, markers]);

  const pressHandler = (event) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    const newMarker = {
      id: markers.length + 1,
      title: "New Marker",
      coordinate: { latitude, longitude },
    };
    if (markers.length === 0) {
      setMarkers([newMarker]);
      setPickedLocation({ latitude, longitude });
    } else {
      setMarkers([...markers, newMarker]);
    }
  };

  return (
    <MapView
      style={styles.container}
      initialRegion={initialRegion}
      onPress={pressHandler}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={marker.coordinate}
          title={marker.title}
        />
      ))}
      {pickedLocation && (
        <Marker coordinate={pickedLocation} title="Your picked location" />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PicHuntScreen;
