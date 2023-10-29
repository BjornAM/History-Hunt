import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/core";

const HuntResultsScreen = ({ route }) => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const place = route.params?.place;

    if (place) {
      setPlaces((prev) => [...prev, place]); //setPlaces([...places, place])???
    }
  }, [route, isFocused]);

  return <PlacesList places={places} />;
};

export default HuntResultsScreen;
