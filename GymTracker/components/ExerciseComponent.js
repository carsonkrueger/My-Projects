import React, { useState, useRef } from "react";
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
  navigation,
  addSet,
  deleteSet,
  numExercise,
  workoutInfo,
  setRestTimer,
  seconds,
  delExercise,
  setExercise,
  prevWeights,
  setWeights,
  prevReps,
  setReps,
  isLocked,
}) => {
  const [doTimer, setDoTimer] = useState(false);
  const countdownTime = useRef(new Date().getTime());

  const flipDoTimer = () => {
    // console.log("FLIP! doTimer:", doTimer);
    setDoTimer(!doTimer);

    if (!doTimer) countdownTime.current = new Date().getTime();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: "2%",
      borderColor: "#bdbdbd",
      borderWidth: 1,
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
      fontFamily: "RobotoCondensedRegular",
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
      fontFamily: "RobotoCondensedRegular",
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
      fontFamily: "RobotoCondensedRegular",
      fontSize: 10,
      flex: 0.6,
      alignItems: "center",
    },
    prevHead: {
      fontFamily: "RobotoCondensedRegular",
      flex: 1,
      alignItems: "center",
    },
    weightHead: {
      fontFamily: "RobotoCondensedRegular",
      flex: 1,
      alignItems: "center",
    },
    repHead: {
      fontFamily: "RobotoCondensedRegular",
      flex: 1,
      alignItems: "center",
    },
    emptyHead: {
      flex: 0.6,
    },
    whiteText: {
      fontFamily: "RobotoCondensedRegular",
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
          value={workoutInfo.exercise}
          maxLength={20}
          editable={!isLocked}
          autoCapitalize="characters"
          onChangeText={(newText) => {
            setExercise(newText, numExercise);
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
                  ? Math.trunc(
                      workoutInfo.restTimer -
                        (seconds - countdownTime.current) / 1000 -
                        1
                    ).toString()
                  : workoutInfo.restTimer
              }
              maxLength={3}
              keyboardType="numeric"
              editable={!doTimer && !isLocked}
              onChangeText={(newNum) => {
                setRestTimer(newNum, numExercise);
              }}
            />
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
      {/* {console.log(prevWeights)} */}
      {workoutInfo.weights.map((weight, i) => {
        return (
          <SetComponent
            key={i}
            navigation={navigation}
            weights={workoutInfo.weights}
            reps={workoutInfo.reps}
            numSet={i}
            numExercise={numExercise}
            prevWeights={prevWeights.weights[i]}
            setWeights={setWeights}
            prevReps={prevReps.reps[i]}
            setReps={setReps}
          />
        );
      })}

      {!isLocked && (
        <View style={styles.addDelSetContainer}>
          <TouchableOpacity onPress={() => deleteSet(numExercise)}>
            <Feather name="minus" color="#2494f0" size={22} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => addSet(numExercise)}>
            <Feather name="plus" color="#2494f0" size={22} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ExerciseComponent;
