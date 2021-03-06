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
  seconds,
  delExercise,
  exercisesArr,
  setExercisesArr,
  prevWeights,
  weights,
  setWeights,
  prevReps,
  reps,
  setReps,
  // isDoneArr,
  // setIsDoneArr,
  isLocked,
}) => {
  // const [isDoneArr, setIsDoneArr] = useState([false]);
  const TWENTYTH_SECOND_MS = 50;

  const [doTimer, setDoTimer] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);

  const changeExerciseName = (name) => {
    let tempExerciseArr = [...exercisesArr];
    tempExerciseArr[numExercise] = name;
    setExercisesArr(tempExerciseArr);
  };

  const changeRestTime = (num) => {
    let tempRestTimers = [...restTimers];
    tempRestTimers[numExercise] = num;
    setRestTimers(tempRestTimers);
  };

  const flipDoTimer = (numExercise) => {
    // console.log("FLIP! doTimer:", doTimer);
    setDoTimer(!doTimer);

    if (!doTimer) setCountdownTime(seconds);
  };

  const AddSet = () => {
    let tempReps = [...reps];
    tempReps[numExercise].push("");
    setReps(tempReps);

    let tempWeights = [...weights];
    tempWeights[numExercise].push("");
    setWeights(tempWeights);

    // let tempIsDone = [...isDoneArr];
    // tempIsDone[numExercise].push(false);
    // setIsDoneArr(tempIsDone);

    // Vibration.vibrate(TWENTYTH_SECOND_MS);
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

    // let tempIsDone = [...isDoneArr];
    // tempIsDone[numExercise].pop();
    // setIsDoneArr(tempIsDone);

    // Vibration.vibrate(TWENTYTH_SECOND_MS);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: "2%",
      // borderColor: "#2494f0",
      // borderWidth: 1,
      borderRadius: 20,
      marginHorizontal: "2%",
      paddingTop: "5%",
      backgroundColor: "white",
      paddingBottom: isLocked ? "4%" : "0%",
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
      paddingLeft: 16,
    },
    timerContainer: {
      paddingHorizontal: "0%",
      paddingVertical: ".3%",
      flex: isLocked ? 7 : 9,
      marginRight: isLocked ? "4%" : 0,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: doTimer ? "#2494f0" : "white",
      borderColor: "#2494f0",
      borderWidth: 1.2,
      borderRadius: 15,
    },
    timerIconContainer: {
      paddingRight: "5%",
    },
    timerTimeContainer: {},
    timerText: {
      color: doTimer ? "white" : isLocked ? "#2494f0" : "black",
      fontSize: 16,
      textAlign: "center",
      backgroundColor: doTimer || isLocked ? null : "#dedede",
      borderRadius: 8,
      paddingHorizontal: 3,
    },
    trashContainer: {
      flex: 7.3,
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
      fontSize: 10,
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
      fontSize: 14,
      color: "black",
    },
    addDelSetContainer: {
      flexDirection: "row",
      paddingVertical: "2%",
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
          value={name}
          maxLength={20}
          editable={!isLocked}
          autoCapitalize="characters"
          onChangeText={(newText) => {
            changeExerciseName(newText);
          }}
        />

        <TouchableOpacity style={styles.timerContainer} onPress={flipDoTimer}>
          <View style={styles.timerIconContainer}>
            <MaterialIcons
              name="timer"
              size={20}
              color={doTimer ? "white" : "#2494f0"}
            />
          </View>

          <View style={styles.timerTimeContainer}>
            <TextInput
              style={styles.timerText}
              placeholder="0s"
              value={
                doTimer
                  ? (
                      restTimers[numExercise] -
                      (seconds - countdownTime)
                    ).toString()
                  : restTimers[numExercise]
              }
              maxLength={3}
              keyboardType="numeric"
              editable={!doTimer && !isLocked}
              onChangeText={(newNum) => {
                changeRestTime(newNum);
              }}
            />

            {/* {doTimer && (
              <Text style={styles.timerText}>
                {(
                  restTimers[numExercise] -
                  (seconds - countdownTime)
                ).toString()}
              </Text>
            )} */}
          </View>
        </TouchableOpacity>

        {!isLocked && (
          <View style={styles.trashContainer}>
            <TouchableOpacity
              onPress={() => {
                setDoTimer(false);
                delExercise(numExercise);
              }}
            >
              <Feather name="trash" color="#de3e3e" size={18} />
            </TouchableOpacity>
          </View>
        )}
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
            numSet={i}
            numExercise={numExercise}
            prevWeights={prevWeights}
            weights={weights}
            setWeights={setWeights}
            prevReps={prevReps}
            reps={reps}
            setReps={setReps}
            // isDoneArr={isDoneArr}
            // setIsDoneArr={setIsDoneArr}
          />
        );
      })}

      {!isLocked && (
        <View style={styles.addDelSetContainer}>
          <TouchableOpacity onPress={DeleteSet}>
            <Feather name="minus" color="#2494f0" size={22} />
          </TouchableOpacity>

          <TouchableOpacity onPress={AddSet}>
            <Feather name="plus" color="#2494f0" size={22} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ExerciseComponent;
