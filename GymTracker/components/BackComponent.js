import { useEffect, useRef } from "react";
import React, {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("GymTracker");

const BackComponent = ({
  navigation,
  saveNewData,
  workoutName,
  originalWorkoutName,
}) => {
  const names = useRef([]);
  const templateNames = useRef([
    "LEGS-TEMPLATE",
    "PUSH-TEMPLATE",
    "PULL-TEMPLATE",
  ]);

  useEffect(() => {
    getNames();
  }, []);

  const getNames = async () => {
    try {
      names.current = await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log("ERROR GETTING NAMES:", error);
    }
  };

  const isWorkoutUnique = () => {
    if (names.current === null) return true;
    else if (workoutName === "") {
      Alert.alert("Please change your workout name");
      return false;
    } else if (
      !(
        workoutName === originalWorkoutName ||
        !names.current.includes(workoutName)
      ) ||
      templateNames.current.includes(workoutName)
    ) {
      Alert.alert("Workout names must be unique");
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          saveNewData();
          navigation.navigate("HomeScreen");
        }}
      >
        <Text style={styles.text}>FINISH</Text>
      </TouchableOpacity>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  text: {
    color: "white", //"#2494f0",
    fontSize: 18,
  },
});

export default BackComponent;
