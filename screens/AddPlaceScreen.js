import PlaceForm from "../components/places/PlaceForm";

const AddPlaceScreen = ({ navigation }) => {
  const addPlaceHandler = (place) => {
    navigation.navigate("Hunt Results", { place });
  };
  return <PlaceForm addPlaceHandler={addPlaceHandler} />;
};

export default AddPlaceScreen;
