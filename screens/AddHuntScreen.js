import { View, StyleSheet } from "react-native";
import HuntForm from "../components/places/HuntForm.js";

const AddHuntScreen = ({ navigation, route }) => {
  const addPlaceHandler = (place) => {
    navigation.navigate("Planned Hunts", { place });
  };

  const huntLengthInput = route.params?.huntLengthInput || "";
  const huntNameInput = route.params?.huntNameInput || "";

  return (
    <View style={styles.container}>
      <HuntForm
        addPlaceHandler={addPlaceHandler}
        huntLengthInput={huntLengthInput}
        huntNameInput={huntNameInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddHuntScreen;
