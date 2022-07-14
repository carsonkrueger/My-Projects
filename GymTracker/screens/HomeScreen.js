import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import WorkoutComponent from "../components/WorkoutComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation, route }) => {
  // [ [ NAME OF WORKOUT, NUM EXERCISES, LAST TIME DID WORKOUT ], ... ]
  // const [workoutList, setWorkoutList] = useState([["", 0, ""]]);
  const [workoutList, setWorkoutList] = useState([]);

  useEffect(() => {
    loadWorkoutData;
  }, []);

  const loadWorkoutData = async () => {
    try {
      const workouts = await AsyncStorage.getAllKeys();
      if (value !== null) {
        // We have data!!
        // let workoutNames = [];
        // workouts.map((workout, i) => {workoutNames.push(workout)})
        console.log(workouts);
        setWorkoutList(workouts);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error retrieving data");
    }
    console.log("NO DATA TO LOAD");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.workoutContainer}>
        {workoutList.map((workout, i) => {
          return (
            <WorkoutComponent
              key={i}
              navigation={navigation}
              name={workout[0]}
            />
          );
        })}
      </View>

      <View style={styles.createWorkoutContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("WorkoutScreen", { name: null })}
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
  workoutContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  createWorkoutContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Home;
