import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { AuthContext } from "../store/AuthContext";

import Trophys from "../components/ui/TrophyIcon";
import IconButton from "../components/ui/IconButton";
import { getData } from "../util/database.js";

const ProfileScreen = ({ navigation }) => {
  const [huntTitles, setHuntTitles] = useState([]);
  const [allData, setAllData] = useState([]);

  const authCtx = useContext(AuthContext);
  const { gameName, activeHunts, setActiveHunts, completedHunts } = authCtx;

  editProfileImgHandler = () => {};

  const addActiveHunt = (title) => setActiveHunts([...activeHunts, title]);
  console.log("activeHunts:", activeHunts);

  useEffect(() => {
    getData("hunts").then((data) => {
      const huntTitlesArray = [];
      const allDataArray = [];

      Object.keys(data).forEach((huntKey, index) => {
        const huntData = data[huntKey];
        if (huntData.title) {
          huntTitlesArray.push(huntData.title);
          allDataArray.push(huntData);
        }
      });
      setAllData(allDataArray);
      setHuntTitles(huntTitlesArray);
    });
  }, [setAllData, activeHunts, completedHunts]);

  const ActiveHunts = () => {
    return (
      <View>
        {activeHunts.map((title, index) => (
          <View key={index} style={styles.hunts}>
            <Text
              onPress={() => {
                navigateToHunt(index);
              }}
              style={styles.title}
            >
              {title}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const PlannedHunts = () => {
    const plannedHunts = huntTitles.filter(
      (title) => !activeHunts.includes(title) && !completedHunts.includes(title)
    );

    return (
      <View>
        {plannedHunts.map((title, index) => (
          <View key={index} style={styles.hunts}>
            <Text
              onPress={() => {
                navigateToHunt(index);
                addActiveHunt(title);
              }}
              style={styles.title}
            >
              {title}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const CompletedHunts = () => {
    return (
      <View>
        {completedHunts.map((title, index) => (
          <View key={index} style={styles.hunts}>
            <Text style={styles.title}>{title}</Text>
          </View>
        ))}
        <View style={styles.medalsContainer}>
          <Trophys />
          {/* Bygga funktion för att trophys ska bli ifyllda när Hunts är avklarade. "trophy-filled" Ionicons har både tomma och ifyllda ikoner*/}
        </View>
      </View>
    );
  };

  const navigateToCreateHunt = () => {
    navigation.navigate("Create Hunt");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../images/bjorn.jpg")}
          style={styles.profileImage}
        />
        <IconButton icon={"pencil"} size={12} onPress={editProfileImgHandler} />
        <Text style={styles.gameName}>{gameName}</Text>
      </View>
      <View>
        <Button
          onPress={() => navigateToCreateHunt()}
          title="Create Hunt"
        ></Button>
        <Text style={styles.title}>Planned Hunts</Text>
        <PlannedHunts />
        <Text style={styles.title}>Active Hunts</Text>
        <ActiveHunts />
        <Text style={styles.title}>Completed Hunts</Text>
        <CompletedHunts />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  profileContainer: {
    marginBottom: 50,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  gameName: {
    fontSize: 15,
  },
  medalsContainer: {
    marginTop: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  button: {
    margin: 10,
  },
});

export default ProfileScreen;
