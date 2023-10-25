import { Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AntDesignButton = ({ icon, size, color, pressHandler }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={pressHandler}
    >
      <AntDesign name={icon} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});

export default AntDesignButton;
