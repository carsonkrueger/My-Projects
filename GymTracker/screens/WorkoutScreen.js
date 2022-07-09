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
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <View style={styles.screenHeader}>
          <TextInput
            style={styles.screenHeaderText}
            placeholder="Enter Workout Name"
          ></TextInput>
        </View>

        {exercisesArr.map((exercise, i) => {
          return <ExerciseComponent key={i} name={exercise[0]} />;
        })}

        <TouchableOpacity style={styles.addButton} onPress={AddExercise}>
          <Text style={styles.addButtonText}>ADD EXERCISE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#525252",
    alignItems: "center",
    width: "100%",
  },
  scrollStyle: {
    margin: 0,
  },
  screenHeader: {
    marginTop: "16%",
    alignItems: "center",
  },
  screenHeaderText: {
    fontSize: 25,
  },
  addButton: {
    width: "35%",
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default Workout;
