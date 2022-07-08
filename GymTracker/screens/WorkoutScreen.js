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
          ></TextInput>
        </View>

        {exercisesArr.map((exercise, i) => {
          return <ExerciseComponent key={i} name={exercise[0]} />;
        })}

        <TouchableOpacity style={styles.addButton} onPress={AddExercise}>
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenHeader: {
    paddingTop: 60,
    height: "15%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#5e9acc",
  },
  screenHeaderText: {
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: "fff",
    justifyContent: "center",
  },
  addButton: {
    width: "30%",
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#5e9acc",
  },
  addButtonText: {
    color: "white",
    alignContent: "center",
  },
});

export default Workout;
