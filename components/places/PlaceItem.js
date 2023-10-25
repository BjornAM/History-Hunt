import { View, Image, Pressable } from "react-native";

const PlaceItem = ({ place, pressHandler }) => {
  return (
    <Pressable onPress={pressHandler}>
      <View>
        <Image source={{ uri: place.imageUri }} />
        <View>
          <Text>{place.title}</Text>
          <Text>{place.address}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
