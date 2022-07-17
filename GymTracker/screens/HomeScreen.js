import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

import WorkoutComponent from "../components/WorkoutComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

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
      <ScrollView style={styles.scrollContainer}>
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
          <Text>Create Workout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 2,
  },
  workoutListContainer: {
    flex: 3,
    paddingTop: "20%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  createWorkoutContainer: {
    width: "16%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: "#90c6f5",
  },
});

export default HomeScreen;
