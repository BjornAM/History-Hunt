import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const SmLoadingOverlay = ({ message }) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});

export default SmLoadingOverlay;
