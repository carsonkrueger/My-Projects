import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";

import ExerciseComponent from "../components/ExerciseComponent";

const Workout = () => {
  const [exercisesArr, setExercisesArr] = useState([["", 1]]);

  const AddExercise = () => {
    setExercisesArr([...exercisesArr, ["", exercisesArr.length + 1]]);
    //exercisesArr.push("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.screenHeader}>
          <TextInput
            style={styles.screenHeaderText}
            placeholder="Enter Workout Name"
            placeholderTextColor="#2494f0"
          ></TextInput>
        </View>

        {exercisesArr.map((exercise, i) => {
          return <ExerciseComponent key={i} name={exercise[0]} />;
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
    backgroundColor: "#525252",
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
    textAlign: "center",
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

export default Workout;
