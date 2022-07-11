import React, { useState } from "react";

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

const WorkoutScreen = () => {
  const [workoutName, setWorkoutName] = useState("Workout Name");
  const [exercisesArr, setExercisesArr] = useState([["Exercise Name", 0]]);
  const [weights, setWeights] = useState([]);
  const [reps, setReps] = useState([]);

  const TENTH_SECOND_MS = 100;

  const AddExercise = () => {
    let idx = exercisesArr.length == null ? 0 : exercisesArr.length + 1;
    setExercisesArr([...exercisesArr, ["Exercise Name", idx]]);
    Vibration.vibrate(TENTH_SECOND_MS);
  };

  const DeleteExercise = (name, i) => {
    
    let tempArr = [...exercisesArr];
    let idx = tempArr.findIndex((pName,pI) => {if ([pName,pI] === [name, i]) return true;})
    tempArr.splice(idx, 1);
    setExercisesArr(tempArr);
  }

  const storeWorkoutData = async () => {
    try {
      await AsyncStorage.multiSet(
        ["Workout", workoutName], ["Exercises", exercisesArr]
      )
    } catch (error) {
      // Error saving data
    }
  };

  const retrieveExerciseData = async () => {
    try {
      const value = await AsyncStorage.getItem();
      if (value !== null) {
        // We have data!!
        console.log(value);
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
            onChangeText={newText => setWorkoutName(newText)}
          ></TextInput>
        </View>

        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle} multiline={true}>NOTES</Text>
          <TextInput style={styles.notesText}></TextInput>
        </View>

        {exercisesArr.map((exercise, i) => {
          return <ExerciseComponent key={i} name={exercise[0]} idx={i} del={DeleteExercise} weights={weights[i]} setWeights={setWeights} reps={reps[i]} setReps={setReps}/>;
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
    paddingLeft:10,
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
    paddingTop: 30,
    paddingBottom: 300,
  },
  addExerciseText: {
    fontSize: 16,
    color: "#2494f0",
  },
});

export default WorkoutScreen;
