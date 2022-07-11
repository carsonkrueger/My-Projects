import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Vibration,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const SetComponent = (props) => {
  const []
  const [isDone, setIsDone] = useState(false);

  const TENTH_SECOND_MS = 100;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      paddingTop: 2,
      paddingBottom: 2,
      marginTop: 3,
      marginLeft: 3,
      marginRight: 3,
      borderRadius: 9,
      backgroundColor: isDone ? "#99ffb3" : null,

    },
    setContainer: {
      flex: 0.6,
      alignItems: "center",
    },
    setText: {
      color: /*isDone ? null :*/ "#2494f0",
      fontSize: 17,
    },
    prevContainer: {
      flex: 1,
      alignItems: "center",
    },
    prevText: {
      color: /*isDone ? null :*/ "#2494f0",
      fontSize: 16,
    },
    weightContainer: {
      flex: 1,
      alignItems: "center",
    },
    weightText: {
      fontSize: 16,
      backgroundColor: isDone ? null : "#dedede",//"#7a7a7a",
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
      fontSize: 16,
      backgroundColor: isDone ? null : "#dedede",//"#7a7a7a",
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
          // editable={() => isDone ? false : true}
        ></TextInput>
      </View>

      {/*REPS*/}
      <View style={styles.repContainer}>
        <TextInput style={styles.repText} keyboardType="number-pad" /*editable={() => isDone ? false : true}*/></TextInput>
      </View>
      
      {/*CHECK*/}
      <View style={styles.checkContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsDone(!isDone);
            Vibration.vibrate(TENTH_SECOND_MS);
          }}
        >
          <Feather
            name="check-square"
            size={25}
            color={"#2494f0"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetComponent;
