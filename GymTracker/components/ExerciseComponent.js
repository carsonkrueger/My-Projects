import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import SetComponent from "./SetComponent";

const ExerciseComponent = (props) => {
  return (
    <View style={styles.container}>
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

      <SetComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    width: "100%",
  },
  title: {
    fontSize: 20,
    color: "white",
    paddingLeft: 10,
    marginTop: 50,
  },
  headers: {
    flexDirection: "row",
    color: "white",
    padding: 5,
    width: "100%",
  },
  whiteText: {
    color: "white",
  },
});

export default ExerciseComponent;
