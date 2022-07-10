import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const SetComponent = (props) => {
  const [numSets, setNumSets] = useState(1);
  const [isDone, setIsDone] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      paddingTop: 5,
      paddingBottom: 5,
      marginTop: 3,
      marginLeft: 3,
      marginRight: 3,
      borderRadius: 9,
    },
    setContainer: {
      flex: 0.6,
      alignItems: "center",
    },
    setText: {
      color: isDone ? "#149c36" : "#2494f0",
      fontSize: 17,
    },
    prevContainer: {
      flex: 1,
      alignItems: "center",
    },
    prevText: {
      color: isDone ? "#149c36" : "#2494f0",
      fontSize: 16,
    },
    weightContainer: {
      flex: 1,
      alignItems: "center",
    },
    weightText: {
      fontSize: 16,
      backgroundColor: isDone ? "#149c36" : "#7a7a7a",
      borderRadius: 5,
      width: "80%",
      textAlign: "center",
      color: "white",
    },
    repContainer: {
      flex: 1,
      alignItems: "center",
      fontSize: 16,
    },
    repText: {
      fontSize: 16,
      backgroundColor: isDone ? "#149c36" : "#7a7a7a",
      borderRadius: 5,
      width: "80%",
      textAlign: "center",
      color: "white",
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
        <Text style={styles.setText}>{props.num}</Text>
      </View>
      {/*PREV*/}
      <View style={styles.prevContainer}>
        <Text style={styles.prevText}></Text>
      </View>
      {/*WEIGHT*/}
      <View style={styles.weightContainer}>
        <TextInput
          style={styles.weightText}
          keyboardType="number-pad"
        ></TextInput>
      </View>
      {/*REPS*/}
      <View style={styles.repContainer}>
        <TextInput style={styles.repText} keyboardType="number-pad"></TextInput>
      </View>
      {/*CHECK*/}
      <View style={styles.checkContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsDone(!isDone);
          }}
        >
          <Feather
            name="check-square"
            size={25}
            color={isDone ? "#149c36" : "#2494f0"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetComponent;
