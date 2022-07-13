import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Vibration,
} from "react-native";

import ExerciseComponent from "../components/ExerciseComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WorkoutScreen = ({
  navigation,
  numWorkout,
  workoutList,
  setWorkoutList,
}) => {
  const [workoutName, setWorkoutName] = useState("Workout Name");
  const [exercisesArr, setExercisesArr] = useState([["Exercise Name", 0]]);
  // Each array inside the arrays (weights & reps), represents an exercise's sets.
  const [weights, setWeights] = useState([[null]]);
  const [reps, setReps] = useState([[null]]);
  const [isDoneArr, setIsDoneArr] = useState([[false]]);

  const TENTH_SECOND_MS = 50;

  // useEffect(() => {
  //   let tempWorkoutList = [...workoutList];
  //   tempWorkoutList[numWorkout] = [workoutName, exercisesArr.length, ""];
  //   setWorkoutList(tempWorkoutList);
  // }, [workoutName, exercisesArr]);

  const AddExercise = () => {
    let tempWeights = [...weights];
    tempWeights.push([null]);
    setWeights(tempWeights);

    let tempReps = [...reps];
    tempReps.push([null]);
    setReps(tempReps);

    let tempExercise = [...exercisesArr];
    tempExercise.push(["Exercise Name", exercisesArr.length]);
    setExercisesArr(tempExercise);

    let tempIsDone = [...isDoneArr];
    tempIsDone.push([false]);
    setIsDoneArr(tempIsDone);

    Vibration.vibrate(TENTH_SECOND_MS);
  };

  const DeleteExercise = (numExercise) => {
    let tempExerciseArr = [...exercisesArr];
    let tempWeights = [...weights];
    let tempReps = [...reps];
    let tempIsDone = [...isDoneArr];

    tempWeights.splice(numExercise, 1);
    tempReps.splice(numExercise, 1);
    tempExerciseArr.splice(numExercise, 1);
    tempIsDone.splice(numExercise, 1);

    setExercisesArr(tempExerciseArr);
    setWeights(tempWeights);
    setReps(tempReps);
    setIsDoneArr(tempIsDone);
  };

  const storeWorkoutData = async () => {
    try {
      await AsyncStorage.multiSet(
        ["Workout", workoutName],
        ["Exercises", exercisesArr]
      );
    } catch (error) {
      // Error saving data
    }
  };

  const retrieveExerciseData = async () => {
    try {
      const value = await AsyncStorage.getItem();
      if (value !== null) {
        // We have data!!
        // console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.screenHeader}>
          <TextInput
            style={styles.screenHeaderText}
            placeholder="Workout Name"
            placeholderTextColor="#2494f0"
            onChangeText={(newText) => setWorkoutName(newText)}
          ></TextInput>
        </View>

        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle} multiline={true}>
            NOTES
          </Text>
          <TextInput style={styles.notesText}></TextInput>
        </View>
        {/* {console.log(exercisesArr)} */}
        {exercisesArr.map((exercise, i) => {
          // console.log("\n\n", i, "-->", exercise);
          return (
            <ExerciseComponent
              key={i}
              name={exercise[0]}
              numExercise={i}
              delExercise={DeleteExercise}
              weights={weights}
              setWeights={setWeights}
              reps={reps}
              setReps={setReps}
              isDoneArr={isDoneArr}
              setIsDoneArr={setIsDoneArr}
            />
          );
        })}

        <View style={styles.addExerciseContainer}>
          <TouchableOpacity onPress={AddExercise}>
            <Text style={styles.addExerciseText}>ADD EXERCISE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // Adding justifyContent or alignItems here will cause a bug with scrollView
    flex: 1,
    backgroundColor: "white", //"#525252",
  },
  screenHeader: {
    paddingLeft: 14,
    paddingTop: "16%",
    paddingBottom: "12%",
    alignItems: "flex-start",
  },
  screenHeaderText: {
    fontSize: 22,
    color: "#2494f0",
  },
  notesContainer: {
    flexDirection: "row",
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: "center",
  },
  notesTitle: {
    flex: 1,
  },
  notesText: {
    flex: 5,
    borderRadius: 5,
    backgroundColor: "#dedede",
    paddingLeft: 3,
    paddingRight: 5,
  },
  addExerciseContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
    paddingBottom: 300,
  },
  addExerciseText: {
    fontSize: 16,
    color: "#2494f0",
  },
});

export default WorkoutScreen;
