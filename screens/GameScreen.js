import { useState } from "react";
import { View } from "react-native";

import GameMap from "../components/game/GameMap.js";
import StartHunter from "../components/game/StartHunter.js";

const GameScreen = ({ route, navigation }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const { huntData } = route.params;

  const { lat, lng } = huntData.places[0].location;
  console.log("huntData:", huntData);

  const startGame = () => {
    console.log("started game");
    setGameStarted(true);
  };

  const quitGame = () => {
    setGameStarted(false);
    navigation.navigate("Profile");
  };

  return (
    <View>
      {gameStarted ? (
        <GameMap
          quitGame={quitGame}
          gameLocations={huntData.places}
          navigation={navigation}
          title={huntData.title}
        />
      ) : (
        <StartHunter startGame={startGame} firstLocation={{ lat, lng }} />
      )}
    </View>
  );
};

export default GameScreen;
