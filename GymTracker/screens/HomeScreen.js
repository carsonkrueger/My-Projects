import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";

import WorkoutComponent from "../components/WorkoutComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = ({ navigation, route }) => {
  // [ [ NAME OF WORKOUT, NUM EXERCISES, LAST TIME DID WORKOUT ], ... ]
  // const [workoutList, setWorkoutList] = useState([["", 0, ""]]);
  const [workoutList, setWorkoutList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    // AsyncStorage.clear();
    isFocused && loadHomescreenData();
  }, [isFocused]);

  const loadHomescreenData = async () => {
    try {
      const workoutNames = await AsyncStorage.getAllKeys();

      if (workoutNames !== null) {
        setWorkoutList(workoutNames);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error retrieving homescreen data");
      throw error;
    }
    // console.log("NO DATA TO LOAD");
  };

  const loadWorkoutSpecifics = async () => {
    try {
      await AsyncStorage.clear();
      let name = workoutList[0].toString();
      console.log("Specifics name:", name.toString());

      const unparsedWorkoutData = await AsyncStorage.getItem(name);
      const parsedData = JSON.parse(unparsedWorkoutData);
      await AsyncStorage.clear();
      console.log("\n--------------------\n", name, "\n", parsedData);
    } catch (error) {
      console.log("couldnt map through workout names");
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0, 2]}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenHeaderText}>WORKOUTS</Text>
        </View>

        <View style={styles.workoutListContainer}>
          {workoutList.map((workout, i) => {
            return (
              <WorkoutComponent
                key={i}
                navigation={navigation}
                name={workout}
              />
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.createWorkoutContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("WorkoutScreen", {
              name: "",
            })
          }
        >
          <Feather name="plus" color="white" size={25} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenHeader: {
    paddingTop: 50,
    paddingLeft: "5%",
    backgroundColor: "#90c6f5", //"white",
    paddingBottom: 10,
  },
  screenHeaderText: {
    fontSize: 20,
    color: "white", //"#2494f0",
  },
  scrollContainer: {
    flex: 2,
    paddingBottom: "10%",
  },
  workoutListContainer: {
    flex: 3,
    paddingTop: "2%",
    paddingBottom: "25%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  createWorkoutContainer: {
    position: "absolute",
    marginTop: windowHeight - 40,
    width: 70,
    marginHorizontal: windowWidth / 2 - 70 / 2,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#90c6f5",
  },
});

export default HomeScreen;
