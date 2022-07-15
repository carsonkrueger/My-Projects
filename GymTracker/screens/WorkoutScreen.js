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
import { loadAsync } from "expo-font";

const WorkoutScreen = ({ navigation, route }) => {
  const [workoutName, setWorkoutName] = useState("");
  const [exercisesArr, setExercisesArr] = useState([""]);
  // Each array inside the arrays (weights & reps), represents an exercise's sets.
  const [weights, setWeights] = useState([[""]]);
  const [reps, setReps] = useState([[""]]);
  const [restTimers, setRestTimers] = useState([""]);

  const [prevWeights, setPrevWeights] = useState([[""]]);
  const [prevReps, setPrevReps] = useState([[""]]);

  const [isDoneArr, setIsDoneArr] = useState([[false]]);
  const [seconds, setSeconds] = useState(0);
  const [originalWorkoutName, setOriginalWorkoutName] = useState("");

  const TWENTYTH_SECOND_MS = 50;

  useEffect(() => {
    // loadWorkoutData();
    loadRouteWorkoutData();
    setOriginalWorkoutName(workoutName);

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const AddExercise = () => {
    let tempWeights = [...weights];
    tempWeights.push([""]);
    setWeights(tempWeights);

    let tempReps = [...reps];
    tempReps.push([""]);
    setReps(tempReps);

    let tempExercise = [...exercisesArr];
    tempExercise.push("");
    setExercisesArr(tempExercise);

    let tempIsDone = [...isDoneArr];
    tempIsDone.push([false]);
    setIsDoneArr(tempIsDone);

    let tempRestTimers = [...restTimers];
    tempRestTimers.push("");
    setRestTimers(tempRestTimers);

    Vibration.vibrate(TWENTYTH_SECOND_MS);
  };

  const deleteExercise = (numExercise) => {
    if (exercisesArr.length <= 1) {
      setExercisesArr([""]);
      setWeights([[""]]);
      setReps([[""]]);
      setIsDoneArr([[false]]);
      setRestTimers([""]);
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
    } catch {
      console.log("ERROR: could not check if", workoutName, "is unique");
    }
  };

  const storeWorkoutData = async () => {
    try {
      await AsyncStorage.setItem(
        workoutName.toString(),
        JSON.stringify([exercisesArr, weights, reps, restTimers])
      );
      console.log(JSON.stringify([exercisesArr, weights, reps, restTimers]));
    } catch (error) {
      // Error saving data
      console.log("ERROR SAVING WORKOUT DATA");
    }

    // if (originalWorkoutName !== workoutName) {
    //   try {
    //     await AsyncStorage.removeItem(originalWorkoutName);
    //   } catch (error) {
    //     // Error saving data
    //     console.log("ERROR DELETING OLD WORKOUT DATA");
    //   }
    // }
  };

  const loadWorkoutData = async () => {
    try {
      console.log("loading workoutscreen data for:", route.params.name);
      const unparsedWorkoutData = await AsyncStorage.getItem(route.params.name);

      if (unparsedWorkoutData !== null) {
        const workoutData = JSON.parse(unparsedWorkoutData);
        console.log(
          "LOADING\n",
          "\nexer names\n",
          workoutData[0],
          "\nweights\n",
          workoutData[1],
          "\nreps\n",
          workoutData[2],
          "\ntimes\n",
          workoutData[3]
        );

        setWorkoutName(route.params.name.toString());
        setExercisesArr(...workoutData[0]);
        setWeights(workoutData[1]);
        setReps(workoutData[2]);
        setRestTimers(workoutData[3]);
      }
    } catch (error) {
      // Error retrieving data
      console.log("ERROR LOADING DATA:", error);
    }
  };

  loadRouteWorkoutData = () => {
    setWorkoutName(route.params.name.toString());
    setExercisesArr(route.params.data[0]);
    setWeights(route.params.data[1]);
    setReps(route.params.data[2]);
    setRestTimers(route.params.data[3]);
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
              value={workoutName}
            ></TextInput>
          </View>

          <View style={styles.backContainer}>
            <BackComponent
              navigation={navigation}
              storeWorkoutData={storeWorkoutData}
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

        {exercisesArr.map((exercise, i) => {
          // console.log("\n\n", i, "-->", exercise);
          return (
            <ExerciseComponent
              key={i}
              name={exercise}
              numExercise={i}
              restTimers={restTimers}
              setRestTimers={setRestTimers}
              seconds={seconds}
              delExercise={deleteExercise}
              exercisesArr={exercisesArr}
              setExercisesArr={setExercisesArr}
              prevWeights={prevWeights}
              setPrevWeights={setPrevWeights}
              weights={weights}
              setWeights={setWeights}
              prevReps={prevReps}
              setPrevReps={setPrevReps}
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
