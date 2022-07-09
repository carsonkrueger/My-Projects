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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.screenHeader}>
          <TextInput
            style={styles.screenHeaderText}
            placeholder="Enter Workout Name"
          ></TextInput>
        </View>

        {exercisesArr.map((exercise, i) => {
          return <ExerciseComponent key={i} name={exercise[0]} />;
        })}

        <View style={styles.addButton}>
          <TouchableOpacity onPress={AddExercise}>
            <Text style={styles.addButtonText}>ADD EXERCISE</Text>
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
  scrollContent: {},
  scroll: {},
  screenHeader: {
    marginTop: "16%",
    alignItems: "center",
  },
  screenHeaderText: {
    fontSize: 25,
  },
  addButton: {
    flex: 1,
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
