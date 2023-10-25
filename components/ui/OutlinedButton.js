import { Ionicons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet } from "react-native";

const OutlinedButton = ({ pressHandler, icon, children, color }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={pressHandler}
    >
      <Ionicons style={styles.icon} name={icon} size={18} color={color} />
      <Text>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: "black",
  },
});

export default OutlinedButton;
