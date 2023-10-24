import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function CreateHuntScreen() {
  const [huntLengthInput, setHuntLengthInput] = useState("");
  const [huntNameInput, setHuntNameInput] = useState("");

  const navigation = useNavigation();
  const handleContinuePress = () => {
    navigation.navigate("Pic Places");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Customize</Text>
      <Text>How long should it be?</Text>
      <TextInput
        style={styles.huntLengthInput}
        placeholder="3 hours? 2days? You pick."
        value={huntLengthInput}
        onChangeText={setHuntLengthInput}
      />
      <Text>What do you want to call your hunt?</Text>
      <TextInput
        style={styles.huntNameInput}
        placeholder="Name"
        value={huntNameInput}
        onChangeText={setHuntNameInput}
      />
      <Button title="Continue" onPress={() => handleContinuePress()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  heading: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 40,
  },
  huntLengthInput: {
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    width: 250,
    marginBottom: 10,
    padding: 5,
  },
  huntNameInput: {
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    width: 250,
    marginBottom: 10,
    padding: 5,
  },
});

export default CreateHuntScreen;
