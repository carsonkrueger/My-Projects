import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const SetComponent = () => {
  const [numSets, setNumSets] = useState(1);

  return (
    <View style={styles.container}>
      {/*SET*/}
      <View style={styles.setContainer}>
        <Text style={styles.setText}>1</Text>
      </View>
      {/*PREV*/}
      <View style={styles.prevContainer}>
        <Text style={styles.prevText}></Text>
      </View>
      {/*WEIGHT*/}
      <View style={styles.weightContainer}>
        <TextInput style={styles.weightText}></TextInput>
      </View>
      {/*REPS*/}
      <View style={styles.repContainer}>
        <TextInput style={styles.repText}></TextInput>
      </View>
      {/*CHECK*/}
      <View style={styles.checkContainer}>
        <Feather name="check-square" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  setContainer: {
    flex: 0.6,
    alignItems: "center",
  },
  setText: {
    color: "#2494f0",
    fontSize: 16,
  },
  prevContainer: {
    flex: 1,
    alignItems: "center",
  },
  prevText: {
    color: "#2494f0",
    fontSize: 16,
  },
  weightContainer: {
    flex: 1,
    alignItems: "center",
  },
  weightText: {
    fontSize: 16,
    backgroundColor: "#7a7a7a",
    borderRadius: 5,
  },
  repContainer: {
    flex: 0.8,
    alignItems: "center",
    fontSize: 16,
    backgroundColor: "#7a7a7a",
    borderRadius: 5,
  },
  repText: {
    fontSize: 16,
    backgroundColor: "#7a7a7a",
    borderRadius: 5,
  },
  checkContainer: {
    flex: 0.7,
    alignItems: "center",
  },
});

export default SetComponent;
