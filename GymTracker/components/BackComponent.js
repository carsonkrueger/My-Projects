import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef } from "react";
import React, {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

const BackComponent = ({
  navigation,
  storeWorkoutData,
  workoutName,
  originalWorkoutName,
}) => {
  const names = useRef([]);

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
      )
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
          // checkUniqueWorkoutName();
          if (isWorkoutUnique()) {
            storeWorkoutData();
            navigation.navigate("HomeScreen");
          }
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
