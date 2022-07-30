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
  updateData,
  id,
  // originalWorkoutName,
  isTemplate,
}) => {
  const templateNames = useRef([]);

  useEffect(() => {
    getTemplateNames();
  });

  const isWorkoutUnique = () => {
    // console.log(templateNames);
    if (workoutName == null || workoutName.trim() === "") {
      Alert.alert("Please change your workout name");
      return false; // not unique
    } //else if () {
    //   Alert.alert("Workout names must be unique");
    //   return false; // not unique
    // }
    // templateNames.current.map((item) =>
    //   console.log(workoutName, "yo", item.Name)
    // );
    // unique
    return true;
  };

  const getTemplateNames = async () => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "SELECT Name FROM Templates",
          null,
          (tx, result) => (templateNames.current = result.rows._array),
          (tx, error) =>
            console.log("COULD NOT LOAD NAMES IN BACK COMPONENT", error)
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    text: {
      color: "white", //"#2494f0",
      fontSize: 18,
      fontFamily: "RobotoCondensedRegular",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (isWorkoutUnique()) {
            id == null || isTemplate ? saveNewData() : updateData();
            navigation.navigate("HomeScreen");
          }
        }}
      >
        <Text style={styles.text}>FINISH</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackComponent;
