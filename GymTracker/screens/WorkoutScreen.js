import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";

import BackComponent from "../components/BackComponent";
import ExerciseComponent from "../components/ExerciseComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

const WorkoutScreen = ({ navigation, route }) => {
  const [states, setStates] = useState({
    workoutName: "",
    exercisesArr: [""],
    weights: [[""]],
    reps: [[""]],
    restTimers: [""],
    isDoneArr: [[false]],
    originalWorkoutName: "",
    prevWeights: [[""]],
    prevReps: [[""]],
  });

  const [seconds, setSeconds] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const TWENTYTH_SECOND_MS = 50;

  useEffect(() => {
    loadWorkoutData();

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const addExercise = () => {
    let exercisesArr = [...states.exercisesArr];
    exercisesArr.push("");

    let weights = [...states.weights];
    weights.push([""]);

    let reps = [...states.reps];
    reps.push([""]);

    let restTimers = [...states.restTimers];
    restTimers.push("");

    let isDoneArr = [...states.isDoneArr];
    isDoneArr.push([false]);

    setStates({
      ...states,
      exercisesArr,
      weights,
      reps,
      restTimers,
      isDoneArr,
    });
  };

  const deleteExercise = (idx) => {
    if (states.exercisesArr.length <= 1) {
      setStates({
        ...states,
        exercisesArr: [""],
        weights: [[""]],
        reps: [[""]],
        restTimers: [""],
        isDoneArr: [[false]],
      });
    } else {
      let exercisesArr = [...states.exercisesArr];
      exercisesArr.splice(idx, 1);

      let weights = [...states.weights];
      weights.splice(idx, 1);

      let reps = [...states.reps];
      reps.splice(idx, 1);

      let restTimers = [...states.restTimers];
      restTimers.splice(idx, 1);

      let isDoneArr = [...states.isDoneArr];
      isDoneArr.splice(idx, 1);

      setStates({
        ...states,
        exercisesArr,
        weights,
        reps,
        restTimers,
        isDoneArr,
      });
    }
  };

  const setExercisesArr = (exercisesArr) => {
    setStates({
      ...states,
      exercisesArr,
    });
  };

  const setWeights = (weights) => {
    setStates({
      ...states,
      weights,
    });
  };

  const setReps = (reps) => {
    setStates({
      ...states,
      reps,
    });
  };

  const setRestTimers = (restTimers) => {
    setStates({
      ...states,
      restTimers,
    });
  };

  const setIsDoneArr = (isDoneArr) => {
    setStates({
      ...states,
      isDoneArr,
    });
  };

  const setWorkoutName = (workoutName) => {
    setStates({
      ...states,
      workoutName,
    });
  };

  const switchLock = () => {
    setIsLocked(!isLocked);
  };

  const storeWorkoutData = async () => {
    try {
      await AsyncStorage.setItem(
        states.workoutName.toString(),
        JSON.stringify([
          states.exercisesArr,
          states.weights,
          states.reps,
          states.restTimers,
          states.isDoneArr,
        ])
      );
      if (
        states.originalWorkoutName !== states.workoutName &&
        states.originalWorkoutName !== ""
      )
        AsyncStorage.removeItem(states.originalWorkoutName.toString());
    } catch (error) {
      // Error saving data
      console.log("ERROR SAVING WORKOUT DATA");
      throw error;
    }
  };

  const loadWorkoutData = async () => {
    try {
      console.log("loading workoutscreen data for:", route.params.name);
      const unparsedWorkoutData = await AsyncStorage.getItem(route.params.name);

      if (unparsedWorkoutData !== null) {
        // We have data!
        const workoutData = JSON.parse(unparsedWorkoutData);

        setStates({
          workoutName: route.params.name.toString(),
          exercisesArr: workoutData[0],
          weights: workoutData[1],
          reps: workoutData[2],
          restTimers: workoutData[3],
          // isDoneArr gets reset to false for every set
          isDoneArr: workoutData[4].map((exer, i) =>
            exer.map((set, i) => false)
          ),
          originalWorkoutName: route.params.name.toString(),
          prevWeights: workoutData[1],
          prevReps: workoutData[2],
        });
      }
    } catch (error) {
      // Error retrieving data
      console.log("ERROR LOADING DATA:", error);
      throw error;
    }
  };

  const styles = StyleSheet.create({
    container: {
      // Adding justifyContent or alignItems here will cause a bug with scrollView
      backgroundColor: "#ededed",
      flex: 1,
    },
    screenHeader: {
      flex: 1,
      marginTop: "14%",
      marginBottom: "8%",
      marginHorizontal: "4%",
      paddingVertical: "3%",
      borderRadius: 10,
      flexDirection: "row",
      backgroundColor: "#2494f0", //"white",
    },
    screenTitleContainer: {
      paddingLeft: "6%",
    },
    screenTitleText: {
      fontSize: 18,
      color: "white", //"#2494f0",
    },
    backContainer: {
      flex: 1,
    },
    lockContainer: {
      paddingHorizontal: 15,
    },
    notesContainer: {
      flexDirection: "row",
      paddingHorizontal: "3%",
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
      marginVertical: "7%",
      marginHorizontal: 80,
      backgroundColor: "#43a2f0",
      height: 40,
      borderRadius: 30,
    },
    addExerciseText: {
      fontSize: 18,
      color: "white",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View>
          <View style={styles.screenHeader}>
            <View style={styles.screenTitleContainer}>
              <TextInput
                style={styles.screenTitleText}
                placeholder="WORKOUT NAME"
                placeholderTextColor="#90c6f5"
                onChangeText={(newText) => setWorkoutName(newText)}
                autoCapitalize="characters"
                value={states.workoutName}
              ></TextInput>
            </View>

            <View style={styles.backContainer}>
              <BackComponent
                navigation={navigation}
                storeWorkoutData={storeWorkoutData}
                workoutName={states.workoutName}
                originalWorkoutName={states.originalWorkoutName}
              />
            </View>

            <View style={styles.lockContainer}>
              <TouchableOpacity onPress={switchLock}>
                <Feather
                  name={isLocked ? "lock" : "unlock"}
                  color="white"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle} multiline={true}>
            NOTES
          </Text>
          <TextInput style={styles.notesText}></TextInput>
        </View>

        {states.exercisesArr.map((exercise, i) => {
          // console.log("\n\n", i, "-->", exercise);
          return (
            <ExerciseComponent
              key={i}
              name={exercise}
              numExercise={i}
              restTimers={states.restTimers}
              setRestTimers={setRestTimers}
              seconds={seconds}
              delExercise={deleteExercise}
              exercisesArr={states.exercisesArr}
              setExercisesArr={setExercisesArr}
              prevWeights={states.prevWeights}
              weights={states.weights}
              setWeights={setWeights}
              prevReps={states.prevReps}
              reps={states.reps}
              setReps={setReps}
              isDoneArr={states.isDoneArr}
              setIsDoneArr={setIsDoneArr}
              isLocked={isLocked}
            />
          );
        })}

        {!isLocked && (
          <TouchableOpacity
            style={styles.addExerciseContainer}
            onPress={addExercise}
          >
            <Text style={styles.addExerciseText}>ADD EXERCISE</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutScreen;
