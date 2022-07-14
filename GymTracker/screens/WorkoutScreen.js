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

import BackComponent from "../components/BackComponent";
import ExerciseComponent from "../components/ExerciseComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadAsync } from "expo-font";

const WorkoutScreen = ({ navigation, route }) => {
  // const { name } = route.params;
  // try {
  //   console.log(route.params.name);
  // } catch {
  //   console.log("param error");
  // }

  const [workoutName, setWorkoutName] = useState("Workout Name");
  const [exercisesArr, setExercisesArr] = useState([["", 0]]);
  // Each array inside the arrays (weights & reps), represents an exercise's sets.
  const [weights, setWeights] = useState([[null]]);
  const [reps, setReps] = useState([[null]]);
  const [isDoneArr, setIsDoneArr] = useState([[false]]);
  const [restTimers, setRestTimers] = useState([null]);

  const TWENTYTH_SECOND_MS = 50;

  useEffect(() => {
    loadWorkoutData();
  }, []);

  const AddExercise = () => {
    let tempWeights = [...weights];
    tempWeights.push([null]);
    setWeights(tempWeights);

    let tempReps = [...reps];
    tempReps.push([null]);
    setReps(tempReps);

    let tempExercise = [...exercisesArr];
    tempExercise.push(["", exercisesArr.length]);
    setExercisesArr(tempExercise);

    let tempIsDone = [...isDoneArr];
    tempIsDone.push([false]);
    setIsDoneArr(tempIsDone);

    let tempRestTimers = [...restTimers];
    tempRestTimers.push(null);
    setRestTimers(tempRestTimers);

    Vibration.vibrate(TWENTYTH_SECOND_MS);
  };

  const deleteExercise = (numExercise) => {
    if (exercisesArr.length <= 1) {
      setExercisesArr([["", 0]]);
      setWeights([[null]]);
      setReps([[null]]);
      setIsDoneArr([[false]]);
      setRestTimers([null]);
    } else {
      let tempExerciseArr = [...exercisesArr];
      let tempWeights = [...weights];
      let tempReps = [...reps];
      let tempIsDone = [...isDoneArr];
      let tempRestTimers = [...restTimers];

      tempWeights.splice(numExercise, 1);
      tempReps.splice(numExercise, 1);
      tempExerciseArr.splice(numExercise, 1);
      tempIsDone.splice(numExercise, 1);
      tempRestTimers.splice(numExercise, 1);

      setExercisesArr(tempExerciseArr);
      setWeights(tempWeights);
      setReps(tempReps);
      setIsDoneArr(tempIsDone);
      setRestTimers(tempRestTimers);
    }

    Vibration.vibrate(TWENTYTH_SECOND_MS);
  };

  const storeWorkoutData = async () => {
    try {
      await AsyncStorage.setItem(workoutName, [
        exercisesArr,
        weights,
        reps,
        restTimers,
      ]);
    } catch (error) {
      // Error saving data
      console.log("ERROR SAVING DATA");
    }
  };

  const loadWorkoutData = async () => {
    try {
      console.log("loading data");
      const workoutData = await AsyncStorage.getItem(route.params.name);
      if (value !== null) {
        setExercisesArr(workoutData[0]);
        setWeights(workoutData[1]);
        setReps(workoutData[2]);
        setRestTimers(workoutData[3]);
      }
    } catch (error) {
      // Error retrieving data
      console.log("ERROR LOADING DATA");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.screenHeader}>
          <View style={styles.screenTitleContainer}>
            <TextInput
              style={styles.screenTitleText}
              placeholder="WORKOUT NAME"
              placeholderTextColor="#90c6f5"
              onChangeText={(newText) => setWorkoutName(newText)}
              autoCapitalize="characters"
            ></TextInput>
          </View>

          <View style={styles.backContainer}>
            <BackComponent navigation={navigation} />
          </View>
        </View>

        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle} multiline={true}>
            NOTES
          </Text>
          <TextInput style={styles.notesText}></TextInput>
        </View>

        {exercisesArr.map((exercise, i) => {
          // console.log("\n\n", i, "-->", exercise);
          return (
            <ExerciseComponent
              key={i}
              name={exercise[0]}
              numExercise={i}
              restTimers={restTimers}
              setRestTimers={setRestTimers}
              delExercise={deleteExercise}
              exercisesArr={exercisesArr}
              setExercisesArr={setExercisesArr}
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
    flex: 1,
    paddingLeft: 14,
    paddingTop: "16%",
    paddingBottom: "12%",
    flexDirection: "row",
  },
  screenTitleContainer: {},
  screenTitleText: {
    fontSize: 18,
    color: "#2494f0",
  },
  backContainer: {
    flex: 1,
    paddingRight: 10,
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
    paddingTop: 50,
    paddingBottom: 300,
  },
  addExerciseText: {
    fontSize: 18,
    color: "#2494f0",
  },
});

export default WorkoutScreen;
