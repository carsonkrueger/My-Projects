import React, { useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Exercise from "../components/Exercise";

const Workout = () => {
  const [exercisesArr, setExercisesArr] = useState([]);

  const AddExercise = () => {
    setExercisesArr(...exercisesArr.concat([""]));
  };

  return (
    <View style={styles.container}>
      {exercisesArr.map((exercise, i) => {
        return <Exercise />;
      })}
      <TouchableOpacity onPress={AddExercise}>
        <Text>Add Exercise</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Workout;
