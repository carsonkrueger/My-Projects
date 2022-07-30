import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Vibration,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const SetComponent = ({
  navigation,
  exerciseName,
  numSet,
  numExercise,
  prevWeights,
  weights,
  setWeights,
  prevReps,
  reps,
  setReps,
  // isDoneArr,
  // setIsDoneArr,
}) => {
  const TWENTYTH_SECOND_MS = 50;
  const [isDone, setIsDone] = useState(false);

  const changeWeightText = (weight) => {
    let tempWeights = [...weights];
    tempWeights[numExercise][numSet] = weight;
    setWeights(tempWeights);
  };

  const changeRepText = (rep) => {
    let tempReps = [...reps];
    tempReps[numExercise][numSet] = rep;
    setReps(tempReps);
  };

  const getPrevWeightsText = () => {
    if (prevWeights.length < numExercise + 1) {
      return "";
    } else if (prevWeights[numExercise].length < numSet + 1) {
      return "";
    } else {
      return prevWeights[numExercise][numSet].toString();
    }
  };

  const getPrevRepsText = () => {
    if (prevReps.length < numExercise + 1) {
      return "";
    } else if (prevReps[numExercise].length < numSet + 1) {
      return "";
    } else {
      return prevReps[numExercise][numSet].toString();
    }
  };

  useEffect(() => {
    if (isDone) {
      if (
        weights[numExercise][numSet] == "" &&
        prevWeights[numExercise][numSet] !== ""
      )
        changeWeightText(prevWeights[numExercise][numSet]);

      if (
        reps[numExercise][numSet] == "" &&
        prevReps[numExercise][numSet] !== ""
      )
        changeRepText(prevReps[numExercise][numSet]);
    }
  }, [isDone]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      paddingTop: 1,
      paddingBottom: 1,
      marginTop: 5,
      marginHorizontal: 5,
      borderRadius: 9,
      backgroundColor: isDone /*isDoneArr[numExercise][numSet]*/
        ? "#9effb6"
        : null,
    },
    setContainer: {
      flex: 0.6,
      alignItems: "center",
      justifyContent: "center",
    },
    setText: {
      fontFamily: "RobotoCondensedRegular",
      color: /*isDone[numSet] ? null :*/ "#2494f0",
      fontSize: 17,
    },
    prevContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    prevText: {
      fontFamily: "RobotoCondensedRegular",
      color: /*isDone[numSet] ? null :*/ "#2494f0",
      fontSize: 14,
    },
    weightContainer: {
      flex: 1,
      alignItems: "center",
    },
    weightText: {
      fontFamily: "RobotoCondensedRegular",
      fontSize: 16,
      backgroundColor: isDone /*isDoneArr[numExercise][numSet]*/
        ? null
        : "#ededed", //"#7a7a7a",
      borderRadius: 5,
      width: "80%",
      textAlign: "center",
      color: "black",
    },
    repContainer: {
      flex: 1,
      alignItems: "center",
      fontSize: 16,
    },
    repText: {
      fontFamily: "RobotoCondensedRegular",
      fontSize: 16,
      backgroundColor: isDone /*isDoneArr[numExercise][numSet]*/
        ? null
        : "#ededed", //"#7a7a7a",
      borderRadius: 5,
      width: "80%",
      textAlign: "center",
      color: "black",
    },
    checkContainer: {
      flex: 0.7,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      {/*SET*/}
      <View style={styles.setContainer}>
        <Text style={styles.setText}>{numSet + 1}</Text>
      </View>

      {/*PREV*/}
      <TouchableOpacity
        style={styles.prevContainer}
        onPress={() =>
          navigation.navigate("PrevScreen", { exerciseName: exerciseName })
        }
      >
        <Text style={styles.prevText}>
          {getPrevRepsText() !== "" && getPrevWeightsText() !== ""
            ? getPrevWeightsText() + " x " + getPrevRepsText()
            : "---"}
        </Text>
      </TouchableOpacity>

      {/*WEIGHT*/}
      <View style={styles.weightContainer}>
        <TextInput
          style={styles.weightText}
          keyboardType="number-pad"
          value={weights[numExercise][numSet]}
          placeholder={getPrevWeightsText()}
          editable={!isDone} //isDoneArr[numExercise][numSet]}
          maxLength={4}
          onChangeText={(newText) => {
            changeWeightText(newText);
          }}
          // editable={() => isDone ? false : true}
        ></TextInput>
      </View>

      {/*REPS*/}
      <View style={styles.repContainer}>
        <TextInput
          style={styles.repText}
          keyboardType="number-pad" /*editable={() => isDone ? false : true}*/
          value={reps[numExercise][numSet]}
          placeholder={getPrevRepsText()}
          editable={!isDone} //isDoneArr[numExercise][numSet]}
          maxLength={4}
          onChangeText={(newText) => {
            changeRepText(newText);
          }}
        ></TextInput>
      </View>

      {/*CHECK*/}
      <View style={styles.checkContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsDone(!isDone);
            Vibration.vibrate(TWENTYTH_SECOND_MS);
          }}
        >
          <Feather name="check-square" size={25} color={"#2494f0"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetComponent;
