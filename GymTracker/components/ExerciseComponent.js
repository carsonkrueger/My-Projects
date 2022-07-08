import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

const ExerciseComponent = (props) => {
  return (
    <View>
      <TextInput
        style={styles.title}
        placeholder="Enter Exercise Here"
        defaultValue={props.name}
      ></TextInput>

      <View style={styles.headers}>
        <Text style={styles.whiteText}>SET</Text>
        <Text style={styles.whiteText}>PREV</Text>
        <Text style={styles.whiteText}>WEIGHT</Text>
        <Text style={styles.whiteText}>REPS</Text>
      </View>

      <View>
        <TextInput></TextInput>
        <TextInput></TextInput>
        <TextInput></TextInput>
        <TextInput></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "white",
    paddingLeft: 10,
    marginTop: 20,
    backgroundColor: "#5e9acc",
  },
  headers: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    color: "white",
    padding: 5,
    width: "100%",
    backgroundColor: "#5e9acc",
  },
  whiteText: {
    color: "white",
  },
});

export default ExerciseComponent;
