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
      <Text style={styles.setStyle}>1</Text>
      {/*PREV*/}
      <Text></Text>
      {/*WEIGHT*/}
      <TextInput></TextInput>
      {/*REPS*/}
      <TextInput></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  setStyle: {
    color: "#2494f0",
    fontSize: 16,
  },
  weightStyle: {
    fontSize: 16,
    backgroundColor: "#7a7a7a",
    borderRadius: 5,
    width: "5%",
  },
  repStyle: {
    fontSize: 16,
    backgroundColor: "#7a7a7a",
    borderRadius: 5,
    width: "5%",
  },
});

export default SetComponent;
