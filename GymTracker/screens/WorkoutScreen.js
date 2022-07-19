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
  AppRegistry,
} from "react-native";

import BackComponent from "../components/BackComponent";
import ExerciseComponent from "../components/ExerciseComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WorkoutScreen = ({ navigation, route }) => {
  const [states, setStates] = useState({
    workoutName: "",
    exercisesArr: [""],
    weights: [[""]],
    reps: [[""]],
    restTimers: [""],
    isDoneArr: [[false]],
    originalWorkoutName: "",
  });
  // const [workoutName, setWorkoutName] = useState("");
  // const [exercisesArr, setExercisesArr] = useState([""]);
  // // Each array inside the arrays (weights & reps), represents an exercise's sets.
  // const [weights, setWeights] = useState([[""]]);
  // const [reps, setReps] = useState([[""]]);
  // const [restTimers, setRestTimers] = useState([""]);

  // const [prevWeights, setPrevWeights] = useState([[""]]);
  // const [prevReps, setPrevReps] = useState([[""]]);

  // const [isDoneArr, setIsDoneArr] = useState([[false]]);
  // const [seconds, setSeconds] = useState(0);
  // const [originalWorkoutName, setOriginalWorkoutName] = useState("");

  // const [workoutName, setWorkoutName] = useState(route.params.name.toString());
  // const [exercisesArr, setExercisesArr] = useState(route.params.workoutData[0]);
  // // Each array inside the arrays (weights & reps), represents an exercise's sets.
  // const [weights, setWeights] = useState(route.params.workoutData[1]);
  // const [reps, setReps] = useState(route.params.workoutData[2]);
  // const [restTimers, setRestTimers] = useState(route.params.workoutData[3]);

  // const [prevWeights, setPrevWeights] = useState([[""]]);
  // const [prevReps, setPrevReps] = useState([[""]]);

  // const [isDoneArr, setIsDoneArr] = useState([[false]]);
  const [seconds, setSeconds] = useState(0);
  // const [originalWorkoutName, setOriginalWorkoutName] = useState("");

  const TWENTYTH_SECOND_MS = 50;

  useEffect(() => {
    loadWorkoutData();
    //loadRouteWorkoutData();
    // setOriginalWorkoutName(workoutName);
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

  const checkUniqueWorkoutName = async () => {
    try {
      let workoutNames = await AsyncStorage.getAllKeys();
      workoutNames.map((names, i) => {
        if (names === workoutName || workoutName === "") {
          // not unique
          console.log(
            "WORKOUT NAME IS NOT UNIQUE OR EMPTY,",
            workoutName,
            "CHANGE THE NAME"
          );
          return false;
        }
        // unique
        return true;
      });
    } catch (error) {
      console.log("ERROR: could not check if", workoutName, "is unique");
      throw error;
    }
  };

  const storeWorkoutData = async () => {
    if (originalWorkoutName !== workoutName)
      AsyncStorage.removeItem(originalWorkoutName);

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
          workoutName: route.params.name,
          exercisesArr: workoutData[0],
          weights: workoutData[1],
          reps: workoutData[2],
          restTimers: workoutData[3],
          // isDoneArr gets reset to false for every set
          isDoneArr: workoutData[4].map((exer, i) =>
            exer.map((set, i) => false)
          ),
          originalWorkoutName: route.params.name,
        });
      }
    } catch (error) {
      // Error retrieving data
      console.log("ERROR LOADING DATA:", error);
      throw error;
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
              value={states.workoutName}
            ></TextInput>
          </View>

          <View style={styles.backContainer}>
            <BackComponent
              navigation={navigation}
              storeWorkoutData={storeWorkoutData}
              workoutName={states.workoutName}
              checkUniqueWorkoutName={checkUniqueWorkoutName}
            />
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
              // prevWeights={prevWeights}
              // setPrevWeights={setPrevWeights}
              weights={states.weights}
              setWeights={setWeights}
              // prevReps={prevReps}
              // setPrevReps={setPrevReps}
              reps={states.reps}
              setReps={setReps}
              isDoneArr={states.isDoneArr}
              setIsDoneArr={setIsDoneArr}
            />
          );
        })}

        <View style={styles.addExerciseContainer}>
          <TouchableOpacity onPress={addExercise}>
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
