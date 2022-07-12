import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Vibration,
} from "react-native";
// import { useFonts, Bebas_Neue } from "@expo-google-fonts/inter";
import { AntDesign, Feather } from "@expo/vector-icons";

import SetComponent from "./SetComponent";

const ExerciseComponent = (props) => {
  // const { name, numExercise, delExercise, weights, setWeights, reps, setReps } =
  //   props;

  const TENTH_SECOND_MS = 100;

  const AddSet = () => {
    let tempReps = [...props.reps];
    tempReps[props.numExercise].push(null);
    props.setReps(tempReps);

    let tempWeights = [...props.weights];
    tempWeights[props.numExercise].push(null);
    props.setWeights(tempWeights);

    Vibration.vibrate(TENTH_SECOND_MS);
  };

  const DeleteSet = () => {
    //Weights
    let tempReps = [...props.reps];
    tempReps[props.numExercise].pop();
    props.setReps(tempReps);

    let tempWeights = [...props.weights];
    tempWeights[props.numExercise].pop();
    props.setWeights(tempWeights);

    Vibration.vibrate(TENTH_SECOND_MS);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleText}
          placeholder="Exercise Name"
          defaultValue={props.name}
          placeholderTextColor="#2494f0"
        />

        <View style={styles.trashContainer}>
          <TouchableOpacity
            onPress={() => {
              props.delExercise(props.name, props.numExercise);
            }}
          >
            <Feather name="trash" color="#de3e3e" size={18} />
          </TouchableOpacity>
        </View>
      </View>

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
      {console.log("weights", props.weights)}
      {console.log("reps", props.reps)}
      {useEffect(() => {
        props.weights.map((weight, i) => (
          <SetComponent
            key={i}
            num={i}
            weight={props.weights}
            setWeights={props.setWeights}
            rep={props.reps}
            setReps={props.setReps}
          />
        ));
      }, [props.weights])}

      <View style={styles.addSetContainer}>
        <TouchableOpacity onPress={DeleteSet}>
          <Feather name="minus" color="#2494f0" size={22} />
        </TouchableOpacity>

        <TouchableOpacity onPress={AddSet}>
          <Feather name="plus" color="#2494f0" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: "20%",
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  titleText: {
    flex: 22,
    fontSize: 22,
    // fontFamily: "Bebas Neue",
    color: "#2494f0",
    paddingLeft: 14,
  },
  trashContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 5,
  },
  headers: {
    flexDirection: "row",
    color: "white",
    padding: 3,
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
    flex: 1,
    alignItems: "center",
  },
  emptyHead: {
    flex: 0.7,
  },
  whiteText: {
    color: "black",
  },
  addSetContainer: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  addSet: {
    color: "#2494f0",
    fontSize: 14,
  },
});

export default ExerciseComponent;
