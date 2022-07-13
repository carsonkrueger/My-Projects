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
  restTimers,
  setRestTimers,
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

  const [doTimer, setDoTimer] = useState(false);

  const changeExerciseName = (name) => {
    let tempExerciseArr = [...exercisesArr];
    tempExerciseArr[numExercise][0] = name;
    setExercisesArr(tempExerciseArr);
  };

  const changeRestTime = (num) => {
    let tempRestTimers = [...restTimers];
    tempRestTimers[numExercise] = num;
    setRestTimers(tempRestTimers);
  };

  const flipDoTimer = () => {
    let tempDoTimer = !doTimer;
    setDoTimer(tempDoTimer);
  };

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

    let tempIsDone = [...isDoneArr];
    tempIsDone[numExercise].pop();
    setIsDoneArr(tempIsDone);

    Vibration.vibrate(TWENTYTH_SECOND_MS);
  };

  const styles = StyleSheet.create({
    container: {
      paddingTop: "10%",
      width: "100%",
    },
    titleContainer: {
      flex: 1,
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
    timerContainer: {
      flex: 10,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: doTimer ? "#90c6f5" : null,
      borderColor: doTimer ? "#90c6f5" : "black",
      borderWidth: 1,
      borderRadius: 15,
    },
    timerIconContainer: {},
    timerTimeContainer: {},
    timerText: {
      color: doTimer ? "white" : "black",
      width: 27,
      fontSize: 16,
      textAlign: "center",
    },
    trashContainer: {
      flex: 6.5,
      alignItems: "center",
      justifyContent: "center",
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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleText}
          placeholder="EXERCISE NAME"
          placeholderTextColor="#90c6f5"
          value={exercisesArr[numExercise][0]}
          maxLength={20}
          autoCapitalize="characters"
          onChangeText={(newText) => {
            changeExerciseName(newText);
          }}
        />

        <TouchableOpacity style={styles.timerContainer} onPress={flipDoTimer}>
          {!doTimer && (
            <View style={styles.timerIconContainer}>
              <MaterialIcons
                name="timer"
                size={24}
                color={doTimer ? "white" : "black"}
              />
            </View>
          )}

          <View style={styles.timerTimeContainer}>
            {!doTimer && (
              <TextInput
                style={styles.timerText}
                placeholder="0s"
                value={restTimers[numExercise]}
                maxLength={3}
                keyboardType="numeric"
                onChangeText={(newNum) => {
                  changeRestTime(newNum);
                }}
              />
            )}
            {doTimer && (
              <Text style={styles.timerText}>{restTimers[numExercise]}</Text>
            )}
          </View>
        </TouchableOpacity>

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

export default ExerciseComponent;
