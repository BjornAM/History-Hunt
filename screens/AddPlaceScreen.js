import PlaceForm from "../components/places/PlaceForm";

const AddPlaceScreen = ({ navigation }) => {
  const addPlaceHandler = (place) => {
    navigation.navigate("All Places", { place });
  };
  return <PlaceForm addPlaceHandler={addPlaceHandler} />;
};

export default AddPlaceScreen;
