import React, { StyleSheet, useState } from "react-native";

import { View, Text, TouchableOpacity } from "react-native";

const WorkoutComponent = ({ navigation, name }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text
        style={styles.text}
        onPress={() => {
          // loadWorkoutData(name);
          navigation.navigate("WorkoutScreen", { name: name });
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#a3a3a3",
    borderRadius: 10,
    paddingVertical: "7%",
    marginVertical: "2%",
  },
  text: {
    fontSize: 15,
  },
});

export default WorkoutComponent;
