import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

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
        <Text></Text>
      </View>
      {/*WEIGHT*/}
      <View style={styles.weightContainer}>
        <TextInput></TextInput>
      </View>
      {/*REPS*/}
      <View style={styles.repContainer}>
        <TextInput></TextInput>
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
  weightContainer: {
    fontSize: 16,
    backgroundColor: "#7a7a7a",
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  repContainer: {
    fontSize: 16,
    backgroundColor: "#7a7a7a",
    borderRadius: 5,
    flex: 0.8,
    alignItems: "center",
  },
  checkContainer: {
    flex: 0.7,
    alignItems: "center",
  },
});

export default SetComponent;
