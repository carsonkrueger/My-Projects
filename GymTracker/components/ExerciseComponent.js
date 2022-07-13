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
import { MaterialIcons, Feather } from "@expo/vector-icons";

import SetComponent from "./SetComponent";

const ExerciseComponent = ({
  name,
  numExercise,
  delExercise,
  exercisesArr,
  setExercisesArr,
  weights,
  setWeights,
  reps,
  setReps,
  isDoneArr,
  setIsDoneArr,
}) => {
  // const [isDoneArr, setIsDoneArr] = useState([false]);
  const TWENTYTH_SECOND_MS = 50;

  const changeExerciseName = (name) => {
    let tempExerciseArr = [...exercisesArr];
    tempExerciseArr[numExercise][0] = name;
    setExercisesArr(tempExerciseArr);
  }

  const AddSet = () => {
    let tempReps = [...reps];
    tempReps[numExercise].push(null);
    setReps(tempReps);

    let tempWeights = [...weights];
    tempWeights[numExercise].push(null);
    setWeights(tempWeights);

    let tempIsDone = [...isDoneArr];
    tempIsDone[numExercise].push(false);
    setIsDoneArr(tempIsDone);

    Vibration.vibrate(TWENTYTH_SECOND_MS);
  };

  const DeleteSet = () => {
    // Do not delete the first set
    if (weights[numExercise].length <= 1) return;

    let tempWeights = [...weights];
    tempWeights[numExercise].pop();
    setWeights(tempWeights);

    let tempReps = [...reps];
    tempReps[numExercise].pop();
    setReps(tempReps);

    console.log("BEFORE", isDoneArr);

    let tempIsDone = [...isDoneArr];
    tempIsDone[numExercise].pop();
    setIsDoneArr(tempIsDone);

    console.log("AFTER", isDoneArr);

    Vibration.vibrate(TWENTYTH_SECOND_MS);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleText}
          placeholder="EXERCISE NAME"
          placeholderTextColor="#90c6f5"
          value={exercisesArr[numExercise][0]}
          autoCapitalize="characters"
          onChangeText={(newText) => {changeExerciseName(newText)}}
        />

        <View style={styles.timerContainer}>
          <MaterialIcons name="timer"/>
          <TextInput placeholder="0:00"/>
        </View>

        <View style={styles.trashContainer}>
          <TouchableOpacity
            onPress={() => {
              delExercise(numExercise);
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

      {weights[numExercise].map((weight, i) => {
        return (
          <SetComponent
            key={i}
            numSet={i + 1}
            numExercise={numExercise}
            weights={weights}
            setWeights={setWeights}
            reps={reps}
            setReps={setReps}
            isDoneArr={isDoneArr}
            setIsDoneArr={setIsDoneArr}
          />
        );
      })}

      <View style={styles.addDelSetContainer}>
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
    paddingTop: "10%",
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  titleText: {
    flex: 22,
    fontSize: 16,
    // fontFamily: "Bebas Neue",
    color: "#2494f0",
    paddingLeft: 14,
  },
  timerContainer:{
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  trashContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 5,
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
    flex: 1,
    alignItems: "center",
  },
  emptyHead: {
    flex: 0.7,
  },
  whiteText: {
    color: "black",
  },
  addDelSetContainer: {
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
