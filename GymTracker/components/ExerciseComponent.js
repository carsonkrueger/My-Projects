import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

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
        <View style={styles.setHead}>
          <Text style={styles.whiteText}>SET</Text>
        </View>
        <View style={styles.prevHead}>
          <Text style={styles.whiteText}>PREV</Text>
        </View>
        <View style={styles.weightHead}>
          <Text style={styles.whiteText}>WEIGHT</Text>
        </View>
        <View style={styles.repHead}>
          <Text style={styles.whiteText}>REPS</Text>
        </View>
        <View style={styles.emptyHead}>{/* Empty header */}</View>
      </View>

      <SetComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  setHead: {
    flex: 0.6,
    alignItems: "center",
  },
  prevHead: {
    flex: 1,
    alignItems: "center",
  },
  weightHead: {
    flex: 1,
    alignItems: "center",
  },
  repHead: {
    flex: 0.8,
    alignItems: "center",
  },
  emptyHead: {
    flex: 0.7,
  },
  whiteText: {
    color: "white",
  },
});

export default ExerciseComponent;
